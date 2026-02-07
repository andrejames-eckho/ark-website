-- One-time setup to add the first admin user
-- This should be run in the Supabase SQL Editor with service role privileges

-- First, let's find the user ID for work.andrejames@gmail.com
DO $$
DECLARE
  target_user_id UUID;
BEGIN
  -- Find the user by email
  SELECT id INTO target_user_id 
  FROM auth.users 
  WHERE email = 'work.andrejames@gmail.com';
  
  IF target_user_id IS NULL THEN
    RAISE EXCEPTION 'User work.andrejames@gmail.com not found. Please sign up first.';
  END IF;
  
  -- Insert the user as an admin
  INSERT INTO admin_roles (user_id, role, created_by)
  VALUES (target_user_id, 'admin', target_user_id)
  ON CONFLICT (user_id) DO UPDATE SET role = 'admin';
  
  RAISE NOTICE '✅ Successfully added work.andrejames@gmail.com as admin';
END $$;

-- Verify the admin was added
SELECT 
  u.email,
  u.created_at as user_created_at,
  ar.created_at as admin_since
FROM auth.users u
JOIN admin_roles ar ON u.id = ar.user_id
WHERE u.email = 'work.andrejames@gmail.com';
