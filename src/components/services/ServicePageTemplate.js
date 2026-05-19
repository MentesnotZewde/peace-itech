import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  CircleDot,
  Layers3,
  MonitorSmartphone,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";

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

      <VisualShowcase service={service} />

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


