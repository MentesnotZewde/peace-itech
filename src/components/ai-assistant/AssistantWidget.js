"use client";

import dynamic from "next/dynamic";
import { Bot, Sparkles } from "lucide-react";
import { useState } from "react";

const AssistantPanel = dynamic(() => import("./AssistantPanel"), {
  ssr: false,
});

export default function AssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open AI assistant"
        className={`fixed bottom-5 right-4 z-[120] flex h-14 items-center gap-3 rounded-full border border-[#12B7FF]/30 bg-[#0348c9] px-4 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(0,91,255,0.28)] outline-none transition-all duration-300 hover:-translate-y-1 hover:bg-[#005BFF] focus-visible:ring-4 focus-visible:ring-[#12B7FF]/30 dark:border-white/10 dark:bg-white dark:text-[#07111F] dark:hover:bg-[#EAF8FF] sm:bottom-6 sm:right-6 ${
          isOpen ? "pointer-events-none translate-y-2 opacity-0" : "opacity-100"
        }`}
      >
        <span className="relative flex size-9 shrink-0 items-center justify-center rounded-full bg-[#005BFF] text-white dark:bg-[#12B7FF] dark:text-[#07111F]">
          <Bot className="size-5" aria-hidden="true" />
        </span>
        <span className="hidden sm:inline">Ask our AI</span>
      </button>

      {isOpen ? <AssistantPanel onClose={() => setIsOpen(false)} /> : null}
    </>
  );
}
