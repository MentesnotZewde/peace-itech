import {
  Cpu,
  LifeBuoy,
  Lightbulb,
  LockKeyhole,
  Rocket,
  Target,
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
  {
    title: "Dedicated support",
    description:
      "Your team gets steady technical guidance before, during, and after delivery.",
    icon: LifeBuoy,
  },
  {
    title: "Business-first solutions",
    description:
      "Every feature is tied to operations, revenue, efficiency, or customer experience.",
    icon: Target,
  },
];

export default function WhyChooseUs() {
  return (
    <section id="about" className="py-20 transition-colors sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#005BFF]">
            Why choose us
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-normal text-foreground sm:text-5xl">
            Built for leaders who want technology to feel calm, capable, and measurable.
          </h2>
        </div>

        {/* These repeated blocks use the same layout so the section stays easy to scan. */}
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => {
            const Icon = reason.icon;

            return (
              <div
                key={reason.title}
                className="rounded-2xl border border-border/70 bg-card/80 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#12B7FF]/10"
              >
                <div className="flex size-11 items-center justify-center rounded-xl bg-muted text-foreground">
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-foreground">
                  {reason.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


