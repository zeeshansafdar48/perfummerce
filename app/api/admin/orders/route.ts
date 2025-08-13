import { NextResponse } from "next/server";
import { getAllOrders } from "@/lib/supabase/orders";

export async function GET() {
  try {
    const orders = await getAllOrders();
    return NextResponse.json(orders, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch orders" }, { status: 500 });
  }
}
