"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import HeroOrbitVisual from "@/components/home/HeroOrbitVisual";

const metrics = [
  { value: "6+", label: "Service lines", type: "count", target: 6, suffix: "+" },
  { value: "AI", label: "Ready workflows", type: "text" },
  { value: "24/7", label: "Support mindset", type: "support" },
];

function AnimatedMetric({ metric }) {
  const [displayValue, setDisplayValue] = useState(
    metric.type === "text" ? metric.value : "0"
  );

  useEffect(() => {
    if (metric.type === "text") {
      return;
    }

    let frameId;
    const duration = 1100;
    const start = performance.now();

    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      if (metric.type === "count") {
        setDisplayValue(`${Math.round(eased * metric.target)}${metric.suffix}`);
      }

      if (metric.type === "support") {
        const hours = Math.max(1, Math.round(eased * 24));
        setDisplayValue(progress === 1 ? "24/7" : `${hours}/7`);
      }

      if (progress < 1) {
        frameId = requestAnimationFrame(update);
      }
    }

    frameId = requestAnimationFrame(update);

    return () => cancelAnimationFrame(frameId);
  }, [metric]);

  return (
    <p
      className={`text-2xl font-semibold text-foreground ${
        metric.type === "text" ? "animate-ai-reveal" : ""
      }`}
    >
      {displayValue}
    </p>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-background px-4 py-8 transition-colors sm:px-6 lg:px-8">
      {/* Decorative glows are absolutely positioned so they add depth without changing layout size. */}
      <div className="absolute left-1/2 top-0 -z-10 size-[34rem] -translate-x-1/2 rounded-full bg-[#12B7FF]/15 blur-3xl" />
      <div className="absolute right-0 top-24 -z-10 size-80 rounded-full bg-[#005BFF]/15 blur-3xl" />

      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-gradient-to-br from-background via-muted/40 to-[#EAF8FF]/70 p-5 shadow-2xl shadow-foreground/10 dark:from-[#07111F] dark:via-[#07111F] dark:to-[#071B8F]/40 sm:p-8 lg:p-10">
          {/* This translucent layer creates the soft Stripe/Vercel-style surface. */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(24,183,255,0.22),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(11,77,255,0.18),transparent_32%)]" />
          <div className="relative grid gap-10 lg:grid-cols-[1.05fr_0.72fr] lg:items-center">
            <div className="flex max-w-3xl flex-col justify-center">
              <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-border/70 bg-background/70 px-3 py-1 text-sm font-medium text-muted-foreground shadow-sm backdrop-blur">
                <Sparkles className="size-4 text-[#005BFF] dark:text-[#12B7FF]" aria-hidden="true" />
                Enterprise-grade web, automation, security, and IT solutions
              </div>

              <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-normal text-foreground sm:text-5xl lg:text-6xl">
                Modern technology systems for ambitious businesses.
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                Peace iTech Inc helps businesses grow with thoughtful websites,
                ERP systems, automation, cybersecurity, digital marketing, IT
                support, cloud services, and practical AI-powered workflows.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  asChild
                  className="h-12 rounded-full bg-[#005BFF] px-6 text-white shadow-xl shadow-[#005BFF]/20 hover:-translate-y-0.5 hover:bg-[#071B8F] hover:shadow-[#12B7FF]/20"
                >
                  <Link href="#contact">
                    Start a project
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="h-12 rounded-full bg-background/70 px-6 backdrop-blur hover:-translate-y-0.5"
                >
                  <Link href="#case-studies">Explore case studies</Link>
                </Button>
              </div>

              <div className="mt-10 grid gap-4 border-t border-border/70 pt-6 sm:grid-cols-3">
                {metrics.map((metric) => (
                  <div key={metric.label}>
                    <AnimatedMetric metric={metric} />
                    <p className="mt-1 text-sm text-muted-foreground">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>

            </div>

            <HeroOrbitVisual />
          </div>
        </div>
      </div>
    </section>
  );
}


