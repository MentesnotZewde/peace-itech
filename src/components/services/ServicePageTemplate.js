import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  CircleDot,
  Code2,
  Eye,
  ExternalLink,
  Gauge,
  Headphones,
  Layers3,
  LockKeyhole,
  MonitorSmartphone,
  PenTool,
  SearchCheck,
  ShoppingCart,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ui/ScrollReveal";

const webFeatureCards = [
  {
    title: "Responsive",
    subtitle: "Design",
    icon: MonitorSmartphone,
  },
  {
    title: "Blazing Fast",
    subtitle: "Performance",
    icon: Gauge,
  },
  {
    title: "SEO",
    subtitle: "Optimized",
    icon: SearchCheck,
  },
  {
    title: "Secure & Reliable",
    subtitle: "Protected",
    icon: LockKeyhole,
  },
];

const webOverviewTrustItems = [
  { label: "Strategy", icon: SearchCheck },
  { label: "Design", icon: PenTool },
  { label: "Development", icon: Code2 },
  { label: "Support", icon: Headphones },
];

const webOverviewCards = [
  {
    number: "01",
    title: "Responsive Business Websites",
    description: "Beautiful websites that work smoothly on desktop, tablet, and mobile.",
    icon: MonitorSmartphone,
  },
  {
    number: "02",
    title: "SaaS & Web Applications",
    description: "Custom dashboards, portals, booking systems, and business tools.",
    icon: Layers3,
  },
  {
    number: "03",
    title: "Ecommerce Storefronts",
    description: "Clean online stores designed for products, payments, and customer trust.",
    icon: ShoppingCart,
  },
];

const webShowcaseProjects = [
  {
    number: "01",
    title: "Wado Tax Services",
    category: "Tax Services Website",
    description:
      "A professional tax services website for individuals, rideshare drivers, small businesses, corporate tax support, and bookkeeping.",
    image: "/images/Wado Tax Services.png",
    href: "https://www.wadotax.ca/",
  },
  {
    number: "02",
    title: "Buzu Cleaning Service",
    category: "Cleaning Services Website",
    description:
      "A service-focused website for a Toronto cleaning company offering commercial, facility, home, and office cleaning services.",
    image: "/images/Buzu Cleaning Service.png",
    href: "https://www.buzucleaning.ca/",
  },
  {
    number: "03",
    title: "Madina Elemo Agency",
    category: "Foreign Employment Agency Website",
    description:
      "A clear employment agency website built to connect individuals with foreign job opportunities.",
    image: "/images/Madina Elemo Agency.png",
    href: "https://madinaelemoagency.com/",
  },
  {
    number: "04",
    title: "H2H Express Delivery",
    category: "Delivery & Logistics Website",
    description:
      "A multilingual logistics website focused on fast, reliable delivery, 24/7 support, and business delivery solutions.",
    image: "/images/H2H Express Delivery.png",
    href: "https://h2h-express-delivery.vercel.app/am",
  },
];

function WebFeatureRail() {
  return (
    <div className="relative z-20 grid gap-3 sm:grid-cols-2 lg:block lg:space-y-4">
      {webFeatureCards.map((card, index) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="web-feature-card rounded-2xl border border-[#005BFF]/12 bg-white/78 p-4 shadow-xl shadow-[#005BFF]/10 backdrop-blur-xl dark:border-[#12B7FF]/20 dark:bg-[#07111F]/72 dark:shadow-[#12B7FF]/10 lg:w-[13.5rem]"
            style={{ "--card-delay": `${520 + index * 150}ms` }}
          >
            <div className="flex items-start gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#005BFF]/14 to-[#12B7FF]/18 text-[#005BFF] ring-1 ring-[#12B7FF]/20 dark:text-[#12B7FF]">
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold leading-5 text-foreground">{card.title}</p>
                <p className="mt-0.5 text-sm leading-5 text-muted-foreground">{card.subtitle}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function WebDevelopmentOverview() {
  return (
    <section className="relative overflow-hidden py-20 transition-colors sm:py-24">
      <div className="absolute left-1/2 top-10 -z-10 size-[28rem] -translate-x-1/2 rounded-full bg-[#12B7FF]/10 blur-3xl dark:bg-[#005BFF]/12" />

      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <ScrollReveal>
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#005BFF] dark:text-[#12B7FF]">
              Overview
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal text-foreground sm:text-5xl">
              Websites built for
              <span className="hero-heading-accent block">business growth.</span>
            </h2>
            <p className="mt-5 text-base leading-7 text-muted-foreground">
              We design and build responsive, fast, and easy-to-manage websites that help businesses look professional, earn trust, and convert visitors into customers.
            </p>

            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-4">
              {webOverviewTrustItems.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-2 text-sm font-semibold text-muted-foreground"
                  >
                    <Icon className="size-4 text-[#005BFF] dark:text-[#12B7FF]" aria-hidden="true" />
                    <span>{item.label}</span>
                    {index < webOverviewTrustItems.length - 1 ? (
                      <span className="text-[#12B7FF]/60" aria-hidden="true">•</span>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        <div className="grid gap-4 sm:grid-cols-3">
          {webOverviewCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <ScrollReveal key={card.title} delay={120 + index * 140}>
                <article className="group relative h-full overflow-hidden rounded-[1.25rem] border border-[#005BFF]/10 bg-white/82 p-6 shadow-[0_18px_44px_rgba(0,91,255,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-[#12B7FF]/35 hover:shadow-[0_26px_64px_rgba(18,183,255,0.18)] dark:border-[#12B7FF]/14 dark:bg-[#0B1830]/72 dark:shadow-black/20 dark:hover:border-[#12B7FF]/35 dark:hover:shadow-[#12B7FF]/12">
                  <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-[#005BFF]/16 to-transparent dark:via-[#12B7FF]/18" />
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#12B7FF]/45 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-[#005BFF]/7 via-[#12B7FF]/8 to-transparent text-[#005BFF] ring-1 ring-[#005BFF]/12 transition-transform duration-300 group-hover:scale-105 dark:from-[#12B7FF]/12 dark:via-[#005BFF]/10 dark:text-[#12B7FF] dark:ring-[#12B7FF]/16">
                      <Icon className="size-9 stroke-[1.7]" aria-hidden="true" />
                    </span>
                    <span className="rounded-lg bg-[#EAF8FF] px-2.5 py-1 text-sm font-bold text-[#005BFF] shadow-sm ring-1 ring-[#005BFF]/8 dark:bg-[#12B7FF]/12 dark:text-[#12B7FF] dark:ring-[#12B7FF]/14">
                      {card.number}
                    </span>
                  </div>

                  <h3 className="mt-7 max-w-48 text-xl font-semibold leading-7 text-foreground">
                    {card.title}
                  </h3>
                  <span className="mt-5 block h-0.5 w-8 rounded-full bg-[#005BFF] transition-all duration-300 group-hover:w-12 dark:bg-[#12B7FF]" />
                  <p className="mt-5 text-sm leading-7 text-muted-foreground">
                    {card.description}
                  </p>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WebDevelopmentShowcase() {
  return (
    <section className="relative overflow-hidden bg-muted/30 py-20 transition-colors sm:py-24">
      <div className="absolute right-0 top-0 -z-10 size-[28rem] rounded-full bg-[#12B7FF]/12 blur-3xl dark:bg-[#005BFF]/12" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#005BFF] dark:text-[#12B7FF]">
              Visual Showcase
            </p>
            <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-normal text-foreground sm:text-5xl">
              Web experiences that look
              <span className="hero-heading-accent block">premium and work hard.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
              A selection of real websites and digital platforms we have designed and developed for clients.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {webShowcaseProjects.map((project, index) => (
            <ScrollReveal
              key={project.title}
              delay={120 + index * 120}
            >
              <Link
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full overflow-hidden rounded-[1.35rem] border border-[#005BFF]/12 bg-white/78 p-4 shadow-xl shadow-[#005BFF]/7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-[#12B7FF]/35 hover:shadow-2xl hover:shadow-[#12B7FF]/18 dark:border-[#12B7FF]/14 dark:bg-[#0B1830]/72 dark:hover:border-[#12B7FF]/35 dark:hover:shadow-[#12B7FF]/12"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="rounded-xl bg-[#EAF8FF] px-3 py-2 text-sm font-bold text-[#005BFF] ring-1 ring-[#005BFF]/8 dark:bg-[#12B7FF]/12 dark:text-[#12B7FF] dark:ring-[#12B7FF]/14">
                    {project.number}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-lg font-semibold text-foreground">{project.title}</h3>
                  </div>
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl text-[#005BFF] transition-colors group-hover:bg-[#EAF8FF] dark:text-[#12B7FF] dark:group-hover:bg-[#12B7FF]/12">
                    <ExternalLink className="size-5" aria-hidden="true" />
                  </span>
                </div>

                <div className="overflow-hidden rounded-2xl border border-border/70 bg-background shadow-inner">
                  <Image
                    src={project.image}
                    alt={`${project.title} website screenshot`}
                    width={1200}
                    height={760}
                    className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.035]"
                    sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                  />
                </div>

                <div className="pt-5">
                  <span className="inline-flex rounded-full bg-[#EAF8FF]/85 px-3 py-1 text-xs font-semibold text-[#005BFF] ring-1 ring-[#005BFF]/8 dark:bg-[#12B7FF]/12 dark:text-[#12B7FF] dark:ring-[#12B7FF]/14">
                    {project.category}
                  </span>
                  <p className="mt-4 text-sm leading-6 text-muted-foreground">
                    {project.description}
                  </p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={220}>
          <div className="mt-12 flex justify-center">
            <Button asChild size="lg" variant="outline" className="h-12 rounded-full bg-background/70 px-6 backdrop-blur hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#12B7FF]/10">
              <Link href="/#case-studies">
                See more projects
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function WebFeatureConnectors() {
  return (
    <svg
      className="web-feature-connectors pointer-events-none absolute left-[12.6rem] right-[2rem] top-1/2 z-0 hidden h-[24rem] -translate-y-1/2 lg:block"
      viewBox="0 0 520 360"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="webConnectorGradient" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#005BFF" stopOpacity="0.18" />
          <stop offset="52%" stopColor="#12B7FF" stopOpacity="0.42" />
          <stop offset="100%" stopColor="#005BFF" stopOpacity="0.08" />
        </linearGradient>
        <filter id="webConnectorGlow" x="-20%" y="-80%" width="140%" height="260%">
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
        stroke="url(#webConnectorGradient)"
        strokeWidth="1.4"
        strokeDasharray="5 8"
      />
      {[46, 120, 204, 314].map((point, index) => (
        <g key={point}>
          <path
            className="web-connector-line"
            d={`M0 ${point} H22 C112 ${point} 134 ${180 + (index - 1.5) * 20} 270 ${180 + (index - 1.5) * 20} S402 ${180 + (index - 1.5) * 14} 500 ${180 + (index - 1.5) * 12}`}
            fill="none"
            stroke="url(#webConnectorGradient)"
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
            filter="url(#webConnectorGlow)"
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
        filter="url(#webConnectorGlow)"
        style={{ "--line-delay": "1180ms" }}
      />
    </svg>
  );
}

function WebHeroImage() {
  return (
    <div className="web-hero-image-enter relative z-10 mx-auto w-full max-w-[64rem] lg:-mr-24 xl:-mr-32">
      <div className="absolute inset-x-8 bottom-4 h-12 rounded-full bg-[#005BFF]/22 blur-2xl dark:bg-[#12B7FF]/24" />
      <Image
        src="/images/web-development-hero-inspo.png?v=2"
        alt="Responsive website displayed across desktop, tablet, and mobile screens"
        width={1536}
        height={960}
        priority
        unoptimized
        className="relative z-10 h-auto w-full object-contain drop-shadow-[0_28px_50px_rgba(0,91,255,0.18)] dark:drop-shadow-[0_28px_50px_rgba(18,183,255,0.18)]"
        sizes="(min-width: 1280px) 64rem, (min-width: 1024px) 58rem, 100vw"
      />
    </div>
  );
}

function WebDevelopmentHero({ service }) {
  return (
    <section className="relative isolate overflow-hidden bg-transparent px-4 py-12 transition-colors sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background/18 via-background/4 to-background/82 dark:from-background/20 dark:via-background/5 dark:to-background/88" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <div className="web-hero-copy-enter max-w-3xl">
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-[#005BFF]/22 bg-background/74 px-4 py-2 text-xs font-semibold uppercase tracking-normal text-[#005BFF] shadow-sm backdrop-blur dark:border-[#12B7FF]/30 dark:text-[#12B7FF]">
              <Sparkles className="size-4" aria-hidden="true" />
              {service.title}
            </div>

            <h1 className="font-heading text-4xl font-semibold leading-tight tracking-normal text-foreground sm:text-5xl lg:text-[3.35rem]">
              <span
                className="animate-hero-heading-word block opacity-0"
                style={{ animationDelay: "160ms" }}
              >
                Modern Websites.
              </span>
              <span
                className="animate-hero-heading-word hero-heading-accent block opacity-0"
                style={{ animationDelay: "320ms" }}
              >
                Powerful Business Impact.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              We build fast, secure, and scalable websites that help businesses grow online. From custom websites to web applications, we turn ideas into digital experiences that engage and convert.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-full bg-[#005BFF] px-6 text-white shadow-xl shadow-[#005BFF]/20 hover:-translate-y-0.5 hover:bg-[#071B8F] hover:shadow-[#12B7FF]/20"
              >
                <Link href="/#contact">
                  Talk to an expert
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-full bg-background/70 px-6 backdrop-blur hover:-translate-y-0.5"
              >
                <Link href="/#case-studies">
                  View our work
                  <Eye className="size-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative grid gap-6 lg:grid-cols-[13.5rem_minmax(0,1fr)] lg:items-center xl:grid-cols-[13.5rem_minmax(0,1.16fr)]">
            <WebFeatureConnectors />
            <WebFeatureRail />
            <WebHeroImage />
          </div>
        </div>
      </div>
    </section>
  );
}

function DashboardPreview({ service }) {
  const Icon = service.icon;

  return (
    <div className="relative animate-float">
      <div className="absolute -right-3 top-10 hidden rounded-2xl border border-border/70 bg-background/90 p-4 shadow-xl shadow-foreground/10 backdrop-blur md:block">
        <p className="text-2xl font-semibold text-foreground">{service.dashboardMetric}</p>
        <p className="mt-1 max-w-32 text-xs leading-5 text-muted-foreground">
          {service.dashboardLabel}
        </p>
      </div>

      <div className="rounded-[1.5rem] border border-border/70 bg-background/85 p-4 shadow-2xl shadow-foreground/10 backdrop-blur">
        <div className="mb-5 flex items-center justify-between border-b border-border/70 pb-4">
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-red-400" />
            <span className="size-3 rounded-full bg-[#12B7FF]" />
            <span className="size-3 rounded-full bg-[#12B7FF]" />
          </div>
          <span className="text-xs font-medium text-muted-foreground">
            Peace iTech Console
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-3">
            {service.outcomes.map((outcome) => (
              <div key={outcome} className="rounded-2xl border border-border bg-muted/40 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-foreground">{outcome}</p>
                  <CheckCircle2 className="size-4 shrink-0 text-[#005BFF]" aria-hidden="true" />
                </div>
                <div className="mt-4 h-2 rounded-full bg-background">
                  <div className="h-2 w-4/5 rounded-full bg-gradient-to-r from-[#005BFF] to-[#12B7FF]" />
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-foreground p-5 text-background">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-background/70">Live workspace</p>
                <p className="mt-1 text-2xl font-semibold">{service.title}</p>
              </div>
              <Icon className="size-8 text-[#12B7FF]" aria-hidden="true" />
            </div>
            <div className="mt-8 grid grid-cols-4 gap-2">
              {[72, 88, 62, 96, 54, 78, 84, 66].map((height, index) => (
                <span
                  key={index}
                  className="rounded-lg bg-background/20"
                  style={{ height: `${height}px` }}
                />
              ))}
            </div>
            <div className="mt-6 rounded-xl bg-background/10 p-3">
              <div className="flex items-center gap-2">
                <Layers3 className="size-4" aria-hidden="true" />
                <p className="text-sm font-medium">Integrated delivery layer</p>
              </div>
              <p className="mt-2 text-sm leading-6 text-background/70">
                Strategy, design, engineering, launch, and support connected in one workflow.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function VisualShowcase({ service }) {
  return (
    <section className="bg-muted/30 py-20 transition-colors sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#005BFF]">
            Visual showcase
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-normal text-foreground sm:text-5xl">
            {service.showcaseTitle}
          </h2>
        </div>

        {/* Responsive design logic: cards stack on phones, become a 3-column showcase on desktop. */}
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {service.showcaseItems.slice(0, 3).map((item, index) => (
            <div
              key={item}
              className={`group relative overflow-hidden rounded-[1.5rem] border border-border/70 bg-gradient-to-br ${service.accent} p-5 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#005BFF]/10 ${index === 0 ? "lg:row-span-2" : ""}`}
            >
              <div className="absolute inset-0 bg-background/60 backdrop-blur-[1px]" />
              <div className="relative">
                <p className="text-sm font-semibold text-muted-foreground">0{index + 1}</p>
                <h3 className="mt-3 text-xl font-semibold text-foreground">{item}</h3>
              </div>
              <div className="relative mt-8 rounded-2xl border border-border/70 bg-background/80 p-4 shadow-xl">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex gap-2">
                    <span className="size-3 rounded-full bg-red-400" />
                    <span className="size-3 rounded-full bg-[#12B7FF]" />
                    <span className="size-3 rounded-full bg-[#12B7FF]" />
                  </div>
                  <MonitorSmartphone className="size-4 text-muted-foreground" aria-hidden="true" />
                </div>
                <div className="grid gap-3">
                  {[0, 1, 2].map((line) => (
                    <span
                      key={line}
                      className="h-3 rounded-full bg-muted"
                      style={{ width: `${94 - line * 17}%` }}
                    />
                  ))}
                </div>
                <div className="mt-6 grid grid-cols-5 gap-2">
                  {[58, 82, 66, 94, 74].map((height, barIndex) => (
                    <span
                      key={barIndex}
                      className="rounded-lg bg-gradient-to-t from-[#005BFF]/50 to-[#12B7FF]/50"
                      style={{ height: `${height + index * 5}px` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}

          <div className="grid gap-5 lg:col-span-3 lg:grid-cols-2">
            {service.showcaseItems.slice(3).map((item) => (
              <div
                key={item}
                className="rounded-[1.5rem] border border-border/70 bg-background p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#12B7FF]/10"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      Project surface
                    </p>
                    <h3 className="mt-3 text-xl font-semibold text-foreground">{item}</h3>
                  </div>
                  <Sparkles className="size-5 shrink-0 text-[#005BFF]" aria-hidden="true" />
                </div>
                <div className="mt-6 grid grid-cols-[1fr_0.45fr] gap-3">
                  <div className="rounded-2xl border border-border bg-muted/40 p-4">
                    <span className="block h-24 rounded-xl bg-gradient-to-br from-[#005BFF]/20 to-[#12B7FF]/20" />
                  </div>
                  <div className="rounded-2xl border border-border bg-muted/40 p-3">
                    <span className="block h-24 rounded-xl bg-background" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkflowSection({ service }) {
  return (
    <section className="py-20 transition-colors sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#005BFF]">
            Workflow
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-normal text-foreground sm:text-5xl">
            A clear process from idea to managed improvement.
          </h2>
          <p className="mt-5 text-base leading-7 text-muted-foreground">
            We keep every phase visible, so business owners, teams, and technical stakeholders know what is happening and why it matters.
          </p>
        </div>

        <div className="rounded-[1.5rem] border border-border/70 bg-card p-5 shadow-xl shadow-foreground/5">
          {/* Section structure: top row shows the service-specific workflow, bottom cards explain delivery steps. */}
          <div className="grid gap-3 sm:grid-cols-4">
            {service.workflowVisual.map((step, index) => (
              <div key={step} className="rounded-2xl bg-muted/50 p-4 text-center">
                <CircleDot className="mx-auto size-5 text-[#005BFF]" aria-hidden="true" />
                <p className="mt-3 text-sm font-semibold text-foreground">{step}</p>
                <p className="mt-1 text-xs text-muted-foreground">Step {index + 1}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 grid gap-4">
            {service.process.map((step, index) => (
              <div key={step} className="flex gap-4 rounded-2xl border border-border/70 bg-background p-5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-foreground text-sm font-semibold text-background">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-foreground">{step}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    We document decisions, align the work with business value, and keep the build practical for real operations.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ServicePageTemplate({ service }) {
  const Icon = service.icon;

  return (
    <main className="flex-1">
      {service.slug === "web-development" ? (
        <WebDevelopmentHero service={service} />
      ) : (
        <section className="relative overflow-hidden px-4 py-10 transition-colors sm:px-6 lg:px-8">
          <div className="absolute left-1/2 top-0 -z-10 size-[34rem] -translate-x-1/2 rounded-full bg-[#12B7FF]/15 blur-3xl" />
          <div className="absolute right-0 top-24 -z-10 size-80 rounded-full bg-[#12B7FF]/15 blur-3xl" />

          <div className="mx-auto max-w-7xl">
            {/* Reusable layout: every service page uses the same premium shell while service data changes the content. */}
            <div className={`grid gap-10 rounded-[2rem] border border-border/70 bg-gradient-to-br ${service.accent} p-5 shadow-2xl shadow-foreground/10 sm:p-8 lg:grid-cols-[0.92fr_1.08fr] lg:p-10`}>
              <div className="flex flex-col justify-center rounded-[1.5rem] bg-background/70 p-6 backdrop-blur sm:p-8">
                <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#005BFF]/15 to-[#12B7FF]/15 text-[#005BFF] ring-1 ring-[#005BFF]/20">
                  <Icon className="size-7" aria-hidden="true" />
                </div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#005BFF]">
                  {service.eyebrow}
                </p>
                <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight tracking-normal text-foreground sm:text-6xl">
                  {service.title}
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                  {service.description}
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button asChild size="lg" className="h-12 rounded-full px-6">
                    <Link href="/#contact">
                      Talk to an expert
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="h-12 rounded-full bg-background/70 px-6">
                    <Link href="/#case-studies">View work</Link>
                  </Button>
                </div>
              </div>

              <DashboardPreview service={service} />
            </div>
          </div>
        </section>
      )}

      {service.slug === "web-development" ? (
        <WebDevelopmentOverview />
      ) : (
        <section className="py-20 transition-colors sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#005BFF]">
                Overview
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-normal text-foreground sm:text-5xl">
                Business-focused delivery with polished technical execution.
              </h2>
              <p className="mt-5 text-base leading-7 text-muted-foreground">
                {service.overview}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {service.outcomes.map((outcome) => (
                <div key={outcome} className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#005BFF]/10">
                  <CheckCircle2 className="size-5 text-[#005BFF]" aria-hidden="true" />
                  <p className="mt-5 text-sm font-semibold text-foreground">{outcome}</p>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    Designed with clear ownership, clean interfaces, and maintainable systems.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {service.slug === "web-development" ? (
        <WebDevelopmentShowcase />
      ) : (
        <VisualShowcase service={service} />
      )}

      <section className="py-20 transition-colors sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-border/70 bg-background p-6 shadow-xl shadow-foreground/5 sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#005BFF]">
                  Technologies and tools
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-normal text-foreground sm:text-4xl">
                  A modern stack selected for the job.
                </h2>
              </div>
              {/* Component organization: this tool cloud is shared by all services but populated from service data. */}
              <div className="flex flex-wrap gap-3">
                {service.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-full border border-border bg-muted/50 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-background"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <WorkflowSection service={service} />

      <section className="px-4 py-20 transition-colors sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-foreground p-8 text-background shadow-2xl shadow-foreground/10 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-background/60">
                Start with clarity
              </p>
              <h2 className="mt-3 max-w-3xl text-3xl font-semibold sm:text-5xl">
                Ready to plan a {service.title.toLowerCase()} initiative?
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-6 text-background/70">
                Tell us what you want to improve. We will help turn it into a clear roadmap, strong interface, and practical delivery plan.
              </p>
            </div>
            <Button asChild size="lg" variant="secondary" className="h-12 rounded-full px-6">
              <Link href="/#contact">
                Book a consultation
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}


