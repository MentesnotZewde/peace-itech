import Link from "next/link";
import {
  ArrowRight,
  Barcode,
  BarChart3,
  CheckCircle2,
  CreditCard,
  Layers3,
  ShoppingCart,
  Tag,
  Truck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ui/ScrollReveal";

const posServices = [
  {
    title: "Quick checkout flows",
    description:
      "Fast, intuitive checkout interfaces built for busy retail counters and mobile points of sale.",
    icon: ShoppingCart,
  },
  {
    title: "Inventory sync",
    description:
      "Keep stock accurate across registers, online channels, and back-office reporting.",
    icon: Barcode,
  },
  {
    title: "Customer loyalty",
    description:
      "Capture repeat buyer data, apply discounts, and reward loyalty smoothly at checkout.",
    icon: Tag,
  },
  {
    title: "Sales reporting",
    description:
      "Daily sales summaries, product mix analytics, and revenue insights for smarter decisions.",
    icon: BarChart3,
  },
];

const processSteps = [
  {
    title: "Discover your setup",
    description:
      "We map how your staff sells today and remove friction from checkout and inventory tasks.",
    icon: Layers3,
  },
  {
    title: "Design for speed",
    description:
      "The POS experience is designed to keep sales moving while reducing errors and wait time.",
    icon: CreditCard,
  },
  {
    title: "Launch with support",
    description:
      "We deploy the system, train your team, and make sure inventory and payments work together.",
    icon: Truck,
  },
];

export default function PointOfSalePage({ service }) {
  return (
    <main className="flex-1">
      <section className="relative isolate overflow-hidden bg-transparent px-4 py-12 transition-colors sm:px-6 sm:py-16 lg:px-8">
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background/18 via-background/4 to-background/82 dark:from-background/20 dark:via-background/5 dark:to-background/88" />
        <div className="absolute inset-x-0 top-8 -z-10 h-[28rem] rounded-full bg-[#12B7FF]/10 blur-3xl dark:bg-[#005BFF]/16" />

        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#005BFF] dark:text-[#12B7FF]">
              Retail POS Solutions
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-normal text-foreground sm:text-5xl lg:text-[3.35rem]">
              Checkout, inventory, and loyalty
              <span className="hero-heading-accent block">
                that keep your store moving.
              </span>
            </h1>
            <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">
              Point-of-sale systems designed for retail teams who need fast
              transactions, accurate stock, and repeat customer experiences.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-full bg-[#005BFF] px-6 text-white shadow-xl shadow-[#005BFF]/20 hover:-translate-y-0.5 hover:bg-[#071B8F] hover:shadow-[#12B7FF]/20"
              >
                <Link href="/contact">
                  Talk to sales
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-full bg-background/70 px-6 backdrop-blur hover:-translate-y-0.5"
              >
                <Link href="#what-we-do">See what we do</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-[2rem] border border-border/70 bg-white/80 p-6 shadow-2xl shadow-foreground/10 backdrop-blur-xl dark:border-[#12B7FF]/20 dark:bg-[#07111F]/72 dark:shadow-[#12B7FF]/10">
            <div className="flex items-center justify-between gap-4 rounded-3xl bg-gradient-to-r from-[#005BFF]/15 via-[#12B7FF]/15 to-[#005BFF]/15 p-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#005BFF]">
                  Built for retail
                </p>
                <p className="mt-3 text-3xl font-semibold text-foreground">
                  {service.dashboardMetric}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {service.dashboardLabel}
                </p>
              </div>
              <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#005BFF]/10 text-[#005BFF] shadow-sm dark:bg-[#12B7FF]/15 dark:text-[#12B7FF]">
                <ShoppingCart className="size-8" aria-hidden="true" />
              </span>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {service.outcomes.map((outcome) => (
                <div
                  key={outcome}
                  className="rounded-3xl border border-border/70 bg-muted/50 p-4"
                >
                  <p className="text-sm font-semibold text-foreground">
                    {outcome}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    Designed to be fast, reliable, and easy for your team to use
                    daily.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="what-we-do"
        className="relative overflow-hidden px-4 py-14 transition-colors sm:px-6 sm:py-16 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#005BFF] dark:text-[#12B7FF]">
                What we do
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-normal text-foreground sm:text-5xl">
                Point-of-sale services for every sales environment.
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
                We help retailers launch systems that work at the register,
                protect inventory, and create a smoother experience for
                customers and staff.
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {posServices.map((item, index) => {
              const Icon = item.icon;

              return (
                <ScrollReveal key={item.title} delay={80 + index * 90}>
                  <article className="group h-full rounded-[1.5rem] border border-[#005BFF]/10 bg-white/82 p-6 shadow-[0_18px_44px_rgba(0,91,255,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#12B7FF]/35 hover:shadow-[0_26px_64px_rgba(18,183,255,0.14)] dark:border-[#12B7FF]/14 dark:bg-[#0B1830]/72 dark:hover:border-[#12B7FF]/35 dark:hover:shadow-[#12B7FF]/12">
                    <span className="flex size-14 items-center justify-center rounded-3xl bg-[#005BFF]/10 text-[#005BFF] ring-1 ring-[#005BFF]/12 dark:bg-[#12B7FF]/10 dark:text-[#12B7FF]">
                      <Icon className="size-7" aria-hidden="true" />
                    </span>
                    <h3 className="mt-6 text-xl font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-sm leading-6 text-muted-foreground">
                      {item.description}
                    </p>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-muted/30 px-4 py-14 transition-colors sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#005BFF] dark:text-[#12B7FF]">
                How we deliver
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-normal text-foreground sm:text-5xl">
                A simple POS rollout for your store team.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
                From the first setup conversation to launch and training, we
                keep the process clear so your staff can start selling with
                confidence.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-border/70 bg-card p-6 shadow-xl shadow-foreground/5">
              <div className="grid gap-4">
                {processSteps.map((step, index) => (
                  <div
                    key={step.title}
                    className="flex gap-4 rounded-2xl border border-border/70 bg-background p-5"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-3xl bg-[#005BFF]/10 text-[#005BFF] dark:bg-[#12B7FF]/15 dark:text-[#12B7FF]">
                      <step.icon className="size-6" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-foreground">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 transition-colors sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[2rem] border border-[#005BFF]/12 bg-white/85 p-8 shadow-[0_24px_70px_rgba(0,91,255,0.08)] backdrop-blur-xl dark:border-[#12B7FF]/20 dark:bg-[#07111F]/85 dark:shadow-[#12B7FF]/12 sm:p-10 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#005BFF] dark:text-[#12B7FF]">
                  Ready to simplify sales?
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-normal text-foreground sm:text-5xl">
                  Launch a POS system that helps customers buy faster.
                </h2>
                <p className="mt-5 text-base leading-7 text-muted-foreground">
                  We pair modern checkout design with inventory and reporting so
                  your retail operation can stay focused on service.
                </p>
              </div>

              <Button
                asChild
                size="lg"
                className="h-16 rounded-2xl bg-[#005BFF] px-8 text-white shadow-xl shadow-[#005BFF]/20 hover:-translate-y-0.5 hover:bg-[#071B8F] hover:shadow-[#12B7FF]/20"
              >
                <Link href="/contact">
                  Book a POS consultation
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
