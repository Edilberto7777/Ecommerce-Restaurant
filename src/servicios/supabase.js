import { createClient } from '@supabase/supabase-js';

console.log("URL FRONT:", import.meta.env.VITE_SUPABASE_URL);
console.log("KEY FRONT:", import.meta.env.VITE_SUPABASE_KEY);


export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

