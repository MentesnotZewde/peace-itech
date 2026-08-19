// Single source of truth for everything search engines and social crawlers read.
//
// Two rules keep this file honest:
//   1. Structured data must describe what the page actually shows. The office
//      details below are copied from the contact page for that reason.
//   2. Absolute URLs come from `siteUrl`, never from request headers, so a
//      canonical tag can't change depending on which host served the page.

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.peaceitech.com"
).replace(/\/+$/, "");

export const siteName = "Peace iTech Inc";
export const legalName = "Peace iTech Inc.";

export const defaultTitle = "Peace iTech Inc | Premium Technology Solutions";

// Generated at /opengraph-image by src/app/opengraph-image.js.
export const defaultOgImage = "/opengraph-image";

export const defaultDescription =
  "Peace iTech Inc builds websites, ERP systems, automations, cybersecurity programs, digital marketing systems, and IT support for modern businesses in Canada, Ethiopia, and beyond.";

// Only used as a hint for crawlers; the real ranking signal is page copy.
export const defaultKeywords = [
  "web development",
  "ERP systems",
  "business automation",
  "point of sale systems",
  "digital marketing",
  "IT support",
  "cybersecurity",
  "digital transformation",
  "Toronto",
  "Addis Ababa",
];

export const contact = {
  email: "hello@peaceitech.com",
  // E.164 for schema.org and tel: links.
  phone: "+14164743396",
  // How the same number is written for people to read.
  phoneDisplay: "+1 (416) 474-3396",
};

// Mirrors the office cards on /contact. Update both together.
export const offices = [
  {
    id: "canada",
    name: "Peace iTech Inc — Canada Office",
    street: "100 King Street West, Suite 5700",
    locality: "Toronto",
    region: "ON",
    postalCode: "M5X 1C7",
    country: "CA",
    phone: "+14164743396",
    latitude: 43.685128,
    longitude: -79.3142905,
  },
  {
    id: "ethiopia",
    name: "Peace iTech Inc — Ethiopia Office",
    street: "Sun Moon Star Mall, Jemo 1",
    locality: "Addis Ababa",
    region: "Addis Ababa",
    postalCode: "",
    country: "ET",
    phone: "+251925076556",
    latitude: 8.96113099,
    longitude: 38.71125788,
  },
];

/** Turns "/contact" into "https://site/contact". Absolute input passes through. */
export function absoluteUrl(path = "/") {
  if (!path) return siteUrl;
  if (/^https?:\/\//i.test(path)) return path;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Builds one page's Metadata. Everything not passed falls back to the defaults
 * declared in the root layout, so a page only states what makes it different.
 *
 * `noIndex` is for pages that exist for humans but should never rank — the
 * admin dashboard and the login screen.
 */
export function pageMetadata({
  title,
  description = defaultDescription,
  path = "/",
  image,
  imageAlt,
  type = "website",
  keywords,
  noIndex = false,
  publishedTime,
  modifiedTime,
} = {}) {
  const url = absoluteUrl(path);

  // Setting an explicit `openGraph` block stops a page from inheriting the
  // root opengraph-image.js file convention, so the default is applied here.
  const images = [
    {
      url: absoluteUrl(image || defaultOgImage),
      alt: imageAlt || title || siteName,
    },
  ];

  return {
    // Omitted rather than set to undefined: an explicit `title: undefined`
    // blanks the tag instead of falling back to the layout's default title.
    ...(title ? { title } : {}),
    description,
    ...(keywords ? { keywords } : {}),
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      siteName,
      title: title || defaultTitle,
      description,
      locale: "en_CA",
      images,
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: title || defaultTitle,
      description,
      images,
    },
    ...(noIndex
      ? { robots: { index: false, follow: false, nocache: true } }
      : {}),
  };
}

/* ------------------------------------------------------------------ *
 * JSON-LD builders
 *
 * Each returns a plain object; render it with <JsonLd data={...} />.
 * `@id` values are stable URLs so separate blocks on separate pages are
 * understood as the same organisation rather than many look-alikes.
 * ------------------------------------------------------------------ */

const ORG_ID = `${siteUrl}/#organization`;
const SITE_ID = `${siteUrl}/#website`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: siteName,
    legalName,
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/logo-icon.png"),
    },
    description: defaultDescription,
    email: contact.email,
    telephone: contact.phone,
    areaServed: [
      { "@type": "Country", name: "Canada" },
      { "@type": "Country", name: "Ethiopia" },
    ],
    address: offices.map((office) => ({
      "@type": "PostalAddress",
      streetAddress: office.street,
      addressLocality: office.locality,
      addressRegion: office.region,
      ...(office.postalCode ? { postalCode: office.postalCode } : {}),
      addressCountry: office.country,
    })),
    contactPoint: offices.map((office) => ({
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: office.phone,
      email: contact.email,
      areaServed: office.country,
      availableLanguage: ["English"],
    })),
  };
}

export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    url: siteUrl,
    name: siteName,
    description: defaultDescription,
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
  };
}

/** One LocalBusiness per office — what local/map results are built from. */
export function localBusinessSchemas() {
  return offices.map((office) => ({
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteUrl}/#office-${office.id}`,
    name: office.name,
    parentOrganization: { "@id": ORG_ID },
    url: absoluteUrl("/contact"),
    image: absoluteUrl("/logo-icon.png"),
    telephone: office.phone,
    email: contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: office.street,
      addressLocality: office.locality,
      addressRegion: office.region,
      ...(office.postalCode ? { postalCode: office.postalCode } : {}),
      addressCountry: office.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: office.latitude,
      longitude: office.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "09:00",
        closes: "18:00",
      },
    ],
  }));
}

/** items: [{ name, path }] — include the current page as the last entry. */
export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceSchema(service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteUrl}/services/${service.slug}#service`,
    name: service.title,
    serviceType: service.eyebrow || service.title,
    description: service.description,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: { "@id": ORG_ID },
    areaServed: [
      { "@type": "Country", name: "Canada" },
      { "@type": "Country", name: "Ethiopia" },
    ],
    ...(service.outcomes?.length
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: `${service.title} deliverables`,
            itemListElement: service.outcomes.map((outcome) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: outcome },
            })),
          },
        }
      : {}),
  };
}

export function articleSchema(item) {
  const url = absoluteUrl(`/media-center/${item.id}`);
  // `date` is the editorial date typed in the dashboard; createdAt is the row's
  // own timestamp and is always a valid ISO string.
  const published = toIsoDate(item.date) || item.createdAt || undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: item.title,
    description: item.summary || undefined,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    ...(item.image ? { image: [item.image] } : {}),
    ...(published ? { datePublished: published } : {}),
    ...(item.category ? { articleSection: item.category } : {}),
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
  };
}

export function faqSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/** Editorial dates are free text, so only well-formed ones reach the markup. */
function toIsoDate(value) {
  if (!value) return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString();
}
