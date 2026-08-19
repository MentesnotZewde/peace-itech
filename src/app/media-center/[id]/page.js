import { cache } from "react";
import { notFound } from "next/navigation";

import MediaArticle from "@/components/media/MediaArticle";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import PageShell from "@/components/layout/PageShell";
import JsonLd from "@/components/seo/JsonLd";
import { getPublishedMediaItem, getRelatedMedia } from "@/lib/media-public";
import {
  absoluteUrl,
  articleSchema,
  breadcrumbSchema,
  pageMetadata,
} from "@/lib/seo";

// generateMetadata and the page body both need the article; memoising means
// one database read per request instead of two.
const loadItem = cache(getPublishedMediaItem);

// Published straight from the dashboard, so this is read per request.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const item = await loadItem(id);

  // Drafts and bad ids both 404 below; neither should be indexed.
  if (!item) {
    return pageMetadata({
      title: "Article Not Found",
      path: `/media-center/${id}`,
      noIndex: true,
    });
  }

  return pageMetadata({
    title: item.title,
    // Falls back to the site description so the tag is never empty.
    description: item.summary || undefined,
    path: `/media-center/${item.id}`,
    image: item.image || undefined,
    imageAlt: item.title,
    type: "article",
    publishedTime: item.createdAt || undefined,
    ...(item.category ? { keywords: [item.category] } : {}),
  });
}

export default async function MediaArticlePage({ params }) {
  const { id } = await params;
  const item = await loadItem(id);

  // A draft or an unknown id are both simply "not found" to the public.
  if (!item) notFound();

  const related = await getRelatedMedia(item.id);
  // Built from the configured site URL rather than the request Host header, so
  // a shared link always points at the canonical domain.
  const shareUrl = absoluteUrl(`/media-center/${item.id}`);

  const schema = [
    articleSchema(item),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Media Center", path: "/media-center" },
      { name: item.title, path: `/media-center/${item.id}` },
    ]),
  ];

  return (
    <PageShell>
      <JsonLd data={schema} />
      <Navbar />
      <MediaArticle item={item} related={related} shareUrl={shareUrl} />
      <Footer />
    </PageShell>
  );
}
