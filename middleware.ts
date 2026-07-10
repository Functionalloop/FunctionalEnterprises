import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // In this app, /admin is both the login page and the dashboard.
  // We can let page.tsx handle the conditional rendering securely,
  // but if any subpaths are added (e.g. /admin/settings), they should be protected.
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
