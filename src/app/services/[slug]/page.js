import { notFound } from "next/navigation";

import ServicePageTemplate, {
  SLUGS_WITH_INLINE_PORTFOLIO,
} from "@/components/services/ServicePageTemplate";
import ServicePortfolioSection from "@/components/services/ServicePortfolioSection";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import PageShell from "@/components/layout/PageShell";
import { getPortfolioProjects } from "@/lib/portfolio";
import { getServiceBySlug, services } from "@/lib/services";

// App Router dynamic route: each object in services becomes /services/[slug].
export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

// The portfolio is read at request time, so a project published from the admin
// dashboard shows up here immediately.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found | Peace iTech Inc",
    };
  }

  return {
    title: `${service.title} | Peace iTech Inc`,
    description: service.description,
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  // Projects are categorised by service title, which is what the admin form
  // offers as "Service Category". Renamed services also match their old title.
  const projects = await getPortfolioProjects([
    service.title,
    ...(service.legacyTitles || []),
  ]);

  // Some templates place the portfolio mid-page themselves; the rest get it
  // appended here so every service page has one.
  const inlinePortfolio = SLUGS_WITH_INLINE_PORTFOLIO.includes(slug);

  return (
    <PageShell>
      <Navbar />
      <ServicePageTemplate service={service} projects={projects} />
      {!inlinePortfolio && (
        <ServicePortfolioSection service={service} projects={projects} />
      )}
      <Footer />
    </PageShell>
  );
}
