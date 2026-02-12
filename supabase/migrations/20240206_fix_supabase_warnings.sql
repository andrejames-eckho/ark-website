-- Fix Supabase Security Warnings
-- This migration addresses Function Search Path Mutable, Leaked Password Protection, and Auth RLS issues

-- Step 1: Fix Function Search Path Mutable for admin functions
-- First drop dependent policies, then recreate functions with explicit search_path

-- Drop policies that depend on admin functions
DROP POLICY IF EXISTS "Admins can insert equipment" ON equipment;
DROP POLICY IF EXISTS "Admins can update equipment" ON equipment;
DROP POLICY IF EXISTS "Admins can delete equipment" ON equipment;
DROP POLICY IF EXISTS "Admins can view admin roles" ON admin_roles;
DROP POLICY IF EXISTS "Admins can insert admin roles" ON admin_roles;
DROP POLICY IF EXISTS "Admins can delete admin roles" ON admin_roles;
-- Drop existing audit log policies if table exists
DROP POLICY IF EXISTS "Admins can view audit log" ON admin_audit_log;
DROP POLICY IF EXISTS "System can insert audit log" ON admin_audit_log;
-- Drop categories admin policies that depend on is_admin_user
DROP POLICY IF EXISTS "Admins can insert categories" ON categories;
DROP POLICY IF EXISTS "Admins can update categories" ON categories;
DROP POLICY IF EXISTS "Admins can delete categories" ON categories;

-- Now safely drop and recreate functions with explicit search_path

-- Fix is_admin_user function
DROP FUNCTION IF EXISTS is_admin_user();

CREATE OR REPLACE FUNCTION is_admin_user()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  -- Check if current user is in admin_roles table
  RETURN EXISTS (
    SELECT 1 FROM admin_roles 
    WHERE user_id = auth.uid()
  );
END;
$$;

-- Fix grant_admin_role function
DROP FUNCTION IF EXISTS grant_admin_role(UUID, UUID);

CREATE OR REPLACE FUNCTION grant_admin_role(target_user_id UUID, granting_user_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  -- Only existing admins can grant new admin roles
  IF NOT EXISTS (SELECT 1 FROM admin_roles WHERE user_id = granting_user_id) THEN
    RAISE EXCEPTION 'Only existing admins can grant admin roles';
  END IF;
  
  INSERT INTO admin_roles (user_id, created_by)
  VALUES (target_user_id, granting_user_id)
  ON CONFLICT (user_id) DO NOTHING;
  
  RETURN true;
END;
$$;

-- Fix revoke_admin_role function
DROP FUNCTION IF EXISTS revoke_admin_role(UUID, UUID);

CREATE OR REPLACE FUNCTION revoke_admin_role(target_user_id UUID, revoking_user_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  -- Only existing admins can revoke admin roles (except self)
  IF NOT EXISTS (SELECT 1 FROM admin_roles WHERE user_id = revoking_user_id) THEN
    RAISE EXCEPTION 'Only existing admins can revoke admin roles';
  END IF;
  
  DELETE FROM admin_roles WHERE user_id = target_user_id;
  RETURN true;
END;
$$;

-- Recreate the policies that depend on the fixed functions
CREATE POLICY "Admins can insert equipment" ON equipment
FOR INSERT WITH CHECK (is_admin_user());

CREATE POLICY "Admins can update equipment" ON equipment
FOR UPDATE USING (is_admin_user());

CREATE POLICY "Admins can delete equipment" ON equipment
FOR DELETE USING (is_admin_user());

-- IMPORTANT:
-- Do NOT create admin_roles policies that call is_admin_user().
-- is_admin_user() queries admin_roles, and using it in an admin_roles policy
-- can cause recursive RLS evaluation and hanging queries.
DROP POLICY IF EXISTS "Admins can view admin roles" ON admin_roles;
DROP POLICY IF EXISTS "Admins can insert admin roles" ON admin_roles;
DROP POLICY IF EXISTS "Admins can delete admin roles" ON admin_roles;

DROP POLICY IF EXISTS "Users can read their own admin status" ON admin_roles;
CREATE POLICY "Users can read their own admin status" ON admin_roles
FOR SELECT USING ((select auth.uid()) = user_id);

-- Step 2: Skip leaked password protection (will enable later via dashboard)
-- This setting requires dashboard configuration: Project Settings > Authentication > Security

-- Step 3: Fix Auth RLS Initialization Plan for categories table
-- Optimize RLS policies and ensure proper initialization

-- Drop existing policies on categories
DROP POLICY IF EXISTS "Public read access" ON categories;
DROP POLICY IF EXISTS "Categories public read access" ON categories;
DROP POLICY IF EXISTS "Admin delete access" ON categories;
DROP POLICY IF EXISTS "Admin insert access" ON categories;
DROP POLICY IF EXISTS "Admin update access" ON categories;

-- Create optimized RLS policies for categories
CREATE POLICY "Categories public read access" ON categories
FOR SELECT USING (true);

-- If we need admin access, create policies with optimized function calls
CREATE POLICY "Admins can insert categories" ON categories
FOR INSERT WITH CHECK ((SELECT is_admin_user()));

CREATE POLICY "Admins can update categories" ON categories
FOR UPDATE USING ((SELECT is_admin_user()));

CREATE POLICY "Admins can delete categories" ON categories
FOR DELETE USING ((SELECT is_admin_user()));

-- Ensure categories table has proper indexes for RLS performance
CREATE INDEX IF NOT EXISTS idx_categories_id ON categories(id);
CREATE INDEX IF NOT EXISTS idx_categories_name ON categories(name);

-- Step 4: Add additional security configurations
-- Ensure all admin functions have proper permissions and are secure

-- Grant necessary permissions to service role for admin functions
GRANT EXECUTE ON FUNCTION is_admin_user() TO service_role;
GRANT EXECUTE ON FUNCTION grant_admin_role(UUID, UUID) TO service_role;
GRANT EXECUTE ON FUNCTION revoke_admin_role(UUID, UUID) TO service_role;

-- Step 5: Verify and optimize equipment search functions
-- Fix search function search paths as well

DROP FUNCTION IF EXISTS search_equipment_advanced(TEXT, INTEGER, INTEGER);

CREATE OR REPLACE FUNCTION search_equipment_advanced(
  search_query TEXT,
  search_category_id INTEGER DEFAULT NULL,
  limit_count INTEGER DEFAULT 50
)
RETURNS TABLE (
  id INTEGER,
  name TEXT,
  category_id INTEGER,
  image_url TEXT,
  description TEXT,
  specifications JSONB,
  status TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  categories JSONB
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    e.id,
    e.name,
    e.category_id,
    e.image_url,
    e.description,
    e.specifications,
    e.status,
    e.created_at,
    e.updated_at,
    jsonb_build_object(
      'name', c.name,
      'icon_name', c.icon_name
    ) as categories
  FROM equipment e
  LEFT JOIN categories c ON e.category_id = c.id
  WHERE 
    e.status = 'available'
    AND (
      -- Search in name
      e.name ILIKE '%' || search_query || '%'
      OR 
      -- Search in description
      COALESCE(e.description, '') ILIKE '%' || search_query || '%'
      OR
      -- Search in specifications (both keys and values)
      (
        e.specifications IS NOT NULL 
        AND (
          -- Search in specification keys
          EXISTS (
            SELECT 1 FROM jsonb_object_keys(e.specifications) key
            WHERE key ILIKE '%' || search_query || '%'
          )
          OR
          -- Search in specification values (cast to text)
          EXISTS (
            SELECT 1 FROM jsonb_each_text(e.specifications) kv
            WHERE kv.value ILIKE '%' || search_query || '%'
          )
        )
      )
    )
    AND (search_category_id IS NULL OR e.category_id = search_category_id)
  ORDER BY e.name
  LIMIT limit_count;
END;
$$;

DROP FUNCTION IF EXISTS search_equipment_basic(TEXT);

CREATE OR REPLACE FUNCTION search_equipment_basic(search_query TEXT)
RETURNS TABLE (
  id INTEGER,
  name TEXT,
  category_id INTEGER,
  image_url TEXT,
  description TEXT,
  specifications JSONB,
  status TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  categories JSONB
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  RETURN QUERY
  SELECT * FROM search_equipment_advanced(search_query, NULL, NULL);
END;
$$;

-- Step 6: Add comprehensive security audit logging
-- Create audit log for admin actions (if not exists)
CREATE TABLE IF NOT EXISTS admin_audit_log (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  target_user_id UUID REFERENCES auth.users(id),
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on audit log
ALTER TABLE admin_audit_log ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs (optimized)
CREATE POLICY "Admins can view audit log" ON admin_audit_log
FOR SELECT USING ((SELECT is_admin_user()));

-- Only system can insert audit logs (restricted to authenticated users, optimized)
CREATE POLICY "System can insert audit log" ON admin_audit_log
FOR INSERT WITH CHECK ((select auth.role()) = 'authenticated');

-- Grant permissions
GRANT SELECT ON admin_audit_log TO service_role;
GRANT INSERT ON admin_audit_log TO service_role;
