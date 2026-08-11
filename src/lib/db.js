import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

// Next.js hot-reloads route modules in dev, so the connection is cached on
// globalThis to avoid opening a new pool on every reload.
let cached = globalThis._mongoose;

if (!cached) {
  cached = globalThis._mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not set in the environment");
  }

  // Atlas hands you a URI with a <db_password> placeholder; left in, it fails
  // with an opaque "Invalid connection string".
  if (/[<>]/.test(MONGODB_URI)) {
    throw new Error(
      "MONGODB_URI still contains a placeholder (e.g. <db_password>) — replace it with the real value in .env",
    );
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, { bufferCommands: false })
      .then((m) => m);
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}
