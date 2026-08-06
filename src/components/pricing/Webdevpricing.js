"use client";

import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    description:
      "For individuals and small businesses ready to build their online presence.",
    price: "$1,500",
    features: [
      "Custom homepage + up to 5 pages",
      "Modern responsive design",
      "Mobile & tablet optimization",
      "Contact form integration",
      "Basic SEO setup",
      "Social media integration",
      "30-day post-launch support",
    ],
  },
  {
    name: "Professional",
    description:
      "For businesses that need a powerful website to attract customers and grow.",
    price: "$3,500",
    popular: true,
    features: [
      "Everything in Starter",
      "Custom UI/UX design",
      "Up to 10–15 pages",
      "CMS integration",
      "Multilingual support",
      "Advanced SEO optimization",
      "Google Analytics setup",
      "Performance optimization",
      "60-day post-launch support",
    ],
  },
  {
    name: "Enterprise",
    description:
      "For organizations requiring custom platforms and advanced functionality.",
    price: "Custom",
    features: [
      "Everything in Professional",
      "Custom web applications",
      "Booking & payment systems",
      "User dashboards",
      "API integrations",
      "Database development",
      "Advanced security features",
      "Dedicated support",
    ],
  },
];

export default function PricingSection() {
  return (
    <section className="relative isolate overflow-hidden bg-background py-16 transition-colors sm:py-20 lg:py-24">
      <div className="absolute left-0 top-1/4 -z-10 size-72 rounded-full bg-[#12B7FF]/8 blur-3xl dark:bg-[#005BFF]/12" />
      <div className="absolute bottom-0 right-0 -z-10 size-80 rounded-full bg-[#005BFF]/7 blur-3xl dark:bg-[#12B7FF]/8" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="h-[2px] w-8 bg-sky-500"></span>
            <span className="text-sm tracking-[0.3em] font-semibold text-sky-500">
              PRICING
            </span>
          </div>

          <h2 className="text-4xl font-serif leading-tight text-foreground sm:text-5xl md:text-6xl">
            Transparent packages,
            <br />
            <span className="italic text-sky-500">built for growth.</span>
          </h2>

          <p className="mt-6 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            One-time project fee. No hidden costs. No monthly platform fees. You
            own your website completely.
          </p>
        </div>

        {/* Cards */}
        <div className="mx-auto grid max-w-md gap-6 md:max-w-none md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`group relative flex h-full flex-col rounded-[1.75rem] border bg-white p-6 shadow-[0_18px_50px_rgba(7,24,216,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-[#12B7FF]/45 hover:shadow-[0_28px_64px_rgba(18,183,255,0.18)] dark:bg-[#0B1830] dark:shadow-black/20 dark:hover:shadow-[#12B7FF]/12 sm:p-8
                ${
                  plan.popular
                    ? "border-[#12B7FF]/65 ring-1 ring-[#12B7FF]/20"
                    : "border-[#005BFF]/12 dark:border-[#12B7FF]/14"
                }
              `}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-[#005BFF] to-[#12B7FF] px-4 py-1.5 text-xs font-semibold tracking-wide text-white shadow-lg shadow-[#12B7FF]/25">
                  Most Popular
                </span>
              )}

              <h3 className="text-2xl font-serif text-foreground">
                {plan.name}
              </h3>

              <p className="mt-4 leading-relaxed text-muted-foreground">
                {plan.description}
              </p>

              <div className="mt-8">
                <span className="text-4xl font-serif text-foreground sm:text-5xl">
                  {plan.price}
                </span>

                {plan.price !== "Custom" && (
                  <p className="mt-2 text-sm text-muted-foreground">one-time project fee</p>
                )}

                {plan.price === "Custom" && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    scoped to your requirements
                  </p>
                )}
              </div>

              <ul className="mt-8 space-y-3.5">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm leading-6 text-muted-foreground sm:text-base"
                  >
                    <Check size={20} className="text-sky-500 mt-0.5 shrink-0" />

                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className="mt-9 w-full rounded-full border border-[#005BFF]/20 bg-background px-5 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:border-[#12B7FF] hover:bg-gradient-to-r hover:from-[#005BFF] hover:to-[#12B7FF] hover:text-white hover:shadow-lg hover:shadow-[#12B7FF]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#12B7FF] focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-[#12B7FF]/25 dark:bg-[#07111F] dark:hover:border-[#12B7FF] sm:mt-auto sm:pt-3"
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
