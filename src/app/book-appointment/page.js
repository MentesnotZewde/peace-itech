import BookAppointmentContent from "@/components/appointments/BookAppointmentContent";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import PageShell from "@/components/layout/PageShell";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Book an Appointment",
  description:
    "Book a free consultation with the Peace iTech team. Pick a date and time that works for you and we'll confirm by email.",
  path: "/book-appointment",
});

const breadcrumbs = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Book an Appointment", path: "/book-appointment" },
]);

export default function BookAppointmentPage() {
  return (
    <PageShell>
      <JsonLd data={breadcrumbs} />
      <Navbar />
      <BookAppointmentContent />
      <Footer />
    </PageShell>
  );
}
