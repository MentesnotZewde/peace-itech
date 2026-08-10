"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { DataTable } from "@/components/dashboard/users/data-table";
import { getServiceColumns } from "@/components/dashboard/services/service-columns";
import { UserFormDialog } from "@/components/dashboard/users/user-form-dialog";
import { DeleteAlertDialog } from "@/components/dashboard/users/delete-alert-dialog";
import { useNotifications } from "@/components/dashboard/notifications-provider";

const initialServices = [
  {
    id: 1,
    title: "Web Development",
    description:
      "Premium websites, ecommerce experiences, admin dashboards, and SaaS interfaces built to convert visitors and support real business operations.",
  },
  {
    id: 2,
    title: "ERP Systems",
    description:
      "Custom ERP platforms that connect teams, finance, inventory, HR, approvals, and executive reporting into one reliable operating layer.",
  },
  {
    id: 3,
    title: "Business Automation",
    description:
      "Automated workflows, integrations, approval systems, CRM triggers, and Google Workspace solutions that reduce repetitive manual work.",
  },
  {
    id: 4,
    title: "Cybersecurity",
    description:
      "Security dashboards, access controls, cloud hardening, monitoring systems, and practical protection for business-critical infrastructure.",
  },
  {
    id: 5,
    title: "Digital Marketing",
    description:
      "SEO, campaign dashboards, brand visuals, social media growth systems, and reporting workflows that make marketing measurable.",
  },
  {
    id: 6,
    title: "IT Support",
    description:
      "Remote technical support, office troubleshooting, device support, network assistance, and professional helpdesk operations for growing teams.",
  },
];

const fields = [
  { key: "title", label: "Title", required: true },
  {
    key: "description",
    label: "Description",
    type: "textarea",
    required: true,
  },
];

export default function ServicesPage() {
  const [services, setServices] = useState(initialServices);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const { addNotification } = useNotifications();

  const handleAdd = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const handleEdit = (row) => {
    setEditing(row);
    setFormOpen(true);
  };

  const handleSubmit = (data) => {
    if (editing) {
      setServices((prev) =>
        prev.map((s) => (s.id === editing.id ? { ...s, ...data } : s)),
      );
      toast.success("Service updated");
      addNotification({
        title: "Service updated",
        description: `"${data.title}" was updated.`,
      });
    } else {
      setServices((prev) => [...prev, { ...data, id: Date.now() }]);
      toast.success("Service added");
      addNotification({
        title: "New service added",
        description: `"${data.title}" is now live on the landing page.`,
      });
    }
  };

  const handleDelete = () => {
    setServices((prev) => prev.filter((s) => s.id !== deleteTarget.id));
    toast.success("Service deleted");
    addNotification({
      title: "Service removed",
      description: `"${deleteTarget.title}" was removed.`,
    });
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Services</h1>
        <p className="text-sm text-muted-foreground">
          Manage the services shown on the landing page.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Services</CardTitle>
          <CardDescription>{services.length} total</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={getServiceColumns({
              onEdit: handleEdit,
              onDelete: setDeleteTarget,
            })}
            data={services}
            searchKey="title"
            searchPlaceholder="Search services..."
            onAddNew={handleAdd}
            addLabel="Add Service"
          />
        </CardContent>
      </Card>

      <UserFormDialog
        key={editing ? editing.id : "new"}
        open={formOpen}
        onOpenChange={setFormOpen}
        fields={fields}
        initialData={editing}
        onSubmit={handleSubmit}
        title={editing ? "Edit Service" : "Add Service"}
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
