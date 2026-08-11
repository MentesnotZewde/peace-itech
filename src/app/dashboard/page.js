"use client";

import { useMemo } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Loader2,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import { AiOutlineSolution } from "react-icons/ai";
import { GrProjects } from "react-icons/gr";
import { OverviewChart } from "@/components/dashboard/Chart";
import { useProjects } from "@/components/dashboard/projects-provider";
import { projectStats, recentProjects } from "@/lib/project-metrics";
import { services } from "@/lib/services";

const statusStyles = {
  Completed: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  "75% Done": "bg-teal-500/10 text-teal-600 dark:text-teal-400",
  Halfway: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  Started: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "Not Started": "bg-muted text-muted-foreground",
  "In Progress": "bg-blue-500/10 text-blue-600 dark:text-blue-400",
};

function statusClassName(status) {
  return statusStyles[status] ?? statusStyles["Not Started"];
}

// Every tile is counted from the same projects the table shows.
function buildStats(projects) {
  const s = projectStats(projects);

  return [
    {
      title: "Number of Services",
      value: String(services.length),
      note: "service lines offered",
      icon: AiOutlineSolution,
    },
    {
      title: "Active Customers",
      value: String(s.activeCustomers),
      note: `${s.totalCustomers} total ${s.totalCustomers === 1 ? "company" : "companies"}`,
      icon: Users,
    },
    {
      title: "Total Projects",
      value: String(s.total),
      note: `${s.startedThisMonth} started this month`,
      trend: s.trend,
      icon: GrProjects,
    },
    {
      title: "Completed Projects",
      value: String(s.completed),
      note: `${s.completionRate}% of all projects`,
      icon: FileText,
    },
  ];
}

export default function DashboardPage() {
  const { projects, loading, error } = useProjects();

  const stats = useMemo(() => buildStats(projects), [projects]);

  const recentActivity = useMemo(() => recentProjects(projects, 4), [projects]);

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
        <p className="text-sm text-muted-foreground">
          Welcome back here&apos;s what&apos;s happening on PeaceItech.
        </p>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === "down" ? TrendingDown : TrendingUp;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardDescription>{stat.title}</CardDescription>
                <Icon className="h-4 w-4 text-sidebar-primary" />
              </CardHeader>
              <CardContent>
                <CardTitle className="text-2xl">
                  {loading ? "—" : stat.value}
                </CardTitle>
              </CardContent>
              <CardFooter>
                <Badge
                  variant={stat.trend === "down" ? "destructive" : "default"}
                  className={
                    stat.trend === "down"
                      ? "gap-1"
                      : "gap-1 bg-sidebar-primary/10 text-sidebar-primary [a]:hover:bg-sidebar-primary/20"
                  }
                >
                  {stat.trend && <TrendIcon className="h-3 w-3" />}
                  {loading ? "Loading…" : stat.note}
                </Badge>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Projects Started</CardTitle>
            <CardDescription>
              New projects per month over the last 8 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <OverviewChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest project updates</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {loading ? (
              <div className="flex items-center gap-2 py-6 text-sm text-muted-foreground">
                <Loader2 className="size-4 animate-spin" />
                Loading activity…
              </div>
            ) : error ? (
              <p className="py-6 text-sm text-muted-foreground">{error}</p>
            ) : recentActivity.length === 0 ? (
              <p className="py-6 text-sm text-muted-foreground">
                No projects yet. Add one from the Projects page to see activity
                here.
              </p>
            ) : (
              recentActivity.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium leading-none">
                      {item.company || item.title || item.name}
                    </p>
                    <p className="truncate text-sm text-muted-foreground">
                      {item.category || item.title || "Uncategorised"}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className={`shrink-0 border-transparent ${statusClassName(item.projectstatus)}`}
                  >
                    {item.projectstatus}
                  </Badge>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
