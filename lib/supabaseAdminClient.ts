import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string; // Use the service role key!
export const adminSupabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false }
});
