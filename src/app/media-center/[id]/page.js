import { headers } from "next/headers";
import { notFound } from "next/navigation";

import MediaArticle from "@/components/media/MediaArticle";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import PageShell from "@/components/layout/PageShell";
import { getPublishedMediaItem, getRelatedMedia } from "@/lib/media-public";

// Published straight from the dashboard, so this is read per request.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const item = await getPublishedMediaItem(id);

  if (!item) return { title: "Article Not Found | Peace iTech Inc" };

  return {
    title: `${item.title} | Peace iTech Inc`,
    description: item.summary || undefined,
    openGraph: {
      title: item.title,
      description: item.summary || undefined,
      images: item.image ? [item.image] : undefined,
      type: "article",
    },
  };
}

async function getShareUrl(id) {
  const headerList = await headers();
  const host = headerList.get("host") || "";
  const protocol = headerList.get("x-forwarded-proto") || "https";
  return `${protocol}://${host}/media-center/${id}`;
}

export default async function MediaArticlePage({ params }) {
  const { id } = await params;
  const item = await getPublishedMediaItem(id);

  // A draft or an unknown id are both simply "not found" to the public.
  if (!item) notFound();

  const [related, shareUrl] = await Promise.all([
    getRelatedMedia(item.id),
    getShareUrl(item.id),
  ]);

  return (
    <PageShell>
      <Navbar />
      <MediaArticle item={item} related={related} shareUrl={shareUrl} />
      <Footer />
    </PageShell>
  );
}
