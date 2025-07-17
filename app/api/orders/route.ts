import { NextRequest, NextResponse } from "next/server";
import { createOrderWithUser } from "@/lib/supabase/orders";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const order = await createOrderWithUser(data);
    return NextResponse.json(order, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create order" }, { status: 500 });
  }
}
