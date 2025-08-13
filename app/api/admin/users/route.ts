import { NextResponse } from "next/server";
import { getAllUsers } from "@/lib/supabase/users";

export async function GET() {
  try {
    const users = await getAllUsers();
    return NextResponse.json(users, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch users" }, { status: 500 });
  }
}
