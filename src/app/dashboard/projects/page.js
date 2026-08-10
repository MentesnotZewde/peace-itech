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
import { getProjectColumns } from "@/components/dashboard/users/project-columns";
import { UserFormDialog } from "@/components/dashboard/users/user-form-dialog";
import { DeleteAlertDialog } from "@/components/dashboard/users/delete-alert-dialog";
import { ProjectStatusReport } from "@/components/dashboard/project-status-report";
import { useNotifications } from "@/components/dashboard/notifications-provider";

const initialProjects = [
  {
    id: 1,
    name: "Samuel Tesfaye",
    email: "samuel@acme.com",
    company: "Acme Corp",
    contact: "+251 911 223 344",
    projectRequirements: {
      name: "Acme-Corp-Requirements.pdf",
      url: "/sample-docs/project-requirements-acme.pdf",
    },
    projectstatus: "In Progress",
    progress: "75",
    agreedprice: "$12,400",
    joined: "Feb 2025",
    deliverydate: "2026-03-15",
  },
  {
    id: 2,
    name: "Liya Fikru",
    email: "liya@northsideit.com",
    company: "Northside IT",
    contact: "+1 415 555 0132",
    projectRequirements: {
      name: "Northside-IT-Requirements.pdf",
      url: "/sample-docs/project-requirements-northside.pdf",
    },
    projectstatus: "Completed",
    progress: "100",
    agreedprice: "$8,200",
    joined: "Apr 2025",
    deliverydate: "2025-07-01",
  },
  {
    id: 3,
    name: "Robel Assefa",
    email: "robel@brightpath.com",
    company: "Bright Path Inc",
    contact: "+44 20 7946 0958",
    projectRequirements: {
      name: "BrightPath-Requirements.pdf",
      url: "/sample-docs/project-requirements-brightpath.pdf",
    },
    projectstatus: "Not Started",
    progress: "0",
    agreedprice: "$3,100",
    joined: "Sep 2024",
    deliverydate: "2026-01-20",
  },
  {
    id: 4,
    name: "Meron Girma",
    email: "meron@greenvalley.com",
    company: "Green Valley Foods",
    contact: "+251 922 334 455",
    projectRequirements: {
      name: "GreenValley-Requirements.pdf",
      url: "/sample-docs/project-requirements-greenvalley.pdf",
    },
    projectstatus: "In Progress",
    progress: "50",
    agreedprice: "$6,750",
    joined: "May 2025",
    deliverydate: "2026-02-10",
  },
  {
    id: 5,
    name: "James Carter",
    email: "james@sunriselogistics.com",
    company: "Sunrise Logistics",
    contact: "+1 312 555 0198",
    projectRequirements: {
      name: "Sunrise-Requirements.pdf",
      url: "/sample-docs/project-requirements-sunrise.pdf",
    },
    projectstatus: "In Progress",
    progress: "25",
    agreedprice: "$9,300",
    joined: "Jun 2025",
    deliverydate: "2026-04-05",
  },
  {
    id: 6,
    name: "Hana Solomon",
    email: "hana@metrohealth.com",
    company: "Metro Health Clinic",
    contact: "+251 933 445 566",
    projectRequirements: {
      name: "MetroHealth-Requirements.pdf",
      url: "/sample-docs/project-requirements-metrohealth.pdf",
    },
    projectstatus: "Completed",
    progress: "100",
    agreedprice: "$15,000",
    joined: "Jan 2025",
    deliverydate: "2025-11-20",
  },
  {
    id: 7,
    name: "Oliver Bennett",
    email: "oliver@silverlinestudios.com",
    company: "Silverline Studios",
    contact: "+44 161 555 0176",
    projectRequirements: {
      name: "Silverline-Requirements.pdf",
      url: "/sample-docs/project-requirements-silverline.pdf",
    },
    projectstatus: "Completed",
    progress: "75",
    agreedprice: "$5,400",
    joined: "Jul 2025",
    deliverydate: "2026-03-01",
  },
  {
    id: 8,
    name: "Aisha Noor",
    email: "aisha@vantageretail.com",
    company: "Vantage Retail Group",
    contact: "+971 50 555 0142",
    projectRequirements: {
      name: "Vantage-Requirements.pdf",
      url: "/sample-docs/project-requirements-vantage.pdf",
    },
    projectstatus: "Completed",
    progress: "50",
    agreedprice: "$11,200",
    joined: "Mar 2025",
    deliverydate: "2026-05-18",
  },
];

const fields = [
  { key: "name", label: "Contact Name", required: true },
  { key: "email", label: "Email", type: "email", required: true },
  { key: "company", label: "Company", required: true },
  { key: "contact", label: "Contact Number", type: "phone", required: true },
  {
    key: "projectRequirements",
    label: "Project Requirements",
    type: "file",
    accept: "application/pdf",
  },
  {
    key: "projectstatus",
    label: "Project Status",
    type: "select",
    options: ["Not Started", "In Progress", "Completed"],
  },
  {
    key: "progress",
    label: "Progress",
    type: "select",
    options: ["0", "25", "50", "75", "100"],
  },
  { key: "agreedprice", label: "Agreed Price" },
  { key: "deliverydate", label: "Expected Delivery Date", type: "date" },
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState(initialProjects);
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
      setProjects((prev) =>
        prev.map((p) => (p.id === editing.id ? { ...p, ...data } : p)),
      );
      toast.success("Project updated");
      addNotification({
        title: "Project updated",
        description: `${data.company}'s project was updated.`,
      });
    } else {
      setProjects((prev) => [
        ...prev,
        { ...data, id: Date.now(), joined: "Just now" },
      ]);
      toast.success("Project added");
      addNotification({
        title: "New project added",
        description: `${data.company} was added to your project list.`,
      });
    }
  };

  const handleDelete = () => {
    setProjects((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    toast.success("Project deleted");
    addNotification({
      title: "Project removed",
      description: `${deleteTarget.company}'s project was removed.`,
    });
    setDeleteTarget(null);
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
          <CardDescription>{projects.length} total</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={getProjectColumns({
              onEdit: handleEdit,
              onDelete: setDeleteTarget,
            })}
            data={projects}
            searchKey="name"
            searchPlaceholder="Search projects..."
            onAddNew={handleAdd}
            addLabel="Add Project"
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
        title={editing ? "Edit Project" : "Add Project"}
      />

      <DeleteAlertDialog
        open={!!deleteTarget}
        onOpenChange={(v) => !v && setDeleteTarget(null)}
        itemName={deleteTarget?.name}
        onConfirm={handleDelete}
      />
    </div>
  );
}
