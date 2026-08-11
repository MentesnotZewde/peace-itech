import { NextResponse } from "next/server";
import { jsonError, requireAuth } from "@/lib/auth";

export const runtime = "nodejs";

// GET /api/auth/me -> the user behind the bearer token
export async function GET(request) {
  try {
    const { user, response } = await requireAuth(request);
    if (response) return response;

    return NextResponse.json({ user: user.toJSON() });
  } catch (error) {
    console.error("GET /api/auth/me", error);
    return jsonError("Something went wrong", 500);
  }
}
