const showcases = [
  {
    title: "Website mockups",
    label: "Digital Experience",
    className: "from-[#005BFF]/20 to-[#12B7FF]/20",
  },
  {
    title: "ERP dashboard previews",
    label: "Operations",
    className: "from-[#12B7FF]/20 to-[#0718D8]/20",
  },
  {
    title: "Automation systems",
    label: "Workflow",
    className: "from-[#12B7FF]/20 to-[#005BFF]/20",
  },
  {
    title: "Mobile app previews",
    label: "Experience",
    className: "from-[#0718D8]/20 to-[#12B7FF]/20",
  },
];

export default function PortfolioShowcase() {
  return (
    <section className="bg-background py-20 transition-colors sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#005BFF]">
              Our work
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal text-foreground sm:text-5xl">
              Visual systems that make complexity feel usable.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground lg:justify-self-end">
            These showcase cards are lightweight visual previews. They create a
            portfolio feel without needing image assets before real case-study
            screenshots are ready.
          </p>
        </div>

        {/* The masonry-like grid uses varied heights to create a premium floating showcase. */}
        <div className="mt-12 grid gap-5 lg:grid-cols-4">
          {showcases.map((item, index) => (
            <div
              key={item.title}
              className={`group relative overflow-hidden rounded-[1.5rem] border border-border/70 bg-gradient-to-br ${item.className} p-5 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#12B7FF]/10 ${index % 2 === 0 ? "lg:min-h-[24rem]" : "lg:min-h-[18rem]"}`}
            >
              <div className="absolute inset-0 bg-background/55 backdrop-blur-[1px]" />
              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {item.label}
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-foreground">
                  {item.title}
                </h3>
              </div>
              <div className="relative mt-8 rounded-2xl border border-border/70 bg-background/75 p-4 shadow-xl">
                <div className="mb-4 flex gap-2">
                  <span className="size-3 rounded-full bg-red-400" />
                  <span className="size-3 rounded-full bg-[#12B7FF]" />
                  <span className="size-3 rounded-full bg-[#12B7FF]" />
                </div>
                <div className="grid gap-3">
                  {[0, 1, 2].map((line) => (
                    <span
                      key={line}
                      className="h-3 rounded-full bg-muted"
                      style={{ width: `${95 - line * 18}%` }}
                    />
                  ))}
                </div>
                <div className="mt-6 grid grid-cols-3 gap-2">
                  {[48, 78, 58, 90, 68, 82].map((height, barIndex) => (
                    <span
                      key={barIndex}
                      className="rounded-lg bg-gradient-to-t from-[#005BFF]/50 to-[#12B7FF]/50"
                      style={{ height: `${height}px` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


