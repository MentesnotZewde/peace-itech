import MediaCenterContent from "@/components/media/MediaCenterContent";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export const metadata = {
  title: "Media Center | Peace iTech Inc",
  description:
    "News, events, company updates, AI insights, cybersecurity articles, and technology blogs from Peace iTech Inc.",
};

export default function MediaCenterPage() {
  return (
    <>
      <Navbar />
      <MediaCenterContent />
      <Footer />
    </>
  );
}

