import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

// Middleware runs on the edge runtime, where `jsonwebtoken` (Node crypto)
// isn't available — `jose` verifies the same HS256 token.
const SESSION_COOKIE = "peace-itech-session";

async function hasValidSession(request) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return false;

  const secret = process.env.JWT_SECRET;
  if (!secret) return false;

  try {
    // Verifies signature and expiry. Role and revocation are re-checked by the
    // API on every data request; this gate only decides whether the dashboard
    // shell may render at all.
    await jwtVerify(token, new TextEncoder().encode(secret));
    return true;
  } catch {
    return false;
  }
}

export async function middleware(request) {
  const { pathname, search } = request.nextUrl;

  if (await hasValidSession(request)) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  // Remember where they were headed so login can send them back.
  loginUrl.searchParams.set("next", `${pathname}${search}`);

  const response = NextResponse.redirect(loginUrl);
  // Clear a stale or tampered cookie on the way out.
  response.cookies.delete(SESSION_COOKIE);
  return response;
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
