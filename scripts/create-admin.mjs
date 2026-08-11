// Creates (or promotes) the first Admin, since POST /api/users itself
// requires an Admin token.
//
//   npm run create-admin -- --email=you@peaceitech.com --password=secret123 --name="Your Name"
//
// Re-running with an existing email resets that user's password and role.
import mongoose from "mongoose";
import User from "../src/lib/models/User.js";

function arg(name) {
  const match = process.argv.find((a) => a.startsWith(`--${name}=`));
  return match ? match.slice(name.length + 3) : undefined;
}

const email = arg("email");
const password = arg("password");
const fullName = arg("name") || "Administrator";

if (!email || !password) {
  console.error(
    'Usage: npm run create-admin -- --email=<email> --password=<password> [--name="Full Name"]',
  );
  process.exit(1);
}

if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI is not set (check your .env file)");
  process.exit(1);
}

await mongoose.connect(process.env.MONGODB_URI);

const existing = await User.findOne({ email: email.toLowerCase() }).select(
  "+password",
);

if (existing) {
  existing.password = password;
  existing.role = "Admin";
  existing.status = "Active";
  await existing.save();
  console.log(`Updated ${existing.email} — role Admin, password reset.`);
} else {
  const user = await User.create({
    fullName,
    email: email.toLowerCase(),
    password,
    role: "Admin",
    status: "Active",
  });
  console.log(`Created Admin ${user.email} (${user._id}).`);
}

await mongoose.disconnect();
