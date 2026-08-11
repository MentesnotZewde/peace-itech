import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Project from "@/lib/models/Project";
import { jsonError, requireAuth } from "@/lib/auth";
import { deleteAsset } from "@/lib/cloudinary";
import { uploadAttachments } from "@/lib/project-assets";
import { updateProjectSchema, parseProjectBody } from "@/lib/validation/project";
import { formatZodError } from "@/lib/validation/user";

export const runtime = "nodejs";

function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

// GET /api/projects/:id
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const { response } = await requireAuth(request);
    if (response) return response;

    if (!isValidId(id)) return jsonError("Invalid project id", 400);

    await connectDB();
    const project = await Project.findById(id);
    if (!project) return jsonError("Project not found", 404);

    return NextResponse.json({ project: project.toJSON() });
  } catch (error) {
    console.error("GET /api/projects/[id]", error);
    return jsonError("Something went wrong", 500);
  }
}

// PATCH /api/projects/:id — any signed-in user. Replacing an attachment
// destroys the one it supersedes.
export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const { response } = await requireAuth(request);
    if (response) return response;

    if (!isValidId(id)) return jsonError("Invalid project id", 400);

    const { data, files } = await parseProjectBody(request);
    const parsed = updateProjectSchema.safeParse(data);
    if (!parsed.success) {
      return jsonError("Validation failed", 422, {
        fields: formatZodError(parsed.error),
      });
    }

    const updates = parsed.data;
    const hasFiles = Object.keys(files).length > 0;
    if (!hasFiles && Object.keys(updates).length === 0) {
      return jsonError("No fields to update", 422);
    }

    await connectDB();
    const project = await Project.findById(id);
    if (!project) return jsonError("Project not found", 404);

    let assets = {};
    if (hasFiles) {
      try {
        assets = await uploadAttachments(files);
      } catch (uploadError) {
        return jsonError(uploadError.message || "File upload failed", 400);
      }
    }

    // Remember what the new uploads replace, and only delete once the save
    // succeeded — a failed write must not strand the project without a file.
    const superseded = Object.keys(assets)
      .map((key) => project[key])
      .filter((asset) => asset?.publicId);

    Object.assign(project, updates, assets);
    await project.save();

    await Promise.all(
      superseded.map((asset) =>
        deleteAsset(asset.publicId, asset.resourceType || "image"),
      ),
    );

    return NextResponse.json({ project: project.toJSON() });
  } catch (error) {
    if (error.name === "ValidationError") {
      return jsonError(error.message, 422);
    }
    console.error("PATCH /api/projects/[id]", error);
    return jsonError(error.message || "Something went wrong", 500);
  }
}

// PUT is accepted as an alias for PATCH so either verb works from the client.
export const PUT = PATCH;

// DELETE /api/projects/:id — Admin only.
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const { response } = await requireAuth(request, ["Admin"]);
    if (response) return response;

    if (!isValidId(id)) return jsonError("Invalid project id", 400);

    await connectDB();
    const project = await Project.findById(id);
    if (!project) return jsonError("Project not found", 404);

    await project.deleteOne();

    // The project row is gone either way; its files follow on a best effort.
    await Promise.all(
      [project.image, project.projectRequirements]
        .filter((asset) => asset?.publicId)
        .map((asset) =>
          deleteAsset(asset.publicId, asset.resourceType || "image"),
        ),
    );

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error("DELETE /api/projects/[id]", error);
    return jsonError("Something went wrong", 500);
  }
}
