import {
  Cpu,
  Lightbulb,
  LockKeyhole,
  Rocket,
} from "lucide-react";

const reasons = [
  {
    title: "Scalable foundations",
    description:
      "We design systems that can grow from first launch to high-volume operations.",
    icon: Rocket,
  },
  {
    title: "Innovation with discipline",
    description:
      "Modern ideas are shaped into practical roadmaps, not expensive experiments.",
    icon: Lightbulb,
  },
  {
    title: "Security built in",
    description:
      "Access, data, infrastructure, and compliance concerns are planned from day one.",
    icon: LockKeyhole,
  },
  {
    title: "Modern technology",
    description:
      "We use proven stacks, clean interfaces, automation, and maintainable architecture.",
    icon: Cpu,
  },
];

const photos = [
  {
    src: "/images/minte_1.png",
    alt: "Technology team planning a digital system",
    className: "right-[4%] top-0 w-[48%] rotate-2",
    position: "center center",
  },
  {
    src: "/images/muste_2.png",
    alt: "Team collaborating on business operations",
    className: "left-[2%] top-[28%] w-[46%] -rotate-3",
    position: "center center",
  },
  {
    src: "/images/melke_3.png",
    alt: "Modern business technology workspace",
    className: "bottom-0 right-[8%] w-[48%] rotate-1",
    position: "center center",
  },
];

const headingWords =
  "Built for leaders who want technology to feel calm, capable, and measurable.".split(
    " "
  );

export default function WhyChooseUs() {
  return (
    <section
      id="about"
      className="overflow-hidden bg-background py-20 transition-colors sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="relative min-h-[38rem] sm:min-h-[43rem] lg:min-h-[44rem]">
            <div className="animate-why-frame absolute left-[18%] top-10 h-64 w-52 rounded-[2rem] bg-[#12B7FF]/10 shadow-2xl shadow-[#005BFF]/10 ring-1 ring-[#12B7FF]/20 backdrop-blur dark:bg-[#12B7FF]/8" />
            <div className="animate-why-frame absolute right-[8%] top-[24%] h-72 w-56 rounded-[2rem] bg-[#005BFF]/10 shadow-2xl shadow-[#12B7FF]/10 ring-1 ring-[#005BFF]/20 backdrop-blur [animation-delay:120ms] dark:bg-[#005BFF]/10" />
            <div className="animate-why-frame absolute bottom-10 left-[18%] h-64 w-60 rounded-[2rem] bg-[#071B8F]/10 shadow-2xl shadow-[#071B8F]/10 ring-1 ring-[#071B8F]/15 backdrop-blur [animation-delay:240ms] dark:bg-white/5" />

            {photos.map((photo, index) => (
              <div
                key={photo.src}
                className={`animate-why-photo absolute overflow-hidden rounded-[1.5rem] shadow-2xl shadow-foreground/10 ring-1 ring-border/70 dark:shadow-black/30 ${photo.className}`}
                style={{ animationDelay: `${300 + index * 140}ms` }}
              >
                <div
                  role="img"
                  aria-label={photo.alt}
                  className="aspect-[4/5] w-full bg-cover"
                  style={{
                    backgroundImage: `url(${photo.src})`,
                    backgroundPosition: photo.position,
                  }}
                />
              </div>
            ))}
          </div>

          <div>
            <p className="animate-why-copy text-sm font-semibold uppercase tracking-[0.18em] text-[#005BFF]">
              Why choose us
            </p>
            <h2
              className="mt-3 max-w-2xl text-3xl font-semibold leading-tight tracking-normal sm:text-4xl"
              aria-label="Built for leaders who want technology to feel calm, capable, and measurable."
            >
              {headingWords.map((word, index) => {
                const isBlueWord = ["technology", "capable,"].includes(word);

                return (
                  <span
                    key={`${word}-${index}`}
                    className={`animate-why-heading-word inline-block opacity-0 ${
                      isBlueWord
                        ? "text-[#12B7FF]"
                        : "text-black dark:text-white"
                    }`}
                    style={{ animationDelay: `${120 + index * 55}ms` }}
                    aria-hidden="true"
                  >
                    {word}
                    {index < headingWords.length - 1 ? "\u00A0" : ""}
                  </span>
                );
              })}
            </h2>
            <p className="animate-why-copy mt-5 max-w-2xl text-base leading-7 text-muted-foreground [animation-delay:240ms]">
              We combine disciplined engineering, clear strategy, and practical
              support so digital systems become easier to trust, scale, and use.
            </p>

            <div className="mt-10 grid border-y border-border/70 md:grid-cols-2">
              {reasons.map((reason, index) => {
                const Icon = reason.icon;

                return (
                  <div
                    key={reason.title}
                    className="animate-why-reason border-border/70 py-6 opacity-0 md:px-6 md:odd:border-r"
                    style={{ animationDelay: `${420 + index * 110}ms` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#12B7FF]/10 text-[#005BFF] ring-1 ring-[#12B7FF]/20 dark:text-[#12B7FF]">
                        <Icon className="size-5" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {reason.title}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          {reason.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes whyFrame {
          from {
            opacity: 0;
            transform: translateY(18px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes whyPhoto {
          from {
            opacity: 0;
            filter: blur(6px);
            transform: translateY(24px) scale(0.94) rotate(0deg);
          }
          to {
            opacity: 1;
            filter: blur(0);
          }
        }

        @keyframes whyCopy {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes whyHeadingWord {
          0% {
            opacity: 0;
            filter: blur(9px);
            transform: translateY(20px) rotateX(48deg) scale(0.96);
            transform-origin: left bottom;
          }
          65% {
            opacity: 1;
            filter: blur(0);
            transform: translateY(-2px) rotateX(0) scale(1.025);
          }
          100% {
            opacity: 1;
            filter: blur(0);
            transform: translateY(0) rotateX(0) scale(1);
          }
        }

        .animate-why-frame {
          opacity: 0;
          animation: whyFrame 780ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .animate-why-photo {
          opacity: 0;
          animation: whyPhoto 800ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .animate-why-heading-word {
          animation: whyHeadingWord 760ms cubic-bezier(0.16, 1, 0.3, 1) both;
          will-change: opacity, filter, transform;
        }

        .animate-why-copy,
        .animate-why-reason {
          opacity: 0;
          animation: whyCopy 680ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }
      `}</style>
    </section>
  );
}


