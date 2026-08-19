import ContactPageContent from "@/components/company/ContactPageContent";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import PageShell from "@/components/layout/PageShell";
import JsonLd from "@/components/seo/JsonLd";
import {
  breadcrumbSchema,
  localBusinessSchemas,
  pageMetadata,
} from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Contact Peace iTech Inc for web development, ERP systems, automation, cybersecurity, digital marketing, and IT support. Offices in Toronto, Canada and Addis Ababa, Ethiopia.",
  path: "/contact",
});

// The office cards on this page are what these LocalBusiness entries describe.
const contactSchema = [
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ]),
  ...localBusinessSchemas(),
];

export default function ContactPage() {
  return (
    <PageShell>
      <JsonLd data={contactSchema} />
      <Navbar />
      <ContactPageContent />
      <Footer />
    </PageShell>
  );
}

