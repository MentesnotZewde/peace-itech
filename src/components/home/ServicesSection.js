import Link from "next/link";

import { services } from "@/lib/services";

export default function ServicesSection() {
  const headingWords =
    "A complete technology partner for modern operations.".split(" ");
  const paragraphText =
    "Each service is generated from one data array, so adding a new offering later only requires adding another object above.";
  const headingColorClasses = [
    "text-black dark:text-white",
    "text-black dark:text-white",
    "text-[#12B7FF]",
    "text-black dark:text-white",
    "text-black dark:text-white",
    "text-[#12B7FF]",
    "text-black dark:text-white",
  ];

  return (
    <section
      id="services"
      className="bg-muted/30 py-20 transition-colors sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="animate-services-fade text-sm font-semibold uppercase tracking-[0.18em] text-[#005BFF]">
              SERVICES
            </p>
            <h2
              className="mt-3 max-w-3xl text-3xl font-semibold leading-tight tracking-normal text-foreground sm:text-5xl"
              aria-label="A complete technology partner for modern operations."
            >
              {headingWords.map((word, index) => (
                <span
                  key={`${word}-${index}`}
                  className={`animate-services-word inline-block opacity-0 ${
                    headingColorClasses[index] ?? "text-black dark:text-white"
                  }`}
                  style={{ animationDelay: `${140 + index * 70}ms` }}
                  aria-hidden="true"
                >
                  {word}
                  {index < headingWords.length - 1 ? "\u00A0" : ""}
                </span>
              ))}
            </h2>
          </div>
          <p
            className="max-w-2xl text-base leading-7 text-muted-foreground lg:justify-self-end"
            aria-label={paragraphText}
          >
            {paragraphText.split("").map((character, index) => (
              <span
                key={`${character}-${index}`}
                className="animate-services-type opacity-0"
                style={{ animationDelay: `${780 + index * 18}ms` }}
                aria-hidden="true"
              >
                {character}
              </span>
            ))}
          </p>
        </div>

        <div className="mt-16 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <Link
                key={service.title}
                href={`/services/${service.slug}`}
                className="group animate-services-item block opacity-0 transition-transform duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${920 + index * 95}ms` }}
              >
                <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#005BFF]/15 to-[#12B7FF]/15 text-[#005BFF] ring-1 ring-[#005BFF]/20 transition-transform duration-300 group-hover:scale-105">
                  <Icon className="size-6" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold tracking-normal text-foreground">
                  {service.title}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
                  {service.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes servicesFade {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes servicesWord {
          from {
            opacity: 0;
            filter: blur(8px);
            transform: translateY(22px) rotateX(42deg) scale(0.96);
            transform-origin: left bottom;
          }
          68% {
            opacity: 1;
            filter: blur(0);
            transform: translateY(-2px) rotateX(0) scale(1.02);
          }
          to {
            opacity: 1;
            filter: blur(0);
            transform: translateY(0) rotateX(0) scale(1);
          }
        }

        @keyframes servicesItem {
          from {
            opacity: 0;
            transform: translateY(22px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-services-fade {
          opacity: 0;
          animation: servicesFade 650ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .animate-services-word {
          animation: servicesWord 720ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .animate-services-item {
          animation: servicesItem 700ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .animate-services-type {
          animation: servicesType 60ms linear both;
        }

        @keyframes servicesType {
          to {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}


