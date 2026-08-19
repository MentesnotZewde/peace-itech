import FaqSection from "@/components/home/FaqSection";
import Hero from "@/components/home/Hero";
import ServicesSection from "@/components/home/ServicesSection";
import StatsSection from "@/components/home/StatsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import TrustedTeams from "@/components/home/TrustedTeams";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import PageShell from "@/components/layout/PageShell";
import JsonLd from "@/components/seo/JsonLd";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { faqs } from "@/lib/faqs";
import { faqSchema, localBusinessSchemas, pageMetadata } from "@/lib/seo";

// No `title` here on purpose: the homepage keeps the root layout's default
// title verbatim rather than running through the "%s | brand" template.
export const metadata = pageMetadata({ path: "/" });

export default function Home() {
  return (
    <PageShell>
        {/* The accordion below is the visible source for this FAQ markup. */}
        <JsonLd data={[faqSchema(faqs), ...localBusinessSchemas()]} />
        <Navbar />
        {/* Page composition stays simple: each large homepage area lives in its own reusable component. */}
        <main className="flex-1">
          <ScrollReveal>
            <Hero />
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <TrustedTeams />
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <ServicesSection />
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <StatsSection />
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <WhyChooseUs />
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <TestimonialsSection />
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <FaqSection />
          </ScrollReveal>
        </main>
        <Footer />
    </PageShell>
  );
}

