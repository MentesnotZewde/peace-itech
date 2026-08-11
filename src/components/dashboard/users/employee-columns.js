"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { actionsColumn } from "@/components/dashboard/row-actions";

function initials(name) {
  return (name || "")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const statusStyles = {
  Active: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  "On Leave": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Inactive: "bg-muted text-muted-foreground",
};

function statusClassName(status) {
  return statusStyles[status] ?? statusStyles.Inactive;
}

function formatJoined(value) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export function getEmployeeColumns({
  onEdit,
  onDelete,
  canEdit = true,
  canDelete = true,
}) {
  return [
    {
      accessorKey: "fullName",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="-ml-3"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={row.original.profilePicture?.url} />
            <AvatarFallback>{initials(row.original.fullName)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium leading-none">
              {row.original.fullName}
            </p>
            <p className="text-xs text-muted-foreground">
              {row.original.email}
            </p>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <Badge
          variant="outline"
          className={
            row.original.role === "Admin"
              ? "border-transparent bg-sidebar-primary/10 text-sidebar-primary"
              : "border-transparent bg-muted text-muted-foreground"
          }
        >
          {row.original.role}
        </Badge>
      ),
    },
    {
      accessorKey: "department",
      header: "Department",
      cell: ({ row }) => row.original.department || "—",
    },
    {
      accessorKey: "profession",
      header: "Profession",
      cell: ({ row }) => row.original.profession || "—",
    },

    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge
          variant="outline"
          className={`border-transparent ${statusClassName(row.original.status)}`}
        >
          {row.original.status}
        </Badge>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Joined",
      cell: ({ row }) => formatJoined(row.original.createdAt),
    },
    actionsColumn({
      onEdit,
      onDelete,
      canEdit,
      canDelete,
      getLabel: (row) => row.fullName,
    }),
  ];
}
