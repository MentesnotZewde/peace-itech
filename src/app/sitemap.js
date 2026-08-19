import { getPublishedMedia } from "@/lib/media-public";
import { absoluteUrl } from "@/lib/seo";
import { services } from "@/lib/services";

// Regenerated hourly. The DB is only read here, never at request time, so a
// crawler hitting /sitemap.xml can't stampede Mongo.
export const revalidate = 3600;

// Marketing pages that should always be listed. The dashboard, the login
// screen, and /api are deliberately absent — robots.js blocks them too.
const staticRoutes = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/about-us", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
  { path: "/book-appointment", changeFrequency: "monthly", priority: 0.7 },
  { path: "/media-center", changeFrequency: "daily", priority: 0.7 },
];

export default async function sitemap() {
  const now = new Date();

  const staticEntries = staticRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const serviceEntries = services.map((service) => ({
    url: absoluteUrl(`/services/${service.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  // Returns [] if the database is unreachable, so the sitemap still builds
  // with its static half rather than failing outright.
  const media = await getPublishedMedia(1000);
  const mediaEntries = media.map((item) => ({
    url: absoluteUrl(`/media-center/${item.id}`),
    lastModified: item.createdAt ? new Date(item.createdAt) : now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticEntries, ...serviceEntries, ...mediaEntries];
}
