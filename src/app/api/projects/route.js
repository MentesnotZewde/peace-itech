import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Project from "@/lib/models/Project";
import { jsonError, requireAuth } from "@/lib/auth";
import { uploadAttachments } from "@/lib/project-assets";
import {
  createProjectSchema,
  parseProjectBody,
} from "@/lib/validation/project";
import { formatZodError } from "@/lib/validation/user";

export const runtime = "nodejs";

// GET /api/projects?search=&status=&category=&progress=
export async function GET(request) {
  try {
    const { response } = await requireAuth(request);
    if (response) return response;

    await connectDB();

    const { searchParams } = new URL(request.url);
    const filter = {};

    const status = searchParams.get("status");
    if (status) filter.projectstatus = status;
    const category = searchParams.get("category");
    if (category) filter.category = category;
    const progress = searchParams.get("progress");
    if (progress) filter.progress = progress;

    const search = searchParams.get("search")?.trim();
    if (search) {
      const pattern = new RegExp(
        search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        "i",
      );
      filter.$or = [
        { name: pattern },
        { company: pattern },
        { title: pattern },
        { email: pattern },
      ];
    }

    const projects = await Project.find(filter).sort({ createdAt: -1 });

    return NextResponse.json({ projects, total: projects.length });
  } catch (error) {
    console.error("GET /api/projects", error);
    return jsonError("Something went wrong", 500);
  }
}

// POST /api/projects — any signed-in user; JSON or multipart with an `image`
// and/or `projectRequirements` file.
export async function POST(request) {
  try {
    const { response } = await requireAuth(request);
    if (response) return response;

    const { data, files } = await parseProjectBody(request);
    const parsed = createProjectSchema.safeParse(data);
    if (!parsed.success) {
      return jsonError("Validation failed", 422, {
        fields: formatZodError(parsed.error),
      });
    }

    let assets;
    try {
      assets = await uploadAttachments(files);
    } catch (uploadError) {
      return jsonError(uploadError.message || "File upload failed", 400);
    }

    await connectDB();
    const project = await Project.create({ ...parsed.data, ...assets });

    return NextResponse.json({ project: project.toJSON() }, { status: 201 });
  } catch (error) {
    if (error.name === "ValidationError") {
      return jsonError(error.message, 422);
    }
    console.error("POST /api/projects", error);
    return jsonError(error.message || "Something went wrong", 500);
  }
}
