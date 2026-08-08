"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  ChevronDown,
  Minus,
  Plus,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "What services does Peace iTech offer?",
    answer:
      "We provide web development, business automation, ERP and operations systems, digital marketing, IT support, and practical technology consulting for growing businesses.",
  },
  {
    question: "Can you improve or redesign my existing website?",
    answer:
      "Yes. We can audit your current website, improve speed and structure, refresh the design, add new pages, and connect forms, analytics, automations, or business tools.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Smaller websites and support work can move quickly, while automation or custom systems usually need a phased plan. After the first call, we give you a clear timeline and delivery path.",
  },
  {
    question: "Do you work with startups and local businesses?",
    answer:
      "Yes. We work with startups, service businesses, nonprofits, professional teams, and growing companies that need dependable technology without unnecessary complexity.",
  },
  {
    question: "What do you need to get started?",
    answer:
      "A short description of your business, your current challenge, your preferred service, timeline, and any tools or systems your team already uses.",
  },
  {
    question: "Do you provide support after launch?",
    answer:
      "Yes. We can help with updates, troubleshooting, training, reporting, performance improvements, and ongoing support after your website or system goes live.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="relative overflow-hidden px-4 py-14 transition-colors sm:px-6 sm:py-16 lg:px-8">
      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
        <div>
          <h2 className="text-3xl font-semibold leading-tight tracking-normal text-foreground sm:text-5xl">
            Frequently Asked{" "}
            <span className="text-[#005BFF] dark:text-[#12B7FF]">
              Questions
            </span>
          </h2>
          <p className="mt-5 max-w-md text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
            Quick answers to common questions about our websites, automation,
            digital marketing, and IT support services.
          </p>

          <div className="mt-8 max-w-md rounded-[1rem] border border-[#005BFF]/10 bg-white/76 p-5 shadow-[0_18px_44px_rgba(0,91,255,0.08)] backdrop-blur-xl dark:border-[#12B7FF]/14 dark:bg-[#0B1830]/68">
            <div className="relative h-16 w-16 overflow-hidden rounded-full border border-[#005BFF]/14 bg-white shadow-[0_14px_30px_rgba(0,91,255,0.12)] dark:border-[#12B7FF]/18 dark:bg-[#07142A]">
              <Image
                src="/images/muste_2.png"
                alt="Peace iTech consultant"
                fill
                sizes="4rem"
                className="object-cover object-top"
              />
            </div>
            <h3 className="mt-5 text-xl font-semibold tracking-normal text-foreground">
              Book a 15 min call
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Have a project in mind? Let&apos;s talk about how we can help you
              build, automate, support, and scale.
            </p>
            <Link
              href="/contact"
              className="mt-6 flex h-11 items-center justify-center gap-3 rounded-full bg-[#005BFF] px-5 text-sm font-semibold text-white shadow-[0_16px_32px_rgba(0,91,255,0.24)] transition hover:bg-[#004FE0]"
            >
              Book a Free Call
              <ArrowRight className="h-4 w-4" />
            </Link>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#005BFF] dark:text-[#12B7FF]" />
                No commitment
              </span>
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-[#005BFF] dark:text-[#12B7FF]" />
                Pick a time that works
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <article
                key={faq.question}
                className={`overflow-hidden rounded-[0.85rem] border bg-white/72 shadow-[0_14px_36px_rgba(0,91,255,0.05)] backdrop-blur-xl transition duration-300 dark:bg-[#0B1830]/64 ${
                  isOpen
                    ? "border-[#005BFF]/36 shadow-[0_18px_46px_rgba(0,91,255,0.12)] dark:border-[#12B7FF]/34"
                    : "border-[#005BFF]/10 hover:border-[#005BFF]/24 dark:border-[#12B7FF]/12 dark:hover:border-[#12B7FF]/26"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-6"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-4">
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition ${
                        isOpen
                          ? "bg-[#005BFF] text-white shadow-[0_12px_24px_rgba(0,91,255,0.22)] dark:bg-[#12B7FF] dark:text-[#07142A]"
                          : "bg-[#005BFF]/8 text-[#005BFF] dark:bg-[#12B7FF]/10 dark:text-[#12B7FF]"
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="h-4 w-4" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                    </span>
                    <span className="text-base font-semibold leading-6 text-foreground sm:text-lg">
                      {faq.question}
                    </span>
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-muted-foreground transition ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-all duration-300 ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-4 pb-5 pl-[4.25rem] text-sm leading-6 text-muted-foreground sm:px-[5.5rem]">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
