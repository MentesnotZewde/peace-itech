import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Barcode,
  BarChart3,
  CheckCircle2,
  CircleDot,
  Clock3,
  CreditCard,
  Gift,
  Headphones,
  Layers3,
  MonitorSmartphone,
  Printer,
  QrCode,
  Rocket,
  ShieldCheck,
  ShoppingCart,
  Store,
  TabletSmartphone,
  Truck,
  UsersRound,
  Utensils,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ServicePortfolioSection from "@/components/services/ServicePortfolioSection";
import TechnologiesToolsSection from "@/components/services/TechnologiesToolsSection";

const posFeatureCards = [
  {
    title: "Fast Checkout",
    subtitle: "Counter Sales",
    icon: ShoppingCart,
  },
  {
    title: "QR Ordering",
    subtitle: "Table Service",
    icon: QrCode,
  },
  {
    title: "Payments",
    subtitle: "Integrated Flow",
    icon: CreditCard,
  },
  {
    title: "Reporting",
    subtitle: "Live Insights",
    icon: BarChart3,
  },
];

const posOverviewTrustItems = [
  { label: "Restaurant", icon: Utensils },
  { label: "Retail", icon: Store },
  { label: "Delivery", icon: Truck },
  { label: "Support", icon: Headphones },
];

const posOverviewCards = [
  {
    number: "01",
    title: "Windows & Tablet POS",
    description:
      "Reliable counter, mobile, and hybrid POS systems for restaurants, QSR, retail, and grocery teams.",
    icon: MonitorSmartphone,
  },
  {
    number: "02",
    title: "Online, QR & Kiosk Ordering",
    description:
      "Menu-connected ordering experiences for pickup, delivery, table service, and self-service kiosks.",
    icon: QrCode,
  },
  {
    number: "03",
    title: "Payments & Operations",
    description:
      "Integrated payment terminals, kitchen printing, inventory, loyalty, gift cards, and reporting.",
    icon: CreditCard,
  },
];

const posShowcaseItems = [
  {
    number: "01",
    title: "Point-of-Sale",
    category: "Restaurant / QSR / Retail",
    description:
      "Windows, tablet, and hybrid POS setups built for fast order entry, clean checkout, and reliable daily use.",
    icon: ShoppingCart,
    features: ["Counter checkout", "Table orders", "Retail sales"],
  },
  {
    number: "02",
    title: "Online & App Order",
    category: "Pickup / Delivery",
    description:
      "Online ordering connected to POS menus, payments, pickup timing, and delivery workflows.",
    icon: TabletSmartphone,
    features: ["Online menus", "App ordering", "Online payment"],
  },
  {
    number: "03",
    title: "QR Table Order",
    category: "Dine-in Experience",
    description:
      "Guests scan, browse, order, and pay from the table while orders route to the right station.",
    icon: QrCode,
    features: ["QR menu", "Table orders", "QR payment"],
  },
  {
    number: "04",
    title: "Kiosk & Self-Checkout",
    category: "In-Store Automation",
    description:
      "Self-service ordering for quick-service restaurants and busy retail environments.",
    icon: Store,
    features: ["All-in-one kiosk", "Tablet kiosk", "Payment device"],
  },
  {
    number: "05",
    title: "Kitchen Display & Printing",
    category: "Back-of-House Flow",
    description:
      "Digital kitchen display and printer routing that helps teams prepare orders with less confusion.",
    icon: Printer,
    features: ["KDS screens", "Kitchen tickets", "Pickup monitor"],
  },
  {
    number: "06",
    title: "Delivery, Loyalty & Franchise",
    category: "Growth Operations",
    description:
      "Delivery integrations, customer loyalty, gift cards, and multi-location reporting for growing merchants.",
    icon: Gift,
    features: ["Delivery channels", "Loyalty rewards", "Multi-location"],
  },
];

const posWorkflowSteps = [
  {
    title: "Map your selling model",
    description:
      "We review your counter, table, online, delivery, kitchen, inventory, and payment requirements.",
    icon: Layers3,
  },
  {
    title: "Connect menus and devices",
    description:
      "We configure the POS, ordering channels, barcode or kitchen workflows, payment devices, and receipt routing.",
    icon: Barcode,
  },
  {
    title: "Train, launch, and support",
    description:
      "We help your staff go live with clear training, practical support, and improvements after launch.",
    icon: Rocket,
  },
];

const posWorkflowVisual = ["Order", "Pay", "Kitchen", "Report"];

const posCtaHighlights = [
  {
    title: "Merchant-first setup",
    description: "Built around your floor",
    icon: UsersRound,
  },
  {
    title: "Integrated systems",
    description: "Less duplicate entry",
    icon: ShieldCheck,
  },
  {
    title: "Reliable launch",
    description: "Training and support",
    icon: Rocket,
  },
];

const posCtaTrustPoints = [
  "Restaurant ready",
  "Retail ready",
  "Practical next steps",
];

// Served from /public for the same reason as the shared tools section: the
// CSP allows images from 'self' and Cloudinary only.
const posTools = [
  { name: "POS Terminals", logo: "/images/point-of-sale-hero _1.png" },
  { name: "Stripe", logo: "/images/tools/stripe.svg" },
  { name: "React", logo: "/images/tools/react.svg" },
  { name: "Next.js", logo: "/images/Next.jpg" },
  { name: "Node.js", logo: "/images/tools/nodedotjs.svg" },
  { name: "PostgreSQL", logo: "/images/tools/postgresql.svg" },
  { name: "Barcode", logo: "/images/tools/codeforces.svg" },
  { name: "Analytics", logo: "/images/tools/googleanalytics.svg" },
  { name: "Cloud Hosting", logo: "/images/Vercel-Logo.png" },
  // Chart.js: Simple Icons has no "recharts" slug, so the old URL 404'd.
  { name: "Dashboards", logo: "/images/tools/chartdotjs.svg" },
];

function PosFeatureRail() {
  return (
    <div className="relative z-20 grid grid-cols-2 divide-x divide-y divide-border/70 rounded-2xl bg-white/78 p-3 dark:bg-[#07111F]/72 lg:block lg:space-y-4 lg:divide-x-0 lg:divide-y-0 lg:bg-transparent lg:p-0">
      {posFeatureCards.map((card, index) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="web-feature-card rounded-2xl border border-transparent bg-transparent p-4 shadow-none backdrop-blur-xl lg:w-[13.5rem] lg:border-[#005BFF]/12 lg:bg-white/78 lg:shadow-xl lg:shadow-[#005BFF]/10 dark:border-transparent dark:bg-transparent lg:dark:border-[#12B7FF]/20 lg:dark:bg-[#07111F]/72 lg:dark:shadow-[#12B7FF]/10"
            style={{ "--card-delay": `${520 + index * 150}ms` }}
          >
            <div className="flex items-start gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#005BFF]/14 to-[#12B7FF]/18 text-[#005BFF] ring-1 ring-[#12B7FF]/20 dark:text-[#12B7FF]">
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold leading-5 text-foreground">
                  {card.title}
                </p>
                <p className="mt-0.5 text-sm leading-5 text-muted-foreground">
                  {card.subtitle}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function PosFeatureConnectors() {
  return (
    <svg
      className="web-feature-connectors pointer-events-none absolute left-[12.6rem] right-[2rem] top-1/2 z-0 hidden h-[24rem] -translate-y-1/2 lg:block"
      viewBox="0 0 520 360"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="posConnectorGradient" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#005BFF" stopOpacity="0.18" />
          <stop offset="52%" stopColor="#12B7FF" stopOpacity="0.42" />
          <stop offset="100%" stopColor="#005BFF" stopOpacity="0.08" />
        </linearGradient>
        <filter
          id="posConnectorGlow"
          x="-20%"
          y="-80%"
          width="140%"
          height="260%"
        >
          <feGaussianBlur stdDeviation="2.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path
        className="web-connector-spine"
        d="M22 46 V314"
        fill="none"
        stroke="url(#posConnectorGradient)"
        strokeWidth="1.4"
        strokeDasharray="5 8"
      />
      {[46, 120, 204, 314].map((point, index) => (
        <g key={point}>
          <path
            className="web-connector-line"
            d={`M0 ${point} H22 C112 ${point} 134 ${
              180 + (index - 1.5) * 20
            } 270 ${180 + (index - 1.5) * 20} S402 ${
              180 + (index - 1.5) * 14
            } 500 ${180 + (index - 1.5) * 12}`}
            fill="none"
            stroke="url(#posConnectorGradient)"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeDasharray="7 9"
            style={{ "--line-delay": `${640 + index * 130}ms` }}
          />
          <circle
            className="web-connector-dot"
            cx="22"
            cy={point}
            r="3.3"
            fill="#12B7FF"
            filter="url(#posConnectorGlow)"
            style={{ "--line-delay": `${760 + index * 130}ms` }}
          />
        </g>
      ))}
      <circle
        className="web-connector-dot"
        cx="500"
        cy="180"
        r="4"
        fill="#005BFF"
        filter="url(#posConnectorGlow)"
        style={{ "--line-delay": "1180ms" }}
      />
    </svg>
  );
}

function PosHeroImage() {
  return (
    <div className="web-hero-image-enter relative z-10 mx-auto w-full max-w-[58rem]">
      <div className="absolute inset-x-8 bottom-4 h-12 rounded-full bg-[#005BFF]/22 blur-2xl dark:bg-[#12B7FF]/24" />
      <Image
        src="/images/point-of-sale.png"
        alt="Modern point-of-sale terminal with payment reader, printer, scanner, and tablet"
        width={1696}
        height={960}
        priority
        quality={85}
        className="relative z-10 h-auto w-full object-contain drop-shadow-[0_28px_50px_rgba(0,91,255,0.18)] dark:drop-shadow-[0_28px_50px_rgba(18,183,255,0.18)]"
        sizes="(min-width: 1280px) 64rem, (min-width: 1024px) 58rem, 100vw"
      />
    </div>
  );
}

function PosHero() {
  return (
    <section className="relative isolate overflow-hidden bg-transparent px-4 py-12 transition-colors sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background/18 via-background/4 to-background/82 dark:from-background/20 dark:via-background/5 dark:to-background/88" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <div className="web-hero-copy-enter max-w-3xl">
            <h1 className="font-heading text-3xl font-semibold leading-tight tracking-normal text-foreground sm:text-4xl lg:text-[2.35rem]">
              <span
                className="animate-hero-heading-word block opacity-0"
                style={{ animationDelay: "160ms" }}
              >
                Modern POS Systems
              </span>
              <span
                className="animate-hero-heading-word hero-heading-accent block opacity-0"
                style={{ animationDelay: "320ms" }}
              >
                Smarter Operations.{" "}
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-md">
              We help restaurants, retail stores, grocery shops, and franchises
              run checkout, online ordering, QR ordering, delivery, payments,
              loyalty, and reporting from one connected POS ecosystem.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-md bg-[#005BFF] px-6 text-white shadow-xl shadow-[#005BFF]/20 hover:-translate-y-0.5 hover:bg-[#071B8F] hover:shadow-[#12B7FF]/20"
              >
                <Link href="/contact">
                  Talk to an expert
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-md bg-background/70 px-6 backdrop-blur hover:-translate-y-0.5"
              >
                <Link href="/services/point-of-sale#pos-solutions">
                  View POS solutions
                  <MonitorSmartphone className="size-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative grid gap-6 lg:grid-cols-[13.5rem_minmax(0,1fr)] lg:items-center xl:grid-cols-[13.5rem_minmax(0,1.16fr)]">
            <PosFeatureConnectors />
            <PosFeatureRail />
            <PosHeroImage />
          </div>
        </div>
      </div>
    </section>
  );
}

function PosOverview() {
  return (
    <section className="relative overflow-hidden py-20 transition-colors sm:py-24">
      <div className="absolute left-1/2 top-10 -z-10 size-[28rem] -translate-x-1/2 rounded-full bg-[#12B7FF]/10 blur-3xl dark:bg-[#005BFF]/12" />

      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <ScrollReveal>
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#005BFF] dark:text-[#12B7FF]">
              Overview
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal text-foreground sm:text-4xl">
              POS infrastructure built for
              <span className="hero-heading-accent block">
                daily merchant flow.
              </span>
            </h2>

            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-4">
              {posOverviewTrustItems.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-2 text-sm font-semibold text-muted-foreground"
                  >
                    <Icon
                      className="size-4 text-[#005BFF] dark:text-[#12B7FF]"
                      aria-hidden="true"
                    />
                    <span>{item.label}</span>
                    {index < posOverviewTrustItems.length - 1 ? (
                      <span className="text-[#12B7FF]/60" aria-hidden="true">
                        -
                      </span>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* No card surfaces, matching the web development overview: the items
            are separated by hairline rules only. The rules are set per cell
            rather than with `divide-*`, which cannot describe a grid that
            rewraps from 1 to 3 columns. */}
        <div className="grid border-t border-[#005BFF]/12 dark:border-[#12B7FF]/14 sm:grid-cols-3">
          {posOverviewCards.map((item, index) => {
            const Icon = item.icon;

            return (
              <ScrollReveal
                key={item.title}
                delay={120 + index * 140}
                className="group relative border-b border-[#005BFF]/12 px-6 py-9 last:border-b-0 dark:border-[#12B7FF]/14 sm:border-b-0 sm:border-r sm:px-7 sm:py-10 sm:last:border-r-0"
              >
                {/* Lights up the rule under the item on hover. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-6 -bottom-px h-px origin-left scale-x-0 bg-gradient-to-r from-[#005BFF] to-[#12B7FF] opacity-0 transition duration-500 group-hover:scale-x-100 group-hover:opacity-100 sm:inset-x-7"
                />

                <div className="flex items-center gap-3">
                  <Icon
                    className="size-7 stroke-[1.6] text-[#005BFF] transition-transform duration-300 group-hover:-translate-y-0.5 dark:text-[#12B7FF]"
                    aria-hidden="true"
                  />
                  <span className="text-xs font-semibold tracking-[0.22em] text-muted-foreground/70">
                    {item.number}
                  </span>
                </div>

                <h3 className="mt-6 text-lg font-semibold leading-7 text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {item.description}
                </p>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PosSolutionsShowcase() {
  return (
    <section
      id="pos-solutions"
      className="relative scroll-mt-24 overflow-hidden bg-muted/30 py-20 transition-colors sm:py-24"
    >
      <div className="absolute right-0 top-0 -z-10 size-[28rem] rounded-full bg-[#12B7FF]/12 blur-3xl dark:bg-[#005BFF]/12" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#005BFF] dark:text-[#12B7FF]">
              POS Solutions
            </p>
            <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-normal text-foreground sm:text-4xl">
              Merchant systems that connect
              <span className="hero-heading-accent block">
                the front and back of house.
              </span>
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
              From the first order to the final report, each part of the POS
              stack is planned to reduce manual work and keep service moving.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {posShowcaseItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <ScrollReveal key={item.title} delay={120 + index * 120}>
                <article className="group block h-full overflow-hidden rounded-[1.1rem] border border-[#005BFF]/12 bg-white/78 p-4 shadow-xl shadow-[#005BFF]/7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#12B7FF]/35 hover:shadow-2xl hover:shadow-[#12B7FF]/18 dark:border-[#12B7FF]/14 dark:bg-[#0B1830]/72 dark:hover:border-[#12B7FF]/35 dark:hover:shadow-[#12B7FF]/12">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="text-xs font-semibold tracking-[0.22em] text-muted-foreground/70">
                      {item.number}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-base font-semibold text-foreground">
                        {item.title}
                      </h3>
                    </div>
                    <Icon
                      className="size-5 shrink-0 stroke-[1.6] text-[#005BFF] dark:text-[#12B7FF]"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="rounded-xl border border-border/70 bg-background/76 p-3">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                        Live module
                      </span>
                      <CheckCircle2
                        className="size-3.5 text-[#005BFF] dark:text-[#12B7FF]"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="grid gap-2">
                      {item.features.map((feature, featureIndex) => (
                        <div
                          key={feature}
                          className="flex items-center gap-2.5 rounded-lg bg-muted/50 p-2.5"
                        >
                          <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-[#005BFF]/10 text-xs font-bold text-[#005BFF] dark:bg-[#12B7FF]/12 dark:text-[#12B7FF]">
                            {featureIndex + 1}
                          </span>
                          <span className="text-xs font-semibold text-foreground">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4">
                    <span className="inline-flex rounded-full bg-[#EAF8FF]/85 px-2.5 py-1 text-xs font-semibold text-[#005BFF] ring-1 ring-[#005BFF]/8 dark:bg-[#12B7FF]/12 dark:text-[#12B7FF] dark:ring-[#12B7FF]/14">
                      {item.category}
                    </span>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PosWorkflowSection() {
  return (
    <section className="py-20 transition-colors sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
        <ScrollReveal>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#005BFF] dark:text-[#12B7FF]">
              Workflow
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal text-foreground sm:text-4xl">
              A clear rollout from setup
              <span className="hero-heading-accent block">
                to daily operations.
              </span>
            </h2>
            <p className="mt-5 text-base leading-7 text-muted-foreground">
              We keep the launch practical: understand the store, configure the
              system, connect the order channels, train the team, and support
              real usage after go-live.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <div className="rounded-[1.5rem] border border-border/70 bg-card p-5 shadow-xl shadow-foreground/5">
            <div className="grid gap-3 sm:grid-cols-4">
              {posWorkflowVisual.map((step, index) => (
                <div
                  key={step}
                  className="rounded-2xl bg-muted/50 p-4 text-center"
                >
                  <CircleDot
                    className="mx-auto size-5 text-[#005BFF] dark:text-[#12B7FF]"
                    aria-hidden="true"
                  />
                  <p className="mt-3 text-sm font-semibold text-foreground">
                    {step}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Step {index + 1}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 grid gap-4">
              {posWorkflowSteps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <div
                    key={step.title}
                    className="flex gap-4 rounded-2xl border border-border/70 bg-background p-5"
                  >
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#005BFF]/10 text-[#005BFF] dark:bg-[#12B7FF]/15 dark:text-[#12B7FF]">
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground">
                        0{index + 1}
                      </p>
                      <h3 className="mt-1 font-semibold text-foreground">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// No panel, matching the web development page: the closing pitch sits directly
// on the page with a hairline rule carrying the supporting points beneath it.
function PosFinalCTA() {
  return (
    <section className="relative overflow-hidden px-4 py-20 transition-colors sm:px-6 sm:py-24 lg:px-8">
      <div className="absolute left-1/2 top-1/4 -z-10 size-[34rem] max-w-[92vw] -translate-x-1/2 rounded-full bg-[#12B7FF]/8 blur-3xl dark:bg-[#005BFF]/12" />

      <div className="mx-auto max-w-7xl">
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#005BFF] dark:text-[#12B7FF]">
            Start with clarity
          </p>

          <h2 className="mt-3 text-4xl font-semibold leading-tight tracking-normal text-foreground sm:text-5xl">
            Ready to plan your next
            <span
              className="hero-heading-accent block"
              style={{ textShadow: "none" }}
            >
              point-of-sale initiative?
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground">
            Tell us how your store or restaurant sells today. We&apos;ll help
            map the right POS, ordering, payment, and reporting setup for
            smoother daily operations.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-7">
            <Button
              asChild
              size="lg"
              className="h-13 rounded-full bg-[#005BFF] px-8 text-base font-semibold text-white shadow-[0_14px_34px_rgba(0,91,255,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#004FE0]"
            >
              <Link href="/book-appointment">
                Book a POS consultation
                <ArrowRight className="size-5" aria-hidden="true" />
              </Link>
            </Button>

            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock3 className="size-4 text-[#12B7FF]" aria-hidden="true" />
              Response within 24 hours
            </span>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {posCtaTrustPoints.map((point) => (
              <span
                key={point}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <CheckCircle2
                  className="size-4 text-[#12B7FF]"
                  aria-hidden="true"
                />
                {point}
              </span>
            ))}
          </div>
        </ScrollReveal>

        <div className="mx-auto mt-16 grid max-w-5xl border-t border-[#005BFF]/12 dark:border-[#12B7FF]/14 sm:grid-cols-3">
          {posCtaHighlights.map((item, index) => {
            const Icon = item.icon;

            return (
              <ScrollReveal
                key={item.title}
                delay={120 + index * 120}
                className="flex flex-col items-center border-b border-[#005BFF]/12 px-6 py-8 text-center last:border-b-0 dark:border-[#12B7FF]/14 sm:border-b-0 sm:border-r sm:last:border-r-0"
              >
                <Icon
                  className="size-6 stroke-[1.6] text-[#005BFF] dark:text-[#12B7FF]"
                  aria-hidden="true"
                />
                <p className="mt-4 text-sm font-semibold text-foreground">
                  {item.title}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// `service` and `projects` come from the route: this page places the portfolio
// itself (above the CTA), so the slug is listed in SLUGS_WITH_INLINE_PORTFOLIO
// and the route no longer appends one after the page.
export default function PointOfSalePage({ service, projects }) {
  return (
    <main className="flex-1">
      <PosHero />
      <PosOverview />
      <PosSolutionsShowcase />
      <TechnologiesToolsSection
        tools={posTools}
        eyebrow="POS Technologies & Tools"
        title="Connected systems behind"
        accentTitle="smooth merchant operations."
        description="We combine reliable POS hardware, payment integrations, order channels, dashboards, and cloud tools into one practical operating layer."
      />
      <ServicePortfolioSection service={service} projects={projects} />
      <PosFinalCTA />
    </main>
  );
}
