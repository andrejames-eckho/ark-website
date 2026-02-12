-- Grant admin access to work.andrejames@gmail.com
-- This migration adds the necessary admin role for the primary administrator

-- First, get the user ID for work.andrejames@gmail.com
-- Then insert into admin_roles table

DO $$
DECLARE
    target_user_id UUID;
BEGIN
    -- Find the user ID for the email work.andrejames@gmail.com
    SELECT id INTO target_user_id 
    FROM auth.users 
    WHERE email = 'work.andrejames@gmail.com';
    
    -- If user exists, grant admin role
    IF target_user_id IS NOT NULL THEN
        INSERT INTO admin_roles (user_id, created_by)
        VALUES (target_user_id, target_user_id)
        ON CONFLICT (user_id) DO NOTHING;
        
        RAISE NOTICE 'Admin role granted to work.andrejames@gmail.com';
    ELSE
        RAISE EXCEPTION 'User work.andrejames@gmail.com not found in auth.users';
    END IF;
END $$;

-- Verify the admin role was granted
SELECT 
    u.email,
    u.created_at as user_created_at,
    ar.created_at as admin_since
FROM auth.users u
JOIN admin_roles ar ON u.id = ar.user_id
WHERE u.email = 'work.andrejames@gmail.com';
