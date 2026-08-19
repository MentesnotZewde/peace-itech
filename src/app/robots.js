import { absoluteUrl, siteUrl } from "@/lib/seo";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Admin surface, the login screen, and the JSON API carry nothing worth
        // indexing — and /api responses would otherwise show up as bare JSON.
        disallow: ["/dashboard/", "/login", "/api/"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteUrl,
  };
}
