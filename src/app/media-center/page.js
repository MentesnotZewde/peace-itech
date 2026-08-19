import MediaCenterContent from "@/components/media/MediaCenterContent";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import PageShell from "@/components/layout/PageShell";
import JsonLd from "@/components/seo/JsonLd";
import { getMediaStats, getPublishedMedia } from "@/lib/media-public";
import { absoluteUrl, breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Media Center",
  description:
    "News, events, company updates, AI insights, cybersecurity articles, and technology blogs from Peace iTech Inc.",
  path: "/media-center",
});

// Read at request time so a newly published item shows up immediately, and so
// the build never depends on the database being reachable.
export const dynamic = "force-dynamic";

export default async function MediaCenterPage() {
  const [items, stats] = await Promise.all([
    getPublishedMedia(),
    getMediaStats(),
  ]);

  // An ItemList of the articles actually rendered below, so the hub page can
  // surface its own results rather than relying on each article being crawled.
  const schema = [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Media Center", path: "/media-center" },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Peace iTech Media Center",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.title,
        url: absoluteUrl(`/media-center/${item.id}`),
      })),
    },
  ];

  return (
    <PageShell>
      <JsonLd data={schema} />
      <Navbar />
      <MediaCenterContent items={items} stats={stats} />
      <Footer />
    </PageShell>
  );
}
