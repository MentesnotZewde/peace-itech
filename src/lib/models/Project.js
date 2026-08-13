import mongoose from "mongoose";
// Relative rather than aliased so the model can also be imported by the
// plain-node scripts in scripts/, which don't resolve jsconfig paths.
import { ALL_STATUSES, progressForStatus } from "../project-progress.js";

export { ALL_STATUSES };
export const PROGRESS_STEPS = ["0", "25", "50", "75", "100"];

// Shape shared by the preview image and the requirements PDF.
const assetSchema = new mongoose.Schema(
  {
    url: String,
    publicId: String,
    name: String,
    resourceType: String,
  },
  { _id: false },
);

const projectSchema = new mongoose.Schema(
  {
    // Client contact
    name: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    company: { type: String, trim: true },
    contact: { type: String, trim: true },

    // Portfolio presentation
    category: { type: String, trim: true },
    title: { type: String, trim: true },
    description: { type: String, trim: true },
    image: assetSchema,
    liveUrl: { type: String, trim: true },
    // Completing a project queues it for the portfolio; it only reaches the
    // public site once an Admin approves it there.
    portfolioApproved: { type: Boolean, default: false },

    // Delivery tracking
    projectRequirements: assetSchema,
    projectstatus: {
      type: String,
      enum: ALL_STATUSES,
      default: "Not Started",
    },
    progress: { type: String, enum: PROGRESS_STEPS, default: "0" },
    agreedprice: { type: String, trim: true },
    deliverydate: { type: String, trim: true },
  },
  { timestamps: true },
);

// Progress always follows the status — the client never sets it directly.
projectSchema.pre("save", function syncProgress() {
  if (this.isNew || this.isModified("projectstatus")) {
    this.progress = progressForStatus(this.projectstatus);
  }
});

projectSchema.set("toJSON", {
  transform(_doc, ret) {
    delete ret.__v;
    return ret;
  },
});

// Mongoose caches compiled models on its singleton, which survives Next's hot
// reload — without this, schema edits keep using the stale model.
if (process.env.NODE_ENV !== "production") {
  delete mongoose.models.Project;
}

export const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;
