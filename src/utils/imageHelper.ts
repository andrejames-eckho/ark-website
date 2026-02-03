import { supabase } from '../lib/supabase';

export const getEquipmentImageUrl = (imagePath: string): string => {
  if (!imagePath) return '';
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // Otherwise, construct the Supabase Storage URL
  const { data } = supabase.storage
    .from('equipment-images')
    .getPublicUrl(imagePath);
  
  return data.publicUrl;
};

export const getPlaceholderImage = (category: string): string => {
  const categoryImages: Record<string, string> = {
    'Audio': 'https://placehold.co/400x300/121212/dc2626?text=Audio+Equipment',
    'Lighting': 'https://placehold.co/400x300/121212/dc2626?text=Lighting+Equipment',
    'Video': 'https://placehold.co/400x300/121212/dc2626?text=Video+Equipment',
    'Rigging': 'https://placehold.co/400x300/121212/dc2626?text=Rigging+Equipment',
    'Monitors': 'https://placehold.co/400x300/121212/dc2626?text=Monitor+Equipment',
    'Projection': 'https://placehold.co/400x300/121212/dc2626?text=Projection+Equipment',
  };
  
  return categoryImages[category] || 'https://placehold.co/400x300/121212/dc2626?text=Equipment';
};
