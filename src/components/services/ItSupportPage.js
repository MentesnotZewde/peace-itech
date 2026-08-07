import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  MessageCircle,
  Headphones,
  Laptop,
  MonitorCheck,
  MonitorCog,
  Settings,
  ShieldCheck,
  Wifi,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ui/ScrollReveal";

const itSupportServices = [
  {
    title: "Help Desk & Technical Support",
    description: "We solve everyday IT problems so your team can stay productive.",
    icon: Headphones,
    features: [
      "Troubleshooting & problem solving",
      "Email & login issues",
      "Printer & hardware support",
      "Software & application support",
      "Internet & connectivity issues",
      "Friendly, fast, and reliable help",
    ],
  },
  {
    title: "Remote IT Support",
    description: "We connect remotely and fix issues quickly without the wait.",
    icon: MonitorCog,
    features: [
      "Remote troubleshooting",
      "AnyDesk / TeamViewer / Quick Assist",
      "System configuration",
      "Software installation",
      "Performance optimization",
      "Secure remote sessions",
    ],
  },
  {
    title: "Device Setup & Management",
    description:
      "We set up, configure, and manage your devices from start to finish.",
    icon: Laptop,
    features: [
      "Laptop & desktop setup",
      "Software installation & updates",
      "New employee onboarding",
      "Device inventory & updates",
      "Mobile device setup",
      "Device monitoring & maintenance",
    ],
  },
  {
    title: "Network & Connectivity Support",
    description:
      "We keep your network stable, secure, and performing at its best.",
    icon: Wifi,
    features: [
      "Wi-Fi & wired network support",
      "Router, switches & access points",
      "VPN & remote access",
      "DNS, DHCP & connectivity issues",
      "Network security",
      "Performance monitoring",
    ],
  },
];

const supportModes = [
  {
    title: "Remote Support",
    description:
      "Fast, efficient, and secure remote assistance for most IT issues.",
    image: "/images/Remote IT support.png",
    imageAlt: "IT support specialist providing remote support",
    icon: MonitorCog,
    features: [
      "Software & application support",
      "Microsoft 365 support",
      "Email & account issues",
      "System configuration",
      "Password resets",
      "Troubleshooting & diagnostics",
      "Performance optimization",
      "And more",
    ],
  },
  {
    title: "Onsite Support",
    description:
      "Hands-on support for issues that require physical access and on-site expertise.",
    image: "/images/Onsite Support.png",
    imageAlt: "Technician repairing desktop hardware onsite",
    icon: Building2,
    features: [
      "Hardware installation & repair",
      "Network & Wi-Fi troubleshooting",
      "Printer & scanner support",
      "Cabling & connectivity",
      "Device setup & replacement",
      "Office IT setup",
      "Preventive maintenance",
      "And more",
    ],
  },
];

const itSupportProcessSteps = [
  {
    title: "Contact Us",
    description: "Reach out by phone, email, or live chat. Tell us what you need.",
    icon: MessageCircle,
  },
  {
    title: "Assess & Plan",
    description: "We assess the issue and provide the best solution for your business.",
    icon: ClipboardCheck,
  },
  {
    title: "Resolve",
    description: "Our experts get to work and resolve the issue quickly and efficiently.",
    icon: Settings,
  },
  {
    title: "Test & Follow Up",
    description: "We ensure everything works perfectly and follow up to make sure you are satisfied.",
    icon: MonitorCheck,
  },
];

function AnyDeskLogo(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <path d="M13 14 24 24 13 34 4 24 13 14Z" fill="#FF3B30" />
      <path d="M26 14 37 24 26 34 17 24 26 14Z" fill="#FF5A4F" />
      <path d="M35 14 46 24 35 34 30 29 35 24 30 19 35 14Z" fill="#E62922" />
    </svg>
  );
}

function TeamViewerLogo(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <rect x="7" y="7" width="34" height="34" rx="8" fill="#0B86FF" />
      <circle cx="24" cy="24" r="13" fill="white" opacity="0.95" />
      <path d="M14 24h20" stroke="#0B86FF" strokeWidth="3" strokeLinecap="round" />
      <path d="m18 19-5 5 5 5M30 19l5 5-5 5" stroke="#0B86FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function QuickAssistLogo(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <rect x="8" y="10" width="32" height="24" rx="3" fill="#2B7CD3" />
      <rect x="12" y="14" width="24" height="14" rx="1.5" fill="#8FD3FF" opacity="0.58" />
      <path d="M20 39h8M24 34v5" stroke="#8FD3FF" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M26 21h8M31 17l4 4-4 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Microsoft365Logo(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <path d="M24 4 39 12.8v22.4L24 44 9 35.2V12.8L24 4Z" fill="#6B5CFF" />
      <path d="M24 4 39 12.8 24 21.7 9 12.8 24 4Z" fill="#25C2FF" />
      <path d="M24 21.7 39 12.8v22.4L24 44V21.7Z" fill="#7747D6" />
      <path d="M9 12.8 24 21.7V44L9 35.2V12.8Z" fill="#2563EB" />
    </svg>
  );
}

function DefenderLogo(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <path d="M24 5 39 11v12.2c0 9.7-6.1 16.1-15 20-8.9-3.9-15-10.3-15-20V11L24 5Z" fill="#42A5F5" />
      <path d="M24 9v29.5c6.6-3.4 10.8-8.1 10.8-15.3v-9.3L24 9Z" fill="#0B5CAD" />
      <path d="M24 9 13.2 13.9v9.3c0 7.2 4.2 11.9 10.8 15.3V9Z" fill="#74C0FC" />
    </svg>
  );
}

function OfficeLogo(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <path d="M10 12 28 5l10 5v28l-18 5-10-5V12Z" fill="#F25022" />
      <path d="M20 15 32 11v26l-12-4V15Z" fill="#D83B01" />
      <path d="M10 12 20 15v18l-10 5V12Z" fill="#FF8A00" />
    </svg>
  );
}

const itSupportTools = [
  {
    name: "AnyDesk",
    description: "Fast and secure remote desktop access.",
    logo: AnyDeskLogo,
  },
  {
    name: "TeamViewer",
    description: "Reliable remote support and remote meetings.",
    logo: TeamViewerLogo,
  },
  {
    name: "Microsoft Quick Assist",
    description: "Built-in remote support from Microsoft.",
    logo: QuickAssistLogo,
  },
  {
    name: "Microsoft 365",
    description: "Productivity and collaboration tools for businesses.",
    logo: Microsoft365Logo,
  },
  {
    name: "Microsoft Defender",
    description: "Advanced threat protection and security management.",
    logo: DefenderLogo,
  },
  {
    name: "Office Apps",
    description: "Word, Excel, Outlook and more.",
    logo: OfficeLogo,
  },
];

const itSupportCtaHighlights = [
  {
    title: "Fast response",
    description: "Help when work stalls",
    icon: Headphones,
  },
  {
    title: "Secure support",
    description: "Careful remote access",
    icon: ShieldCheck,
  },
  {
    title: "Reliable systems",
    description: "Keep devices ready",
    icon: MonitorCheck,
  },
];

const itSupportCtaTrustPoints = [
  "No pressure",
  "Clear advice",
  "Practical next steps",
];

export default function ItSupportPage() {
  return (
    <main className="flex-1">
      <section className="relative isolate -mt-[5.5rem] flex min-h-[44rem] items-center justify-center overflow-hidden px-4 pb-16 pt-[10rem] text-center text-white sm:min-h-[48rem] sm:px-6 lg:min-h-[50rem] lg:px-8">
        <Image
          src="/images/it_support_hero.png"
          alt="IT support technician repairing a desktop computer workstation"
          fill
          priority
          quality={85}
          className="absolute inset-0 -z-20 object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 -z-10 bg-[#020817]/52" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_42%,rgba(0,91,255,0.16),transparent_34%),linear-gradient(90deg,rgba(0,0,0,0.58),rgba(0,0,0,0.12)_48%,rgba(0,0,0,0.56))]" />

        <div className="mx-auto max-w-7xl">
          <div className="web-hero-copy-enter mx-auto max-w-6xl">
            <div className="mx-auto mb-7 inline-flex items-center gap-3 rounded-full border border-white/22 bg-black/20 px-5 py-2.5 text-sm font-semibold text-white shadow-sm backdrop-blur-md sm:text-base">
              <ShieldCheck className="size-5" aria-hidden="true" />
              Reliable IT Support
            </div>

            <h1 className="font-heading text-4xl font-semibold leading-tight tracking-normal text-white sm:text-5xl lg:text-[3.35rem]">
              Smart IT Support For Modern Business
              <span className="hero-heading-accent block">
                Repairs And Services
              </span>
            </h1>

            <div className="mt-8 flex justify-center">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-full bg-[#005BFF] px-6 text-white shadow-xl shadow-[#005BFF]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#071B8F] hover:shadow-[#12B7FF]/20"
              >
                <Link href="/contact">
                  Contact Us
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden px-4 py-14 transition-colors sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#005BFF] dark:text-[#12B7FF]">
                What We Do
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-normal text-foreground sm:text-5xl">
                Complete IT Support for Your Business
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
                From day-to-day troubleshooting to long-term technology
                management, we provide practical IT support that keeps your
                systems reliable, secure, and ready for work.
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {itSupportServices.map((service, index) => {
              const Icon = service.icon;

              return (
                <ScrollReveal key={service.title} delay={80 + index * 80}>
                  <article className="group flex h-full flex-col rounded-[1.5rem] border border-[#005BFF]/10 bg-white/82 p-5 shadow-[0_18px_44px_rgba(0,91,255,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#12B7FF]/35 hover:bg-white hover:shadow-[0_26px_64px_rgba(18,183,255,0.14)] dark:border-[#12B7FF]/14 dark:bg-[#0B1830]/72 dark:hover:border-[#12B7FF]/35 dark:hover:shadow-[#12B7FF]/12">
                    <div className="flex items-start gap-4">
                      <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#005BFF]/10 text-[#005BFF] ring-1 ring-[#005BFF]/12 transition-transform duration-300 group-hover:scale-105 dark:bg-[#12B7FF]/12 dark:text-[#12B7FF] dark:ring-[#12B7FF]/16">
                        <Icon
                          className="size-7 stroke-[1.6]"
                          aria-hidden="true"
                        />
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-lg font-semibold leading-6 text-foreground">
                          {service.title}
                        </h3>
                        <span className="mt-3 block h-0.5 w-9 rounded-full bg-[#005BFF] dark:bg-[#12B7FF]" />
                      </div>
                    </div>

                    <p className="mt-4 text-sm leading-6 text-muted-foreground">
                      {service.description}
                    </p>

                    <ul className="mt-4 space-y-2">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex gap-2.5 text-xs leading-5 text-muted-foreground"
                        >
                          <Check
                            className="mt-0.5 size-4 shrink-0 text-[#005BFF] dark:text-[#12B7FF]"
                            aria-hidden="true"
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden px-4 py-14 transition-colors sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#005BFF] dark:text-[#12B7FF]">
                We&apos;ve Got You Covered
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-normal text-foreground sm:text-5xl">
                Remote & Onsite Support
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
                We solve most issues remotely for speed and convenience. When
                hands-on help is needed, we&apos;re there in person.
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {supportModes.map((mode, index) => {
              const Icon = mode.icon;

              return (
                <ScrollReveal key={mode.title} delay={100 + index * 120}>
                  <article className="group overflow-hidden rounded-[1.5rem] border border-[#005BFF]/10 bg-white/82 shadow-[0_18px_44px_rgba(0,91,255,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#12B7FF]/35 hover:bg-white hover:shadow-[0_26px_64px_rgba(18,183,255,0.14)] dark:border-[#12B7FF]/14 dark:bg-[#0B1830]/72 dark:hover:border-[#12B7FF]/35 dark:hover:shadow-[#12B7FF]/12">
                    <div className="relative aspect-[16/6] overflow-hidden">
                      <Image
                        src={mode.image}
                        alt={mode.imageAlt}
                        fill
                        quality={85}
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.035]"
                        sizes="(min-width: 1024px) 50vw, 100vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#07111F]/64 via-[#07111F]/12 to-transparent" />
                    </div>

                    <div className="relative p-5 pt-7">
                      <span className="absolute -top-7 left-5 flex size-14 shrink-0 items-center justify-center rounded-2xl bg-[#005BFF] text-white shadow-[0_16px_36px_rgba(0,91,255,0.22)] ring-1 ring-white/20 transition-transform duration-300 group-hover:scale-105 dark:bg-[#12B7FF] dark:text-[#07111F]">
                        <Icon
                          className="size-8 stroke-[1.6]"
                          aria-hidden="true"
                        />
                      </span>
                      <h3 className="text-xl font-semibold leading-7 text-foreground">
                        {mode.title}
                      </h3>
                      <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                        {mode.description}
                      </p>

                      <div className="my-4 h-px bg-[#005BFF]/10 dark:bg-[#12B7FF]/14" />

                      <ul className="grid gap-x-5 gap-y-2 sm:grid-cols-2">
                        {mode.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex gap-2.5 text-sm leading-5 text-muted-foreground"
                          >
                            <Check
                              className="mt-0.5 size-4 shrink-0 text-[#005BFF] dark:text-[#12B7FF]"
                              aria-hidden="true"
                            />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden px-4 py-14 transition-colors sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#005BFF] dark:text-[#12B7FF]">
                How We Work
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-normal text-foreground sm:text-5xl">
                Simple Process. Reliable Results.
              </h2>
              <span className="mx-auto mt-5 block h-0.5 w-10 rounded-full bg-[#005BFF] dark:bg-[#12B7FF]" />
            </div>
          </ScrollReveal>

          <div className="mt-10 grid gap-5 lg:grid-cols-[0.9fr_1.55fr] lg:items-stretch">
            <ScrollReveal>
              <div className="relative h-full min-h-80 overflow-hidden rounded-[1.5rem] border border-[#005BFF]/10 bg-white/82 shadow-[0_18px_44px_rgba(0,91,255,0.08)] backdrop-blur-xl dark:border-[#12B7FF]/14 dark:bg-[#0B1830]/72">
                <Image
                  src="/images/Remote IT support.png"
                  alt="IT support technician working on a laptop"
                  fill
                  quality={85}
                  className="object-cover object-center"
                  sizes="(min-width: 1024px) 34vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07111F]/44 via-transparent to-transparent" />
              </div>
            </ScrollReveal>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {itSupportProcessSteps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <ScrollReveal key={step.title} delay={120 + index * 90}>
                    <article className="group relative flex h-full min-h-80 flex-col items-center rounded-[1.5rem] border border-[#005BFF]/10 bg-white/82 p-6 text-center shadow-[0_18px_44px_rgba(0,91,255,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#12B7FF]/35 hover:bg-white hover:shadow-[0_26px_64px_rgba(18,183,255,0.14)] dark:border-[#12B7FF]/14 dark:bg-[#0B1830]/72 dark:hover:border-[#12B7FF]/35 dark:hover:shadow-[#12B7FF]/12">
                      <span className="flex size-12 items-center justify-center rounded-full bg-[#005BFF] text-sm font-bold text-white shadow-[0_12px_28px_rgba(0,91,255,0.24)]">
                        0{index + 1}
                      </span>
                      <span className="mt-8 flex size-16 items-center justify-center text-[#005BFF] dark:text-[#12B7FF]">
                        <Icon
                          className="size-14 stroke-[1.35]"
                          aria-hidden="true"
                        />
                      </span>
                      <h3 className="mt-8 text-xl font-semibold leading-7 text-foreground">
                        {step.title}
                      </h3>
                      <span className="mt-3 block h-0.5 w-9 rounded-full bg-[#005BFF] dark:bg-[#12B7FF]" />
                      <p className="mt-5 text-sm leading-7 text-muted-foreground">
                        {step.description}
                      </p>
                    </article>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden px-4 py-14 transition-colors sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl border-t border-[#005BFF]/10 pt-14 dark:border-[#12B7FF]/14">
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#005BFF] dark:text-[#12B7FF]">
                Tools We Use
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-normal text-foreground sm:text-5xl">
                Powerful Tools. Better Support.
              </h2>
            </div>
          </ScrollReveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {itSupportTools.map((tool, index) => {
              const Logo = tool.logo;

              return (
                <ScrollReveal key={tool.name} delay={90 + index * 70}>
                  <article className="animate-hero-card-enter group flex h-full min-h-60 flex-col items-center justify-center rounded-[1.25rem] border border-[#005BFF]/10 bg-white/82 p-5 text-center shadow-[0_18px_44px_rgba(0,91,255,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-[#12B7FF]/35 hover:bg-white hover:shadow-[0_26px_64px_rgba(18,183,255,0.14)] dark:border-[#12B7FF]/14 dark:bg-[#0B1830]/72 dark:hover:border-[#12B7FF]/35 dark:hover:shadow-[#12B7FF]/12">
                    <Logo
                      className="size-16 transition-transform duration-300 group-hover:scale-110"
                      aria-hidden="true"
                    />
                    <h3 className="mt-7 text-xl font-semibold leading-7 text-foreground">
                      {tool.name}
                    </h3>
                    <span className="mt-3 block h-0.5 w-8 rounded-full bg-[#005BFF] dark:bg-[#12B7FF]" />
                    <p className="mt-4 text-sm leading-6 text-muted-foreground">
                      {tool.description}
                    </p>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>

          <div className="mt-7 flex justify-center gap-4">
            {[0, 1, 2].map((dot) => (
              <span
                key={dot}
                className={`size-3 rounded-full ${
                  dot === 0
                    ? "bg-[#005BFF] dark:bg-[#12B7FF]"
                    : "bg-[#005BFF]/35 dark:bg-[#12B7FF]/35"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 transition-colors sm:px-6 sm:py-20 lg:px-8">
        <ScrollReveal>
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-[#005BFF]/12 bg-white/82 p-6 text-foreground shadow-[0_24px_70px_rgba(0,91,255,0.09)] backdrop-blur-xl dark:border-[#12B7FF]/24 dark:bg-[#06162B] dark:text-white dark:shadow-[0_24px_80px_rgba(0,91,255,0.16)] sm:p-10 lg:p-14">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(18,183,255,0.08),transparent_34%),radial-gradient(circle_at_88%_72%,rgba(0,91,255,0.08),transparent_36%)] dark:bg-[radial-gradient(circle_at_18%_20%,rgba(18,183,255,0.12),transparent_34%),radial-gradient(circle_at_88%_72%,rgba(0,91,255,0.18),transparent_36%)]" />
            <div className="animate-float absolute -right-20 -top-24 size-72 rounded-full bg-[#12B7FF]/8 blur-3xl dark:bg-[#12B7FF]/12" />
            <div className="animate-float absolute -bottom-24 right-16 size-80 rounded-full bg-[#005BFF]/7 blur-3xl dark:bg-[#005BFF]/12" />

            <div className="relative grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#005BFF] dark:text-[#12B7FF]">
                  Start with clarity
                </p>

                <h2 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight tracking-normal text-foreground dark:text-white sm:text-5xl">
                  Need IT support your team
                  <span
                    className="hero-heading-accent block"
                    style={{ textShadow: "none" }}
                  >
                    can count on?
                  </span>
                </h2>
                <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground dark:text-white/72 sm:text-lg">
                  Tell us what is slowing your team down. We&apos;ll help you
                  choose the right remote, onsite, device, and network support
                  plan for your business.
                </p>

                <div className="mt-9 grid gap-4 sm:grid-cols-3">
                  {itSupportCtaHighlights.map((item, index) => {
                    const Icon = item.icon;

                    return (
                      <ScrollReveal key={item.title} delay={120 + index * 120}>
                        <div className="flex items-center gap-3 border-[#005BFF]/14 sm:border-r sm:pr-4 last:border-r-0 dark:border-white/18">
                          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#005BFF]/10 text-[#005BFF] ring-1 ring-[#005BFF]/12 dark:bg-[#005BFF]/35 dark:text-[#12B7FF] dark:ring-[#12B7FF]/18">
                            <Icon className="size-5" aria-hidden="true" />
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-foreground dark:text-white">
                              {item.title}
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground dark:text-white/66">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </ScrollReveal>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-[#005BFF]/10 bg-white/54 p-5 backdrop-blur-sm dark:border-white/10 dark:bg-[#02102A]/34 lg:border-l lg:border-y-0 lg:border-r-0 lg:bg-transparent lg:pl-12">
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="h-16 w-full rounded-2xl bg-[#07111F] px-6 text-lg font-semibold text-white shadow-[0_18px_54px_rgba(0,91,255,0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#005BFF] hover:shadow-[0_24px_70px_rgba(18,183,255,0.28)] dark:bg-white dark:text-[#07111F] dark:shadow-[0_18px_54px_rgba(18,183,255,0.24)] dark:hover:bg-[#EAF8FF] dark:hover:shadow-[0_24px_70px_rgba(18,183,255,0.34)]"
                >
                  <Link href="/contact">
                    Request IT support
                    <ArrowRight className="size-6" aria-hidden="true" />
                  </Link>
                </Button>

                <div className="mt-7 flex items-center justify-center gap-3 text-muted-foreground dark:text-white/72">
                  <Clock3 className="size-5 text-[#12B7FF]" aria-hidden="true" />
                  <span className="text-sm sm:text-base">
                    Response within 24 hours
                  </span>
                </div>

                <div className="my-8 h-px bg-gradient-to-r from-transparent via-[#12B7FF]/32 to-transparent" />

                <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-[auto_auto_auto] xl:justify-center">
                  {itSupportCtaTrustPoints.map((point, index) => (
                    <ScrollReveal key={point} delay={260 + index * 120}>
                      <div className="flex items-center justify-center gap-2 whitespace-nowrap text-sm text-muted-foreground dark:text-white/76 lg:justify-start xl:justify-center">
                        <CheckCircle2
                          className="size-4 text-[#12B7FF]"
                          aria-hidden="true"
                        />
                        <span>{point}</span>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
