import { supabase } from "../supabaseClient";

export async function fetchBrands() {
  const { data, error } = await supabase.from("brands").select("*");
  if (error) throw error;
  return data;
}
