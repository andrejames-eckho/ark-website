-- Fix admin_roles RLS policies and function security
-- This cleans up all policy conflicts and secures the is_admin_user function

-- Drop all existing policies on admin_roles to start fresh
DROP POLICY IF EXISTS "Allow users to read their own admin status" ON admin_roles;
DROP POLICY IF EXISTS "Allow admins to manage admin roles" ON admin_roles;
DROP POLICY IF EXISTS "Admins can delete admin roles" ON admin_roles;
DROP POLICY IF EXISTS "Admins can insert admin roles" ON admin_roles;
DROP POLICY IF EXISTS "Admins can view admin roles" ON admin_roles;
DROP POLICY IF EXISTS "Users can read their own admin status" ON admin_roles;

-- Re-enable RLS for admin_roles if it was disabled
ALTER TABLE admin_roles ENABLE ROW LEVEL SECURITY;

-- Create a secure is_admin_user function with proper search_path
CREATE OR REPLACE FUNCTION is_admin_user()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  -- Check if current user is in admin_roles table
  RETURN EXISTS (
    SELECT 1 FROM public.admin_roles
    WHERE user_id = auth.uid()
  );
END;
$$;

-- Create proper policies for admin_roles
-- 1. Policy for users to read their own admin status (SELECT)
CREATE POLICY "Users can read their own admin status" ON admin_roles
FOR SELECT USING ((select auth.uid()) = user_id);

-- NOTE: Do not add an admin_roles policy that calls is_admin_user() here.
-- is_admin_user() queries admin_roles, and using it in an admin_roles policy
-- can cause recursive RLS evaluation and hanging queries.

-- Test the policies
SELECT is_admin_user() as is_admin;
SELECT * FROM admin_roles WHERE user_id = auth.uid();
