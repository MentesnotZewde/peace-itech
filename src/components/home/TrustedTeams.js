import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const teams = [
  {
    name: "Startups",
    statement: "Launch faster with focused digital systems",
    image: "/images/teams/startups.png",
  },
  {
    name: "Healthcare teams",
    statement: "Protect data while improving operations",
    image: "/images/teams/healthcare.png",
  },
  {
    name: "Retail businesses",
    statement: "Connect sales, stock, and customer journeys",
    image: "/images/teams/retail.png",
  },
  {
    name: "Logistics companies",
    statement: "Automate handoffs and operational reporting",
    image: "/images/teams/logistics.png",
  },
  {
    name: "Professional services",
    statement: "Modern portals, workflows, and support",
    image: "/images/teams/professional.png",
  },
  {
    name: "Nonprofits",
    statement: "Do more with leaner tools and smarter processes",
    image: "/images/teams/nonprofits.png",
  },
  {
    name: "Global teams",
    statement: "Cloud-ready collaboration across locations",
    image: "/images/teams/global.png",
  },
  {
    name: "Local businesses",
    statement: "Practical technology that grows with you",
    image: "/images/teams/local.png",
  },
];

const carouselItems = [...teams, ...teams];

export default function TrustedTeams() {
  return (
    <section className="overflow-hidden bg-background py-8 transition-colors sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#005BFF]">
              Trusted by over +50 clients
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-normal text-foreground sm:text-3xl">
              Built for many kinds of ambitious organizations.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-muted-foreground">
            We supports people, businesses, and industries with practical
            technology solutions built for growth.
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

        {/* The duplicated item list creates a seamless infinite scroll. Hover pauses the motion. */}
        <div className="group flex overflow-hidden py-3">
          <div className="flex min-w-full shrink-0 animate-trust-scroll gap-4 px-2 group-hover:[animation-play-state:paused]">
            {carouselItems.map((team, index) => (
              <div
                key={`${team.name}-${index}`}
                className="w-72 shrink-0 rounded-[1.5rem] border border-border/70 bg-background/75 p-5 shadow-lg shadow-foreground/5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#005BFF]/10"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#005BFF]/15 to-[#12B7FF]/15 text-[#005BFF] ring-1 ring-[#005BFF]/20">
                    {/* Place team icons in public/images/teams/ using the image paths defined above. */}
                    <Image
                      src={team.image}
                      alt={`${team.name} icon`}
                      width={34}
                      height={34}
                      className="size-8 object-contain"
                    />
                  </div>
                  <ArrowUpRight
                    className="size-4 text-muted-foreground"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-foreground">
                  {team.name}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {team.statement}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
