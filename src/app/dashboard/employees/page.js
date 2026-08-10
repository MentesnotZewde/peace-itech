"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { DataTable } from "@/components/dashboard/users/data-table";
import { getEmployeeColumns } from "@/components/dashboard/users/employee-columns";
import { UserFormDialog } from "@/components/dashboard/users/user-form-dialog";
import { DeleteAlertDialog } from "@/components/dashboard/users/delete-alert-dialog";
import { useNotifications } from "@/components/dashboard/notifications-provider";

const initialEmployees = [
  {
    id: 1,
    name: "Sarah Kim",
    email: "sarah@peaceitech.com",
    role: "Frontend Engineer",
    department: "Engineering",
    status: "Active",
    joined: "Jan 2025",
  },
  {
    id: 2,
    name: "Daniel Osei",
    email: "daniel@peaceitech.com",
    role: "DevOps Engineer",
    department: "Infrastructure",
    status: "Active",
    joined: "Mar 2025",
  },
  {
    id: 3,
    name: "Amara Bekele",
    email: "amara@peaceitech.com",
    role: "Project Manager",
    department: "Operations",
    status: "On Leave",
    joined: "Nov 2024",
  },
];

const fields = [
  { key: "name", label: "Full Name", required: true },
  { key: "email", label: "Email", type: "email", required: true },
  { key: "role", label: "Role", required: true },
  {
    key: "department",
    label: "Department",
    type: "select",
    options: [
      "Engineering",
      "Infrastructure",
      "Operations",
      "Sales",
      "Support",
    ],
  },
  {
    key: "status",
    label: "Status",
    type: "select",
    options: ["Active", "On Leave", "Inactive"],
  },
];

export default function EmployeesPage() {
  const [employees, setEmployees] = useState(initialEmployees);
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
      setEmployees((prev) =>
        prev.map((e) => (e.id === editing.id ? { ...e, ...data } : e)),
      );
      toast.success("Employee updated");
      addNotification({
        title: "Employee updated",
        description: `${data.name}'s details were updated.`,
      });
    } else {
      setEmployees((prev) => [
        ...prev,
        { ...data, id: Date.now(), joined: "Just now" },
      ]);
      toast.success("Employee added");
      addNotification({
        title: "New employee added",
        description: `${data.name} joined as ${data.role}.`,
      });
    }
  };

  const handleDelete = () => {
    setEmployees((prev) => prev.filter((e) => e.id !== deleteTarget.id));
    toast.success("Employee deleted");
    addNotification({
      title: "Employee removed",
      description: `${deleteTarget.name} was removed from the team.`,
    });
    setDeleteTarget(null);
  };

  const roleOptions = useMemo(
    () => [...new Set(employees.map((e) => e.role))].sort(),
    [employees],
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Employees</h1>
        <p className="text-sm text-muted-foreground">
          Manage your internal team members.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Employees</CardTitle>
          <CardDescription>{employees.length} total</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={getEmployeeColumns({
              onEdit: handleEdit,
              onDelete: setDeleteTarget,
            })}
            data={employees}
            searchKey="name"
            searchPlaceholder="Search employees..."
            filters={[{ key: "role", label: "Role", options: roleOptions }]}
            onAddNew={handleAdd}
            addLabel="Add Employee"
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
        title={editing ? "Edit Employee" : "Add Employee"}
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
