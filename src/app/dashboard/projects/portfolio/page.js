"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  CheckCircle2,
  ExternalLink,
  EyeOff,
  ImageOff,
  Loader2,
  Pencil,
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
import { useProjects } from "@/components/dashboard/projects-provider";
import { useProfile } from "@/components/dashboard/profile-provider";
import { useNotifications } from "@/components/dashboard/notifications-provider";
import { services } from "@/lib/services";
import { SERVICE_CATEGORIES } from "@/lib/service-categories";
import { PROJECT_FIELDS } from "@/lib/project-fields";

const iconByCategory = Object.fromEntries(
  services.map((s) => [s.title, s.icon]),
);

function PortfolioCard({
  project,
  index,
  onEdit,
  onToggleApproval,
  canManage,
  pending,
}) {
  const approved = Boolean(project.portfolioApproved);
  const Icon = iconByCategory[project.category];
  const label = project.title || project.company;

  return (
    <Card className="overflow-hidden py-0">
      {/*
        flex-wrap + a basis on the title group is what keeps the status badge
        clear of the buttons: the badge can't shrink, so on a narrow card the
        actions wrap to their own line instead of being overlapped by it.
      */}
      <div className="flex flex-wrap items-center gap-x-2 gap-y-2 p-4 pb-3">
        <div className="flex min-w-0 grow basis-48 items-center gap-2.5">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-sidebar-primary/10 text-sm font-semibold text-sidebar-primary">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="truncate font-semibold text-foreground">{label}</h3>
          <span
            className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
              approved
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
            }`}
          >
            {approved ? "Published" : "Pending approval"}
          </span>
        </div>
        <div className="ml-auto flex shrink-0 items-center gap-2">
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
          {canManage && (
            <>
              <Button
                variant="outline"
                size="icon-sm"
                aria-label={`Edit ${label}`}
                onClick={() => onEdit(project)}
              >
                <Pencil className="size-3.5" />
              </Button>
              {approved ? (
                <Button
                  variant="outline"
                  size="icon-sm"
                  disabled={pending}
                  aria-label={`Unpublish ${label} from the website`}
                  title="Unpublish from the website"
                  onClick={() => onToggleApproval(project, false)}
                >
                  <EyeOff className="size-3.5" />
                </Button>
              ) : (
                <Button
                  size="sm"
                  disabled={pending}
                  aria-label={`Approve ${label} for the website`}
                  title="Approve and publish to the website"
                  className="gap-1 bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
                  onClick={() => onToggleApproval(project, true)}
                >
                  <CheckCircle2 className="size-3.5" />
                  Approve
                </Button>
              )}
            </>
          )}
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
  const { projects, loading, updateProject } = useProjects();
  const { addNotification } = useNotifications();
  const { profile } = useProfile();
  const isAdmin = profile.role === "Admin";
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [approval, setApproval] = useState("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const delivered = projects.filter((p) => p.projectstatus === "Completed");
  const pendingCount = delivered.filter((p) => !p.portfolioApproved).length;

  // No "add" here on purpose: a project reaches the portfolio by being marked
  // Completed on the Projects page. This page only edits and removes.
  const openEdit = (project) => {
    setEditing(project);
    setFormOpen(true);
  };

  const handleSubmit = async (data, files) => {
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
  };

  // Approval is what puts a project on the public site; the project itself is
  // never touched here.
  const [approving, setApproving] = useState(null);

  const handleToggleApproval = async (project, approve) => {
    setApproving(project._id);
    const label = project.title || project.company;

    try {
      await toast
        .promise(updateProject(project._id, { portfolioApproved: approve }), {
          loading: approve ? "Publishing…" : "Unpublishing…",
          success: approve
            ? `"${label}" is now live on the website`
            : `"${label}" removed from the website`,
          error: (err) => err.message,
        })
        .unwrap();

      addNotification({
        title: approve ? "Portfolio project published" : "Portfolio project unpublished",
        description: approve
          ? `"${label}" was approved and is now visible on the public site.`
          : `"${label}" is no longer shown on the public site.`,
      });
    } catch {
      // The toast already carries the reason.
    } finally {
      setApproving(null);
    }
  };

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    return delivered.filter((p) => {
      const matchesApproval =
        approval === "all" ||
        (approval === "published" ? p.portfolioApproved : !p.portfolioApproved);
      const matchesCategory = category === "all" || p.category === category;
      const matchesSearch =
        !query ||
        p.title?.toLowerCase().includes(query) ||
        p.company?.toLowerCase().includes(query);
      return matchesApproval && matchesCategory && matchesSearch;
    });
  }, [delivered, search, category, approval]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Portfolio Projects
        </h1>
        <p className="text-sm text-muted-foreground">
          Completed projects wait here for approval — only the ones you publish
          appear on the public service pages.
        </p>
        {pendingCount > 0 && (
          <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-600 dark:text-amber-400">
            {pendingCount} awaiting approval
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <Input
            placeholder="Search by title or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />
          <Select value={approval} onValueChange={setApproval}>
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Approval" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending approval</SelectItem>
              <SelectItem value="published">Published</SelectItem>
            </SelectContent>
          </Select>
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
            the Projects tab, then approve it here to publish it.
          </CardContent>
        </Card>
      ) : filtered.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center text-sm text-muted-foreground">
            No projects match your search or filter.
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {filtered.map((project, index) => (
            <PortfolioCard
              key={project._id}
              project={project}
              index={index}
              onEdit={openEdit}
              onToggleApproval={handleToggleApproval}
              canManage={isAdmin}
              pending={approving === project._id}
            />
          ))}
        </div>
      )}

      {editing && (
        <UserFormDialog
          key={editing._id}
          open={formOpen}
          onOpenChange={setFormOpen}
          fields={PROJECT_FIELDS}
          initialData={editing}
          onSubmit={handleSubmit}
          title="Edit Project"
        />
      )}
    </div>
  );
}
