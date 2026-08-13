import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";

// Read by middleware so a signed-out visitor can't even load a dashboard page.
// The API itself stays header-only (see getCurrentUser), which keeps every
// state-changing request immune to CSRF.
export const SESSION_COOKIE = "peace-itech-session";

const MIN_SECRET_LENGTH = 32;

function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not set in the environment");

  if (secret.length < MIN_SECRET_LENGTH) {
    const message = `JWT_SECRET is too short (${secret.length} chars). Generate one with: openssl rand -base64 32`;
    // A guessable secret lets anyone mint an Admin token, so refuse to run
    // with one in production rather than failing quietly.
    if (process.env.NODE_ENV === "production") throw new Error(message);
    console.warn(`[auth] ${message}`);
  }

  return secret;
}

export function signToken(user) {
  return jwt.sign(
    {
      sub: String(user._id),
      email: user.email,
      role: user.role,
      tv: user.tokenVersion ?? 0,
    },
    getSecret(),
    { expiresIn: JWT_EXPIRES_IN },
  );
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, getSecret());
  } catch {
    return null;
  }
}

/** Cookie options for the session cookie; `secure` only once served over TLS. */
export function sessionCookieOptions(maxAge) {
  return {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  };
}

function getBearerToken(request) {
  const header = request.headers.get("authorization") || "";
  const [scheme, token] = header.split(" ");
  if (scheme?.toLowerCase() !== "bearer" || !token) return null;
  return token.trim();
}

// Resolves the caller from the Authorization header. Re-reads the user so a
// deleted, deactivated, or password-changed account cannot keep using a
// still-unexpired token.
export async function getCurrentUser(request) {
  const token = getBearerToken(request);
  if (!token) return null;

  const payload = verifyToken(token);
  if (!payload?.sub) return null;

  await connectDB();
  const user = await User.findById(payload.sub);
  if (!user || user.status === "Inactive") return null;

  // Minted before the last password change.
  if ((payload.tv ?? 0) !== (user.tokenVersion ?? 0)) return null;

  return user;
}

export function jsonError(message, status, extra) {
  return NextResponse.json({ error: message, ...extra }, { status });
}

/**
 * Guards a route. Returns { user } on success or { response } to return as-is.
 * Pass roles to restrict further, e.g. requireAuth(request, ["Admin"]).
 */
export async function requireAuth(request, roles) {
  const user = await getCurrentUser(request);
  if (!user) return { response: jsonError("Unauthorized", 401) };
  if (roles && !roles.includes(user.role)) {
    return { response: jsonError("Forbidden", 403) };
  }
  return { user };
}
