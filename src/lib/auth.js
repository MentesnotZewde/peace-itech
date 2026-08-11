import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not set in the environment");
  return secret;
}

export function signToken(user) {
  return jwt.sign(
    { sub: String(user._id), email: user.email, role: user.role },
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

function getBearerToken(request) {
  const header = request.headers.get("authorization") || "";
  const [scheme, token] = header.split(" ");
  if (scheme?.toLowerCase() !== "bearer" || !token) return null;
  return token.trim();
}

// Resolves the caller from the Authorization header. Re-reads the user so a
// deleted or deactivated account cannot keep using a still-valid token.
export async function getCurrentUser(request) {
  const token = getBearerToken(request);
  if (!token) return null;

  const payload = verifyToken(token);
  if (!payload?.sub) return null;

  await connectDB();
  const user = await User.findById(payload.sub);
  if (!user || user.status === "Inactive") return null;

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
