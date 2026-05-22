"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const tools = [
  { name: "React", logo: "https://cdn.simpleicons.org/react/61DAFB" },
  { name: "Next.js", logo: "/images/Next.jpg" },
  { name: "Tailwind CSS", logo: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
  { name: "Node.js", logo: "https://cdn.simpleicons.org/nodedotjs/5FA04E" },
  { name: "Firebase", logo: "https://cdn.simpleicons.org/firebase/FFCA28" },
  { name: "PostgreSQL", logo: "https://cdn.simpleicons.org/postgresql/4169E1" },
  { name: "Microsoft Azure", logo: "/images/Microsoft Azure.png" },
  { name: "Power Automate", logo: "/images/Power Automate.png" },
  { name: "SharePoint", logo: "/images/SharePoint.png" },
  { name: "Twilio", logo: "/images/Twilio-Logo.png" },
  { name: "Figma", logo: "https://cdn.simpleicons.org/figma/F24E1E" },
  { name: "GitHub", logo: "/images/GitHub.png" },
  { name: "Vercel", logo: "/images/Vercel-Logo.png" },
  { name: "WordPress", logo: "https://cdn.simpleicons.org/wordpress/21759B" },
];

const topRow = tools.slice(0, 7);
const bottomRow = tools.slice(7);

function useCompactMotion() {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsCompact(query.matches);

    update();
    query.addEventListener("change", update);

    return () => query.removeEventListener("change", update);
  }, []);

  return isCompact;
}

const sectionReveal = {
  hidden: { opacity: 0, y: 38 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.14,
    },
  },
};

const headingReveal = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1] },
  },
};

function LogoCard({ tool }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.04 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="group flex h-24 w-32 shrink-0 flex-col items-center justify-center gap-2 rounded-2xl border border-[#005BFF]/10 bg-white/78 shadow-[0_16px_36px_rgba(0,91,255,0.08)] backdrop-blur-xl transition-colors duration-300 hover:border-[#12B7FF]/45 hover:shadow-[0_22px_48px_rgba(18,183,255,0.18)] dark:border-[#12B7FF]/16 dark:bg-[#0B1830]/70 dark:shadow-black/20 dark:hover:border-[#12B7FF]/45 dark:hover:shadow-[#12B7FF]/16 sm:w-36"
    >
      <span className="flex size-11 items-center justify-center rounded-xl border border-[#005BFF]/8 bg-white/90 shadow-inner shadow-[#005BFF]/5 dark:border-[#12B7FF]/14">
        <img src={tool.logo} alt="" className="size-7 object-contain" loading="lazy" />
      </span>
      <span className="max-w-full px-2 text-center text-xs font-semibold leading-4 text-foreground">
        {tool.name}
      </span>
    </motion.div>
  );
}

function StaticLogoGrid({ items }) {
  return (
    <div className="grid grid-cols-2 justify-items-center gap-3 sm:grid-cols-3">
      {items.map((tool) => (
        <LogoCard key={tool.name} tool={tool} />
      ))}
    </div>
  );
}

function LogoCarousel({ items, reverse = false, isCompact = false }) {
  if (isCompact) {
    return <StaticLogoGrid items={items} />;
  }

  const repeatedItems = [...items, ...items, ...items];

  return (
    <div
      className="relative overflow-hidden py-2"
      style={{
        WebkitMaskImage: "linear-gradient(90deg, transparent, black 9%, black 91%, transparent)",
        maskImage: "linear-gradient(90deg, transparent, black 9%, black 91%, transparent)",
      }}
    >
      <motion.div
        className="flex w-max gap-4"
        animate={{ x: reverse ? ["-33.333%", "0%"] : ["0%", "-33.333%"] }}
        transition={{
          duration: 28,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {repeatedItems.map((tool, index) => (
          <LogoCard key={`${tool.name}-${index}`} tool={tool} />
        ))}
      </motion.div>
    </div>
  );
}

export default function TechnologiesToolsSection() {
  const isCompact = useCompactMotion();

  return (
    <motion.section
      className="relative isolate overflow-hidden py-20 transition-colors sm:py-24"
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      <div className="absolute left-1/2 top-10 -z-10 h-56 w-[42rem] max-w-[92vw] -translate-x-1/2 rounded-full bg-[#12B7FF]/10 blur-3xl dark:bg-[#005BFF]/16" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div>
          <div className="mx-auto max-w-3xl text-center">
            <motion.p
              variants={headingReveal}
              className="text-sm font-semibold uppercase tracking-[0.18em] text-[#005BFF] dark:text-[#12B7FF]"
            >
              Technologies & Tools
            </motion.p>
            <motion.h2
              variants={headingReveal}
              className="mt-3 pb-1 text-3xl font-semibold tracking-normal text-foreground sm:text-5xl"
            >
              Modern tools behind
              <span className="hero-heading-accent block" style={{ textShadow: "none" }}>
                reliable digital systems.
              </span>
            </motion.h2>
            <motion.p
              variants={headingReveal}
              className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground"
            >
              We use trusted technologies to design, build, automate, and support scalable business solutions.
            </motion.p>
          </div>

          <motion.div className="mt-14 space-y-4" variants={headingReveal}>
            <LogoCarousel items={topRow} isCompact={isCompact} />
            <LogoCarousel items={bottomRow} reverse isCompact={isCompact} />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
