import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "admin_session";
const MAX_AGE_SECONDS = 60 * 60 * 24; // 24 hours — mirrors session.ts

/**
 * Edge-compatible token verification using the Web Crypto API.
 * H-5: Uses crypto.subtle.verify (constant-time) instead of string equality.
 */
async function verifyTokenEdge(token: string): Promise<boolean> {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || !token) return false;

  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [nonce, sig] = parts;

  try {
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      enc.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"] // "verify" key — matches session.ts
    );

    // Decode hex signature back to bytes
    const sigBytes = new Uint8Array(
      sig.match(/.{2}/g)!.map((b) => parseInt(b, 16))
    );

    // H-5: crypto.subtle.verify is constant-time — no timing attack surface
    return await crypto.subtle.verify("HMAC", keyMaterial, sigBytes, enc.encode(nonce));
  } catch {
    // Never leak error details
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Forward the current pathname as a header so Server Components / layouts
  // can read it without needing `usePathname` (client-only).
  // Used by app/admin/layout.tsx to skip the auth guard on the login page.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);

  // ── Auth guard: protect all /admin routes except /admin/login ─────────────
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    const valid = await verifyTokenEdge(token ?? "");

    if (!valid) {
      const loginUrl = new URL("/admin/login", request.url);
      // M-5: only store safe relative paths (no open-redirect via external URLs)
      if (pathname.startsWith("/admin") && !pathname.includes("://")) {
        loginUrl.searchParams.set("from", pathname);
      }
      return NextResponse.redirect(loginUrl);
    }

    // I-3: Sliding session — refresh the cookie on every authenticated request
    // so active sessions never expire mid-session.
    const response = NextResponse.next({
      request: { headers: requestHeaders },
    });
    response.cookies.set(COOKIE_NAME, token!, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/admin",
      maxAge: MAX_AGE_SECONDS,
    });
    return response;
  }

  // Pass through all other requests, with the pathname header attached
  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ["/admin/:path*"],
};
