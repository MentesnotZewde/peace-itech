import Image from "next/image";
import {
  Bot,
  Cloud,
  Code2,
  Database,
  LockKeyhole,
  Workflow,
} from "lucide-react";

const orbitNodes = [
  {
    label: "Web",
    icon: Code2,
    className: "left-1/2 top-0 -translate-x-1/2 -translate-y-1/2",
  },
  {
    label: "ERP",
    icon: Database,
    className: "right-2 top-1/4 translate-x-1/2",
  },
  {
    label: "Automation",
    icon: Workflow,
    className: "right-8 bottom-8 translate-x-1/2 translate-y-1/2",
  },
  {
    label: "Cybersecurity",
    icon: LockKeyhole,
    className: "left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2",
  },
  {
    label: "Cloud",
    icon: Cloud,
    className: "left-8 bottom-8 -translate-x-1/2 translate-y-1/2",
  },
  { label: "AI", icon: Bot, className: "left-2 top-1/4 -translate-x-1/2" },
];

export default function HeroOrbitVisual() {
  return (
    <div className="relative mx-auto flex min-h-[24rem] w-full max-w-[28rem] items-center justify-center overflow-visible py-8 animate-orbit-enter sm:min-h-[28rem]">
      <div className="absolute inset-8 rounded-full bg-[#12B7FF]/15 blur-3xl" />
      <div className="absolute inset-16 rounded-full bg-[#005BFF]/15 blur-2xl" />

      {/* Orbit rings rotate at different speeds to create a calm enterprise-tech motion. */}
      <div className="absolute size-72 rounded-full border border-[#12B7FF]/30 animate-orbit-ring-1 sm:size-80" />
      <div className="absolute size-56 rounded-full border border-[#005BFF]/30 animate-orbit-ring-2 sm:size-64" />
      <div className="absolute size-40 rounded-full border border-[#071B8F]/20 animate-orbit-ring-3 dark:border-[#EAF8FF]/20 sm:size-48" />

      <div className="relative z-10 flex size-36 items-center justify-center rounded-full border border-[#12B7FF]/30 bg-background/80 shadow-2xl shadow-[#005BFF]/20 backdrop-blur-xl sm:size-44">
        <div className="absolute inset-3 rounded-full bg-gradient-to-br from-[#EAF8FF]/80 via-[#12B7FF]/20 to-[#005BFF]/20 dark:from-[#07111F] dark:via-[#071B8F]/35 dark:to-[#12B7FF]/20" />
        <div className="absolute inset-7 rounded-full border border-background/70 bg-background/90 shadow-inner dark:bg-[#07111F]/90" />
        <div className="relative flex size-24 items-center justify-center overflow-hidden rounded-full bg-white shadow-lg shadow-[#005BFF]/10 ring-1 ring-[#12B7FF]/20 sm:size-28">
          {/* Place your current icon at public/logo-icon.png. It is served here as /logo-icon.png. */}
          <Image
            src="/logo-icon.png"
            alt="Peace iTech Inc logo icon"
            fill
            sizes="112px"
            className="scale-110 object-cover"
            priority
          />
        </div>
      </div>

      <div className="absolute size-72 sm:size-80">
        {orbitNodes.map((node, index) => {
          const Icon = node.icon;

          return (
            <div
              key={node.label}
              className={`absolute ${node.className} animate-orbit-node`}
              style={{
                "--node-delay": `${1300 + index * 220}ms`,
                "--spotlight-delay": `${3100 + index * 700}ms`,
              }}
            >
              <div className="group flex items-center gap-2 rounded-full border border-[#12B7FF]/20 bg-background/80 px-3 py-2 shadow-xl shadow-[#005BFF]/10 backdrop-blur transition-transform hover:-translate-y-1 hover:border-[#12B7FF]/40 animate-orbit-node-card">
                <span className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-[#005BFF]/15 to-[#12B7FF]/20 text-[#005BFF] ring-1 ring-[#12B7FF]/25 dark:text-[#12B7FF]">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <span className="hidden text-xs font-semibold text-foreground sm:inline">
                  {node.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


