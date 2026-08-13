import BookAppointmentContent from "@/components/appointments/BookAppointmentContent";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import PageShell from "@/components/layout/PageShell";

export const metadata = {
  title: "Book an Appointment | Peace iTech Inc",
  description:
    "Book a free consultation with the Peace iTech team. Pick a date and time that works for you and we'll confirm by email.",
};

export default function BookAppointmentPage() {
  return (
    <PageShell>
      <Navbar />
      <BookAppointmentContent />
      <Footer />
    </PageShell>
  );
}
