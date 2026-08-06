import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// createClient throws synchronously if the URL is missing, which would
// otherwise crash the whole site into a blank page with nothing but a
// console error — falling back to a placeholder lets pages render a clear
// in-app configuration message instead (see ConfigError component).
export const isSupabaseConfigured = !!SUPABASE_URL && !!SUPABASE_ANON_KEY;

export const supabase = createClient(
  SUPABASE_URL || 'https://placeholder.supabase.co',
  SUPABASE_ANON_KEY || 'placeholder-anon-key'
);
