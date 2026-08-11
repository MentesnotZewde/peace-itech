import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export const ROLES = ["Admin", "User"];
export const STATUSES = ["Active", "On Leave", "Inactive"];
export const DEPARTMENTS = [
  "Engineering",
  "Infrastructure",
  "Operations",
  "Sales",
  "Support",
];

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    // Never returned by default — queries must opt in with .select("+password").
    password: { type: String, required: true, select: false, minlength: 8 },
    role: { type: String, enum: ROLES, default: "User" },
    department: { type: String, enum: DEPARTMENTS },
    profession: { type: String, trim: true },
    status: { type: String, enum: STATUSES, default: "Active" },
    profilePicture: {
      url: { type: String },
      // Kept so the old image can be removed from Cloudinary on replace/delete.
      publicId: { type: String },
    },
  },
  { timestamps: true },
);

// Async hooks signal completion by resolving — Mongoose passes no `next` here.
userSchema.pre("save", async function hashPassword() {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.password);
};

userSchema.set("toJSON", {
  transform(_doc, ret) {
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});

// Mongoose caches compiled models on its singleton, which survives Next's hot
// reload — without this, edits to the schema or its hooks keep using the stale
// model until the dev server is fully restarted.
if (process.env.NODE_ENV !== "production") {
  delete mongoose.models.User;
}

export const User =
  mongoose.models.User || mongoose.model("User", userSchema);

export default User;
