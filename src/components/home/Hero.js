"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import HeroOrbitVisual from "@/components/home/HeroOrbitVisual";

const metrics = [
  {
    value: "6+",
    label: "Service lines",
    type: "count",
    target: 6,
    suffix: "+",
  },
  { value: "AI", label: "Ready workflows", type: "text" },
  { value: "24/7", label: "Support mindset", type: "support" },
];

const heroHeadingWords = "Powering Business with Modern Technology.".split(" ");

function AnimatedMetric({ metric }) {
  const [displayValue, setDisplayValue] = useState(
    metric.type === "text" ? metric.value : "0",
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
    <section className="relative isolate overflow-hidden bg-transparent px-0 py-10 transition-colors sm:px-6 sm:py-14 lg:px-8">
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="relative py-8 sm:py-10 lg:py-14">
          <div className="relative grid gap-10 lg:grid-cols-[1.05fr_0.72fr] lg:items-center">
            <div className="flex w-full max-w-none flex-col justify-center px-4 sm:px-0 lg:max-w-3xl">
              <h1
                className="font-heading w-full max-w-none whitespace-normal break-normal text-3xl font-semibold leading-tight tracking-normal text-foreground sm:text-4xl lg:max-w-4xl lg:text-5xl"
                aria-label="Powering Business with Modern Technology."
              >
                {heroHeadingWords.map((word, index) => {
                  const normalizedWord = word.replace(/[.,!?]+$/, "");
                  const isAccentWord = ["Business", "Technology"].includes(
                    normalizedWord,
                  );

                  return (
                    <span
                      key={`${word}-${index}`}
                      className={`animate-hero-heading-word opacity-0 ${
                        isAccentWord ? "hero-heading-accent" : ""
                      }`}
                      style={{ animationDelay: `${120 + index * 105}ms` }}
                      aria-hidden="true"
                    >
                      {word}
                      {index < heroHeadingWords.length - 1 ? " " : ""}
                    </span>
                  );
                })}
              </h1>

              <p className="mt-6 w-full max-w-none text-base leading-7 text-muted-foreground sm:text-md lg:max-w-2xl">
                Peace iTech Inc helps businesses grow with technology that
                actually works. From modern websites and mobile apps to ERP
                systems, automation, digital marketing, and IT support, we build
                simple, reliable solutions that make everyday business easier.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  asChild
                  className="h-12 rounded-md bg-[#397dfc] px-6 text-white shadow-xl shadow-[#005BFF]/20 hover:-translate-y-0.5 hover:bg-[#3d59f6] hover:shadow-[#12B7FF]/20"
                >
                  <Link href="contact">
                    Contact our team
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="h-12 rounded-md bg-background/70 px-6 backdrop-blur hover:-translate-y-0.5"
                >
                  <Link href="#services">Explore services</Link>
                </Button>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-2 border-t border-border/70 pt-6 sm:gap-4">
                {metrics.map((metric) => (
                  <div key={metric.label} className="min-w-0">
                    <AnimatedMetric metric={metric} />
                    <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
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
