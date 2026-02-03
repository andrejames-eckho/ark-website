import { supabase } from '../lib/supabase';
import { EquipmentWithCategory, Category } from '../types/equipment';
import { getEquipmentImageUrl } from '../utils/imageHelper';

export const fetchEquipment = async (): Promise<EquipmentWithCategory[]> => {
  try {
    const { data, error } = await supabase
      .from('equipment')
      .select(`
        *,
        categories(name, icon_name)
      `)
      .eq('status', 'available');

    if (error) {
      console.error('Error fetching equipment:', error);
      return [];
    }

    return data.map(item => ({
      ...item,
      image_url: item.image_url ? getEquipmentImageUrl(item.image_url) : undefined
    }));
  } catch (error) {
    console.error('Unexpected error fetching equipment:', error);
    return [];
  }
};

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching categories:', error);
      return [];
    }

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

    return data.map(item => ({
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

    return data.map(item => ({
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

    return data.map(item => item.name);
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

    return data.map(item => ({
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
      .limit(50); // Limit results for performance

    if (error) {
      console.error('Error searching equipment for quote:', error);
      return [];
    }

    return data.map(item => ({
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

    return data.map(item => ({
      ...item,
      image_url: item.image_url ? getEquipmentImageUrl(item.image_url) : undefined
    }));
  } catch (error) {
    console.error('Unexpected error fetching popular equipment for quote:', error);
    return [];
  }
};
