-- Apply this SQL in Supabase SQL Editor to fix admin equipment access
-- Go to: https://supabase.com/dashboard/project/YOUR_PROJECT_ID/sql

-- Add admin read policy for equipment to see all statuses
-- This allows admins to view all equipment regardless of status

-- Create policy for admins to read all equipment
CREATE POLICY "Admins can read all equipment" ON equipment
FOR SELECT USING (is_admin_user());

-- This policy will be applied in addition to the existing public policy
-- Admins will be able to see all equipment (available, unavailable, maintenance)
-- Public users will still only see available equipment

-- Verify the policy was created
SELECT * FROM pg_policies WHERE tablename = 'equipment';
