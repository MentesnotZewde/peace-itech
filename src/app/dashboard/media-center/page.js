"use client";

import { Suspense, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { ImagePlus, LayoutGrid, Pencil, Plus, Search, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeleteAlertDialog } from "@/components/dashboard/users/delete-alert-dialog";
import { useNotifications } from "@/components/dashboard/notifications-provider";
import {
  MEDIA_CATEGORIES,
  MEDIA_CATEGORY_NAMES,
  mediaCategoryIcon,
} from "@/lib/media-categories";

const INITIAL_ITEMS = [
  {
    id: 1,
    title: "Peace iTech launches enterprise automation practice",
    category: "News",
    date: "2026-05-15",
    summary:
      "A new practice area focused on workflow automation, integrations, and AI-assisted business operations.",
    status: "Published",
    featured: true,
    image: "",
  },
  {
    id: 2,
    title: "Cybersecurity readiness for growing SaaS teams",
    category: "Insights",
    date: "2026-05-02",
    summary:
      "A practical guide to access reviews, monitoring, backup posture, and incident response planning.",
    status: "Published",
    featured: false,
    image: "",
  },
  {
    id: 3,
    title: "Peace iTech client innovation roundtable",
    category: "Events",
    date: "2026-04-18",
    summary:
      "Leaders discussed ERP modernization, cloud reliability, and the next wave of customer portals.",
    status: "Published",
    featured: false,
    image: "",
  },
  {
    id: 4,
    title: "A note on our updated data handling policy",
    category: "Company Updates",
    date: "2026-04-02",
    summary:
      "How we store, process, and protect client data across our managed services.",
    status: "Draft",
    featured: false,
    image: "",
  },
  {
    id: 5,
    title: "Q2 hiring push across engineering and support",
    category: "News",
    date: "2026-03-21",
    summary:
      "We are growing our delivery and helpdesk teams to support new enterprise engagements.",
    status: "Draft",
    featured: false,
    image: "",
  },
];

const emptyItem = () => ({
  title: "",
  category: "News",
  date: "",
  summary: "",
  status: "Draft",
  featured: false,
  image: "",
});

function MediaItemSheet({ open, onOpenChange, initialData, onSubmit }) {
  const isEditing = Boolean(initialData?.id);
  const [form, setForm] = useState(() => initialData ?? emptyItem());
  const [dragging, setDragging] = useState(false);

  const change = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const readImage = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    change("image", URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full gap-0 sm:max-w-lg">
        <SheetHeader className="border-b">
          <SheetTitle>{isEditing ? "Edit Item" : "Add New Item"}</SheetTitle>
        </SheetHeader>

        <form
          onSubmit={handleSubmit}
          className="flex min-h-0 flex-1 flex-col"
        >
          <div className="flex-1 space-y-5 overflow-y-auto p-4">
            <div className="space-y-1.5">
              <Label className="text-xs tracking-wide text-muted-foreground uppercase">
                Cover Image
              </Label>
              <label
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragging(false);
                  readImage(e.dataTransfer.files?.[0]);
                }}
                className={`flex h-36 cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-dashed transition-colors ${
                  dragging
                    ? "border-sidebar-primary bg-sidebar-primary/5"
                    : "border-input hover:border-sidebar-primary/60"
                }`}
              >
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(e) => readImage(e.target.files?.[0])}
                />
                {form.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={form.image}
                    alt="Cover preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="flex flex-col items-center gap-1.5 text-xs text-muted-foreground">
                    <ImagePlus className="size-5" />
                    Click to upload, or drag and drop
                  </span>
                )}
              </label>
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="media-title"
                className="text-xs tracking-wide text-muted-foreground uppercase"
              >
                Title
              </Label>
              <Input
                id="media-title"
                required
                placeholder="e.g. Peace iTech launches enterprise automation practice"
                value={form.title}
                onChange={(e) => change("title", e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="media-category"
                className="text-xs tracking-wide text-muted-foreground uppercase"
              >
                Category
              </Label>
              <Select
                value={form.category}
                onValueChange={(v) => change("category", v)}
              >
                <SelectTrigger id="media-category" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {MEDIA_CATEGORY_NAMES.map((name) => (
                    <SelectItem key={name} value={name}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="media-date"
                className="text-xs tracking-wide text-muted-foreground uppercase"
              >
                Publish Date
              </Label>
              <Input
                id="media-date"
                type="date"
                value={form.date}
                onChange={(e) => change("date", e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="media-summary"
                className="text-xs tracking-wide text-muted-foreground uppercase"
              >
                Summary
              </Label>
              <Textarea
                id="media-summary"
                rows={4}
                placeholder="A short teaser shown on the landing page card..."
                value={form.summary}
                onChange={(e) => change("summary", e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs tracking-wide text-muted-foreground uppercase">
                Visibility
              </Label>
              <div className="grid grid-cols-2 gap-2">
                {["Draft", "Published"].map((status) => (
                  <Button
                    key={status}
                    type="button"
                    variant="outline"
                    onClick={() => change("status", status)}
                    className={
                      form.status === status
                        ? "border-sidebar-primary bg-sidebar-primary/10 text-sidebar-primary hover:bg-sidebar-primary/15 hover:text-sidebar-primary"
                        : ""
                    }
                  >
                    {status}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg border px-3 py-2.5">
              <Label htmlFor="media-featured" className="cursor-pointer">
                Show as featured
              </Label>
              <Switch
                id="media-featured"
                checked={form.featured}
                onCheckedChange={(v) => change("featured", v)}
              />
            </div>
          </div>

          <SheetFooter className="grid grid-cols-2 gap-2 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
            >
              {isEditing ? "Save Changes" : "Add Item"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}

function MediaCenterContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { addNotification } = useNotifications();

  const requested = searchParams.get("category");
  const activeCategory = MEDIA_CATEGORY_NAMES.includes(requested)
    ? requested
    : "All";

  const [items, setItems] = useState(INITIAL_ITEMS);
  const [search, setSearch] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const selectCategory = (name) => {
    const query = name === "All" ? "" : `?category=${encodeURIComponent(name)}`;
    router.replace(`${pathname}${query}`, { scroll: false });
  };

  const counts = useMemo(() => {
    const byCategory = { All: items.length };
    for (const name of MEDIA_CATEGORY_NAMES) {
      byCategory[name] = items.filter((i) => i.category === name).length;
    }
    return byCategory;
  }, [items]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return items.filter((item) => {
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;
      const matchesSearch =
        !query || item.title.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [items, activeCategory, search]);

  const handleAdd = () => {
    setEditing(null);
    setSheetOpen(true);
  };

  const handleEdit = (item) => {
    setEditing(item);
    setSheetOpen(true);
  };

  const handleSubmit = (data) => {
    if (editing) {
      setItems((prev) =>
        prev.map((i) => (i.id === editing.id ? { ...i, ...data } : i)),
      );
      toast.success("Item updated");
      addNotification({
        title: "Media item updated",
        description: `"${data.title}" was updated.`,
      });
    } else {
      setItems((prev) => [{ ...data, id: Date.now() }, ...prev]);
      toast.success("Item added");
      addNotification({
        title: "New media item added",
        description: `"${data.title}" was added to ${data.category}.`,
      });
    }
  };

  const handleDelete = () => {
    setItems((prev) => prev.filter((i) => i.id !== deleteTarget.id));
    toast.success("Item deleted");
    addNotification({
      title: "Media item removed",
      description: `"${deleteTarget.title}" was removed.`,
    });
    setDeleteTarget(null);
  };

  const tabs = [{ name: "All", icon: LayoutGrid }, ...MEDIA_CATEGORIES];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-sidebar-primary uppercase">
            Admin
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">
            Media Center
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage everything that appears in the landing page media hub.
          </p>
        </div>
        <Button
          onClick={handleAdd}
          className="gap-1 bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
        >
          <Plus className="h-4 w-4" />
          Add New
        </Button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeCategory === tab.name;
            return (
              <button
                key={tab.name}
                type="button"
                onClick={() => selectCategory(tab.name)}
                className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="size-4" aria-hidden="true" />
                {tab.name}
                <span
                  className={`rounded px-1.5 text-xs ${
                    active ? "bg-white/20" : "bg-background/70"
                  }`}
                >
                  {counts[tab.name]}
                </span>
              </button>
            );
          })}
        </div>

        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 sm:w-64"
          />
        </div>
      </div>

      <div className="rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center">
                  No items found.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((item) => {
                const Icon = mediaCategoryIcon(item.category);
                return (
                  <TableRow key={item.id}>
                    <TableCell className="py-3">
                      <div className="flex items-center gap-3">
                        <span className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-sidebar-primary/10 text-sidebar-primary">
                          {item.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={item.image}
                              alt=""
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            Icon && <Icon className="size-4" />
                          )}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate font-medium text-foreground">
                            {item.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {item.featured ? (
                              <span className="text-sidebar-primary">
                                Featured
                              </span>
                            ) : (
                              item.category
                            )}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                          item.status === "Published"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <span className="size-1.5 rounded-full bg-current" />
                        {item.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon-sm"
                          aria-label={`Edit ${item.title}`}
                          onClick={() => handleEdit(item)}
                        >
                          <Pencil className="size-3.5" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon-sm"
                          aria-label={`Delete ${item.title}`}
                          onClick={() => setDeleteTarget(item)}
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      <MediaItemSheet
        key={editing ? editing.id : "new"}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        initialData={editing}
        onSubmit={handleSubmit}
      />

      <DeleteAlertDialog
        open={!!deleteTarget}
        onOpenChange={(v) => !v && setDeleteTarget(null)}
        itemName={deleteTarget?.title}
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default function MediaCenterPage() {
  return (
    <Suspense fallback={null}>
      <MediaCenterContent />
    </Suspense>
  );
}
