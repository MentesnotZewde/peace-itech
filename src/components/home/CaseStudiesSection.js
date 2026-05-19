import { ArrowUpRight } from "lucide-react";

const caseStudies = [
  "ERP modernization for a multi-location distributor",
  "Secure client portal for a professional services firm",
  "Automated marketing and support workflows for a growing SaaS team",
];

export default function CaseStudiesSection() {
  return (
    <section id="case-studies" className="py-20 transition-colors sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#005BFF]">
            Case studies
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-normal text-foreground sm:text-5xl">
            Real systems for real business pressure.
          </h2>
          <p className="mt-5 text-base leading-7 text-muted-foreground">
            From customer-facing platforms to internal operating systems, we
            focus on work that improves speed, visibility, and resilience.
          </p>
        </div>

        <div className="grid gap-4">
          {caseStudies.map((study, index) => (
            <div
              key={study}
              className="group flex items-center justify-between gap-5 rounded-2xl border border-border/70 bg-card/80 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#005BFF]/10"
            >
              <div>
                <p className="text-sm font-semibold text-muted-foreground">
                  0{index + 1}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-foreground">
                  {study}
                </h3>
              </div>
              <ArrowUpRight
                className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-foreground"
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


