import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  CircleDot,
  Clock3,
  Code2,
  Eye,
  ExternalLink,
  Gauge,
  Headphones,
  Layers3,
  LockKeyhole,
  MonitorSmartphone,
  PenTool,
  Rocket,
  SearchCheck,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Sparkles,
  UsersRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ServicePortfolioSection from "@/components/services/ServicePortfolioSection";
import TechnologiesToolsSection from "@/components/services/TechnologiesToolsSection";
import WebDevelopmentWorkflowSection from "@/components/services/WebDevelopmentWorkflowSection";
import BusinessAutomationPage from "@/components/services/BusinessAutomationPage";
import DigitalMarketingPage from "@/components/services/DigitalMarketingPage";
import ErpSystemsPage from "@/components/services/ErpSystemsPage";
import CybersecurityPage from "@/components/services/CybersecurityPage";
import ItSupportPage from "@/components/services/ItSupportPage";
import PointOfSalePage from "@/components/services/PointOfSalePage";

// Handled inside this template, which places the portfolio in the page flow;
// every other service gets it appended by the route.
export const SLUGS_WITH_INLINE_PORTFOLIO = [
  "web-development",
  "business-automation",
  "digital-marketing",
  "it-support",
  "point-of-sale",
];

// Kept at four: WebFeatureConnectors draws one line per card from a hardcoded
// list of four anchor points.
const webFeatureCards = [
  {
    title: "Web & Mobile",
    subtitle: "Responsive apps",
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
    description:
      "Beautiful websites that work smoothly on desktop, tablet, and mobile.",
    icon: MonitorSmartphone,
  },
  {
    number: "02",
    title: "iOS & Android Apps",
    description:
      "Native-feeling mobile apps built once and shipped to both app stores.",
    icon: Smartphone,
  },
  {
    number: "03",
    title: "SaaS & Web Applications",
    description:
      "Custom dashboards, portals, booking systems, and business tools.",
    icon: Layers3,
  },
  {
    number: "04",
    title: "Ecommerce Storefronts",
    description:
      "Clean online stores designed for products, payments, and customer trust.",
    icon: ShoppingCart,
  },
];

function WebFeatureRail() {
  return (
    <div className="relative z-20 grid grid-cols-2  divide-x divide-y divide-border/70 rounded-2xl bg-white/78 p-3 dark:bg-[#07111F]/72 lg:block lg:space-y-4 lg:divide-x-0 lg:divide-y-0 lg:bg-transparent lg:p-0">
      {webFeatureCards.map((card, index) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="web-feature-card rounded-2xl border border-transparent bg-transparent p-4 shadow-none lg:border-[#005BFF]/12 lg:bg-white/78 lg:shadow-xl lg:shadow-[#005BFF]/10 backdrop-blur-xl dark:border-transparent dark:bg-transparent lg:dark:border-[#12B7FF]/20 lg:dark:bg-[#07111F]/72 lg:dark:shadow-[#12B7FF]/10 lg:w-[13.5rem]"
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

function WebDevelopmentOverview() {
  return (
    <section className="relative overflow-hidden py-20 transition-colors sm:py-24">
      <div className="absolute left-1/2 top-10 -z-10 size-[28rem] -translate-x-1/2 rounded-full bg-[#12B7FF]/10 blur-3xl dark:bg-[#005BFF]/12" />

      <div className="mx-auto  max-w-7xl  px-4 ">
        <ScrollReveal>
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#005BFF] dark:text-[#12B7FF]">
              Overview
            </p>
          </div>
        </ScrollReveal>

        {/* No card surfaces: the items are separated by hairline rules only, so
            the section reads as one continuous grid. The rules are set per cell
            rather than with `divide-*`, which cannot describe a grid that
            rewraps from 1 to 2 to 4 columns. */}
        <div className="mt-8 grid border-t border-[#005BFF]/12 dark:border-[#12B7FF]/14 sm:grid-cols-2 lg:grid-cols-4">
          {webOverviewCards.map((item, index) => {
            const Icon = item.icon;

            return (
              <ScrollReveal
                key={item.title}
                delay={120 + index * 140}
                className="group relative border-b border-[#005BFF]/12 px-6 py-9 dark:border-[#12B7FF]/14 sm:px-8 sm:py-10 sm:odd:border-r lg:border-r lg:last:border-r-0"
              >
                {/* Lights up the rule under the item on hover. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-6 -bottom-px h-px origin-left scale-x-0 bg-gradient-to-r from-[#005BFF] to-[#12B7FF] opacity-0 transition duration-500 group-hover:scale-x-100 group-hover:opacity-100 sm:inset-x-8"
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
        <filter
          id="webConnectorGlow"
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
    <div className="web-hero-image-enter relative z-10 mx-auto w-full max-w-[58rem]">
      <div className="absolute inset-x-8 bottom-4 h-12 rounded-full bg-[#005BFF]/22 blur-2xl dark:bg-[#12B7FF]/24" />
      <Image
        src="/images/web-development-hero-inspo.png"
        alt="Responsive website displayed across desktop, tablet, and mobile screens"
        width={1536}
        height={960}
        priority
        quality={85}
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
            <h1 className="font-heading text-4xl font-semibold leading-tight tracking-normal text-foreground sm:text-5xl lg:text-[2.35rem]">
              <span
                className="font-heading animate-hero-heading-word block opacity-0"
                style={{ animationDelay: "160ms" }}
              >
                Websites &amp; Apps.
              </span>
              <span
                className="font-heading animate-hero-heading-word hero-heading-accent block opacity-0"
                style={{ animationDelay: "320ms" }}
              >
                Built for Business.{" "}
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-md">
              We build fast, secure, and scalable websites and mobile apps that
              help businesses grow online. From custom websites to iOS and
              Android applications, we turn ideas into digital experiences that
              engage and convert.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-md bg-[#397dfc] px-6 text-white shadow-xl shadow-[#005BFF]/20 hover:-translate-y-0.5 hover:bg-[#071B8F] hover:shadow-[#12B7FF]/20"
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
                <Link href="/services/web-development#visual-showcase">
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

const webDevelopmentCtaHighlights = [
  {
    title: "Expert guidance",
    description: "Real solutions",
    icon: UsersRound,
  },
  {
    title: "Clear roadmap",
    description: "No guesswork",
    icon: ShieldCheck,
  },
  {
    title: "Practical delivery",
    description: "Measurable results",
    icon: Rocket,
  },
];

const webDevelopmentCtaTrustPoints = [
  "No pressure",
  "Clear advice",
  "Practical next steps",
];

// No panels or boxes: the closing pitch sits directly on the page, with a
// single hairline rule carrying the supporting points beneath it.
function WebDevelopmentFinalCTA() {
  return (
    <section className="relative overflow-hidden px-4 py-10 transition-colors sm:px-6 sm:py-14 lg:px-8">
      <div className="absolute left-1/2 top-1/4 -z-10 size-[34rem] max-w-[92vw] -translate-x-1/2 rounded-full bg-[#12B7FF]/8 blur-3xl dark:bg-[#005BFF]/12" />

      <div className="mx-auto max-w-7xl">
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <p className="text-sm  uppercase tracking-[0.18em] text-[#005BFF] dark:text-[#12B7FF]">
            Start with clarity
          </p>

          <h2 className="font-heading mt-3 text-4xl font-semibold leading-tight tracking-normal text-foreground sm:text-3xl">
            Ready to plan your next
            <span
              className="hero-heading-accent block"
              style={{ textShadow: "none" }}
            >
              web or app initiative?
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground">
            Tell us what you want to improve. We&apos;ll help turn it into a
            clear roadmap, strong interface, and practical delivery plan.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-7">
            <Button
              asChild
              size="lg"
              className="h-13 rounded-md bg-[#005BFF] px-8 text-base font-semibold text-white shadow-[0_14px_34px_rgba(0,91,255,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#004FE0]"
            >
              <Link href="/book-appointment">
                Book a consultation
                <ArrowRight className="size-5" aria-hidden="true" />
              </Link>
            </Button>

            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock3 className="size-4 text-[#12B7FF]" aria-hidden="true" />
              Response within 24 hours
            </span>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {webDevelopmentCtaTrustPoints.map((point) => (
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
          {webDevelopmentCtaHighlights.map((item, index) => {
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

function DashboardPreview({ service }) {
  const Icon = service.icon;

  return (
    <div className="relative animate-float">
      <div className="absolute -right-3 top-10 hidden rounded-2xl border border-border/70 bg-background/90 p-4 shadow-xl shadow-foreground/10 backdrop-blur md:block">
        <p className="text-2xl font-semibold text-foreground">
          {service.dashboardMetric}
        </p>
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
              <div
                key={outcome}
                className="rounded-2xl border border-border bg-muted/40 p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-foreground">
                    {outcome}
                  </p>
                  <CheckCircle2
                    className="size-4 shrink-0 text-[#005BFF]"
                    aria-hidden="true"
                  />
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
                Strategy, design, engineering, launch, and support connected in
                one workflow.
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
                <p className="text-sm font-semibold text-muted-foreground">
                  0{index + 1}
                </p>
                <h3 className="mt-3 text-xl font-semibold text-foreground">
                  {item}
                </h3>
              </div>
              <div className="relative mt-8 rounded-2xl border border-border/70 bg-background/80 p-4 shadow-xl">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex gap-2">
                    <span className="size-3 rounded-full bg-red-400" />
                    <span className="size-3 rounded-full bg-[#12B7FF]" />
                    <span className="size-3 rounded-full bg-[#12B7FF]" />
                  </div>
                  <MonitorSmartphone
                    className="size-4 text-muted-foreground"
                    aria-hidden="true"
                  />
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
                    <h3 className="mt-3 text-xl font-semibold text-foreground">
                      {item}
                    </h3>
                  </div>
                  <Sparkles
                    className="size-5 shrink-0 text-[#005BFF]"
                    aria-hidden="true"
                  />
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
          <p className="text-sm  uppercase tracking-[0.18em] text-[#005BFF]">
            Workflow
          </p>
          <h2 className="font-heading mt-3 text-3xl font-semibold tracking-normal text-foreground sm:text-4xl">
            From Idea to Ongoing Improvement.{" "}
          </h2>
          <p className="mt-5 text-base leading-7 text-muted-foreground">
            We keep every phase visible, so business owners, teams, and
            technical stakeholders know what is happening and why it matters.
          </p>
        </div>

        <div className="rounded-[1.5rem] border border-border/70 bg-card p-5 shadow-xl shadow-foreground/5">
          {/* Section structure: top row shows the service-specific workflow, bottom cards explain delivery steps. */}
          <div className="grid gap-3 sm:grid-cols-4">
            {service.workflowVisual.map((step, index) => (
              <div
                key={step}
                className="rounded-2xl bg-muted/50 p-4 text-center"
              >
                <CircleDot
                  className="mx-auto size-5 text-[#005BFF]"
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
            {service.process.map((step, index) => (
              <div
                key={step}
                className="flex gap-4 rounded-2xl border border-border/70 bg-background p-5"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-foreground text-sm font-semibold text-background">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-foreground">{step}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    We document decisions, align the work with business value,
                    and keep the build practical for real operations.
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

export default function ServicePageTemplate({ service, projects }) {
  const Icon = service.icon;

  if (service.slug === "business-automation") {
    return <BusinessAutomationPage service={service} projects={projects} />;
  }

  if (service.slug === "digital-marketing") {
    return <DigitalMarketingPage service={service} projects={projects} />;
  }

  if (service.slug === "erp-systems") {
    return <ErpSystemsPage service={service} />;
  }

  if (service.slug === "cybersecurity") {
    return <CybersecurityPage service={service} />;
  }

  if (service.slug === "it-support") {
    return <ItSupportPage service={service} projects={projects} />;
  }

  if (service.slug === "point-of-sale") {
    return <PointOfSalePage service={service} projects={projects} />;
  }

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
            <div
              className={`grid gap-10 rounded-[2rem] border border-border/70 bg-gradient-to-br ${service.accent} p-5 shadow-2xl shadow-foreground/10 sm:p-8 lg:grid-cols-[0.92fr_1.08fr] lg:p-10`}
            >
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
                  <Button asChild size="lg" className="h-12 rounded-md px-6">
                    <Link href="/#contact">
                      Talk to an expert
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="h-12 rounded-full bg-background/70 px-6"
                  >
                    <Link href="/media-center">View work</Link>
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
                <div
                  key={outcome}
                  className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#005BFF]/10"
                >
                  <CheckCircle2
                    className="size-5 text-[#005BFF]"
                    aria-hidden="true"
                  />
                  <p className="mt-5 text-sm font-semibold text-foreground">
                    {outcome}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    Designed with clear ownership, clean interfaces, and
                    maintainable systems.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {service.slug === "web-development" ? (
        <ServicePortfolioSection service={service} projects={projects} />
      ) : (
        <VisualShowcase service={service} />
      )}

      <TechnologiesToolsSection />

      {service.slug === "web-development" ? (
        <WebDevelopmentWorkflowSection />
      ) : (
        <WorkflowSection service={service} />
      )}

      {service.slug === "web-development" ? (
        <WebDevelopmentFinalCTA />
      ) : (
        <section className="px-4 py-20 transition-colors sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-foreground p-8 text-background shadow-2xl shadow-foreground/10 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="font-heading text-sm uppercase tracking-[0.18em] text-background/60">
                  Start with clarity
                </p>
                <h2 className="font-heading mt-3 max-w-3xl text-2xl font-semibold sm:text-2xl">
                  Ready to plan a {service.title.toLowerCase()} initiative?
                </h2>
                <p className="mt-5 max-w-2xl text-sm leading-6 text-background/70">
                  Tell us what you want to improve. We will help turn it into a
                  clear roadmap, strong interface, and practical delivery plan.
                </p>
              </div>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="h-12 rounded-md px-6"
              >
                <Link href="/book-appointment">
                  Book a consultation
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
