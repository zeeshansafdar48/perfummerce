import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: NextRequest) {
  const { id, full_name, phone, is_admin } = await req.json();
  const { error } = await supabase.from("user_profiles").insert({
    id,
    full_name,
    phone,
    is_admin
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
