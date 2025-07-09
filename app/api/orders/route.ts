import { NextRequest, NextResponse } from "next/server";
import { createOrder } from "@/lib/supabase/orders";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const order = await createOrder(data);
    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
