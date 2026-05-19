import CaseStudiesSection from "@/components/home/CaseStudiesSection";
import Hero from "@/components/home/Hero";
import PortfolioShowcase from "@/components/home/PortfolioShowcase";
import ServicesSection from "@/components/home/ServicesSection";
import StatsSection from "@/components/home/StatsSection";
import TrustedTeams from "@/components/home/TrustedTeams";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      {/* Page composition stays simple: each large homepage area lives in its own reusable component. */}
      <main className="flex-1">
        <Hero />
        <TrustedTeams />
        <ServicesSection />
        <StatsSection />
        <PortfolioShowcase />
        <CaseStudiesSection />
        <WhyChooseUs />
      </main>
      <Footer />
    </>
  );
}

