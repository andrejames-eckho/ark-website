export interface Category {
  id: number;
  name: string;
  icon_name: string;
  created_at: string;
}

export interface Equipment {
  id: number;
  name: string;
  category_id: number;
  image_url?: string;
  description?: string;
  specifications?: Record<string, any>;
  status: 'available' | 'unavailable' | 'maintenance';
  created_at: string;
  updated_at: string;
  categories?: Category;
}

export interface EquipmentWithCategory extends Equipment {
  categories: Category;
}
