"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

const stats = [
  { value: "120+", target: 120, suffix: "+", label: "Projects Completed" },
  { value: "85+", target: 85, suffix: "+", label: "Happy Clients" },
  { value: "6", target: 6, suffix: "", label: "Countries Served" },
  { value: "8+", target: 8, suffix: "+", label: "Years Experience" },
];

const images = [
  {
    src: "/images/company-story-1.png",
    alt: "Team reviewing digital product strategy on a laptop",
    className: "lg:mt-0",
  },
  {
    src: "/images/company-story-2.png",
    alt: "Business team collaborating around a modern workspace",
    className: "lg:mt-12",
  },
  {
    src: "/images/company-story-3.png",
    alt: "Technology team working with computers in an office",
    className: "lg:mt-6",
  },
];

function AnimatedStatValue({ stat, index, isVisible }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      return undefined;
    }

    let frameId;
    const duration = 1250 + index * 170;
    const start = performance.now();

    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const pulse = Math.sin(progress * Math.PI) * 0.035;

      setDisplayValue(Math.round(stat.target * Math.min(eased + pulse, 1)));

      if (progress < 1) {
        frameId = requestAnimationFrame(update);
      }
    }

    frameId = requestAnimationFrame(update);

    return () => cancelAnimationFrame(frameId);
  }, [index, isVisible, stat.target]);

  return (
    <span className="inline-flex items-baseline">
      <span className="tabular-nums">{displayValue}</span>
      {stat.suffix ? (
        <span className="animate-stat-plus ml-1 bg-gradient-to-br from-[#005BFF] to-[#12B7FF] bg-clip-text text-transparent">
          {stat.suffix}
        </span>
      ) : null}
    </span>
  );
}

export default function StatsSection() {
  const statsRef = useRef(null);
  const [isStatsVisible, setIsStatsVisible] = useState(false);

  useEffect(() => {
    const element = statsRef.current;

    if (!element) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.28 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="company-journey"
      className="overflow-hidden bg-background px-4 py-20 transition-colors sm:px-6 sm:py-24 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#005BFF]">
            Company status
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3 lg:gap-7">
          {images.map((image, index) => (
            <div
              key={image.src}
              className={`animate-stats-image opacity-0 ${image.className}`}
              style={{ animationDelay: `${index * 130}ms` }}
            >
              <div className="group overflow-hidden rounded-[1.5rem] shadow-2xl shadow-foreground/10 ring-1 ring-border/70 dark:shadow-black/30">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={900}
                  height={675}
                  className="aspect-[4/3] w-full object-cover object-center transition duration-700 group-hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
              </div>
              {index === 0 ? (
                <Button
                  asChild
                  className="mt-5 h-12 rounded-full bg-[#005BFF] px-6 text-white shadow-xl shadow-[#005BFF]/20 hover:bg-[#071B8F]"
                >
                  <Link href="/about-us#company-journey">
                    Discover Our Story
                  </Link>
                </Button>
              ) : null}
            </div>
          ))}
        </div>

        <div
          ref={statsRef}
          className="mt-16 grid overflow-hidden border-y border-border/70 md:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="animate-stats-reveal group relative border-border/70 py-7 opacity-0 md:border-l md:px-8 md:first:border-l-0"
              style={{ animationDelay: `${520 + index * 110}ms` }}
            >
              <div className="pointer-events-none absolute inset-x-4 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-[#12B7FF]/70 to-transparent transition-transform duration-700 group-hover:scale-x-100 md:inset-x-8" />
              <p
                className="animate-stat-value text-4xl font-semibold tracking-normal text-foreground sm:text-5xl"
                aria-label={stat.value}
              >
                <AnimatedStatValue
                  stat={stat}
                  index={index}
                  isVisible={isStatsVisible}
                />
              </p>
              <p className="mt-2 text-sm font-medium text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes statsImageEnter {
          from {
            opacity: 0;
            transform: translateY(28px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes statsFloat {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes statsReveal {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes statValueGlow {
          0%,
          100% {
            text-shadow: 0 0 0 rgb(18 183 255 / 0);
          }
          45% {
            text-shadow: 0 0 24px rgb(18 183 255 / 0.22);
          }
        }

        @keyframes statPlusPop {
          0% {
            opacity: 0;
            transform: translateY(8px) scale(0.72);
          }
          58% {
            opacity: 1;
            transform: translateY(-2px) scale(1.16);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-stats-image {
          animation:
            statsImageEnter 760ms cubic-bezier(0.16, 1, 0.3, 1) both,
            statsFloat 7s ease-in-out 900ms infinite;
        }

        .animate-stats-reveal {
          animation: statsReveal 680ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .animate-stat-value {
          animation: statValueGlow 1.35s ease both;
        }

        .animate-stat-plus {
          animation: statPlusPop 520ms cubic-bezier(0.16, 1, 0.3, 1) 760ms both;
          display: inline-block;
        }

        @media (max-width: 1023px) {
          .animate-stats-image {
            animation: statsImageEnter 520ms cubic-bezier(0.16, 1, 0.3, 1) both;
          }
        }
      `}</style>
    </section>
  );
}
