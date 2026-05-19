import { notFound } from "next/navigation";

import ServicePageTemplate from "@/components/services/ServicePageTemplate";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { getServiceBySlug, services } from "@/lib/services";

// App Router dynamic route: each object in services becomes /services/[slug].
export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

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

  return (
    <>
      <Navbar />
      <ServicePageTemplate service={service} />
      <Footer />
    </>
  );
}

