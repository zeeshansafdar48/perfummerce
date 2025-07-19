import { supabase } from "../supabaseClient";

export async function fetchProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*, images:product_images(*), brand:brands(*), category:categories(*)");
  if (error) throw error;
  return data;
}

export async function fetchProductsReviews(productId: string) {
  const { data, error } = await supabase
    .from("product_reviews")
    .select("*")
    .eq("product_id", productId);
  if (error) throw error;
  return data;
}
