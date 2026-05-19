import {
  BarChart3,
  Code2,
  Headphones,
  Megaphone,
  ShieldCheck,
  Workflow,
} from "lucide-react";

// Routing structure:
// Every object in this array becomes one page at /services/[slug].
// The navbar, homepage service cards, footer links, and service page template all reuse this same data.
export const services = [
  {
    title: "Web Development",
    slug: "web-development",
    eyebrow: "Digital Experience",
    description:
      "Premium websites, ecommerce experiences, admin dashboards, and SaaS interfaces built to convert visitors and support real business operations.",
    icon: Code2,
    accent: "from-[#005BFF]/20 via-[#12B7FF]/20 to-[#12B7FF]/20",
    outcomes: ["Responsive websites", "SaaS UI systems", "Ecommerce storefronts"],
    overview:
      "We design and build fast, responsive web platforms with clean interfaces, strong technical foundations, and a user experience that feels polished on every screen.",
    technologies: ["Next.js", "React", "Tailwind CSS", "Node.js", "Vercel", "PostgreSQL", "Stripe", "CMS"],
    process: ["Discovery and content strategy", "UX/UI wireframes", "Frontend and backend build", "SEO, QA, and launch"],
    showcaseTitle: "Web experiences that look premium and work hard.",
    showcaseItems: [
      "Corporate website system",
      "Mobile responsive product pages",
      "Admin dashboard and analytics",
      "Ecommerce checkout experience",
      "SaaS subscription interface",
    ],
    workflowVisual: ["Landing page", "Product catalog", "Checkout", "Admin panel"],
    dashboardMetric: "94%",
    dashboardLabel: "performance-first build",
  },
  {
    title: "ERP Systems",
    slug: "erp-systems",
    eyebrow: "Operations Platform",
    description:
      "Custom ERP platforms that connect teams, finance, inventory, HR, approvals, and executive reporting into one reliable operating layer.",
    icon: BarChart3,
    accent: "from-[#12B7FF]/20 via-[#0718D8]/20 to-[#005BFF]/20",
    outcomes: ["Unified business data", "Role-based workflows", "Executive reporting"],
    overview:
      "We create ERP systems around how your company actually operates, giving leaders visibility while helping teams move through daily work with fewer bottlenecks.",
    technologies: ["PostgreSQL", "Prisma", "React", "REST APIs", "Power BI", "Cloud hosting", "Role-based access", "Audit logs"],
    process: ["Map operations", "Design data model", "Build department modules", "Train teams and iterate"],
    showcaseTitle: "Enterprise workflows presented with clarity.",
    showcaseItems: [
      "Analytics command center",
      "Employee management module",
      "Inventory tracking dashboard",
      "Finance approval workspace",
      "Procurement workflow board",
    ],
    workflowVisual: ["Request", "Approval", "Inventory", "Finance"],
    dashboardMetric: "360 deg",
    dashboardLabel: "operational visibility",
  },
  {
    title: "Business Automation",
    slug: "business-automation",
    eyebrow: "Workflow Intelligence",
    description:
      "Automated workflows, integrations, approval systems, CRM triggers, and Google Workspace solutions that reduce repetitive manual work.",
    icon: Workflow,
    accent: "from-[#12B7FF]/20 via-[#005BFF]/20 to-[#12B7FF]/20",
    outcomes: ["Automated approvals", "Connected apps", "CRM and email flows"],
    overview:
      "We connect the tools your team already uses and build automation layers that route work, notify people, generate documents, sync records, and keep processes moving.",
    technologies: ["Google Apps Script", "Google Workspace", "Power Automate", "Zapier", "Make.com", "n8n", "Webhooks", "CRM APIs"],
    process: ["Audit repetitive tasks", "Design automation map", "Connect tools and triggers", "Measure time saved"],
    showcaseTitle: "Workflow systems that move work without manual chasing.",
    showcaseItems: [
      "Google Apps Script operations hub",
      "Power Automate approval flow",
      "Zapier CRM and email sync",
      "Make.com workflow orchestration",
      "Automated document generation",
    ],
    workflowVisual: ["Form submit", "CRM update", "Approval", "Email alert"],
    dashboardMetric: "42%",
    dashboardLabel: "manual work reduced",
  },
  {
    title: "Cybersecurity",
    slug: "cybersecurity",
    eyebrow: "Digital Trust",
    description:
      "Security dashboards, access controls, cloud hardening, monitoring systems, and practical protection for business-critical infrastructure.",
    icon: ShieldCheck,
    accent: "from-[#12B7FF]/20 via-[#005BFF]/20 to-[#0718D8]/20",
    outcomes: ["Risk reduction", "Secure infrastructure", "Monitoring readiness"],
    overview:
      "We help businesses understand risk, protect data, secure cloud systems, monitor critical activity, and build resilience without making security feel impossible to operate.",
    technologies: ["IAM", "SIEM", "Endpoint security", "Cloud security", "Backups", "Audit reviews", "MFA", "Incident response"],
    process: ["Assess risk", "Prioritize controls", "Implement protection", "Monitor and improve"],
    showcaseTitle: "Security visibility for systems that cannot go dark.",
    showcaseItems: [
      "Security operations dashboard",
      "Cloud posture review",
      "Data protection controls",
      "Threat monitoring workspace",
      "Secure infrastructure baseline",
    ],
    workflowVisual: ["Detect", "Verify", "Contain", "Recover"],
    dashboardMetric: "24/7",
    dashboardLabel: "monitoring posture",
  },
  {
    title: "Digital Marketing",
    slug: "digital-marketing",
    eyebrow: "Growth Systems",
    description:
      "SEO, campaign dashboards, brand visuals, social media growth systems, and reporting workflows that make marketing measurable.",
    icon: Megaphone,
    accent: "from-[#0718D8]/20 via-[#12B7FF]/20 to-[#005BFF]/20",
    outcomes: ["SEO visibility", "Campaign performance", "Brand growth"],
    overview:
      "We combine creative execution with analytics so your marketing activity is easier to plan, easier to measure, and easier to improve over time.",
    technologies: ["SEO tools", "Google Analytics", "Search Console", "Meta Ads", "CRM", "Email marketing", "Canva", "CMS"],
    process: ["Research audience", "Build campaign assets", "Launch channels", "Report and optimize"],
    showcaseTitle: "Growth dashboards and brand systems with measurable impact.",
    showcaseItems: [
      "SEO analytics dashboard",
      "Campaign performance report",
      "Social media growth tracker",
      "Brand content system",
      "Lead generation funnel",
    ],
    workflowVisual: ["Audience", "Campaign", "Lead", "Report"],
    dashboardMetric: "3.8x",
    dashboardLabel: "campaign learning speed",
  },
  {
    title: "IT Support",
    slug: "it-support",
    eyebrow: "Managed Reliability",
    description:
      "Remote technical support, office troubleshooting, device support, network assistance, and professional helpdesk operations for growing teams.",
    icon: Headphones,
    accent: "from-[#12B7FF]/20 via-[#005BFF]/20 to-[#12B7FF]/20",
    outcomes: ["Remote assistance", "Device and network support", "Reliable helpdesk"],
    overview:
      "We provide dependable support for teams working from home, offices, or hybrid environments, helping people resolve issues quickly and keep business moving.",
    technologies: ["Helpdesk tools", "Remote desktop", "Device management", "Network diagnostics", "Microsoft 365", "Google Workspace", "Backups", "Monitoring"],
    process: ["Onboard users and devices", "Set support channels", "Resolve and document", "Improve recurring issues"],
    showcaseTitle: "Support experiences that feel responsive and professional.",
    showcaseItems: [
      "Remote support desk",
      "Office troubleshooting workflow",
      "Device health dashboard",
      "Network support panel",
      "Customer support scenario board",
    ],
    workflowVisual: ["Ticket", "Diagnose", "Resolve", "Document"],
    dashboardMetric: "<2h",
    dashboardLabel: "target first response",
  },
];

export function getServiceBySlug(slug) {
  return services.find((service) => service.slug === slug);
}


