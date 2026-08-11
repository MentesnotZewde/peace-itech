"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowUpDown, FileText, Loader2 } from "lucide-react";
import { downloadDocument } from "@/lib/utils";
import { actionsColumn } from "@/components/dashboard/row-actions";

function initials(name) {
  return (name || "—")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const statusStyles = {
  Completed: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  "75% Done": "bg-teal-500/10 text-teal-600 dark:text-teal-400",
  Halfway: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  Started: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "Not Started": "bg-muted text-muted-foreground",
  // Legacy status, still shown for projects saved before the finer stages.
  "In Progress": "bg-blue-500/10 text-blue-600 dark:text-blue-400",
};

function statusClassName(status) {
  return statusStyles[status] ?? statusStyles["Not Started"];
}

// Disabled while the file is being fetched, so an impatient double-click
// can't start a second download.
function RequirementsButton({ doc }) {
  const [downloading, setDownloading] = useState(false);

  if (!doc?.url) {
    return <span className="text-xs text-muted-foreground">No file</span>;
  }

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await downloadDocument(doc);
    } catch (error) {
      toast.error("Could not download the file", {
        description: error.message,
      });
    } finally {
      setDownloading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      disabled={downloading}
      className="-ml-3 gap-1.5 text-sidebar-primary hover:text-sidebar-primary"
      onClick={handleDownload}
    >
      {downloading ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : (
        <FileText className="h-3.5 w-3.5" />
      )}
      {doc.name || "View PDF"}
    </Button>
  );
}

export function getProjectColumns({ onEdit, onDelete, canDelete = true }) {
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
      accessorKey: "category",
      header: "Service Category",
    },
    {
      accessorKey: "projectRequirements",
      header: "Project Requirements",
      cell: ({ row }) => (
        <RequirementsButton doc={row.original.projectRequirements} />
      ),
    },
    {
      accessorKey: "projectstatus",
      header: "Project Status",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className={`border-transparent ${statusClassName(row.original.projectstatus)}`}
          >
            {row.original.projectstatus}
          </Badge>
          {/* Derived from the status, never entered by hand. */}
          <span className="text-xs text-muted-foreground">
            {row.original.progress}%
          </span>
        </div>
      ),
    },
    {
      accessorKey: "agreedprice",
      header: "Agreed Price",
    },
    {
      accessorKey: "createdAt",
      header: "Start Date",
      cell: ({ row }) => formatDate(row.original.createdAt),
    },
    {
      accessorKey: "deliverydate",
      header: "Expected Delivery Date",
      cell: ({ row }) => formatDate(row.original.deliverydate),
    },
    actionsColumn({
      onEdit,
      onDelete,
      canDelete,
      getLabel: (row) => row.company || row.name || row.title,
    }),
  ];
}
