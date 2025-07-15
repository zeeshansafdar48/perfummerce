import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const supabase = createRouteHandlerClient({ cookies });
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.session) {
    return NextResponse.json({ error: error?.message || "Invalid credentials" }, { status: 401 });
  }

  // Return session and user for client hydration
  return NextResponse.json({ success: true, session: data.session, user: data.user });
}
