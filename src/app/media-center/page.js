import MediaCenterContent from "@/components/media/MediaCenterContent";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import PageShell from "@/components/layout/PageShell";
import { getMediaStats, getPublishedMedia } from "@/lib/media-public";

export const metadata = {
  title: "Media Center | Peace iTech Inc",
  description:
    "News, events, company updates, AI insights, cybersecurity articles, and technology blogs from Peace iTech Inc.",
};

// Read at request time so a newly published item shows up immediately, and so
// the build never depends on the database being reachable.
export const dynamic = "force-dynamic";

export default async function MediaCenterPage() {
  const [items, stats] = await Promise.all([
    getPublishedMedia(),
    getMediaStats(),
  ]);

  return (
    <PageShell>
      <Navbar />
      <MediaCenterContent items={items} stats={stats} />
      <Footer />
    </PageShell>
  );
}
