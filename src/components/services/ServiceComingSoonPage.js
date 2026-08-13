import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";

import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function ServiceComingSoonPage({ service }) {
  return (
    <main className="flex-1">
      <section className="relative isolate flex min-h-[calc(100vh-5rem)] items-center overflow-hidden bg-transparent px-4 py-20 transition-colors sm:px-6 lg:px-8">
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background/18 via-background/4 to-background/82 dark:from-background/20 dark:via-background/5 dark:to-background/88" />
        <div className="animate-float absolute left-1/2 top-1/2 -z-10 size-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#12B7FF]/10 blur-3xl dark:bg-[#005BFF]/16" />

        <ScrollReveal className="relative z-10 mx-auto w-full max-w-4xl text-center">
          <div className="mx-auto flex size-28 items-center justify-center rounded-[2rem] border border-[#005BFF]/12 bg-white/82 shadow-[0_24px_70px_rgba(0,91,255,0.1)] backdrop-blur-xl dark:border-[#12B7FF]/22 dark:bg-[#07111F]/78 dark:shadow-[#12B7FF]/10">
            <Image
              src="/logo-icon.png"
              alt="Peace iTech logo"
              width={72}
              height={72}
              priority
              className="animate-float size-18 object-contain drop-shadow-[0_18px_32px_rgba(0,91,255,0.18)] dark:drop-shadow-[0_18px_32px_rgba(18,183,255,0.18)]"
            />
          </div>

          <h1 className="mt-8 ffont-heading text-3xl font-semibold leading-tight tracking-normal text-foreground sm:text-4xl lg:text-[2.35rem]">
            <span
              className="animate-hero-heading-word block opacity-0"
              style={{ animationDelay: "120ms" }}
            >
              {service.title}
            </span>
            <span
              className="animate-hero-heading-word hero-heading-accent block opacity-0"
              style={{ animationDelay: "280ms" }}
            >
              Coming Soon.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-md">
            We are preparing this service experience carefully. For now, our
            team is focused on the services currently available through Peace
            iTech.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-md bg-[#005BFF] px-6 text-white shadow-xl shadow-[#005BFF]/20 hover:-translate-y-0.5 hover:bg-[#071B8F] hover:shadow-[#12B7FF]/20"
            >
              <Link href="/services/web-development">
                Explore web development
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-md bg-background/70 px-6 backdrop-blur hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#12B7FF]/10"
            >
              <Link href="/contact">Talk to us</Link>
            </Button>
          </div>

          <div className="mx-auto mt-8 flex w-fit items-center gap-3 rounded-md border border-[#005BFF]/10 bg-white/60 px-4 py-2 text-sm text-muted-foreground shadow-sm backdrop-blur dark:border-[#12B7FF]/14 dark:bg-[#07111F]/60 dark:text-white/72">
            <Clock3 className="size-4 text-[#12B7FF]" aria-hidden="true" />
            <span>Updates are on the way</span>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
