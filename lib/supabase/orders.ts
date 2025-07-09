import { supabase } from "../supabaseClient";

export async function createOrder(order: any) {
  // Generate a unique order number (could be improved)
  const orderNumber = Math.floor(100000 + Math.random() * 900000).toString();
  const { data, error } = await supabase
    .from("orders")
    .insert([
      {
        ...order,
        orderNumber,
        status: "pending",
        created_at: new Date().toISOString()
      }
    ])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function getOrderByNumber(orderNumber: string) {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("orderNumber", orderNumber)
    .single();
  if (error) return null;
  return data;
}
