"use client";

import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

/**
 * Shared "Actions" column for the admin tables — visible edit/delete
 * buttons rather than an overflow menu.
 */
// `canEdit` / `canDelete` accept a boolean or a per-row predicate, so a table
// can hide actions the signed-in user isn't allowed to perform.
const allows = (rule, row) => (typeof rule === "function" ? rule(row) : rule);

export function actionsColumn({
  onEdit,
  onDelete,
  getLabel = (row) => row.name,
  canEdit = true,
  canDelete = true,
}) {
  return {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => (
      <div className="flex justify-end gap-2">
        {allows(canEdit, row.original) && (
          <Button
            variant="outline"
            size="icon-sm"
            aria-label={`Edit ${getLabel(row.original)}`}
            onClick={() => onEdit(row.original)}
          >
            <Pencil className="size-3.5" />
          </Button>
        )}
        {allows(canDelete, row.original) && (
          <Button
            variant="destructive"
            size="icon-sm"
            aria-label={`Delete ${getLabel(row.original)}`}
            onClick={() => onDelete(row.original)}
          >
            <Trash2 className="size-3.5" />
          </Button>
        )}
      </div>
    ),
  };
}
