import Hero from "@/components/home/Hero";
import ServicesSection from "@/components/home/ServicesSection";
import StatsSection from "@/components/home/StatsSection";
import TrustedTeams from "@/components/home/TrustedTeams";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import PageShell from "@/components/layout/PageShell";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Home() {
  return (
    <PageShell>
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
        </main>
        <Footer />
    </PageShell>
  );
}

