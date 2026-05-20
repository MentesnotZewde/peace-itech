const teams = [
  {
    name: "Startups",
  },
  {
    name: "Healthcare teams",
  },
  {
    name: "Retail businesses",
  },
  {
    name: "Logistics companies",
  },
  {
    name: "Professional services",
  },
  {
    name: "Nonprofits",
  },
  {
    name: "Global teams",
  },
  {
    name: "Local businesses",
  },
];

const carouselItems = [...teams, ...teams];

export default function TrustedTeams() {
  return (
    <section className="overflow-hidden bg-background py-8 transition-colors sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-7 flex max-w-3xl items-center gap-4">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-border" />
          <p className="shrink-0 text-center text-xs font-semibold uppercase tracking-[0.22em] text-[#005BFF] dark:text-[#12B7FF]">
            Trusted by
          </p>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent via-border to-border" />
        </div>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent sm:w-32" />

        {/* The duplicated item list creates a seamless infinite scroll. Hover pauses the motion. */}
        <div className="group flex overflow-hidden py-2">
          <div className="flex min-w-full shrink-0 animate-trust-scroll items-center gap-12 px-6 group-hover:[animation-play-state:paused] sm:gap-16 lg:gap-20">
            {carouselItems.map((team, index) => (
              <div
                key={`${team.name}-${index}`}
                className="flex shrink-0 items-center opacity-55 transition-all duration-300 hover:opacity-100"
              >
                <span className="whitespace-nowrap text-base font-semibold tracking-normal text-muted-foreground transition-colors hover:text-foreground sm:text-lg">
                  {team.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
