import ContactPageContent from "@/components/company/ContactPageContent";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export const metadata = {
  title: "Contact Us | Peace iTech Inc",
  description:
    "Contact Peace iTech Inc for web development, ERP systems, automation, cybersecurity, digital marketing, and IT support.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <ContactPageContent />
      <Footer />
    </>
  );
}

