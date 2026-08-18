import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  CreditCard,
  MenuSquare,
  MonitorSmartphone,
  Printer,
  ReceiptText,
  ShoppingCart,
  Store,
  Utensils,
  Wrench,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const everythingItems = [
  {
    title: "POS Terminal",
    description:
      "Fast, commercial-grade POS hardware designed for everyday restaurant use.",
    icon: MonitorSmartphone,
  },
  {
    title: "Customer Display & Cash Drawer",
    description:
      "Give customers a clear view of their order and total, with a connected heavy-duty cash drawer.",
    icon: ShoppingCart,
  },
  {
    title: "Receipt Printing",
    description:
      "Fast thermal receipt printing with multi-language support where required.",
    icon: Printer,
  },
  {
    title: "Menu & POS Programming",
    description:
      "We configure your menu, pricing, taxes, modifiers, categories, and other POS settings before installation.",
    icon: MenuSquare,
  },
  {
    title: "Payment Processing",
    description:
      "Accept debit and credit payments through Clover or Global Payments.",
    icon: CreditCard,
  },
  {
    title: "Installation & Training",
    description:
      "We install the system on-site, test everything, and train your team before you go live.",
    icon: Wrench,
  },
];

const restaurantConfigItems = [
  "Menu and pricing",
  "Order types",
  "Modifiers",
  "Taxes",
  "Receipt printing",
  "Kitchen workflow",
  "Payment processing",
  "Staff requirements",
];

const implementationSteps = [
  {
    title: "Site Walkthrough",
    description:
      "We review your restaurant, counter layout, network, menu, and hardware requirements.",
  },
  {
    title: "Build & Configure",
    description:
      "We prepare the hardware and program your menu, pricing, taxes, printers, and system settings.",
  },
  {
    title: "Install & Test",
    description: "We install everything on-site and test the complete system.",
  },
  {
    title: "Train & Go Live",
    description:
      "We train your team and make sure everyone is comfortable before launch.",
  },
  {
    title: "Ongoing Support",
    description:
      "Need help after installation? You have a local team you can contact.",
  },
];

const packageItems = [
  "POS terminal",
  "Rear customer display",
  "Cash drawer",
  "Thermal receipt printer",
  "POS software configuration",
  "Complete menu programming",
  "Staff training",
  "On-site installation",
  "Payment processing setup",
  "Ongoing support",
];

function SectionIntro({ eyebrow, title, description }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#005BFF] dark:text-[#12B7FF]">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-normal text-foreground sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function PosHero() {
  return (
    <section className="relative overflow-hidden px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(18,183,255,0.18),_transparent_38%)]" />

      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <h1 className="font-heading mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-[3.2rem] lg:leading-[1.05]">
              Restaurant POS Solutions
            </h1>
            <p className="mt-5 max-w-xl text-md font-medium text-foreground/80">
              Hardware, software, payment processing, installation, and support
              all in one complete solution.
            </p>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
              PeaceiTech POS gives restaurants a reliable point-of-sale system
              that is configured for their business, installed on-site, and
              ready to use from day one.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-md bg-[#005BFF] px-6 text-white shadow-lg shadow-[#005BFF]/20 hover:bg-[#071B8F]"
              >
                <Link href="/book-appointment">
                  Book a Free Consultation
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-md bg-background/80 px-6"
              >
                <Link href="#features">Explore Features</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-[2rem]  bg-transparent p-0 shadow-none sm:p-0">
            <Image
              src="/images/point-of-sale.png"
              alt="Restaurant point-of-sale hardware and setup"
              width={1200}
              height={860}
              priority
              quality={90}
              className="h-auto w-full rounded-[1.5rem]  object-cover "
              sizes="(min-width: 1024px) 48vw, 100vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function EverythingNeededSection() {
  const overviewCards = [
    {
      title: "POS Hardware",
      description:
        "Commercial-grade terminals, customer displays, and cash drawers designed for a busy restaurant service flow.",
      icon: MonitorSmartphone,
    },
    {
      title: "Menu & Orders",
      description:
        "Configure your menu, pricing, modifiers, taxes, and order flow before your system is installed and tested.",
      icon: MenuSquare,
    },
    {
      title: "Payments & Receipts",
      description:
        "Accept debit and credit payments, print receipts quickly, and keep service moving with a dependable setup.",
      icon: CreditCard,
    },
    {
      title: "Installation & Support",
      description:
        "We install everything on-site, train your team, and provide local support after go-live.",
      icon: Wrench,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 text-slate-900 dark:bg-[#021d3d] dark:text-white sm:py-24">
      <div className="absolute inset-0 -z-10 opacity-80">
        <div className="absolute left-8 top-10 h-2 w-2 rounded-full bg-[#32d3ff] shadow-[0_0_20px_rgba(50,211,255,0.9)] dark:opacity-100 opacity-30" />
        <div className="absolute left-24 top-28 h-2 w-2 rounded-full bg-[#32d3ff] shadow-[0_0_20px_rgba(50,211,255,0.9)] dark:opacity-100 opacity-30" />
        <div className="absolute right-20 top-10 h-2 w-2 rounded-full bg-[#32d3ff] shadow-[0_0_20px_rgba(50,211,255,0.9)] dark:opacity-100 opacity-30" />
        <div className="absolute right-28 top-40 h-2 w-2 rounded-full bg-[#32d3ff] shadow-[0_0_20px_rgba(50,211,255,0.9)] dark:opacity-100 opacity-30" />
        <div className="absolute bottom-10 left-1/3 h-2 w-2 rounded-full bg-[#32d3ff] shadow-[0_0_20px_rgba(50,211,255,0.9)] dark:opacity-100 opacity-30" />
        <div className="absolute bottom-20 right-20 h-2 w-2 rounded-full bg-[#32d3ff] shadow-[0_0_20px_rgba(50,211,255,0.9)] dark:opacity-100 opacity-30" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#005BFF] dark:text-[#32d3ff]">
          Overview
        </p>

        <div className="mt-10 grid border-t border-slate-200 dark:border-[#204b74] md:grid-cols-2 xl:grid-cols-4">
          {overviewCards.map(({ title, description, icon: Icon }, index) => (
            <article
              key={title}
              className="group border-b border-r border-slate-200 bg-white/70 px-6 py-8 shadow-sm shadow-slate-200/50 last:border-r-0 dark:border-[#204b74] dark:bg-[#0c1d32]/80 dark:shadow-none md:py-10"
            >
              <div className="flex items-center gap-4">
                <span className="flex size-10 items-center justify-center rounded-xl border border-[#cfe7ff] bg-[#eef7ff] text-[#005BFF] shadow-sm dark:border-[#32d3ff]/70 dark:bg-[#0a294d] dark:text-[#32d3ff] dark:shadow-[0_0_18px_rgba(50,211,255,0.2)]">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="text-sm font-medium tracking-[0.1em] text-[#005BFF] dark:text-[#8adfff]">
                  0{index + 1}
                </span>
              </div>

              <h3 className="mt-8 text-2xl font-semibold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-2xl">
                {title}
              </h3>

              <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-200/85">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BuiltAroundRestaurantSection() {
  return (
    <section className="bg-[#f4f9ff] py-20 dark:bg-[#071827] sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#005BFF] dark:text-[#12B7FF]">
              Built Around Your Restaurant
            </p>
            <h2 className="font-heading mt-3 text-3xl font-semibold tracking-normal text-foreground sm:text-4xl">
              Built Around Your Restaurant
            </h2>
            <p className="mt-5 text-base leading-7 text-foreground/75 dark:text-slate-200/80">
              Your POS should fit the way your restaurant works — not the other
              way around.
            </p>
            <p className="mt-4 text-sm leading-7 text-foreground/70 dark:text-slate-200/75">
              We configure your system around your:
            </p>

            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {restaurantConfigItems.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3   px-3 py-2.5 text-sm font-medium text-foreground  "
                >
                  <span className="flex size-6 items-center justify-center rounded-full bg-[#005BFF]/10 text-[#005BFF] dark:bg-[#12B7FF]/15 dark:text-[#12B7FF]">
                    <Check className="size-3.5" aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="overflow-hidden   ">
            <Image
              src="/images/poss.png"
              alt="Restaurant POS setup with terminal, order flow, and payment processing"
              width={900}
              height={520}
              quality={90}
              className="h-[360px] w-full object-cover object-center sm:h-[420px] lg:h-[430px]"
              sizes="(min-width: 1024px) 40vw, 80vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ImplementationProcessSection() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionIntro
          eyebrow="Implementation Process"
          title="From Setup to Go-Live"
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-5">
          {implementationSteps.map((step, index) => (
            <div
              key={step.title}
              className="rounded-[1.5rem] border border-border/70 bg-card p-5 shadow-sm"
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-[#005BFF]/10 text-sm font-semibold text-[#005BFF] dark:bg-[#12B7FF]/12 dark:text-[#12B7FF]">
                {index + 1}
              </span>
              <h3 className="mt-5 text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="inline-flex rounded-full border border-[#005BFF]/15 bg-[#EAF8FF] px-4 py-2 text-sm font-semibold text-[#005BFF] dark:bg-[#12B7FF]/12 dark:text-[#12B7FF]">
            Typical setup: 1–2 weeks
          </p>
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionIntro eyebrow="Pricing" title="Simple, Transparent Pricing" />

        <div className="mt-10 rounded-[2rem] border border-border/70 bg-card p-6 shadow-xl shadow-foreground/5 sm:p-8 lg:p-10">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#005BFF] dark:text-[#12B7FF]">
              Complete POS Package
            </p>
            <p className="mt-5 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Starting from $1,850
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {packageItems.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-border/70 bg-background p-3 text-sm text-foreground"
              >
                <span className="flex size-6 items-center justify-center rounded-full bg-[#005BFF]/10 text-[#005BFF] dark:bg-[#12B7FF]/12 dark:text-[#12B7FF]">
                  <Check className="size-3.5" aria-hidden="true" />
                </span>
                {item}
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            On-site installation is included when payment processing is set up
            through PeaceiTech.
          </p>

          <div className="mt-8 text-center">
            <p className="text-base font-medium text-foreground">
              Need multiple stations, kitchen displays, printers, or a custom
              configuration?
            </p>
            <Button
              asChild
              size="lg"
              className="mt-5 h-12 rounded-md bg-[#005BFF] px-6 text-white shadow-lg shadow-[#005BFF]/20 hover:bg-[#071B8F]"
            >
              <Link href="/contact">
                Request a Custom Quote
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function PosFinalCTA() {
  return (
    <section className="relative overflow-hidden px-4 py-10 transition-colors sm:px-6 sm:py-14 lg:px-8">
      <div className="absolute left-1/2 top-1/4 -z-10 size-[34rem] max-w-[92vw] -translate-x-1/2 rounded-full bg-[#12B7FF]/8 blur-3xl dark:bg-[#005BFF]/12" />

      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#005BFF] dark:text-[#12B7FF]">
            Start with clarity
          </p>

          <h2 className="font-heading mt-3 text-4xl font-semibold leading-tight tracking-normal text-foreground sm:text-3xl">
            Ready to simplify your
            <span className="block text-[#005BFF] dark:text-[#12B7FF]">
              restaurant POS setup?
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground">
            Tell us about your restaurant, your setup, and what you need from a
            POS system. We&apos;ll help you choose the right hardware, software,
            and support for a smooth launch.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-7">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-md bg-[#005BFF] px-8 text-base font-semibold text-white shadow-[0_14px_34px_rgba(0,91,255,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#004FE0]"
            >
              <Link href="/book-appointment">
                Book a Site Walkthrough
                <ArrowRight className="size-5" aria-hidden="true" />
              </Link>
            </Button>

            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <Check className="size-4 text-[#12B7FF]" aria-hidden="true" />
              Response within 24 hours
            </span>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {["No pressure", "Clear guidance", "Practical next steps"].map(
              (point) => (
                <span key={point} className="flex items-center gap-2">
                  <Check className="size-4 text-[#12B7FF]" aria-hidden="true" />
                  {point}
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function PointOfSalePage() {
  return (
    <main className="flex-1">
      <PosHero />
      <EverythingNeededSection />
      <BuiltAroundRestaurantSection />
      <ImplementationProcessSection />
      <PosFinalCTA />
    </main>
  );
}
