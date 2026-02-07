import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please check your .env file.');
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

declare global {
  // eslint-disable-next-line no-var
  var __ark_supabase__: ReturnType<typeof createClient> | undefined;
}

// Create Supabase client with new publishable key format
export const supabase =
  globalThis.__ark_supabase__ ??
  createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  });

globalThis.__ark_supabase__ = supabase;
