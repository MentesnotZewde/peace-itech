import { connectDB } from "@/lib/db";
import Project from "@/lib/models/Project";

// A project row also holds the client contact, agreed price, and requirements
// PDF. Only these fields are ever read for public pages.
const PUBLIC_FIELDS = "title description category image liveUrl createdAt";

/**
 * Delivered work for a service category, as shown on the public site:
 * completed *and* approved in the portfolio page, newest first.
 * `category` may be an array when a service has been renamed and older rows
 * still hold the previous title.
 * Returns [] on any failure — a database hiccup must not break a landing page.
 */
export async function getPortfolioProjects(category, limit = 6) {
  const categories = (Array.isArray(category) ? category : [category]).filter(
    Boolean,
  );

  try {
    await connectDB();

    const projects = await Project.find(
      {
        projectstatus: "Completed",
        portfolioApproved: true,
        ...(categories.length ? { category: { $in: categories } } : {}),
      },
      PUBLIC_FIELDS,
    )
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    return projects.map((project) => ({
      id: String(project._id),
      title: project.title || "",
      description: project.description || "",
      category: project.category || "",
      image: project.image?.url || "",
      liveUrl: project.liveUrl || "",
    }));
  } catch (error) {
    console.error("portfolio: could not load projects", error);
    return [];
  }
}
