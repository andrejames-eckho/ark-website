-- Fix admin_roles foreign key constraint to reference auth.users instead of users
-- The foreign key was incorrectly pointing to a non-existent users table

-- Drop the existing foreign key constraint
ALTER TABLE admin_roles DROP CONSTRAINT IF EXISTS admin_roles_user_id_fkey;

-- Add correct foreign key constraint pointing to auth.users
ALTER TABLE admin_roles 
ADD CONSTRAINT admin_roles_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
