import Link from "next/link";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { services } from "@/lib/services";

export default function ServicesSection() {
  return (
    <section id="services" className="bg-muted/30 py-20 transition-colors sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#005BFF]">
              Services
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal text-foreground sm:text-5xl">
              A complete technology partner for modern operations.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground lg:justify-self-end">
            Each service card is generated from one data array, so adding a new
            offering later only requires adding another object above.
          </p>
        </div>

        {/* Responsive grid: 1 column on phones, 2 on tablets, 3 on wide screens. */}
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <Card
                key={service.title}
                className="group relative overflow-hidden rounded-2xl border border-border/70 bg-background/75 p-2 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#005BFF]/10"
              >
                <Link href={`/services/${service.slug}`} className="block">
                  <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#12B7FF]/70 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <CardHeader className="p-5">
                    <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#005BFF]/15 to-[#12B7FF]/15 text-[#005BFF] ring-1 ring-[#005BFF]/20 transition-transform group-hover:scale-110">
                      <Icon className="size-6" aria-hidden="true" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription className="leading-6">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                </Link>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}


