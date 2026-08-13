"use client";

import Image from "next/image";
import { ChevronRight, Quote } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    brand: "Wado Tax",
    name: "Muste",
    role: "Founder",
    company: "Wado Tax Services",
    quote:
      "Peace iTech consistently delivers clean, practical systems that make business easier to manage. From the first conversation to launch, the work felt clear, organized, and reliable.",
    avatar: "/images/muste_2.png",
  },
  {
    brand: "H2H Express",
    name: "Minte",
    role: "Operations Lead",
    company: "H2H Express Delivery",
    quote:
      "The team helped us simplify daily operations and reduce manual follow-up. The result is easier for our staff to use and stronger for the customers we serve.",
    avatar: "/images/minte_1.png",
  },
  {
    brand: "Greenfox",
    name: "Melke",
    role: "Technical Lead",
    company: "Greenfox",
    quote:
      "They brought structure, technical clarity, and a modern delivery process. Peace iTech made the project feel focused from planning through final review.",
    avatar: "/images/melke_3.png",
  },
  {
    brand: "Buzu Clean",
    name: "Bethel",
    role: "Business Manager",
    company: "Buzu Cleaning Service",
    quote:
      "Our digital presence now feels trustworthy and professional. Peace iTech understood the business quickly and helped us present our services with confidence.",
    avatar: "/images/Operations Manager.png",
  },
  {
    brand: "Madina",
    name: "Mariam",
    role: "Founder",
    company: "Madina Elemo Agency",
    quote:
      "The final website looks polished and communicates our services clearly. The process was smooth, responsive, and easy to follow.",
    avatar: "/images/Client Success Manager.png",
  },
];

const cardRotations = ["0deg", "-4deg", "4deg", "-2deg", "3deg"];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = testimonials[activeIndex];
  const showNext = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  return (
    <section className="overflow-hidden bg-background px-4 py-16 transition-colors sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:gap-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#005BFF] dark:text-[#12B7FF]">
              Testimonials
            </p>
            <h2 className="mt-4 max-w-xl text-3xl font-semibold leading-tight tracking-normal text-foreground sm:text-4xl font-heading">
              Our clients are our best ambassadors
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              Our clients&apos; success speaks for itself. Every partnership we
              build turns into a lasting endorsement, making them our strongest
              ambassadors.
            </p>

            <div className="mt-8 h-px max-w-sm bg-gradient-to-r from-[#005BFF]/40 via-[#12B7FF]/30 to-transparent" />
          </div>

          <div className="relative mx-auto flex w-full max-w-xl justify-center lg:mx-0 lg:justify-end">
            <div className="relative h-[31rem] w-full max-w-[29rem] sm:h-[27rem] lg:h-[24rem]">
              {testimonials.map((testimonial, index) => {
                const offset =
                  (index - activeIndex + testimonials.length) %
                  testimonials.length;
                const isActive = offset === 0;
                const isNext = offset === 1;
                const isSecond = offset === 2;
                const isVisible = isActive || isNext || isSecond;

                return (
                  <article
                    key={testimonial.brand}
                    className={`absolute inset-0 rounded-[0.95rem] border bg-white p-5 shadow-[0_28px_70px_rgba(2,8,23,0.13)] transition-all duration-500 ease-out dark:bg-[#0B1830] sm:p-8 ${
                      isActive
                        ? "border-[#005BFF]/14 opacity-100 dark:border-[#12B7FF]/18"
                        : "pointer-events-none border-[#005BFF]/8 opacity-70 dark:border-[#12B7FF]/10"
                    } ${isVisible ? "block" : "hidden"}`}
                    style={{
                      zIndex: testimonials.length - offset,
                      transform: isActive
                        ? "translate3d(0,0,0) rotate(0deg) scale(1)"
                        : `translate3d(${isNext ? 18 : -14}px, ${
                            isNext ? 20 : 34
                          }px, 0) rotate(${cardRotations[index]}) scale(${
                            isNext ? 0.96 : 0.92
                          })`,
                    }}
                  >
                    <div className="absolute inset-0 rounded-[0.95rem] bg-[linear-gradient(135deg,rgba(0,91,255,0.04),transparent_48%,rgba(18,183,255,0.05))]" />

                    <div className="relative flex h-full flex-col">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                        <h3 className="text-lg font-semibold uppercase tracking-normal text-foreground">
                          {testimonial.brand}
                        </h3>
                        {isActive ? (
                          <div className="flex items-center gap-3 pt-1">
                            <div className="flex gap-1.5">
                              {testimonials.map((item, dotIndex) => (
                                <button
                                  key={item.name}
                                  type="button"
                                  onClick={() => setActiveIndex(dotIndex)}
                                  aria-label={`Show testimonial from ${item.name}`}
                                  className={`h-2 rounded-full transition-all ${
                                    dotIndex === activeIndex
                                      ? "w-6 bg-[#005BFF] dark:bg-[#12B7FF]"
                                      : "w-2 bg-foreground/18 hover:bg-[#005BFF]/50 dark:hover:bg-[#12B7FF]/50"
                                  }`}
                                />
                              ))}
                            </div>
                            <button
                              type="button"
                              onClick={showNext}
                              aria-label="Show next testimonial"
                              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#005BFF]/14 text-[#005BFF] transition hover:bg-[#005BFF] hover:text-white dark:border-[#12B7FF]/18 dark:text-[#12B7FF] dark:hover:bg-[#12B7FF] dark:hover:text-[#07142A]"
                            >
                              <ChevronRight className="h-4 w-4" />
                            </button>
                          </div>
                        ) : null}
                      </div>

                      <div
                        className={
                          isActive ? "animate-paper-testimonial mt-8" : "mt-8"
                        }
                      >
                        <Quote className="h-6 w-6 text-[#005BFF] dark:text-[#12B7FF]" />
                        <p className="mt-5 max-w-2xl text-sm leading-6 text-muted-foreground">
                          {testimonial.quote}
                        </p>
                      </div>

                      <div className="mt-auto flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:pt-8">
                        <div className="flex items-center gap-4">
                          <div className="relative h-11 w-11 overflow-hidden rounded-full border border-[#005BFF]/14 bg-[#F8FBFF] dark:border-[#12B7FF]/18 dark:bg-[#07142A]">
                            <Image
                              src={testimonial.avatar}
                              alt={testimonial.name}
                              fill
                              sizes="3rem"
                              className="object-cover object-top"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">
                              {testimonial.name}
                            </p>
                            <p className="text-xs leading-5 text-muted-foreground">
                              {testimonial.role} of {testimonial.company}
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          aria-label="LinkedIn profile"
                          className="flex h-10 w-10 shrink-0 items-center justify-center self-start rounded-[0.55rem] border border-[#005BFF]/12 bg-white text-[#005BFF] shadow-sm transition hover:bg-[#005BFF] hover:text-white dark:border-[#12B7FF]/18 dark:bg-[#07142A] dark:text-[#12B7FF] dark:hover:bg-[#12B7FF] dark:hover:text-[#07142A] sm:self-auto"
                        >
                          <span className="text-sm font-bold leading-none">
                            in
                          </span>
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes paperTestimonial {
          from {
            opacity: 0;
            transform: translateX(12px) scale(0.99);
            filter: blur(6px);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
            filter: blur(0);
          }
        }

        .animate-paper-testimonial {
          animation: paperTestimonial 460ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }
      `}</style>
    </section>
  );
}
