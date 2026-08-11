"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  ExternalLink,
  ImageOff,
  Loader2,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserFormDialog } from "@/components/dashboard/users/user-form-dialog";
import { DeleteAlertDialog } from "@/components/dashboard/users/delete-alert-dialog";
import { useProjects } from "@/components/dashboard/projects-provider";
import { useNotifications } from "@/components/dashboard/notifications-provider";
import { services } from "@/lib/services";
import { SERVICE_CATEGORIES } from "@/lib/service-categories";
import { PROJECT_FIELDS } from "@/lib/project-fields";

// Anything added here is a delivered project; progress follows the status.
const NEW_DELIVERED_PROJECT = {
  ...Object.fromEntries(PROJECT_FIELDS.map((f) => [f.key, ""])),
  projectstatus: "Completed",
};

const iconByCategory = Object.fromEntries(
  services.map((s) => [s.title, s.icon]),
);

function PortfolioCard({ project, index, onEdit, onDelete }) {
  const Icon = iconByCategory[project.category];
  const label = project.title || project.company;

  return (
    <Card className="overflow-hidden py-0">
      <div className="flex items-center justify-between gap-2 p-4 pb-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-sidebar-primary/10 text-sm font-semibold text-sidebar-primary">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="truncate font-semibold text-foreground">{label}</h3>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {project.liveUrl && (
            <Button variant="outline" size="icon-sm" asChild>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${label} live site`}
              >
                <ExternalLink className="size-3.5" />
              </a>
            </Button>
          )}
          <Button
            variant="outline"
            size="icon-sm"
            aria-label={`Edit ${label}`}
            onClick={() => onEdit(project)}
          >
            <Pencil className="size-3.5" />
          </Button>
          <Button
            variant="destructive"
            size="icon-sm"
            aria-label={`Delete ${label}`}
            onClick={() => onDelete(project)}
          >
            <Trash2 className="size-3.5" />
          </Button>
        </div>
      </div>

      <div className="mx-4 overflow-hidden rounded-xl border">
        <div className="flex h-6 items-center gap-1.5 bg-muted px-3">
          <span className="size-1.5 rounded-full bg-muted-foreground/30" />
          <span className="size-1.5 rounded-full bg-muted-foreground/30" />
          <span className="size-1.5 rounded-full bg-muted-foreground/30" />
        </div>
        <div className="aspect-video w-full">
          {project.image?.url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.image.url}
              alt={project.title || project.company}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-linear-to-br from-[#005BFF]/10 to-[#12B7FF]/10 text-[#005BFF]">
              {Icon ? (
                <Icon className="size-8" aria-hidden="true" />
              ) : (
                <ImageOff className="size-8" aria-hidden="true" />
              )}
              <span className="text-xs font-medium">No preview yet</span>
            </div>
          )}
        </div>
      </div>

      <CardContent className="pt-3 pb-4">
        <span className="inline-flex items-center rounded-full bg-sidebar-primary/10 px-3 py-1 text-xs font-medium text-sidebar-primary">
          {project.category}
        </span>
        <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">
          {project.description || "No description added yet."}
        </p>
      </CardContent>
    </Card>
  );
}

export default function PortfolioPage() {
  const { projects, loading, addProject, updateProject, removeProject } =
    useProjects();
  const { addNotification } = useNotifications();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const delivered = projects.filter((p) => p.projectstatus === "Completed");

  const openAdd = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (project) => {
    setEditing(project);
    setFormOpen(true);
  };

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
        title: "Portfolio project updated",
        description: `"${project.title || project.company}" was updated.`,
      });
      return;
    }

    const project = await toast
      .promise(addProject(data, files), {
        loading: "Adding project…",
        success: "Project added",
        error: (err) => err.message,
      })
      .unwrap();

    addNotification({
      title: "New project added",
      description: `${project.title || project.company} was added to your project list.`,
    });
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
        title: "Portfolio project removed",
        description: `"${target.title || target.company}" was removed.`,
      });
    } catch {
      // The toast already carries the reason.
    }
  };

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    return delivered.filter((p) => {
      const matchesCategory = category === "all" || p.category === category;
      const matchesSearch =
        !query ||
        p.title?.toLowerCase().includes(query) ||
        p.company?.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [delivered, search, category]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Portfolio Projects
        </h1>
        <p className="text-sm text-muted-foreground">
          Completed projects delivered for customers.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <Input
            placeholder="Search by title or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-52">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {SERVICE_CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          size="sm"
          onClick={openAdd}
          className="gap-1 bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
        >
          <Plus className="h-4 w-4" />
          Add
        </Button>
      </div>

      {loading ? (
        <Card>
          <CardContent className="flex items-center justify-center gap-2 py-10 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" />
            Loading projects…
          </CardContent>
        </Card>
      ) : delivered.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center text-sm text-muted-foreground">
            No delivered projects yet. Mark a project as{" "}
            <span className="font-medium text-foreground">Completed</span> in
            the Projects tab to see it here.
          </CardContent>
        </Card>
      ) : filtered.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center text-sm text-muted-foreground">
            No projects match your search or filter.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, index) => (
            <PortfolioCard
              key={project._id}
              project={project}
              index={index}
              onEdit={openEdit}
              onDelete={setDeleteTarget}
            />
          ))}
        </div>
      )}

      <UserFormDialog
        key={editing ? editing._id : "new"}
        open={formOpen}
        onOpenChange={setFormOpen}
        fields={PROJECT_FIELDS}
        initialData={editing ?? NEW_DELIVERED_PROJECT}
        onSubmit={handleSubmit}
        title={editing ? "Edit Project" : "Add Project"}
      />

      <DeleteAlertDialog
        open={!!deleteTarget}
        onOpenChange={(v) => !v && setDeleteTarget(null)}
        itemName={deleteTarget?.title || deleteTarget?.company}
        onConfirm={handleDelete}
      />
    </div>
  );
}
