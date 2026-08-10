"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "Jan", projects: 1 },
  { month: "Feb", projects: 3 },
  { month: "Mar", projects: 2 },
  { month: "Apr", projects: 4 },
  { month: "May", projects: 5 },
  { month: "Jun", projects: 2 },
  { month: "Jul", projects: 3 },
  { month: "Aug", projects: 4 },
];

const chartConfig = {
  projects: {
    label: "Projects",
    color: "#4d8dff",
  },
};

export function OverviewChart() {
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
