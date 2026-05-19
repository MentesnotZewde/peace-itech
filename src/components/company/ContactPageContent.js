"use client";

import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  ChevronDown,
  Clock,
  Globe2,
  Headphones,
  LifeBuoy,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

const contactMethods = [
  { title: "Email Support", detail: "hello@peaceitech.com", icon: Mail },
  { title: "Business Inquiries", detail: "Strategy, proposals, and partnerships", icon: BriefcaseBusiness },
  { title: "Technical Support", detail: "Helpdesk, troubleshooting, and systems care", icon: Headphones },
  { title: "WhatsApp", detail: "Fast project and support conversations", icon: MessageCircle },
  { title: "Office Locations", detail: "Canada and Ethiopia presence", icon: MapPin },
  { title: "Social Media", detail: "Updates, insights, and company news", icon: Globe2 },
];

const reasons = [
  { title: "Fast response", icon: Clock },
  { title: "Scalable solutions", icon: Sparkles },
  { title: "Expert support", icon: LifeBuoy },
  { title: "Secure systems", icon: ShieldCheck },
  { title: "Customer-first approach", icon: Users },
];

const faqs = [
  {
    question: "How quickly will Peace iTech Inc respond?",
    answer:
      "Most new business inquiries receive an initial response within one business day, with urgent support handled according to the agreed support channel.",
  },
  {
    question: "Can you support businesses in both Canada and Ethiopia?",
    answer:
      "Yes. Peace iTech Inc is structured for remote-first delivery and supports organizations connected to Canada, Ethiopia, and international markets.",
  },
  {
    question: "What should I include in my project message?",
    answer:
      "Share your business goal, current challenge, preferred service, timeline, and any systems your team already uses.",
  },
  {
    question: "Do you offer ongoing support after launch?",
    answer:
      "Yes. We can support websites, ERP systems, automations, cybersecurity improvements, marketing systems, and IT operations after delivery.",
  },
];

export default function ContactPageContent() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main className="flex-1">
      <section className="relative overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
        <div className="absolute left-1/2 top-0 -z-10 size-[36rem] -translate-x-1/2 rounded-full bg-[#12B7FF]/15 blur-3xl" />
        <div className="absolute right-0 top-28 -z-10 size-80 rounded-full bg-[#12B7FF]/15 blur-3xl" />

        <div className="mx-auto max-w-7xl">
          {/* Page structure: contact starts with a strong promise and a visual communication dashboard. */}
          <div className="grid gap-10 rounded-[2rem] border border-border/70 bg-gradient-to-br from-background via-muted/40 to-[#EAF8FF]/60 p-5 shadow-2xl shadow-foreground/10 dark:to-[#07111F]/40 sm:p-8 lg:grid-cols-[0.95fr_1.05fr] lg:p-10">
            <div className="flex flex-col justify-center rounded-[1.5rem] bg-background/70 p-6 backdrop-blur sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#005BFF]">
                Contact Peace iTech Inc
              </p>
              <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight tracking-normal text-foreground sm:text-6xl">
                Let&apos;s build something amazing together.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                Start a conversation about websites, ERP systems, automation, cybersecurity, marketing, or support. We will help you shape the right next step.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="h-12 rounded-full px-6">
                  <a href="#contact-form">
                    Send a message
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 rounded-full bg-background/70 px-6">
                  <Link href="/about-us">Learn about us</Link>
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
                    Communication Hub
                  </span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {["Project inquiry", "Support request", "Partnership", "Technical review"].map((item) => (
                    <div key={item} className="rounded-2xl border border-border bg-muted/40 p-4">
                      <Send className="size-5 text-[#005BFF]" aria-hidden="true" />
                      <p className="mt-4 text-sm font-semibold text-foreground">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-2xl bg-foreground p-5 text-background">
                  <p className="text-sm text-background/70">Response workflow</p>
                  <div className="mt-5 grid grid-cols-4 gap-2">
                    {["Receive", "Review", "Plan", "Reply"].map((step) => (
                      <div key={step} className="rounded-xl bg-background/10 p-3 text-center text-xs font-semibold">
                        {step}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#005BFF]">
              Contact methods
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal text-foreground sm:text-5xl">
              Choose the best way to reach our team.
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {contactMethods.map((method) => {
              const Icon = method.icon;
              return (
                <div key={method.title} className="rounded-[1.5rem] border border-border/70 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#005BFF]/10">
                  <Icon className="size-6 text-[#005BFF]" aria-hidden="true" />
                  <h3 className="mt-5 text-xl font-semibold text-foreground">{method.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{method.detail}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="contact-form" className="bg-muted/30 py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#005BFF]">
              Start a project
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal text-foreground sm:text-5xl">
              Tell us what you want to build, fix, automate, or secure.
            </h2>
            <p className="mt-5 text-base leading-7 text-muted-foreground">
              This form is styled as a premium enterprise intake experience. Connect it to an API route or CRM when you are ready to process submissions.
            </p>
          </div>

          <form className="rounded-[1.5rem] border border-border/70 bg-background p-5 shadow-2xl shadow-foreground/10 sm:p-6">
            {/* Form logic: labels stay visible above inputs so the layout remains accessible and easy for beginners to follow. */}
            <div className="grid gap-5 sm:grid-cols-2">
              {[
                { label: "Name", type: "text", placeholder: "Your full name" },
                { label: "Company", type: "text", placeholder: "Company name" },
                { label: "Email", type: "email", placeholder: "you@company.com" },
              ].map((field) => (
                <label key={field.label} className="grid gap-2">
                  <span className="text-sm font-semibold text-foreground">{field.label}</span>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    className="h-12 rounded-2xl border border-border bg-muted/40 px-4 text-sm outline-none transition-shadow focus:ring-3 focus:ring-ring/30"
                  />
                </label>
              ))}
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-foreground">Service Needed</span>
                <select className="h-12 rounded-2xl border border-border bg-muted/40 px-4 text-sm outline-none transition-shadow focus:ring-3 focus:ring-ring/30">
                  <option>Web Development</option>
                  <option>ERP Systems</option>
                  <option>Business Automation</option>
                  <option>Cybersecurity</option>
                  <option>Digital Marketing</option>
                  <option>IT Support</option>
                </select>
              </label>
            </div>
            <label className="mt-5 grid gap-2">
              <span className="text-sm font-semibold text-foreground">Message</span>
              <textarea
                rows={6}
                placeholder="Share your goals, current challenge, timeline, and preferred service."
                className="resize-none rounded-2xl border border-border bg-muted/40 px-4 py-3 text-sm outline-none transition-shadow focus:ring-3 focus:ring-ring/30"
              />
            </label>
            <Button type="submit" size="lg" className="mt-6 h-12 rounded-full px-6">
              Send message
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </form>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 lg:grid-cols-2">
            {[
              { country: "Canada Office", detail: "Business development, strategy, partnerships, and client success." },
              { country: "Ethiopia Office", detail: "Technology delivery, automation, support, and implementation collaboration." },
            ].map((office) => (
              <div key={office.country} className="rounded-[1.5rem] border border-border/70 bg-card p-6 shadow-sm">
                <div className="mb-6 flex items-center gap-3">
                  <MapPin className="size-6 text-[#005BFF]" aria-hidden="true" />
                  <h3 className="text-2xl font-semibold text-foreground">{office.country}</h3>
                </div>
                {/* Map-style visual uses pure Tailwind blocks so no external map asset is required. */}
                <div className="rounded-2xl bg-gradient-to-br from-[#005BFF]/15 to-[#12B7FF]/15 p-4">
                  <div className="grid h-44 grid-cols-4 gap-2">
                    {[0, 1, 2, 3, 4, 5, 6, 7].map((block) => (
                      <span key={block} className="rounded-xl bg-background/70" />
                    ))}
                  </div>
                </div>
                <p className="mt-5 text-sm leading-6 text-muted-foreground">{office.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#005BFF]">
              Why work with us
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal text-foreground sm:text-5xl">
              Built for teams that need dependable technology partners.
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {reasons.map((reason) => {
              const Icon = reason.icon;
              return (
                <div key={reason.title} className="rounded-2xl border border-border/70 bg-background p-5 shadow-sm">
                  <Icon className="size-5 text-[#005BFF]" aria-hidden="true" />
                  <p className="mt-4 text-sm font-semibold text-foreground">{reason.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#005BFF]">
              Quick help
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal text-foreground sm:text-5xl">
              Answers before the first call.
            </h2>
          </div>
          <div className="grid gap-3">
            {faqs.map((faq, index) => (
              <div key={faq.question} className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 text-left"
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                >
                  <span className="font-semibold text-foreground">{faq.question}</span>
                  <ChevronDown className={`size-5 shrink-0 transition-transform ${openFaq === index ? "rotate-180" : ""}`} aria-hidden="true" />
                </button>
                {/* Component logic: the FAQ expands by switching max-height and opacity. */}
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                  <p className="pt-4 text-sm leading-6 text-muted-foreground">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-foreground p-8 text-background shadow-2xl shadow-foreground/10 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-background/60">
                Ready when you are
              </p>
              <h2 className="mt-3 max-w-3xl text-3xl font-semibold sm:text-5xl">
                Let Peace iTech Inc help you move from idea to execution.
              </h2>
            </div>
            <Button asChild size="lg" variant="secondary" className="h-12 rounded-full px-6">
              <a href="#contact-form">
                Start your project
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}


