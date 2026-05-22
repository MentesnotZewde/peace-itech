"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Code2, Headphones, PenLine, Rocket, Search } from "lucide-react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";

const workflowSteps = [
  {
    title: "Discovery & Strategy",
    description:
      "We understand your business, goals, audience, and requirements to create the right plan.",
    icon: Search,
    accent:
      "from-[#005BFF]/14 to-[#12B7FF]/12 text-[#005BFF] dark:text-[#12B7FF]",
  },
  {
    title: "UX/UI Design",
    description:
      "We create clean wireframes and intuitive designs that deliver the best user experience.",
    icon: PenLine,
    accent:
      "from-violet-500/14 to-[#005BFF]/10 text-violet-500 dark:text-violet-300",
  },
  {
    title: "Development & Integration",
    description:
      "We build fast, responsive, and scalable solutions with modern technologies.",
    icon: Code2,
    accent:
      "from-[#12B7FF]/14 to-teal-500/12 text-teal-500 dark:text-[#12B7FF]",
  },
  {
    title: "Testing & Launch",
    description:
      "We test everything thoroughly and launch your website or system with confidence.",
    icon: Rocket,
    accent:
      "from-emerald-500/14 to-[#12B7FF]/10 text-emerald-500 dark:text-emerald-300",
  },
  {
    title: "Support & Improvement",
    description:
      "We monitor, update, and improve continuously to help your business grow.",
    icon: Headphones,
    accent:
      "from-[#005BFF]/14 to-[#12B7FF]/12 text-[#005BFF] dark:text-[#12B7FF]",
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 34 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function WebDevelopmentWorkflowSection() {
  const sectionRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isCompact, setIsCompact] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "end 28%"],
  });
  const lineScale = useTransform(scrollYProgress, [0.06, 0.92], [0, 1]);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsCompact(query.matches);

    update();
    query.addEventListener("change", update);

    return () => query.removeEventListener("change", update);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (isCompact) {
      return;
    }

    const nextStep = Math.min(
      workflowSteps.length - 1,
      Math.max(0, Math.floor(latest * workflowSteps.length)),
    );
    setActiveStep(nextStep);
  });

  return (
    <motion.section
      ref={sectionRef}
      className="relative isolate overflow-hidden py-20 transition-colors sm:py-24"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="absolute left-0 top-24 -z-10 h-80 w-80 rounded-full bg-[#12B7FF]/10 blur-3xl dark:bg-[#005BFF]/12" />
      <div className="absolute right-0 top-1/3 -z-10 h-96 w-96 rounded-full bg-[#005BFF]/8 blur-3xl dark:bg-[#12B7FF]/8" />

      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.15fr] lg:items-start lg:px-8">
        <motion.div variants={itemVariants} className="lg:sticky lg:top-24">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#005BFF] dark:text-[#12B7FF]">
            Workflow
          </p>

          <h2 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight tracking-normal text-foreground sm:text-5xl">
            A clear process from idea to
            <span
              className="hero-heading-accent block"
              style={{ textShadow: "none" }}
            >
              managed improvement.
            </span>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
            We keep every phase visible, structured, and practical so business
            owners and teams always know what is happening, why it matters, and
            what comes next.
          </p>

          <motion.div
            variants={itemVariants}
            className="relative mt-8 -ml-4 sm:-ml-6 lg:-ml-8"
          >
            <div className="relative overflow-hidden rounded-r-[1.75rem]">
              <Image
                src="/images/work-flow-20260522.png"
                alt="Project planning workspace for web development delivery"
                width={1536}
                height={1024}
                className="aspect-[4/3] w-full object-cover object-center"
                sizes="(min-width: 1024px) 42vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent" />
            </div>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className="relative">
          <div className="absolute bottom-8 left-6 top-8 hidden w-px bg-[#005BFF]/14 dark:bg-[#12B7FF]/14 sm:block lg:-left-8">
            <motion.span
              className="block h-full origin-top bg-gradient-to-b from-[#005BFF] via-[#12B7FF] to-[#12B7FF]/25"
              style={{ scaleY: lineScale }}
            />
          </div>

          <div className="space-y-6 sm:pl-16 lg:pl-12">
            {workflowSteps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeStep === index;

              return (
                <motion.article
                  key={step.title}
                  variants={itemVariants}
                  onMouseEnter={() => setActiveStep(index)}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 260, damping: 24 }}
                  className={`group relative rounded-[1.35rem] border bg-white/82 p-5 shadow-[0_18px_50px_rgba(7,24,216,0.07)] backdrop-blur-xl transition-all duration-300 dark:bg-[#0B1830]/72 dark:shadow-black/20 sm:p-6 ${
                    isActive
                      ? "border-[#12B7FF]/55 shadow-[0_24px_70px_rgba(18,183,255,0.24)] dark:border-[#12B7FF]/48 dark:shadow-[#12B7FF]/14"
                      : "border-[#005BFF]/10 hover:border-[#12B7FF]/32 dark:border-[#12B7FF]/14"
                  }`}
                >
                  <div
                    className={`absolute -left-[3.25rem] top-8 hidden size-11 items-center justify-center rounded-full border text-sm font-bold transition-all duration-300 sm:flex lg:-left-[5.3rem] ${
                      isActive
                        ? "scale-110 border-[#12B7FF]/80 bg-gradient-to-br from-[#005BFF] to-[#12B7FF] text-white shadow-[0_0_0_6px_rgba(18,183,255,0.12),0_0_34px_rgba(18,183,255,0.55)]"
                        : "border-[#005BFF]/16 bg-background text-muted-foreground shadow-sm group-hover:scale-105 group-hover:border-[#12B7FF]/70 group-hover:bg-gradient-to-br group-hover:from-[#005BFF] group-hover:to-[#12B7FF] group-hover:text-white group-hover:shadow-[0_0_0_6px_rgba(18,183,255,0.1),0_0_28px_rgba(18,183,255,0.42)] dark:border-[#12B7FF]/18"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-[6rem_1fr] sm:items-center">
                    <div
                      className={`flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br ${step.accent} ring-1 ring-[#005BFF]/8 transition-transform duration-300 group-hover:scale-105 dark:ring-[#12B7FF]/12`}
                    >
                      <Icon
                        className="size-10 stroke-[1.8]"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <div className="mb-2 flex items-center gap-3 sm:hidden">
                        <span
                          className={`flex size-9 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
                            isActive
                              ? "scale-105 bg-gradient-to-br from-[#005BFF] to-[#12B7FF] text-white shadow-[0_0_22px_rgba(18,183,255,0.42)]"
                              : "bg-[#EAF8FF] text-[#005BFF] group-hover:bg-gradient-to-br group-hover:from-[#005BFF] group-hover:to-[#12B7FF] group-hover:text-white group-hover:shadow-[0_0_20px_rgba(18,183,255,0.36)] dark:bg-[#12B7FF]/12 dark:text-[#12B7FF]"
                          }`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="h-px flex-1 bg-[#005BFF]/12 dark:bg-[#12B7FF]/12" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground sm:text-2xl">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
