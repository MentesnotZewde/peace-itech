import Image from "next/image";

const teams = [
  {
    name: "Madina Elemo Private Foreign  Employment Agency",
    logo: "/images/logos/madina-elemo-logo.png",
  },
  {
    name: "Wado Tax Services",
    logo: "/images/logos/Wado Logo.jpg",
  },
  {
    name: "Buzu Cleaning Service",
    logo: "/images/logos/buzu-cleaning-service-.png",
  },
  {
    name: "H2H Express Delivery",
    logo: "/images/logos/H2H_Logo.png",
  },
  {
    name: "4 Kilo Butcher Canada",
    logo: "/images/logos/4_Kilo_butcher_logo_3.png",
  },
  {
    name: "Greenfox foreign employment agent plc",
    logo: "/images/logos/green-fox-logo.png",
  },
];

// One track repeats the roster enough times to overflow a wide viewport; the
// track itself is then rendered twice so the -50% loop never shows a seam.
const track = [...teams, ...teams];

function Logo({ team }) {
  return (
    <li className="group flex shrink-0 items-center gap-3 px-6 sm:gap-4 sm:px-9">
      {/* A light tile keeps the dark-ink logos readable on the dark theme. */}
      <Image
        src={team.logo}
        alt=""
        width={100}
        height={98}
        sizes="48px"
        className="size-7 object-contain sm:size-8"
      />
      <span className="whitespace-nowrap text-sm font-medium text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
        {team.name}
      </span>
    </li>
  );
}

export default function TrustedTeams() {
  return (
    <section
      aria-label="Companies that work with Peace iTech"
      className="border-y border-border/60 bg-background py-10 transition-colors sm:py-12"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Trusted by
        </p>
      </div>

      <div className="marquee-viewport mt-7 [--marquee-duration:44s] sm:[--marquee-duration:54s]">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              aria-hidden={copy === 1 || undefined}
              className="flex shrink-0 items-center"
            >
              {track.map((team, index) => (
                <Logo key={`${copy}-${team.name}-${index}`} team={team} />
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
