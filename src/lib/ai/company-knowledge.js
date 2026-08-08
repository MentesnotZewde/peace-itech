import { mediaPosts } from "@/lib/media";
import { services } from "@/lib/services";

export const companyRoutes = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Media Center", href: "/media-center" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact", href: "/contact" },
  ...services.map((service) => ({
    label: service.title,
    href: `/services/${service.slug}`,
  })),
];

export const companyProfile = {
  name: "Peace iTech Inc",
  summary:
    "Peace iTech Inc provides premium technology solutions for websites, ERP systems, business automation, cybersecurity, digital marketing, and IT support.",
  mission:
    "Helping businesses grow through innovative and scalable technology solutions.",
  vision: "Becoming a trusted global digital transformation partner.",
  regions: ["Canada", "Ethiopia", "beyond"],
  primaryContact: {
    email: "info@peaceitech.com",
    phone: "+1 (416) 555-0198",
    responseTime: "Within 1 business day",
    businessHours:
      "Monday to Friday, 9:00 AM - 6:00 PM EST for Canada inquiries. Ethiopia support is listed as Monday to Friday, 9:00 AM - 6:00 PM EAT.",
  },
  offices: [
    {
      name: "Canada Office",
      location: "Toronto, Ontario, Canada",
      email: "canada@peaceitech.com",
      phone: "+1 (416) 555-0198",
      address: "100 King Street West, Suite 5700, Toronto, ON M5X 1C7, Canada",
      hours: "Mon - Fri: 9:00 AM - 6:00 PM (EST)",
    },
    {
      name: "Ethiopia Office",
      location: "Addis Ababa, Ethiopia",
      email: "ethiopia@peaceitech.com",
      phone: "+251 11 123 4567",
      address: "Bole Road, Edna Mall Building, 5th Floor, Addis Ababa, Ethiopia",
      hours: "Mon - Fri: 9:00 AM - 6:00 PM (EAT)",
    },
  ],
};

export function getApprovedKnowledgeText() {
  const serviceText = services
    .map((service) => {
      return [
        `Service: ${service.title}`,
        `Route: /services/${service.slug}`,
        `Category: ${service.eyebrow}`,
        `Description: ${service.description}`,
        `Overview: ${service.overview}`,
        `Outcomes: ${service.outcomes.join(", ")}`,
        `Technologies/tools: ${service.technologies.join(", ")}`,
        `Process: ${service.process.join(" | ")}`,
      ].join("\n");
    })
    .join("\n\n");

  const routeText = companyRoutes
    .map((route) => `${route.label}: ${route.href}`)
    .join("\n");

  const officeText = companyProfile.offices
    .map(
      (office) =>
        `${office.name}: ${office.location}; ${office.address}; ${office.phone}; ${office.email}; ${office.hours}`,
    )
    .join("\n");

  const mediaText = mediaPosts
    .map(
      (post) =>
        `${post.title} (${post.category}, ${post.date}): ${post.summary}`,
    )
    .join("\n");

  return [
    `Company: ${companyProfile.name}`,
    companyProfile.summary,
    `Mission: ${companyProfile.mission}`,
    `Vision: ${companyProfile.vision}`,
    `Regions mentioned on the website: ${companyProfile.regions.join(", ")}`,
    `Primary contact: ${companyProfile.primaryContact.email}; ${companyProfile.primaryContact.phone}; ${companyProfile.primaryContact.responseTime}`,
    `Business hours: ${companyProfile.primaryContact.businessHours}`,
    "",
    "Approved website routes:",
    routeText,
    "",
    "Offices:",
    officeText,
    "",
    "Services:",
    serviceText,
    "",
    "Media center topics:",
    mediaText,
  ].join("\n");
}

export function getRelevantLinks(question = "", answer = "") {
  const text = `${question} ${answer}`.toLowerCase();
  const links = [];

  function add(label, href) {
    if (!links.some((link) => link.href === href)) {
      links.push({ label, href });
    }
  }

  if (/(service|offer|choose|solution|start|get started)/.test(text)) {
    add("Explore Services", "/#services");
  }

  if (/(about|company|who are|mission|vision|team|trust|certification)/.test(text)) {
    add("About Us", "/about-us");
  }

  if (/(contact|call|email|location|office|canada|ethiopia|hours|address)/.test(text)) {
    add("Contact Us", "/contact");
  }

  if (/(news|media|insight|article|event|update)/.test(text)) {
    add("Media Center", "/media-center");
  }

  services.forEach((service) => {
    const title = service.title.toLowerCase();
    const slugWords = service.slug.replaceAll("-", " ");
    if (text.includes(title) || text.includes(slugWords)) {
      add(service.title, `/services/${service.slug}`);
    }
  });

  if (links.length === 0) {
    add("Explore Services", "/#services");
    add("Contact Us", "/contact");
  }

  return links.slice(0, 3);
}
