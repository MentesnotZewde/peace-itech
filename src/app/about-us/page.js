import AboutUsPageContent from "@/components/company/AboutUsPage";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import PageShell from "@/components/layout/PageShell";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "Learn about Peace iTech Inc, a digital transformation company helping businesses in Canada, Ethiopia, and beyond modernize with scalable technology.",
  path: "/about-us",
});

const breadcrumbs = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about-us" },
]);

export default function AboutUsPage() {
  return (
    <PageShell>
      <JsonLd data={breadcrumbs} />
      <Navbar />
      <AboutUsPageContent />
      <Footer />
    </PageShell>
  );
}

