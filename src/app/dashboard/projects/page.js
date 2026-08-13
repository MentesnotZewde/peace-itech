"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/dashboard/users/data-table";
import { getProjectColumns } from "@/components/dashboard/users/project-columns";
import { UserFormDialog } from "@/components/dashboard/users/user-form-dialog";
import { DeleteAlertDialog } from "@/components/dashboard/users/delete-alert-dialog";
import { ProjectStatusReport } from "@/components/dashboard/project-status-report";
import { useNotifications } from "@/components/dashboard/notifications-provider";
import { useProfile } from "@/components/dashboard/profile-provider";
import { useProjects } from "@/components/dashboard/projects-provider";
import { fieldsFor } from "@/lib/project-form-fields";
import { PROJECT_STATUSES } from "@/lib/project-progress";

export default function ProjectsPage() {
  const {
    projects,
    loading,
    error,
    refresh,
    addProject,
    updateProject,
    removeProject,
  } = useProjects();
  const { addNotification } = useNotifications();
  const { profile } = useProfile();
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const isAdmin = profile.role === "Admin";

  const handleAdd = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const handleEdit = (row) => {
    setEditing(row);
    setFormOpen(true);
  };

  // Errors bubble to the dialog, which stays open and shows field messages.
  const handleSubmit = async (data, files) => {
    if (editing) {
      const project = await toast
        .promise(updateProject(editing._id, data, files), {
          loading: "Saving changes…",
          success: "Project updated",
          error: (err) => err.message,
        })
        .unwrap();

      addNotification({
        title: "Project updated",
        description: `${project.company || project.title}'s project was updated.`,
      });
    } else {
      const project = await toast
        .promise(addProject(data, files), {
          loading: "Creating project…",
          success: "Project added",
          error: (err) => err.message,
        })
        .unwrap();

      addNotification({
        title: "New project added",
        description: `${project.company || project.title} was added to your project list.`,
      });
    }
  };

  const handleDelete = async () => {
    const target = deleteTarget;
    setDeleteTarget(null);

    try {
      await toast
        .promise(removeProject(target._id), {
          loading: "Deleting project…",
          success: "Project deleted",
          error: (err) => err.message,
        })
        .unwrap();

      addNotification({
        title: "Project removed",
        description: `${target.company || target.title}'s project was removed.`,
      });
    } catch {
      // The toast already carries the reason.
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
        <p className="text-sm text-muted-foreground">
          Manage your client projects.
        </p>
      </div>

      <ProjectStatusReport projects={projects} />

      <Card>
        <CardHeader>
          <CardTitle>All Projects</CardTitle>
          <CardDescription>
            {loading ? "Loading…" : `${projects.length} total`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center gap-2 py-16 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" />
              Loading projects…
            </div>
          ) : error ? (
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <p className="text-sm text-muted-foreground">{error}</p>
              <Button variant="outline" size="sm" onClick={refresh}>
                Try again
              </Button>
            </div>
          ) : (
            <DataTable
              columns={getProjectColumns({
                onEdit: handleEdit,
                onDelete: setDeleteTarget,
                // Projects are Admin-only to change; everyone else reads.
                canEdit: isAdmin,
                canDelete: isAdmin,
              })}
              data={projects}
              searchKey="name"
              searchPlaceholder="Search projects..."
              filters={[
                {
                  key: "projectstatus",
                  label: "Status",
                  options: PROJECT_STATUSES,
                },
              ]}
              onAddNew={isAdmin ? handleAdd : undefined}
              addLabel="Add Project"
            />
          )}
        </CardContent>
      </Card>

      <UserFormDialog
        key={editing ? editing._id : "new"}
        open={formOpen}
        onOpenChange={setFormOpen}
        fields={fieldsFor(editing)}
        initialData={editing}
        onSubmit={handleSubmit}
        title={editing ? "Edit Project" : "Add Project"}
      />

      <DeleteAlertDialog
        open={!!deleteTarget}
        onOpenChange={(v) => !v && setDeleteTarget(null)}
        itemName={deleteTarget?.company || deleteTarget?.name}
        onConfirm={handleDelete}
      />
    </div>
  );
}
