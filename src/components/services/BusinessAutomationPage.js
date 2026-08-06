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
  ,
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
            <Icon className="size-7 text-[#005BFF] sm:size-8" aria-hidden="true" />
          )}
        </span>
      ))}
    </div>
  );
}

export default function BusinessAutomationPage() {
  return (
    <main className="flex-1">
      <section className="business-automation-hero relative isolate overflow-hidden bg-transparent px-4 py-12 transition-colors sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background/18 via-background/4 to-background/82 dark:from-background/20 dark:via-background/5 dark:to-background/88" />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <ScrollReveal>
            <div className="business-automation-copy max-w-3xl">
              <h1 className="font-heading text-4xl font-semibold leading-tight tracking-normal text-foreground sm:text-5xl lg:text-[3.35rem]">
                Transforming Professional Services with
                <span className="hero-heading-accent inline ml-2">
                  Smart Automation.
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
                The best automation does not make your business feel robotic. It
                removes the repetitive follow-ups, scattered updates, and manual
                admin that keep good people from doing their best work.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="h-12 rounded-full bg-[#005BFF] px-6 text-white shadow-xl shadow-[#005BFF]/20 hover:-translate-y-0.5 hover:bg-[#071B8F] hover:shadow-[#12B7FF]/20"
                >
                  <Link href="/contact">
                    Explore your workflow{" "}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-full bg-background/70 px-6 backdrop-blur hover:-translate-y-0.5"
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
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#005BFF] dark:text-[#12B7FF]">
                What we do
              </p>

              <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">
                We automate the busywork around your work—not the judgment,
                relationships, and care that make your business yours.
              </p>
            </div>
          </ScrollReveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {automationMoments.map(
              ({ title, description, icon: Icon, logo, logoAlt }, index) => (
                <ScrollReveal key={title} delay={index * 120}>
                  <article className="h-full rounded-[1.5rem] border border-[#005BFF]/10 bg-white p-6 shadow-[0_16px_42px_rgba(7,24,216,0.07)] transition-transform duration-300 hover:-translate-y-1 dark:border-[#12B7FF]/14 dark:bg-[#0B1830] dark:shadow-black/20">
                    <span className="flex size-12 items-center justify-center rounded-2xl bg-[#12B7FF]/12 text-[#005BFF] dark:text-[#12B7FF]">
                      {logo ? (
                        <Image
                          src={logo}
                          alt={logoAlt}
                          width={28}
                          height={28}
                          className="size-7 object-contain"
                        />
                      ) : (
                        <Icon className="size-6" />
                      )}
                    </span>
                    <h3 className="mt-6 text-xl font-semibold text-foreground">
                      {title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {description}
                    </p>
                  </article>
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
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#005BFF] dark:text-[#12B7FF]">
                How we work
              </p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight text-foreground sm:text-5xl">
                Built around your team, not a generic template.
              </h2>
              <p className="mt-6 text-base leading-8 text-muted-foreground sm:text-lg">
                A useful automation is easy to understand, safe to change, and
                respectful of the way people actually get things done.
              </p>
            </div>
          </ScrollReveal>
          <div className="space-y-4">
            {deliverySteps.map(([title, description], index) => (
              <ScrollReveal key={title} delay={index * 100}>
                <article className="group flex gap-5 rounded-[1.5rem] border border-[#005BFF]/10 bg-white p-5 shadow-sm transition-all hover:border-[#12B7FF]/35 hover:shadow-lg dark:border-[#12B7FF]/14 dark:bg-[#0B1830] sm:p-6">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#005BFF] text-sm font-bold text-white shadow-lg shadow-[#005BFF]/20 group-hover:bg-[#12B7FF]">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground sm:text-base">
                      {description}
                    </p>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <ScrollReveal>
          <div className="mx-auto grid max-w-7xl gap-8 overflow-hidden rounded-[2rem] border border-[#12B7FF]/22 bg-[#07111F] p-7 text-white shadow-2xl shadow-[#005BFF]/20 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:p-14">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#12B7FF]">
                Start with one friction point
              </p>
              <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight sm:text-5xl">
                What would your team do with a little more time?
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/72 sm:text-lg">
                Bring us the process everyone has learned to work around.
                We&apos;ll help you make it lighter, clearer, and easier to
                trust.
              </p>
              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-sm text-white/75">
                <span className="flex items-center gap-2">
                  <Clock3 className="size-4 text-[#12B7FF]" /> Reply within 24
                  hours
                </span>
                <span className="flex items-center gap-2">
                  <ShieldCheck className="size-4 text-[#12B7FF]" /> Practical,
                  secure advice
                </span>
                <span className="flex items-center gap-2">
                  <Headphones className="size-4 text-[#12B7FF]" /> Support after
                  launch
                </span>
              </div>
            </div>
            <Button
              asChild
              size="lg"
              className="h-14 rounded-full bg-white px-7 text-[#07111F] hover:-translate-y-0.5 hover:bg-[#EAF8FF]"
            >
              <Link href="/contact">
                Start the conversation <ArrowRight className="size-5" />
              </Link>
            </Button>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
