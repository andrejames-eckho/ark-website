-- Fix missing public read policy for equipment table
-- This migration adds the missing public read policy that was accidentally removed

-- Create public read policy for equipment table
CREATE POLICY "Public read access" ON equipment
FOR SELECT USING (status = 'available');

-- Also ensure categories has proper public read access (redundant but safe)
CREATE POLICY "Public read access" ON categories
FOR SELECT USING (true);
