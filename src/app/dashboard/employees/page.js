"use client";

import { useEffect, useMemo, useState } from "react";
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
import { getEmployeeColumns } from "@/components/dashboard/users/employee-columns";
import { UserFormDialog } from "@/components/dashboard/users/user-form-dialog";
import { DeleteAlertDialog } from "@/components/dashboard/users/delete-alert-dialog";
import { useNotifications } from "@/components/dashboard/notifications-provider";
import { useProfile } from "@/components/dashboard/profile-provider";
import { toFormData, usersApi } from "@/lib/api-client";

const DEPARTMENTS = [
  "Engineering",
  "Infrastructure",
  "Operations",
  "Sales",
  "Support",
];

// Mirrors the fields the API accepts on /api/users.
const baseFields = [
  { key: "fullName", label: "Full Name", required: true },
  { key: "email", label: "Email", type: "email", required: true },
  {
    key: "role",
    label: "Role",
    type: "select",
    options: ["Admin", "User"],
    required: true,
  },
  { key: "profession", label: "Profession", placeholder: "Frontend Engineer" },
  {
    key: "department",
    label: "Department",
    type: "select",
    options: DEPARTMENTS,
  },
  {
    key: "status",
    label: "Status",
    type: "select",
    options: ["Active", "On Leave", "Inactive"],
  },
  {
    key: "profilePicture",
    label: "Profile Picture",
    type: "file",
    accept: "image/*",
  },
];

// Everything except the name, password, and picture is Admin-only, matching
// what PATCH /api/users/:id enforces.
const SELF_EDITABLE = [
  "fullName",
  "password",
  "currentPassword",
  "profilePicture",
];

function fieldsFor(editing, isAdmin, isSelf) {
  const password = {
    key: "password",
    label: editing ? "New Password (leave blank to keep)" : "Password",
    type: "password",
    required: !editing,
    autoComplete: "new-password",
  };
  // Changing your own password means proving you know the old one.
  const currentPassword = {
    key: "currentPassword",
    label: "Current Password (required to change it)",
    type: "password",
    autoComplete: "current-password",
  };

  const credentials = editing && isSelf ? [password, currentPassword] : [password];
  // Password sits right under the email on both forms.
  const fields = [...baseFields.slice(0, 2), ...credentials, ...baseFields.slice(2)];

  if (isAdmin) return fields;
  return fields.filter((field) => SELF_EDITABLE.includes(field.key));
}

export default function EmployeesPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const { addNotification } = useNotifications();
  const { profile } = useProfile();

  const isAdmin = profile.role === "Admin";

  // Bumping this re-runs the fetch; the loader lives inside the effect so no
  // state is set synchronously during render.
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;

    async function loadUsers() {
      try {
        const { users: list } = await usersApi.list({ limit: 100 });
        if (!active) return;
        setUsers(list);
        setError(null);
      } catch (err) {
        if (!active) return;
        setError(err.message);
        toast.error("Could not load employees", { description: err.message });
      } finally {
        if (active) setLoading(false);
      }
    }

    loadUsers();
    return () => {
      active = false;
    };
  }, [reloadKey]);

  const retry = () => {
    setLoading(true);
    setReloadKey((k) => k + 1);
  };

  const handleAdd = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const handleEdit = (row) => {
    setEditing(row);
    setFormOpen(true);
  };

  // Thrown errors bubble back to the dialog, which keeps itself open and shows
  // the per-field messages the API returned.
  const handleSubmit = async (data, files) => {
    const picture = files.profilePicture;
    const payload = { ...data };
    delete payload.profilePicture;

    // Editing with a blank password means "leave it as it is".
    if (editing && !payload.password) {
      delete payload.password;
      delete payload.currentPassword;
    }

    const body = picture
      ? toFormData({ ...payload, profilePicture: picture })
      : payload;

    if (editing) {
      const { user } = await toast
        .promise(usersApi.update(editing._id, body), {
          loading: "Saving changes…",
          success: (res) => `${res.user.fullName} updated`,
          error: (err) => err.message,
        })
        .unwrap();

      setUsers((prev) => prev.map((u) => (u._id === user._id ? user : u)));
      addNotification({
        title: "Employee updated",
        description: `${user.fullName}'s details were updated.`,
      });
    } else {
      const { user } = await toast
        .promise(usersApi.create(body), {
          loading: "Creating employee…",
          success: (res) => `${res.user.fullName} added`,
          error: (err) => err.message,
        })
        .unwrap();

      setUsers((prev) => [user, ...prev]);
      addNotification({
        title: "New employee added",
        description: `${user.fullName} joined as ${user.profession || user.role}.`,
      });
    }
  };

  const handleDelete = async () => {
    const target = deleteTarget;
    setDeleteTarget(null);

    try {
      await toast
        .promise(usersApi.remove(target._id), {
          loading: `Deleting ${target.fullName}…`,
          success: `${target.fullName} deleted`,
          error: (err) => err.message,
        })
        .unwrap();

      setUsers((prev) => prev.filter((u) => u._id !== target._id));
      addNotification({
        title: "Employee removed",
        description: `${target.fullName} was removed from the team.`,
      });
    } catch {
      // The toast carries the reason (e.g. the last Admin cannot be deleted).
    }
  };

  const professionOptions = useMemo(
    () => [...new Set(users.map((u) => u.profession).filter(Boolean))].sort(),
    [users],
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
          <CardDescription>
            {loading ? "Loading…" : `${users.length} total`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center gap-2 py-16 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" />
              Loading employees…
            </div>
          ) : error ? (
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <p className="text-sm text-muted-foreground">{error}</p>
              <Button variant="outline" size="sm" onClick={retry}>
                Try again
              </Button>
            </div>
          ) : (
            <DataTable
              columns={getEmployeeColumns({
                onEdit: handleEdit,
                onDelete: setDeleteTarget,
                // A non-Admin may only edit their own record, and delete none.
                canEdit: (row) => isAdmin || row._id === profile._id,
                canDelete: (row) => isAdmin && row._id !== profile._id,
              })}
              data={users}
              searchKey="fullName"
              searchPlaceholder="Search employees..."
              filters={[
                { key: "role", label: "Role", options: ["Admin", "User"] },
                {
                  key: "profession",
                  label: "Profession",
                  options: professionOptions,
                },
              ]}
              onAddNew={isAdmin ? handleAdd : undefined}
              addLabel="Add Employee"
            />
          )}
        </CardContent>
      </Card>

      <UserFormDialog
        key={editing ? editing._id : "new"}
        open={formOpen}
        onOpenChange={setFormOpen}
        fields={fieldsFor(editing, isAdmin, editing?._id === profile._id)}
        initialData={editing}
        onSubmit={handleSubmit}
        title={editing ? "Edit Employee" : "Add Employee"}
      />

      <DeleteAlertDialog
        open={!!deleteTarget}
        onOpenChange={(v) => !v && setDeleteTarget(null)}
        itemName={deleteTarget?.fullName}
        onConfirm={handleDelete}
      />
    </div>
  );
}
