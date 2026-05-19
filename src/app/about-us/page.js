import AboutPageContent from "@/components/company/AboutPageContent";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export const metadata = {
  title: "About Us | Peace iTech Inc",
  description:
    "Learn about Peace iTech Inc, a digital transformation company helping businesses in Canada, Ethiopia, and beyond modernize with scalable technology.",
};

export default function AboutUsPage() {
  return (
    <>
      <Navbar />
      <AboutPageContent />
      <Footer />
    </>
  );
}

