import MediaCenterContent from "@/components/media/MediaCenterContent";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import PageShell from "@/components/layout/PageShell";

export const metadata = {
  title: "Media Center | Peace iTech Inc",
  description:
    "News, events, company updates, AI insights, cybersecurity articles, and technology blogs from Peace iTech Inc.",
};

export default function MediaCenterPage() {
  return (
    <PageShell>
      <Navbar />
      <MediaCenterContent />
      <Footer />
    </PageShell>
  );
}

