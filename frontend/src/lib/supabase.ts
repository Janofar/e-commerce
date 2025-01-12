import { createClient } from '@supabase/supabase-js';

const supabaseUrl ='https://your-supabase-url.supabase.co';

//  import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = 'your-anon-key';
// import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);