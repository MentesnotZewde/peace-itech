"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowUpDown,
  FileText,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";

function initials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const statusStyles = {
  Completed: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  "In Progress": "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  Pending: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "Not Started": "bg-muted text-muted-foreground",
};

function statusClassName(status) {
  return statusStyles[status] ?? statusStyles["Not Started"];
}

function openRequirements(doc) {
  if (!doc?.url) return;
  window.open(doc.url, "_blank", "noopener,noreferrer");

  const link = document.createElement("a");
  link.href = doc.url;
  link.download = doc.name || "project-requirements.pdf";
  link.click();
}

export function getProjectColumns({ onEdit, onDelete }) {
  return [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="-ml-3"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Company Representative <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={row.original.avatar} />
            <AvatarFallback>{initials(row.original.name)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium leading-none">
              {row.original.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {row.original.email}
            </p>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "company",
      header: "Company Name",
    },
    {
      accessorKey: "contact",
      header: "Contact Number",
    },
    {
      accessorKey: "projectRequirements",
      header: "Project Requirements",
      cell: ({ row }) =>
        row.original.projectRequirements?.url ? (
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 gap-1.5 text-sidebar-primary hover:text-sidebar-primary"
            onClick={() => openRequirements(row.original.projectRequirements)}
          >
            <FileText className="h-3.5 w-3.5" />
            {row.original.projectRequirements.name || "View PDF"}
          </Button>
        ) : (
          <span className="text-xs text-muted-foreground">No file</span>
        ),
    },
    {
      accessorKey: "projectstatus",
      header: "Project Status",
      cell: ({ row }) => (
        <Badge
          variant="outline"
          className={`border-transparent ${statusClassName(row.original.projectstatus)}`}
        >
          {row.original.projectstatus}
        </Badge>
      ),
    },
    {
      accessorKey: "agreedprice",
      header: "Agreed Price",
    },
    {
      accessorKey: "joined",
      header: "Start Date",
    },
    {
      accessorKey: "deliverydate",
      header: "Expected Delivery Date",
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => onEdit(row.original)}
              className="gap-2"
            >
              <Pencil className="h-3.5 w-3.5" /> Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onDelete(row.original)}
              className="gap-2 text-destructive focus:text-destructive"
            >
              <Trash2 className="h-3.5 w-3.5" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];
}
