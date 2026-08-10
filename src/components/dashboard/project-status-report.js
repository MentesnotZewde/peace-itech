import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const TIERS = [
  { value: 100, label: "Completed", color: "var(--chart-1)" },
  { value: 75, label: "75% Done", color: "var(--chart-2)" },
  { value: 50, label: "Halfway", color: "var(--chart-3)" },
  { value: 25, label: "Just Started", color: "var(--chart-4)" },
  { value: 0, label: "Not Started", color: "var(--chart-5)" },
];

const SIZE = 96;
const STROKE = 10;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function StatusRing({ pct, color }) {
  const dash = (pct / 100) * CIRCUMFERENCE;

  return (
    <svg
      width={SIZE}
      height={SIZE}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className="-rotate-90"
      aria-hidden="true"
    >
      <circle
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={RADIUS}
        fill="none"
        stroke={color}
        strokeOpacity={0.15}
        strokeWidth={STROKE}
      />
      <circle
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={RADIUS}
        fill="none"
        stroke={color}
        strokeWidth={STROKE}
        strokeLinecap="round"
        strokeDasharray={`${dash} ${CIRCUMFERENCE - dash}`}
      />
    </svg>
  );
}

export function ProjectStatusReport({ projects }) {
  const total = projects.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Status Report</CardTitle>
        <CardDescription>
          Share of all projects at each completion stage
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap items-start justify-around gap-6">
          {TIERS.map((tier) => {
            const count = projects.filter(
              (p) => Number(p.progress) === tier.value,
            ).length;
            const pct = total ? Math.round((count / total) * 100) : 0;

            return (
              <div
                key={tier.value}
                className="flex flex-col items-center gap-2"
              >
                <div className="relative" style={{ width: SIZE, height: SIZE }}>
                  <StatusRing pct={pct} color={tier.color} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-semibold text-foreground">
                      {pct}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: tier.color }}
                  />
                  <span className="text-xs font-medium text-foreground">
                    {tier.label}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {count} of {total} projects
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
