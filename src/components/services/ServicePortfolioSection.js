import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, ImageOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ui/ScrollReveal";

function CardBody({ project, index }) {
  return (
    <>
      <div className="mb-4 flex items-center gap-3">
        <span className="rounded-xl bg-[#EAF8FF] px-3 py-2 text-sm font-bold text-[#005BFF] ring-1 ring-[#005BFF]/8 dark:bg-[#12B7FF]/12 dark:text-[#12B7FF] dark:ring-[#12B7FF]/14">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-lg font-semibold text-foreground">
            {project.title}
          </h3>
        </div>
        {project.liveUrl && (
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl text-[#005BFF] transition-colors group-hover:bg-[#EAF8FF] dark:text-[#12B7FF] dark:group-hover:bg-[#12B7FF]/12">
            <ExternalLink className="size-5" aria-hidden="true" />
          </span>
        )}
      </div>

      <div className="overflow-hidden rounded-2xl border border-border/70 bg-background shadow-inner">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} preview`}
            width={1200}
            height={760}
            className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.035]"
            sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
          />
        ) : (
          <div className="flex aspect-[16/10] w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#005BFF]/10 to-[#12B7FF]/10 text-[#005BFF] dark:text-[#12B7FF]">
            <ImageOff className="size-7" aria-hidden="true" />
            <span className="text-xs font-medium">No preview image</span>
          </div>
        )}
      </div>

      <div className="pt-5">
        {project.category && (
          <span className="inline-flex rounded-full bg-[#EAF8FF]/85 px-3 py-1 text-xs font-semibold text-[#005BFF] ring-1 ring-[#005BFF]/8 dark:bg-[#12B7FF]/12 dark:text-[#12B7FF] dark:ring-[#12B7FF]/14">
            {project.category}
          </span>
        )}
        {project.description && (
          <p className="mt-4 line-clamp-4 text-sm leading-6 text-muted-foreground">
            {project.description}
          </p>
        )}
      </div>
    </>
  );
}

const CARD_CLASSES =
  "group block h-full overflow-hidden rounded-[1.35rem] border border-[#005BFF]/12 bg-white/78 p-4 shadow-xl shadow-[#005BFF]/7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-[#12B7FF]/35 hover:shadow-2xl hover:shadow-[#12B7FF]/18 dark:border-[#12B7FF]/14 dark:bg-[#0B1830]/72 dark:hover:border-[#12B7FF]/35 dark:hover:shadow-[#12B7FF]/12";

/**
 * Delivered work for one service, published from the admin dashboard.
 * Renders nothing when that category has no completed projects yet, so a
 * service page never shows an empty shell.
 */
export default function ServicePortfolioSection({ service, projects }) {
  if (!projects?.length) return null;

  return (
    <section
      id="service-portfolio"
      className="relative scroll-mt-24 overflow-hidden bg-muted/30 py-20 transition-colors sm:py-24"
    >
      <div className="absolute right-0 top-0 -z-10 size-[28rem] rounded-full bg-[#12B7FF]/12 blur-3xl dark:bg-[#005BFF]/12" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-3xl">
            <p className="text-sm  uppercase tracking-[0.18em] text-[#005BFF] dark:text-[#12B7FF]">
              Our Portfolio
            </p>
            <h2 className="font-heading mt-4 max-w-3xl text-3xl font-semibold tracking-normal text-foreground sm:text-4xl inline">
              Projects we have
              <span className="inline font-heading  hero-heading-accent ml-2">
                delivered
              </span>
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
              A selection of completed {service.title.toLowerCase()} projects
              built for our clients.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <ScrollReveal key={project.id} delay={120 + index * 120}>
              {project.liveUrl ? (
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={CARD_CLASSES}
                >
                  <CardBody project={project} index={index} />
                </Link>
              ) : (
                <div className={CARD_CLASSES}>
                  <CardBody project={project} index={index} />
                </div>
              )}
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={220}>
          <div className="mt-12 flex justify-center">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-full bg-background/70 px-6 backdrop-blur hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#12B7FF]/10"
            >
              <Link href="/#contact">
                Start a similar project
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
