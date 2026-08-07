"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  CheckCircle2,
  Eye,
  Heart,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";

import ScrollReveal from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/button";

const strengths = [
  "Scalable digital systems",
  "Reliable IT and support",
  "Automation-first workflows",
  "Security-minded delivery",
  "Business-focused websites",
  "Long-term partnerships",
];

const teamMembers = [
  {
    name: "Muste",
    role: "CEO & Founder",
    initials: "MO",
    photo: "/images/muste_2.png",
  },
  {
    name: "Minte",
    role: "Chief Technology Officer",
    initials: "MT",
    photo: "/images/minte_1.png",
  },
  {
    name: "Melke",
    role: "Lead Software Engineer",
    initials: "MK",
    photo: "/images/melke_3.png",
  },
  {
    name: "Operations Team",
    role: "Operations Manager",
    initials: "OM",
    photo: "/images/Operations Manager.png",
  },
  {
    name: "Marketing Team",
    role: "Marketing Manager",
    initials: "SE",
    photo: "/images/Marketing Manager.png",
  },
  {
    name: "Client Success Team",
    role: "Client Success Manager",
    initials: "CS",
    photo: "/images/Client Success Manager.png",
  },
];

const foundations = [
  {
    title: "Our Vision",
    icon: Eye,
    description:
      "To become a trusted digital transformation partner for businesses that want practical, scalable, and reliable technology.",
  },
  {
    title: "Our Mission",
    icon: Target,
    description:
      "To deliver websites, automation, marketing, and IT support that simplify operations and help organizations grow with confidence.",
  },
  {
    title: "Our Values",
    icon: Heart,
    values: [
      "Integrity in every action",
      "Innovation that solves real problems",
      "Collaboration with every client",
      "Reliable support after launch",
    ],
  },
];

const journey = [
  {
    year: "Step 01",
    title: "Started With Practical IT",
    description:
      "We began by helping businesses solve everyday technology problems with dependable support, repair, setup, and guidance.",
  },
  {
    year: "Step 02",
    title: "Expanded Into Digital Builds",
    description:
      "Our work grew into websites, custom platforms, and digital experiences designed to help teams look professional and work faster.",
  },
  {
    year: "Step 03",
    title: "Added Automation & Growth",
    description:
      "We brought together automation, digital marketing, and business systems so clients could reduce manual work and reach more customers.",
  },
  {
    year: "Today",
    title: "A Full Technology Partner",
    description:
      "Peace iTech now supports businesses across strategy, delivery, support, and long-term improvement from one reliable team.",
  },
];

const certifications = [
  {
    title: "Microsoft Certified",
    issuer: "Microsoft",
    description: "Microsoft cloud, productivity, and business technology.",
    icon: Award,
  },
  {
    title: "Google Analytics Certified",
    issuer: "Google",
    description: "Analytics setup, reporting, and campaign measurement.",
    icon: BadgeCheck,
  },
  {
    title: "Google Ads Certified",
    issuer: "Google",
    description: "Search campaigns, conversion tracking, and ad performance.",
    icon: Target,
  },
  {
    title: "HubSpot Academy",
    issuer: "HubSpot",
    description: "Inbound marketing, CRM workflows, and lead management.",
    icon: Sparkles,
  },
  {
    title: "Meta Business Training",
    issuer: "Meta",
    description: "Social campaign planning, targeting, and optimization.",
    icon: BadgeCheck,
  },
  {
    title: "Cybersecurity Fundamentals",
    issuer: "Security Practice",
    description: "Secure setup, access control, and responsible IT delivery.",
    icon: BadgeCheck,
  },
];

export default function AboutUsPage() {
  return (
    <main className="flex-1">
      <section className="relative isolate -mt-[5.5rem] min-h-[22rem] overflow-hidden sm:min-h-[24rem] lg:min-h-[26rem]">
        <Image
          src="/images/about us banner.png"
          alt="Peace iTech team collaborating with a client"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#020817]/62" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,8,23,0.88),rgba(2,8,23,0.54)_46%,rgba(0,91,255,0.2))]" />
        <div className="relative mx-auto flex min-h-[22rem] max-w-7xl items-center px-4 pb-10 pt-[8rem] sm:min-h-[24rem] sm:px-6 lg:min-h-[26rem] lg:px-8">
          <ScrollReveal className="max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-7 bg-[#12B7FF]" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#12B7FF]">
                Who We Are
              </span>
            </div>
            <h1 className="text-4xl font-semibold leading-tight tracking-normal text-white sm:text-5xl lg:text-6xl">
              About Us
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/88 sm:text-lg">
              We help businesses modernize with reliable websites, automation,
              digital marketing, IT support, and scalable technology solutions.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="px-4 py-16 transition-colors sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <ScrollReveal className="relative mx-auto w-full max-w-xl lg:mx-0">
            <div className="absolute -left-6 top-1/2 hidden h-36 w-28 -translate-y-1/2 rounded-full bg-[#005BFF]/8 blur-2xl sm:block" />
            <div className="relative min-h-[25rem] sm:min-h-[28rem]">
              <div className="absolute left-0 top-0 w-[72%] overflow-hidden rounded-[1.35rem] border border-[#005BFF]/10 bg-white shadow-[0_24px_60px_rgba(0,91,255,0.12)] dark:border-[#12B7FF]/14 dark:bg-[#0B1830]/72">
                <Image
                  src="/images/company-story-2.png"
                  alt="Peace iTech consultants reviewing a digital project"
                  width={720}
                  height={620}
                  sizes="(min-width: 1024px) 34vw, 72vw"
                  className="aspect-[1.04/1] w-full object-cover"
                />
              </div>

              <div className="absolute right-3 top-10 z-10 rounded-2xl border border-[#12B7FF]/18 bg-[#005BFF] px-6 py-5 text-white shadow-[0_18px_42px_rgba(0,91,255,0.28)] sm:right-8">
                <div className="text-3xl font-semibold leading-none">6+</div>
                <div className="mt-2 text-[0.68rem] font-semibold uppercase leading-4 tracking-[0.14em] text-white/88">
                  Service
                  <br />
                  Areas
                </div>
              </div>

              <div className="absolute bottom-0 right-0 w-[62%] overflow-hidden rounded-[1.25rem] border border-[#005BFF]/10 bg-white shadow-[0_24px_60px_rgba(2,8,23,0.14)] dark:border-[#12B7FF]/14 dark:bg-[#0B1830]/72">
                <Image
                  src="/images/company-story-3.png"
                  alt="Peace iTech team building software and IT systems"
                  width={720}
                  height={520}
                  sizes="(min-width: 1024px) 30vw, 62vw"
                  className="aspect-[1.34/1] w-full object-cover"
                />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#005BFF] dark:text-[#12B7FF]">
              Company About
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight tracking-normal text-foreground sm:text-5xl">
              One partner for practical{" "}
              <span className="text-[#005BFF] dark:text-[#12B7FF]">
                business success
              </span>
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground">
              Peace iTech Inc helps organizations in Canada, Ethiopia, and
              beyond improve the way they work with modern websites,
              automation, business systems, digital marketing, and dependable IT
              support. Our solutions are built around people, workflows,
              security, and long-term growth.
            </p>

            <div className="mt-8">
              <h3 className="text-sm font-semibold text-foreground">
                Our Core Strengths
              </h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {strengths.map((strength) => (
                  <div
                    key={strength}
                    className="flex items-center gap-3 text-sm font-medium text-foreground"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#005BFF] dark:text-[#12B7FF]" />
                    <span>{strength}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button
              asChild
              className="mt-8 h-12 rounded-full bg-[#005BFF] px-6 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(0,91,255,0.28)] transition hover:bg-[#004FE0]"
            >
              <Link href="/contact">
                Meet Our Team
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>

      <section className="px-4 pb-16 transition-colors sm:px-6 sm:pb-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="text-center">
            <p className="mx-auto w-fit rounded-full bg-[#005BFF]/8 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#005BFF] dark:bg-[#12B7FF]/10 dark:text-[#12B7FF]">
              Team
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-normal text-foreground sm:text-4xl">
              Meet the Peace iTech people
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              A practical team built around strategy, design, engineering,
              support, and measurable business progress.
            </p>
          </ScrollReveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member, index) => (
              <ScrollReveal key={member.name} delay={index * 0.04}>
                <article className="group relative min-h-[26rem] overflow-hidden rounded-[1rem] border border-[#12B7FF]/42 bg-[#030817] shadow-[0_18px_48px_rgba(0,91,255,0.18)] ring-1 ring-[#005BFF]/18 transition duration-300 hover:-translate-y-1 hover:border-[#12B7FF]/80 hover:shadow-[0_26px_62px_rgba(0,91,255,0.26)] sm:min-h-[28rem] lg:min-h-[27rem]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(18,183,255,0.34),transparent_34%),linear-gradient(180deg,rgba(0,91,255,0.58),rgba(3,8,23,0.96)_72%)]" />
                  <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:22px_22px]" />
                  <Image
                    src={member.photo}
                    alt={`${member.name}, ${member.role}`}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
                    className="object-cover object-[center_18%] opacity-95 transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,8,23,0)_46%,rgba(0,91,255,0.22)_68%,rgba(3,8,23,0.98)_100%)]" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-sm font-semibold leading-tight text-white">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-[0.65rem] font-medium leading-4 text-white/68">
                      {member.role}
                    </p>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 transition-colors sm:px-6 sm:pb-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#005BFF] dark:text-[#12B7FF]">
              Our Foundation
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-normal text-foreground sm:text-4xl">
              Vision, Mission & Values
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <div className="mt-10 grid overflow-hidden rounded-[1rem] border border-[#005BFF]/10 bg-white/82 shadow-[0_18px_48px_rgba(0,91,255,0.08)] backdrop-blur-xl dark:border-[#12B7FF]/14 dark:bg-[#0B1830]/72 lg:grid-cols-3">
              {foundations.map((item, index) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.title}
                    className="flex gap-5 border-[#005BFF]/10 p-6 dark:border-[#12B7FF]/14 sm:p-8 lg:border-l lg:first:border-l-0"
                  >
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#005BFF]/8 text-[#005BFF] shadow-[0_14px_34px_rgba(0,91,255,0.08)] dark:bg-[#12B7FF]/10 dark:text-[#12B7FF]">
                      <Icon className="h-8 w-8" strokeWidth={1.8} />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-foreground">
                        {item.title}
                      </h3>
                      {item.values ? (
                        <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
                          {item.values.map((value) => (
                            <li key={value} className="flex gap-2">
                              <span className="mt-[0.65rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#005BFF] dark:bg-[#12B7FF]" />
                              <span>{value}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="mt-3 text-sm leading-6 text-muted-foreground">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="px-4 pb-16 transition-colors sm:px-6 sm:pb-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <ScrollReveal>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#005BFF] dark:text-[#12B7FF]">
                Company Journey
              </p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-normal text-foreground sm:text-4xl">
                Built step by step with real business needs
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
                Our journey is shaped by the same promise we bring to clients:
                solve the important problems first, then keep improving with
                technology that is useful, secure, and easy to manage.
              </p>

              <div className="mt-8 rounded-[1rem] border border-[#005BFF]/10 bg-white/82 p-5 shadow-[0_18px_44px_rgba(0,91,255,0.08)] backdrop-blur-xl dark:border-[#12B7FF]/14 dark:bg-[#0B1830]/72">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#005BFF] text-white shadow-[0_14px_30px_rgba(0,91,255,0.25)]">
                    <Rocket className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-foreground">
                      360°
                    </p>
                    <p className="text-sm leading-6 text-muted-foreground">
                      Strategy, build, support, and growth under one roof.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <div className="relative">
              <div className="absolute left-6 top-6 hidden h-[calc(100%-3rem)] w-px bg-gradient-to-b from-[#005BFF] via-[#12B7FF] to-[#005BFF]/20 sm:block" />
              <div className="grid gap-4">
                {journey.map((item, index) => (
                  <ScrollReveal key={item.title} delay={index * 0.05}>
                    <article className="group relative overflow-hidden rounded-[1rem] border border-[#005BFF]/10 bg-white/86 p-5 shadow-[0_16px_42px_rgba(0,91,255,0.07)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#005BFF]/28 hover:shadow-[0_24px_58px_rgba(0,91,255,0.12)] dark:border-[#12B7FF]/14 dark:bg-[#0B1830]/74 dark:hover:border-[#12B7FF]/30 sm:ml-14">
                      <div className="absolute -left-[3.25rem] top-6 hidden h-12 w-12 items-center justify-center rounded-full border border-[#12B7FF]/24 bg-[#005BFF] text-white shadow-[0_12px_30px_rgba(0,91,255,0.24)] sm:flex">
                        <Sparkles className="h-5 w-5" />
                      </div>
                      <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#005BFF] to-[#12B7FF]" />
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#005BFF] dark:text-[#12B7FF]">
                            {item.year}
                          </p>
                          <h3 className="mt-2 text-lg font-semibold text-foreground">
                            {item.title}
                          </h3>
                        </div>
                        <span className="w-fit rounded-full border border-[#005BFF]/14 px-3 py-1 text-xs font-semibold text-[#005BFF] dark:border-[#12B7FF]/18 dark:text-[#12B7FF]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <p className="mt-4 text-sm leading-6 text-muted-foreground">
                        {item.description}
                      </p>
                    </article>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 transition-colors sm:px-6 sm:pb-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#005BFF] dark:text-[#12B7FF]">
              Certifications We Have
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-normal text-foreground sm:text-4xl">
              Certified skills behind our work
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
              Our team keeps improving through recognized technology,
              marketing, analytics, and security training.
            </p>
          </ScrollReveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert, index) => {
              const Icon = cert.icon;

              return (
                <ScrollReveal key={cert.title} delay={index * 0.04}>
                  <article className="group relative min-h-[13.5rem] overflow-hidden rounded-[1rem] border border-[#005BFF]/14 bg-white/86 p-6 shadow-[0_16px_42px_rgba(0,91,255,0.07)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#005BFF]/36 hover:shadow-[0_24px_58px_rgba(0,91,255,0.13)] dark:border-[#12B7FF]/16 dark:bg-[#0B1830]/74 dark:hover:border-[#12B7FF]/34">
                    <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-[4rem] bg-[#005BFF]/8 dark:bg-[#12B7FF]/10" />
                    <div className="relative">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#005BFF] text-white shadow-[0_16px_34px_rgba(0,91,255,0.24)]">
                          <Icon className="h-7 w-7" strokeWidth={1.8} />
                        </div>
                        <span className="rounded-full border border-[#005BFF]/14 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#005BFF] dark:border-[#12B7FF]/18 dark:text-[#12B7FF]">
                          Certified
                        </span>
                      </div>
                      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-[#005BFF] dark:text-[#12B7FF]">
                        {cert.issuer}
                      </p>
                      <h3 className="mt-2 text-lg font-semibold text-foreground">
                        {cert.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-muted-foreground">
                        {cert.description}
                      </p>
                    </div>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
