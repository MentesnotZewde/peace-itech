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
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Activity,
  FileText,
} from "lucide-react";
import { FaUsersCog } from "react-icons/fa";
import { AiOutlineSolution } from "react-icons/ai";
import { GrProjects } from "react-icons/gr";
import { OverviewChart } from "@/components/dashboard/Chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const stats = [
  {
    title: "Number of Services",
    value: "99.98%",
    change: "+0.02%",
    trend: "up",
    icon: AiOutlineSolution,
  },
  ,
  {
    title: "Active Customers",
    value: "5",
    change: "+12.5%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Total Projects",
    value: "10",
    change: "+20.1%",
    trend: "up",
    icon: GrProjects,
  },
  ,
  {
    title: "Completed Projects",
    value: "6",
    change: "+4.3%",
    trend: "up",
    icon: FileText,
  },
];

const recentActivity = [
  {
    name: "Wado Travel",
    type: "Webapp Build",
    status: "Not Started",
    date: "Aug 8, 2026",
  },
  {
    name: "4 Kilo Butcher",
    type: "Automation",
    status: "In Progress",
    date: "Aug 5, 2026",
  },
  {
    name: "Greenfox Agency",
    type: "Website Build",
    status: "Completed",
    date: "Aug 6, 2026",
  },
  {
    name: "H2H Express Delivery",
    type: "Website Build",
    status: "Completed",
    date: "Aug 6, 2026",
  },
  ,
  {
    name: "Northside IT",
    type: "Cybersecurity Audit",
    status: "Pending",
    date: "Aug 3, 2026",
  },
  {
    name: "Bright Path Inc",
    type: "IT Support",
    status: "Completed",
    date: "Aug 1, 2026",
  },
];

const statusStyles = {
  Completed: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  "In Progress": "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  Pending: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "Not Started": "bg-muted text-muted-foreground",
};

function statusClassName(status) {
  return statusStyles[status] ?? statusStyles["Not Started"];
}

export default function DashboardPage() {
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
          const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardDescription>{stat.title}</CardDescription>
                <Icon className="h-4 w-4 text-sidebar-primary" />
              </CardHeader>
              <CardContent>
                <CardTitle className="text-2xl">{stat.value}</CardTitle>
              </CardContent>
              <CardFooter>
                <Badge
                  variant={stat.trend === "up" ? "default" : "destructive"}
                  className={
                    stat.trend === "up"
                      ? "gap-1 bg-sidebar-primary/10 text-sidebar-primary [a]:hover:bg-sidebar-primary/20"
                      : "gap-1"
                  }
                >
                  <TrendIcon className="h-3 w-3" />
                  {stat.change}
                </Badge>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Completed Projects Overview</CardTitle>
            <CardDescription>
              Monthly delivered projects for the current year
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
            {recentActivity.slice(0, 4).map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between"
              >
                <div>
                  <p className="text-sm font-medium leading-none">
                    {item.name}
                  </p>
                  <p className="text-sm text-muted-foreground">{item.type}</p>
                </div>
                <Badge
                  variant="outline"
                  className={`border-transparent ${statusClassName(item.status)}`}
                >
                  {item.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
