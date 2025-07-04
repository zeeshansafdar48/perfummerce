import { supabase } from "../supabaseClient";

export async function fetchCategories() {
  const { data, error } = await supabase.from("categories").select("*");
  if (error) throw error;
  return data;
}
