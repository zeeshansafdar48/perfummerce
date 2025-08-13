import { adminSupabase } from "../supabaseAdminClient";

export async function getAllUsers() {
  const { data, error } = await adminSupabase.from("user_profiles").select("*");
  if (error) throw error;
  return data ?? [];
}
