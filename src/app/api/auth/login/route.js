import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import {
  SESSION_COOKIE,
  sessionCookieOptions,
  signToken,
  jsonError,
} from "@/lib/auth";
import { checkRateLimit } from "@/lib/ai/rate-limit";
import { loginSchema, parseBody, formatZodError } from "@/lib/validation/user";

export const runtime = "nodejs";

const SESSION_MAX_AGE = 60 * 60 * 24; // 1 day, matching the token lifetime.

// Deliberately tight: password guessing is the main threat to this endpoint.
const IP_LIMIT = { limit: 10, windowMs: 60_000 };
const ACCOUNT_LIMIT = { limit: 5, windowMs: 60_000 };

function getClientIp(request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}

function tooManyAttempts(retryAfter) {
  return NextResponse.json(
    { error: "Too many attempts. Try again shortly." },
    { status: 429, headers: { "Retry-After": String(retryAfter || 60) } },
  );
}

// POST /api/auth/login  { email, password } -> { token, user }
export async function POST(request) {
  try {
    const ip = getClientIp(request);
    const byIp = checkRateLimit(`login:ip:${ip}`, IP_LIMIT);
    if (!byIp.allowed) return tooManyAttempts(byIp.retryAfter);

    const { data } = await parseBody(request);
    const parsed = loginSchema.safeParse(data);
    if (!parsed.success) {
      return jsonError("Validation failed", 422, {
        fields: formatZodError(parsed.error),
      });
    }

    // Also limit per account, so a botnet can't spread guesses across IPs.
    const byAccount = checkRateLimit(
      `login:user:${parsed.data.email}`,
      ACCOUNT_LIMIT,
    );
    if (!byAccount.allowed) return tooManyAttempts(byAccount.retryAfter);

    await connectDB();

    const user = await User.findOne({ email: parsed.data.email }).select(
      "+password",
    );

    // Same message for unknown email and wrong password so the response can't
    // be used to discover which accounts exist.
    if (!user || !(await user.comparePassword(parsed.data.password))) {
      return jsonError("Invalid email or password", 401);
    }

    if (user.status === "Inactive") {
      return jsonError("This account is inactive", 403);
    }

    const token = signToken(user);
    const response = NextResponse.json({ token, user: user.toJSON() });

    // The API authenticates from the Authorization header; this cookie exists
    // only so middleware can gate the dashboard pages themselves.
    response.cookies.set(
      SESSION_COOKIE,
      token,
      sessionCookieOptions(SESSION_MAX_AGE),
    );

    return response;
  } catch (error) {
    console.error("POST /api/auth/login", error);
    return jsonError("Something went wrong", 500);
  }
}
