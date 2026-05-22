"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import InteractiveHeroBackground from "@/components/home/InteractiveHeroBackground";

const EXIT_DELAY = 1120;
const REMOVE_DELAY = 360;

export default function PageLoader() {
  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = savedTheme ? savedTheme === "dark" : prefersDark;

    document.documentElement.classList.toggle("dark", shouldUseDark);

    const exitTimer = window.setTimeout(() => setIsExiting(true), EXIT_DELAY);
    const removeTimer = window.setTimeout(
      () => setIsVisible(false),
      EXIT_DELAY + REMOVE_DELAY
    );

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className={`page-loader fixed inset-0 z-[999] isolate grid place-items-center overflow-hidden bg-[#f8fbff] transition-opacity duration-300 dark:bg-[#030b18] ${
        isExiting ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <InteractiveHeroBackground className="absolute page-loader__network" />

      <div className="page-loader__aura absolute left-1/2 top-1/2 size-[min(76vw,28rem)] -translate-x-1/2 -translate-y-1/2 rounded-full" />

      <div className="page-loader__mark relative grid size-44 place-items-center sm:size-52">
        <div className="page-loader__orbit page-loader__orbit--outer absolute inset-1 rounded-full" />
        <div className="page-loader__orbit page-loader__orbit--inner absolute inset-7 rounded-full" />

        <span className="page-loader__node page-loader__node--one absolute left-[16%] top-[25%] size-2.5 rounded-full" />
        <span className="page-loader__node page-loader__node--two absolute right-[14%] top-[58%] size-2 rounded-full" />
        <span className="page-loader__node page-loader__node--three absolute bottom-[12%] left-[47%] size-1.5 rounded-full" />

        <div className="page-loader__logo-shell relative grid size-28 place-items-center sm:size-32">
          <span className="page-loader__logo-glow absolute inset-0 rounded-full" />
          <Image
            src="/logo-icon.png"
            alt=""
            width={140}
            height={140}
            priority
            className="page-loader__logo relative z-10 h-auto w-[88%] object-contain"
          />
        </div>
      </div>
    </div>
  );
}
