import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import { signToken, jsonError } from "@/lib/auth";
import { loginSchema, parseBody, formatZodError } from "@/lib/validation/user";

export const runtime = "nodejs";

// POST /api/auth/login  { email, password } -> { token, user }
export async function POST(request) {
  try {
    const { data } = await parseBody(request);
    const parsed = loginSchema.safeParse(data);
    if (!parsed.success) {
      return jsonError("Validation failed", 422, {
        fields: formatZodError(parsed.error),
      });
    }

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

    return NextResponse.json({ token: signToken(user), user: user.toJSON() });
  } catch (error) {
    console.error("POST /api/auth/login", error);
    return jsonError("Something went wrong", 500);
  }
}
