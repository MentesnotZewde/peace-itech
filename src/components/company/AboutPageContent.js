import Link from "next/link";
import {
  ArrowRight,
  Award,
  Building2,
  CheckCircle2,
  Globe2,
  Handshake,
  Lightbulb,
  LockKeyhole,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { services } from "@/lib/services";

const stats = [
  { value: "120+", label: "Projects Delivered" },
  { value: "85+", label: "Happy Clients" },
  { value: "6", label: "Countries Served" },
  { value: "18+", label: "IT Professionals" },
  { value: "40+", label: "Systems Automated" },
  { value: "70+", label: "Businesses Supported" },
];

const values = [
  { title: "Innovation", icon: Lightbulb },
  { title: "Integrity", icon: ShieldCheck },
  { title: "Collaboration", icon: Handshake },
  { title: "Security", icon: LockKeyhole },
  { title: "Excellence", icon: Award },
  { title: "Customer Success", icon: Users },
];

const timeline = [
  { year: "2025", title: "Company founded", text: "Peace iTech Inc begins with a mission to help businesses modernize through practical technology." },
  { year: "2026", title: "Automation services expansion", text: "The company expands into Google Workspace, Power Automate, CRM, and workflow automation." },
  { year: "2027", title: "ERP ecosystem growth", text: "Peace iTech strengthens business platforms for finance, inventory, HR, approvals, and reporting." },
  { year: "2028", title: "Global delivery partnerships", text: "Canada and Ethiopia operations support international clients with scalable digital systems." },
];

const technologies = [
  "Next.js",
  "React",
  "Node.js",
  "MongoDB",
  "Google Workspace",
  "Power Automate",
  "Cloud Services",
  "AI Integrations",
];

const leaders = [
  { name: "Founder and CEO", role: "Strategy, partnerships, and client success" },
  { name: "Technology Lead", role: "Architecture, engineering, and platform quality" },
  { name: "Operations Lead", role: "Delivery systems, support, and service excellence" },
];

const trustBadges = [
  "Cloud Delivery Partner",
  "Security-First Practice",
  "Automation Specialist",
  "Quality Management",
  "Business Continuity",
  "Customer Success Team",
];

export default function AboutPageContent() {
  return (
    <main className="flex-1">
      <section className="relative overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
        <div className="absolute left-1/2 top-0 -z-10 size-[36rem] -translate-x-1/2 rounded-full bg-[#12B7FF]/15 blur-3xl" />
        <div className="absolute right-0 top-28 -z-10 size-80 rounded-full bg-[#12B7FF]/15 blur-3xl" />

        <div className="mx-auto max-w-7xl">
          {/* Page structure: the hero introduces the company story and a visual enterprise dashboard. */}
          <div className="grid gap-10 rounded-[2rem] border border-border/70 bg-gradient-to-br from-background via-muted/40 to-[#EAF8FF]/60 p-5 shadow-2xl shadow-foreground/10 dark:to-[#07111F]/40 sm:p-8 lg:grid-cols-[0.95fr_1.05fr] lg:p-10">
            <div className="flex flex-col justify-center rounded-[1.5rem] bg-background/70 p-6 backdrop-blur sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#005BFF]">
                About Peace iTech Inc
              </p>
              <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight tracking-normal text-foreground sm:text-6xl">
                Building the future through digital innovation.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                Peace iTech Inc helps organizations in Canada, Ethiopia, and beyond modernize operations with scalable software, secure systems, automation, and long-term technology partnerships.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="h-12 rounded-full px-6">
                  <Link href="/contact">
                    Work with us
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 rounded-full bg-background/70 px-6">
                  <Link href="/#services">Explore services</Link>
                </Button>
              </div>
            </div>

            <div className="relative animate-float">
              <div className="rounded-[1.5rem] border border-border/70 bg-background/85 p-4 shadow-2xl shadow-foreground/10 backdrop-blur">
                <div className="mb-5 flex items-center justify-between border-b border-border/70 pb-4">
                  <div className="flex gap-2">
                    <span className="size-3 rounded-full bg-red-400" />
                    <span className="size-3 rounded-full bg-[#12B7FF]" />
                    <span className="size-3 rounded-full bg-[#12B7FF]" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">
                    Global Delivery Console
                  </span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {["Canada presence", "Ethiopia presence", "Digital transformation", "Long-term partnerships"].map((item) => (
                    <div key={item} className="rounded-2xl border border-border bg-muted/40 p-4">
                      <CheckCircle2 className="size-5 text-[#005BFF]" aria-hidden="true" />
                      <p className="mt-4 text-sm font-semibold text-foreground">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-2xl bg-foreground p-5 text-background">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-background/70">Mission engine</p>
                      <p className="mt-1 text-2xl font-semibold">Modernize</p>
                    </div>
                    <Rocket className="size-8 text-[#12B7FF]" aria-hidden="true" />
                  </div>
                  <div className="mt-8 grid grid-cols-4 gap-2">
                    {[74, 92, 66, 84, 58, 78, 96, 68].map((height, index) => (
                      <span key={index} className="rounded-lg bg-background/20" style={{ height: `${height}px` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#005BFF]">
              Who we are
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal text-foreground sm:text-5xl">
              A digital transformation partner built for practical business progress.
            </h2>
          </div>
          <div className="grid gap-5">
            {/* Responsive layout: cards stack naturally on mobile and breathe on desktop. */}
            {[
              "Peace iTech Inc exists to help businesses move from fragmented tools and manual work into reliable digital systems.",
              "With a presence connected to Canada and Ethiopia, we bring global thinking, local understanding, and customer-focused delivery to every engagement.",
              "Our work is innovation-driven but business-grounded: websites, ERP systems, automations, cybersecurity, marketing systems, and IT support that teams can actually use.",
            ].map((text) => (
              <div key={text} className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm">
                <p className="text-base leading-8 text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-[1.5rem] border border-border/70 bg-background p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#005BFF]/10">
                <p className="text-4xl font-semibold text-foreground">{stat.value}</p>
                <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#005BFF]">
                Vision, mission, values
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-normal text-foreground sm:text-5xl">
                Principles that guide every system we build.
              </h2>
            </div>
            <div className="grid gap-4">
              <div className="rounded-[1.5rem] bg-foreground p-6 text-background">
                <Target className="size-7 text-[#12B7FF]" aria-hidden="true" />
                <h3 className="mt-5 text-2xl font-semibold">Vision</h3>
                <p className="mt-3 text-sm leading-6 text-background/70">
                  Becoming a trusted global digital transformation partner.
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-border/70 bg-card p-6 shadow-sm">
                <Globe2 className="size-7 text-[#005BFF]" aria-hidden="true" />
                <h3 className="mt-5 text-2xl font-semibold text-foreground">Mission</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  Helping businesses grow through innovative and scalable technology solutions.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#12B7FF]/10">
                  <Icon className="size-6 text-[#005BFF]" aria-hidden="true" />
                  <p className="mt-4 font-semibold text-foreground">{value.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#005BFF]">
              What we do
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal text-foreground sm:text-5xl">
              Turning ideas into impactful digital solutions.
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link key={service.slug} href={`/services/${service.slug}`} className="group rounded-[1.5rem] border border-border/70 bg-background p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#005BFF]/10">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#005BFF]/15 to-[#12B7FF]/15 text-[#005BFF] ring-1 ring-[#005BFF]/20 transition-transform group-hover:scale-110">
                    <Icon className="size-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-foreground">{service.title}</h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">{service.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#005BFF]">
              Company journey
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal text-foreground sm:text-5xl">
              A roadmap for sustainable digital growth.
            </h2>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-4">
            {timeline.map((item) => (
              <div key={item.year} className="relative rounded-[1.5rem] border border-border/70 bg-card p-6 shadow-sm">
                <span className="absolute -top-3 left-6 rounded-full bg-foreground px-3 py-1 text-xs font-semibold text-background">
                  {item.year}
                </span>
                <h3 className="mt-5 text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#005BFF]">
              Technologies and innovation
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal text-foreground sm:text-5xl">
              Modern tools for scalable business systems.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {technologies.map((technology) => (
              <div key={technology} className="rounded-2xl border border-border/70 bg-background p-5 shadow-sm">
                <Sparkles className="size-5 text-[#005BFF]" aria-hidden="true" />
                <p className="mt-4 font-semibold text-foreground">{technology}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#005BFF]">
              Leadership
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal text-foreground sm:text-5xl">
              A focused team structure for strategy, engineering, and delivery.
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {leaders.map((leader) => (
              <div key={leader.name} className="group rounded-[1.5rem] border border-border/70 bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#12B7FF]/10">
                <div className="flex aspect-square items-center justify-center rounded-2xl bg-gradient-to-br from-[#005BFF]/15 to-[#12B7FF]/15">
                  <Users className="size-12 text-[#005BFF] transition-transform group-hover:scale-110" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-foreground">{leader.name}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{leader.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-border/70 bg-background p-6 shadow-xl shadow-foreground/5 sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#005BFF]">
                  Certifications and trust
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-normal text-foreground sm:text-4xl">
                  Enterprise-ready practices and partner confidence.
                </h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {trustBadges.map((badge) => (
                  <div key={badge} className="flex items-center gap-3 rounded-2xl border border-border/70 bg-muted/40 p-4">
                    <Award className="size-5 text-[#005BFF]" aria-hidden="true" />
                    <span className="text-sm font-semibold text-foreground">{badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-foreground p-8 text-background shadow-2xl shadow-foreground/10 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-background/60">
                Partner with us
              </p>
              <h2 className="mt-3 max-w-3xl text-3xl font-semibold sm:text-5xl">
                Build digital systems your business can grow with.
              </h2>
            </div>
            <Button asChild size="lg" variant="secondary" className="h-12 rounded-full px-6">
              <Link href="/contact">
                Start a conversation
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}


