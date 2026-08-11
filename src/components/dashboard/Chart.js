"use client";

import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useProjects } from "@/components/dashboard/projects-provider";
import { monthlyProjectCounts } from "@/lib/project-metrics";

const chartConfig = {
  projects: {
    label: "Projects",
    color: "#4d8dff",
  },
};

export function OverviewChart() {
  const { projects } = useProjects();
  // Bucketed by start month, from the same rows the projects table renders.
  const chartData = useMemo(() => monthlyProjectCounts(projects), [projects]);

  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <BarChart data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="projects" fill="var(--color-projects)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
