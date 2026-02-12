export type Database = {
  public: {
    Tables: {
      equipment: {
        Row: {
          id: number;
          name: string;
          category_id: number;
          image_url?: string;
          description?: string;
          specifications?: Record<string, any>;
          status: 'available' | 'unavailable' | 'maintenance';
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['equipment']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['equipment']['Row']>;
      };
      categories: {
        Row: {
          id: number;
          name: string;
          icon_name: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['categories']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['categories']['Row']>;
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
};
