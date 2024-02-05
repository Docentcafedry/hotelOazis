import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://chmxwomcygqppcafonqr.supabase.co";
const supabaseKey = import.meta.env.VITE_SECRET_SUPABASE;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
