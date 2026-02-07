import { supabase } from '../lib/supabase';
import { EquipmentWithCategory, Category, Equipment } from '../types/equipment';
import { getEquipmentImageUrl } from '../utils/imageHelper';

export const fetchEquipment = async (): Promise<EquipmentWithCategory[]> => {
  try {
    console.log('Fetching equipment...');
    
    // Test basic connection first
    console.log('Testing Supabase connection...');
    const { data: testData, error: testError } = await supabase
      .from('equipment')
      .select('count')
      .limit(1);
    
    console.log('Connection test result:', { testData, testError });
    
    if (testError) {
      console.error('Supabase connection test failed:', testError);
      return [];
    }
    
    // Add timeout test
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Request timeout after 10 seconds')), 10000);
    });
    
    const fetchPromise = supabase
      .from('equipment')
      .select(`
        *,
        categories(name, icon_name)
      `)
      .eq('status', 'available');
    
    const { data, error } = await Promise.race([fetchPromise, timeoutPromise]) as any;
    
    console.log('Equipment fetch response:', { data, error });

    if (error) {
      console.error('Error fetching equipment:', error);
      return [];
    }

    console.log('Equipment data fetched:', data?.length || 0, 'items');

    return data.map((item: EquipmentWithCategory) => ({
      ...item,
      image_url: item.image_url ? getEquipmentImageUrl(item.image_url) : undefined
    }));
  } catch (error) {
    console.error('Unexpected error fetching equipment:', error);
    return [];
  }
};

export const fetchAllEquipment = async (): Promise<EquipmentWithCategory[]> => {
  try {
    const { data, error } = await supabase
      .from('equipment')
      .select(`
        *,
        categories(name, icon_name)
      `);

    if (error) {
      console.error('Error fetching all equipment:', error);
      return [];
    }

    return data.map((item: EquipmentWithCategory) => ({
      ...item,
      image_url: item.image_url ? getEquipmentImageUrl(item.image_url) : undefined
    }));
  } catch (error) {
    console.error('Unexpected error fetching all equipment:', error);
    return [];
  }
};

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    console.log('Fetching categories...');
    
    // Test basic connection first
    console.log('Testing categories connection...');
    const { data: testData, error: testError } = await supabase
      .from('categories')
      .select('count')
      .limit(1);
    
    console.log('Categories connection test result:', { testData, testError });
    
    if (testError) {
      console.error('Categories connection test failed:', testError);
      return [];
    }
    
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    console.log('Categories fetch response:', { data, error });

    if (error) {
      console.error('Error fetching categories:', error);
      return [];
    }

    console.log('Categories data fetched:', data?.length || 0, 'items');

    return data || [];
  } catch (error) {
    console.error('Unexpected error fetching categories:', error);
    return [];
  }
};

export const fetchEquipmentByCategory = async (categoryId: number): Promise<EquipmentWithCategory[]> => {
  try {
    const { data, error } = await supabase
      .from('equipment')
      .select(`
        *,
        categories(name, icon_name)
      `)
      .eq('category_id', categoryId)
      .eq('status', 'available');

    if (error) {
      console.error('Error fetching equipment by category:', error);
      return [];
    }

    return data.map((item: EquipmentWithCategory) => ({
      ...item,
      image_url: item.image_url ? getEquipmentImageUrl(item.image_url) : undefined
    }));
  } catch (error) {
    console.error('Unexpected error fetching equipment by category:', error);
    return [];
  }
};

export const searchEquipment = async (query: string): Promise<EquipmentWithCategory[]> => {
  try {
    // First, search name and description in database (fast)
    const { data, error } = await supabase
      .from('equipment')
      .select(`
        *,
        categories(name, icon_name)
      `)
      .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
      .eq('status', 'available');

    if (error) {
      console.error('Error searching equipment:', error);
      return [];
    }

    // Then, search all available equipment for specifications matches
    const { data: allData, error: allError } = await supabase
      .from('equipment')
      .select(`
        *,
        categories(name, icon_name)
      `)
      .eq('status', 'available');

    if (allError) {
      console.error('Error fetching all equipment:', allError);
      return [];
    }

    // Client-side filtering for specifications
    const specMatches = (allData || []).filter((item: EquipmentWithCategory) => {
      if (!item.specifications) return false;

      const queryWords = query.toLowerCase().split(' ').filter(word => word.length > 0);
      if (queryWords.length === 0) return false;

      // Create a searchable text from all specification keys and values
      let specSearchText = '';
      for (const key in item.specifications) {
        if (item.specifications.hasOwnProperty(key)) {
          const value = item.specifications[key];
          specSearchText += ` ${key.toLowerCase()}`;
          if (typeof value === 'string') {
            specSearchText += ` ${value.toLowerCase()}`;
          } else if (typeof value === 'number') {
            specSearchText += ` ${value.toString()}`;
          }
        }
      }

      // Check if all query words are found in the specifications text
      return queryWords.every(word => specSearchText.includes(word));
    });

    // Combine results and remove duplicates
    const dbMatches = data || [];
    const combinedResults = [...dbMatches, ...specMatches];
    const uniqueResults = combinedResults.filter((item, index, self) => 
      index === self.findIndex((t) => t.id === item.id)
    );

    return uniqueResults.map((item: EquipmentWithCategory) => ({
      ...item,
      image_url: item.image_url ? getEquipmentImageUrl(item.image_url) : undefined
    }));
  } catch (error) {
    console.error('Unexpected error searching equipment:', error);
    return [];
  }
};

export const getEquipmentOptionsForQuote = async (): Promise<string[]> => {
  try {
    const { data, error } = await supabase
      .from('equipment')
      .select('name')
      .eq('status', 'available')
      .order('name');

    if (error) {
      console.error('Error fetching equipment options:', error);
      return [];
    }

    return data.map((item: { name: string }) => item.name);
  } catch (error) {
    console.error('Unexpected error fetching equipment options:', error);
    return [];
  }
};

export const getEquipmentCategoriesForQuote = async (): Promise<Category[]> => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching categories for quote:', error);
      return [];
    }

    // Get equipment count for each category
    const categoriesWithCount = await Promise.all(
      (data || []).map(async (category) => {
        const { count } = await supabase
          .from('equipment')
          .select('*', { count: 'exact', head: true })
          .eq('category_id', category.id)
          .eq('status', 'available');

        return {
          ...category,
          equipment_count: count || 0
        };
      })
    );

    return categoriesWithCount;
  } catch (error) {
    console.error('Unexpected error fetching categories for quote:', error);
    return [];
  }
};

export const getEquipmentByCategoryForQuote = async (categoryId: number): Promise<EquipmentWithCategory[]> => {
  try {
    const { data, error } = await supabase
      .from('equipment')
      .select(`
        *,
        categories(name, icon_name)
      `)
      .eq('category_id', categoryId)
      .eq('status', 'available')
      .order('name');

    if (error) {
      console.error('Error fetching equipment by category for quote:', error);
      return [];
    }

    return data.map((item: EquipmentWithCategory) => ({
      ...item,
      image_url: item.image_url ? getEquipmentImageUrl(item.image_url) : undefined
    }));
  } catch (error) {
    console.error('Unexpected error fetching equipment by category for quote:', error);
    return [];
  }
};

export const searchEquipmentForQuote = async (query: string, categoryId?: number): Promise<EquipmentWithCategory[]> => {
  try {
    // First, search name and description in database (fast)
    let supabaseQuery = supabase
      .from('equipment')
      .select(`
        *,
        categories(name, icon_name)
      `)
      .eq('status', 'available');

    if (categoryId) {
      supabaseQuery = supabaseQuery.eq('category_id', categoryId);
    }

    const { data, error } = await supabaseQuery
      .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
      .order('name')
      .limit(50);

    if (error) {
      console.error('Error searching equipment for quote:', error);
      return [];
    }

    // Then, search all available equipment for specifications matches
    let allEquipmentQuery = supabase
      .from('equipment')
      .select(`
        *,
        categories(name, icon_name)
      `)
      .eq('status', 'available');

    if (categoryId) {
      allEquipmentQuery = allEquipmentQuery.eq('category_id', categoryId);
    }

    const { data: allData, error: allError } = await allEquipmentQuery;

    if (allError) {
      console.error('Error fetching all equipment for quote:', allError);
      return [];
    }

    // Client-side filtering for specifications
    const specMatches = (allData || []).filter((item: EquipmentWithCategory) => {
      if (!item.specifications) return false;

      const queryWords = query.toLowerCase().split(' ').filter(word => word.length > 0);
      if (queryWords.length === 0) return false;

      // Create a searchable text from all specification keys and values
      let specSearchText = '';
      for (const key in item.specifications) {
        if (item.specifications.hasOwnProperty(key)) {
          const value = item.specifications[key];
          specSearchText += ` ${key.toLowerCase()}`;
          if (typeof value === 'string') {
            specSearchText += ` ${value.toLowerCase()}`;
          } else if (typeof value === 'number') {
            specSearchText += ` ${value.toString()}`;
          }
        }
      }

      // Check if all query words are found in the specifications text
      return queryWords.every(word => specSearchText.includes(word));
    });

    // Combine results and remove duplicates
    const dbMatches = data || [];
    const combinedResults = [...dbMatches, ...specMatches];
    const uniqueResults = combinedResults.filter((item, index, self) => 
      index === self.findIndex((t) => t.id === item.id)
    );

    return uniqueResults.map((item: EquipmentWithCategory) => ({
      ...item,
      image_url: item.image_url ? getEquipmentImageUrl(item.image_url) : undefined
    }));
  } catch (error) {
    console.error('Unexpected error searching equipment for quote:', error);
    return [];
  }
};

export const getPopularEquipmentForQuote = async (limit: number = 10): Promise<EquipmentWithCategory[]> => {
  try {
    const { data, error } = await supabase
      .from('equipment')
      .select(`
        *,
        categories(name, icon_name)
      `)
      .eq('status', 'available')
      .order('name')
      .limit(limit);

    if (error) {
      console.error('Error fetching popular equipment for quote:', error);
      return [];
    }

    return data.map((item: EquipmentWithCategory) => ({
      ...item,
      image_url: item.image_url ? getEquipmentImageUrl(item.image_url) : undefined
    }));
  } catch (error) {
    console.error('Unexpected error fetching popular equipment for quote:', error);
    return [];
  }
};

// Admin CRUD operations
export const addEquipment = async (equipment: Omit<Equipment, 'id' | 'created_at' | 'updated_at'>): Promise<Equipment | null> => {
  try {
    const { data, error } = await supabase
      .from('equipment')
      .insert([equipment])
      .select()
      .single();

    if (error) {
      console.error('Error adding equipment:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Unexpected error adding equipment:', error);
    throw error;
  }
};

export const updateEquipment = async (id: number, equipment: Partial<Equipment>): Promise<Equipment | null> => {
  try {
    const { data, error } = await supabase
      .from('equipment')
      .update(equipment)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating equipment:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Unexpected error updating equipment:', error);
    throw error;
  }
};

export const deleteEquipment = async (id: number): Promise<void> => {
  try {
    const { error } = await supabase
      .from('equipment')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting equipment:', error);
      throw error;
    }
  } catch (error) {
    console.error('Unexpected error deleting equipment:', error);
    throw error;
  }
};

export const uploadEquipmentImage = async (file: File): Promise<string> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `equipment/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('equipment-images')
      .upload(filePath, file);

    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      throw uploadError;
    }

    return filePath;
  } catch (error) {
    console.error('Unexpected error uploading image:', error);
    throw error;
  }
};

export const deleteEquipmentImage = async (imagePath: string): Promise<void> => {
  try {
    const { error } = await supabase.storage
      .from('equipment-images')
      .remove([imagePath]);

    if (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  } catch (error) {
    console.error('Unexpected error deleting image:', error);
    throw error;
  }
};

// Admin category management
export const addCategory = async (category: Omit<Category, 'id' | 'created_at'>): Promise<Category | null> => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .insert([category])
      .select()
      .single();

    if (error) {
      console.error('Error adding category:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Unexpected error adding category:', error);
    throw error;
  }
};

export const updateCategory = async (id: number, category: Partial<Category>): Promise<Category | null> => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .update(category)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating category:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Unexpected error updating category:', error);
    throw error;
  }
};

export const deleteCategory = async (id: number): Promise<void> => {
  try {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  } catch (error) {
    console.error('Unexpected error deleting category:', error);
    throw error;
  }
};
