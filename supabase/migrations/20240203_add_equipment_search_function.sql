-- Create advanced equipment search function that searches in name, description, and specifications
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

-- Create a simpler version for basic search without category filter
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
AS $$
BEGIN
  RETURN QUERY
  SELECT * FROM search_equipment_advanced(search_query, NULL, NULL);
END;
$$;
