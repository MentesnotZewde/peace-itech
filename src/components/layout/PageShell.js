import InteractiveHeroBackground from "@/components/home/InteractiveHeroBackground";

export default function PageShell({ children, className = "" }) {
  return (
    <div
      className={`global-network-shell relative isolate min-h-screen overflow-hidden bg-background transition-colors ${className}`}
    >
      <InteractiveHeroBackground className="fixed interactive-hero-background--subtle" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
