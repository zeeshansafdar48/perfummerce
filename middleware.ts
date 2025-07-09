import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (
    req.nextUrl.pathname.startsWith("/checkout") ||
    req.nextUrl.pathname.startsWith("/orders") ||
    req.nextUrl.pathname.startsWith("/admin")
  ) {
    if (!user) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
  return res;
}

export const config = {
  matcher: ["/checkout/:path*", "/orders/:path*", "/admin/:path*"]
};
