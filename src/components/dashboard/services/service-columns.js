"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { actionsColumn } from "@/components/dashboard/row-actions";

export function getServiceColumns({ onEdit, onDelete }) {
  return [
    {
      accessorKey: "title",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="-ml-3"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
        </Button>
      ),
      cell: ({ row }) => (
        <p className="font-medium text-foreground">{row.original.title}</p>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <p className="max-w-xl text-sm text-muted-foreground">
          {row.original.description}
        </p>
      ),
    },
    actionsColumn({ onEdit, onDelete, getLabel: (row) => row.title }),
  ];
}
