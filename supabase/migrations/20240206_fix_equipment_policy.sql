-- Fix existing equipment public read policy
-- The policy exists but may have incorrect conditions

-- Drop and recreate the equipment public read policy with correct condition
DROP POLICY IF EXISTS "Public read access" ON equipment;

CREATE POLICY "Public read access" ON equipment
FOR SELECT USING (status = 'available');

-- Also check and fix categories policy if needed
DROP POLICY IF EXISTS "Public read access" ON categories;

CREATE POLICY "Public read access" ON categories
FOR SELECT USING (true);
