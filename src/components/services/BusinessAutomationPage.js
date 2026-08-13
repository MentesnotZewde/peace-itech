import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Headphones,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Workflow,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ServicePortfolioSection from "@/components/services/ServicePortfolioSection";
import TechnologiesToolsSection from "@/components/services/TechnologiesToolsSection";

const automationMoments = [
  {
    title: "WorkFlow365",
    description:
      "Automate the entire employee lifecycle from onboarding, transfers, contract extensions, leave and returns, to offboarding  with intelligent workflows connecting HR, IT, managers, and operations.",
    icon: Sparkles,
    logo: "/images/365.png",
    logoAlt: "Microsoft 365 logo",
  },
  {
    title: "Google Apps Script",
    description:
      "We create tailored automations for Google Workspace—connecting Sheets, Forms, Gmail, Drive, and Calendar around the way your team already works.",
    logo: "/images/Google_Apps_Script.png",
    logoAlt: "Google Apps Script logo",
  },
  {
    title: "Power Automate",
    description:
      "We build Microsoft 365 flows that connect approvals, Outlook, Teams, SharePoint, and business systems without another manual handoff.",
    logo: "/images/Power Automate.png",
    logoAlt: "Power Automate logo",
  },
  {
    title: "AI automation",
    description:
      "We add practical AI steps to suitable workflows—helping teams summarize information, classify requests, draft responses, and act on routine data faster.",
    icon: Sparkles,
    logo: "/images/AI_Automation.png",
    logoAlt: "AI Automation logo",
  },
];

const deliverySteps = [
  [
    "Listen first",
    "We sit with the people doing the work and identify the handoffs that slow them down.",
  ],
  [
    "Sketch the flow",
    "Before connecting anything, we agree on the trigger, decisions, owners, and exceptions.",
  ],
  [
    "Build with care",
    "We connect your tools, test real scenarios, and keep a human in control where it matters.",
  ],
  [
    "Make it stick",
    "Your team gets a clear handover, simple documentation, and support as the process evolves.",
  ],
];

const automationTools = [
  { name: "Google Apps Script", logo: "/images/Google_Apps_Script.png" },
  {
    name: "Power Apps",
    logo: "/images/power-apps-icon.png",
  },
  { name: "Power Automate", logo: "/images/Power Automate.png" },
  { name: "SharePoint Online", logo: "/images/SharePoint.png" },
  {
    name: "Microsoft Entra ID",
    logo: "/images/Microsoft_Entra_ID.png",
  },
  {
    name: "Microsoft Teams",
    logo: "/images/Microsoft_Team.jpeg",
  },
  {
    name: "Exchange Online",
    logo: "/images/Exchange_online.png",
  },
  {
    name: "Microsoft 365",
    logo: "/images/365.png",
  },
  {
    name: "Excel Online",
    logo: "/images/Excel Online.png",
  },
  { name: "Power Automate Management", logo: "/images/Power Automate.png" },
];

const heroAppIcons = [
  {
    label: "Workflow365",
    logo: "/images/365.png",
    logoAlt: "Workflow365 logo",
    x: 21,
    y: 12,
  },
  {
    label: "Email automation",
    logo: "/images/Exchange_online.png",
    logoAlt: "Exchange Online logo",
    x: 34,
    y: 10,
  },
  {
    label: "Approval automation",
    icon: CheckCircle2,
    x: 44,
    y: 22,
  },
  {
    label: "Google Apps Script",
    logo: "/images/Google_Apps_Script.png",
    logoAlt: "Google Apps Script logo",
    x: 14,
    y: 29,
  },
  {
    label: "Excel Online",
    logo: "/images/Excel Online.png",
    logoAlt: "Excel Online logo",
    x: 31,
    y: 37,
  },
  {
    label: "Power Automate",
    logo: "/images/Power Automate.png",
    logoAlt: "Power Automate logo",
    x: 18,
    y: 48,
  },
  {
    label: "Teams notification",
    icon: UsersRound,
    x: 41,
    y: 50,
  },
];

function BusinessAutomationHeroVisual() {
  return (
    <div className="business-automation-visual relative mx-auto w-full max-w-[48rem]">
      <div className="absolute inset-x-8 bottom-4 h-12 rounded-full bg-[#005BFF]/22 blur-2xl dark:bg-[#12B7FF]/24" />
      <Image
        src="/images/automation-hero-v3.png"
        alt="Business automation hub connecting workflow tools and team notifications"
        width={1536}
        height={864}
        priority
        quality={90}
        className="relative z-10 h-auto w-full object-contain drop-shadow-[0_28px_50px_rgba(0,91,255,0.18)] dark:drop-shadow-[0_28px_50px_rgba(18,183,255,0.18)]"
        sizes="(min-width: 1280px) 48rem, (min-width: 1024px) 58vw, 100vw"
      />
      {heroAppIcons.map(({ label, logo, logoAlt, icon: Icon, x, y }, index) => (
        <span
          key={label}
          className="business-automation-app-card absolute z-30 flex items-center justify-center rounded-xl border border-[#12B7FF]/22 bg-white/88 shadow-[0_0_18px_rgba(18,183,255,0.22)] backdrop-blur-md dark:bg-white/92"
          style={{
            "--icon-x": `${x}%`,
            "--icon-y": `${y}%`,
            "--icon-delay": `${180 + index * 90}ms`,
          }}
          aria-label={label}
          role="img"
        >
          {logo ? (
            <Image
              src={logo}
              alt={logoAlt}
              width={34}
              height={34}
              className="size-7 object-contain sm:size-8"
            />
          ) : (
            <Icon
              className="size-7 text-[#005BFF] sm:size-8"
              aria-hidden="true"
            />
          )}
        </span>
      ))}
    </div>
  );
}

// `service` and `projects` come from the route: this page places the portfolio
// itself (above the CTA), so the slug is listed in SLUGS_WITH_INLINE_PORTFOLIO
// and the route no longer appends one after the page.
export default function BusinessAutomationPage({ service, projects }) {
  return (
    <main className="flex-1">
      <section className="business-automation-hero relative isolate overflow-hidden bg-transparent px-4 py-12 transition-colors sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background/18 via-background/4 to-background/82 dark:from-background/20 dark:via-background/5 dark:to-background/88" />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <ScrollReveal>
            <div className="business-automation-copy max-w-3xl">
              <h1 className="font-heading text-3xl font-semibold leading-tight tracking-normal text-foreground sm:text-5xl lg:text-[2.35rem]">
                Smart Automation for Professional{" "}
                <span className="hero-heading-accent inline ml-2">
                  Services.
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-md">
                The best automation does not make your business feel robotic. It
                removes the repetitive follow-ups, scattered updates, and manual
                admin that keep good people from doing their best work.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="h-12 rounded-md bg-[#005BFF] px-6 text-white shadow-xl shadow-[#005BFF]/20 hover:-translate-y-0.5 hover:bg-[#071B8F] hover:shadow-[#12B7FF]/20"
                >
                  <Link href="/contact">
                    Explore your workflow
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-md bg-background/70 px-6 backdrop-blur hover:-translate-y-0.5"
                >
                  <Link href="#how-it-works">See how it works</Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <BusinessAutomationHeroVisual />
            <div className="hidden">
              <div className="flex items-center justify-between border-b border-border/70 pb-5">
                <div className="flex items-center gap-3">
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-[#12B7FF]/12 text-[#005BFF] dark:text-[#12B7FF]">
                    <Workflow className="size-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      New client enquiry
                    </p>
                    <p className="text-xs text-muted-foreground">
                      One calm, connected flow
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  Running
                </span>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {["Form received", "Review & assign", "Welcome sent"].map(
                  (step, index) => (
                    <div
                      key={step}
                      className="relative rounded-2xl border border-border/70 bg-background/75 p-4 dark:bg-[#07111F]/65"
                    >
                      <span className="text-xs font-bold text-[#12B7FF]">
                        0{index + 1}
                      </span>
                      <p className="mt-5 text-sm font-semibold text-foreground">
                        {step}
                      </p>
                      {index < 2 && (
                        <span className="absolute -right-3 top-1/2 z-10 hidden size-6 -translate-y-1/2 rounded-full border border-[#12B7FF]/25 bg-background text-center text-xs leading-6 text-[#12B7FF] sm:block">
                          →
                        </span>
                      )}
                    </div>
                  ),
                )}
              </div>
              <div className="mt-5 rounded-2xl bg-gradient-to-r from-[#005BFF]/9 to-[#12B7FF]/12 p-4 dark:from-[#005BFF]/18 dark:to-[#12B7FF]/16">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="size-5 shrink-0 text-[#12B7FF]" />
                  <p className="text-sm font-medium text-foreground">
                    The team has context before they open the next task.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-muted/30 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.18em] text-[#005BFF] dark:text-[#12B7FF]">
                What we do
              </p>

              <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-md">
                We automate the busywork around your work—not the judgment,
                relationships, and care that make your business yours.
              </p>
            </div>
          </ScrollReveal>
          {/* Same treatment as the web development overview: no card surfaces,
              just hairline rules between the items. The rules are set per cell
              rather than with `divide-*`, which cannot describe a grid that
              rewraps from 1 to 2 to 4 columns. */}
          <div className="mt-12 grid border-t border-[#005BFF]/12 dark:border-[#12B7FF]/14 sm:grid-cols-2 lg:grid-cols-4">
            {automationMoments.map(
              ({ title, description, icon: Icon, logo, logoAlt }, index) => (
                <ScrollReveal
                  key={title}
                  delay={index * 120}
                  className="group relative border-b border-[#005BFF]/12 px-6 py-9 dark:border-[#12B7FF]/14 sm:px-8 sm:py-10 sm:odd:border-r lg:border-r lg:last:border-r-0"
                >
                  {/* Lights up the rule under the item on hover. */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-6 -bottom-px h-px origin-left scale-x-0 bg-gradient-to-r from-[#005BFF] to-[#12B7FF] opacity-0 transition duration-500 group-hover:scale-x-100 group-hover:opacity-100 sm:inset-x-8"
                  />

                  <div className="flex items-center gap-3">
                    {logo ? (
                      <Image
                        src={logo}
                        alt={logoAlt}
                        width={28}
                        height={28}
                        className="size-7 object-contain transition-transform duration-300 group-hover:-translate-y-0.5"
                      />
                    ) : (
                      <Icon
                        className="size-7 stroke-[1.6] text-[#005BFF] transition-transform duration-300 group-hover:-translate-y-0.5 dark:text-[#12B7FF]"
                        aria-hidden="true"
                      />
                    )}
                    <span className="text-xs font-semibold tracking-[0.22em] text-muted-foreground/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-6 text-lg font-semibold leading-7 text-foreground">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {description}
                  </p>
                </ScrollReveal>
              ),
            )}
          </div>
        </div>
      </section>

      <TechnologiesToolsSection
        tools={automationTools}
        eyebrow="Automation tools"
        title="Connected tools for"
        accentTitle="work that keeps moving."
        description="We connect the Microsoft 365 and Google Workspace services your team uses every day, so information can move reliably between the right people and systems."
      />

      <section
        id="how-it-works"
        className="relative scroll-mt-24 overflow-hidden py-20 sm:py-24"
      >
        <div className="absolute right-0 top-1/4 -z-10 size-80 rounded-full bg-[#12B7FF]/8 blur-3xl" />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <ScrollReveal>
            <div className="lg:sticky lg:top-24">
              <p className="text-sm  uppercase tracking-[0.18em] text-[#005BFF] dark:text-[#12B7FF]">
                How we work
              </p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
                Built around your team, not a generic template.
              </h2>
              <p className="mt-6 text-base leading-8 text-muted-foreground sm:text-md">
                A useful automation is easy to understand, safe to change, and
                respectful of the way people actually get things done.
              </p>
            </div>
          </ScrollReveal>
          <div className="space-y-3">
            {deliverySteps.map(([title, description], index) => (
              <ScrollReveal key={title} delay={index * 100}>
                <article className="group flex gap-4 rounded-[1rem] border border-[#005BFF]/10 bg-white p-4 shadow-sm transition-all hover:border-[#12B7FF]/35 hover:shadow-lg dark:border-[#12B7FF]/14 dark:bg-[#0B1830]">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#005BFF] text-xs font-bold text-white shadow-lg shadow-[#005BFF]/20 group-hover:bg-[#12B7FF]">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-foreground">
                      {title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                      {description}
                    </p>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <ServicePortfolioSection service={service} projects={projects} />

      {/* Same treatment as the web development page: no panel, the closing
          pitch sits directly on the page with a hairline rule carrying the
          supporting points beneath it. */}
      <section className="relative overflow-hidden px-4 py-20 transition-colors sm:px-6 sm:py-24 lg:px-8">
        <div className="absolute left-1/2 top-1/4 -z-10 size-[34rem] max-w-[92vw] -translate-x-1/2 rounded-full bg-[#12B7FF]/8 blur-3xl dark:bg-[#005BFF]/12" />

        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#005BFF] dark:text-[#12B7FF]">
              Start with one friction point
            </p>

            <h2 className="mt-3 text-4xl font-semibold leading-tight tracking-normal text-foreground sm:text-5xl">
              What would your team do
              <span
                className="hero-heading-accent block"
                style={{ textShadow: "none" }}
              >
                with a little more time?
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground">
              Bring us the process everyone has learned to work around.
              We&apos;ll help you make it lighter, clearer, and easier to trust.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-7">
              <Button
                asChild
                size="lg"
                className="h-13 rounded-md bg-[#005BFF] px-8 text-base font-semibold text-white shadow-[0_14px_34px_rgba(0,91,255,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#004FE0]"
              >
                <Link href="/book-appointment">
                  Start the conversation
                  <ArrowRight className="size-5" aria-hidden="true" />
                </Link>
              </Button>

              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock3 className="size-4 text-[#12B7FF]" aria-hidden="true" />
                Reply within 24 hours
              </span>
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {["No pressure", "Clear advice", "Practical next steps"].map(
                (point) => (
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
                ),
              )}
            </div>
          </ScrollReveal>

          <div className="mx-auto mt-16 grid max-w-5xl border-t border-[#005BFF]/12 dark:border-[#12B7FF]/14 sm:grid-cols-3">
            {[
              {
                title: "Start with one process",
                description: "No big-bang rollout",
                icon: Workflow,
              },
              {
                title: "Practical, secure advice",
                description: "Built to be trusted",
                icon: ShieldCheck,
              },
              {
                title: "Support after launch",
                description: "We stay with it",
                icon: Headphones,
              },
            ].map(({ title, description, icon: Icon }, index) => (
              <ScrollReveal
                key={title}
                delay={120 + index * 120}
                className="flex flex-col items-center border-b border-[#005BFF]/12 px-6 py-8 text-center last:border-b-0 dark:border-[#12B7FF]/14 sm:border-b-0 sm:border-r sm:last:border-r-0"
              >
                <Icon
                  className="size-6 stroke-[1.6] text-[#005BFF] dark:text-[#12B7FF]"
                  aria-hidden="true"
                />
                <p className="mt-4 text-sm font-semibold text-foreground">
                  {title}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {description}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
