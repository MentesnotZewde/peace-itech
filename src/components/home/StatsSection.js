const stats = [
  { value: "120+", label: "Projects Completed" },
  { value: "85+", label: "Happy Clients" },
  { value: "6", label: "Countries Served" },
  { value: "8+", label: "Years Experience" },
];

export default function StatsSection() {
  return (
    <section className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-border/70 bg-foreground p-6 text-background shadow-2xl shadow-foreground/10 sm:p-8">
        {/* Stats use a responsive grid so the same cards work on mobile and desktop. */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-background/10 bg-background/10 p-5"
            >
              <p className="text-4xl font-semibold">{stat.value}</p>
              <p className="mt-2 text-sm text-background/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


