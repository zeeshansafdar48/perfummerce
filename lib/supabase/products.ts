import { supabase } from "../supabaseClient";

export async function fetchProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*, images:product_images(*), brand:brands(*)");
  if (error) throw error;
  return data;
}
