"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProfile } from "@/components/dashboard/profile-provider";
import { useNotifications } from "@/components/dashboard/notifications-provider";

const DEPARTMENTS = [
  "Engineering",
  "Infrastructure",
  "Operations",
  "Sales",
  "Support",
];

function initials(name) {
  return (name || "")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function SettingsPage() {
  const { profile, updateProfile } = useProfile();
  const { addNotification } = useNotifications();

  const [form, setForm] = useState({
    fullName: profile.fullName,
    email: profile.email,
    profession: profile.profession || "",
    department: profile.department || "",
    currentPassword: "",
    password: "",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(
    profile.profilePicture?.url || "",
  );
  const [fieldErrors, setFieldErrors] = useState({});
  const [saving, setSaving] = useState(false);

  // Email, role, profession, department, and status are Admin-only — everyone
  // else may change their name, password, and photo.
  const isAdmin = profile.role === "Admin";

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => (prev[key] ? { ...prev, [key]: null } : prev));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFieldErrors({});

    // Send only what changed; a blank password means "keep the current one",
    // and the old password rides along only when setting a new one.
    const patch = {};
    for (const [key, value] of Object.entries(form)) {
      if (key === "password" || key === "currentPassword") continue;
      if (value !== (profile[key] || "")) patch[key] = value;
    }
    if (form.password) {
      patch.password = form.password;
      patch.currentPassword = form.currentPassword;
    }

    if (!Object.keys(patch).length && !avatarFile) {
      setSaving(false);
      toast.info("Nothing to save", {
        description: "Change a field first, then save.",
      });
      return;
    }

    try {
      const user = await toast
        .promise(updateProfile(patch, avatarFile), {
          loading: "Saving your profile…",
          success: "Profile updated",
          error: (err) => err.message,
        })
        .unwrap();

      setAvatarFile(null);
      setAvatarPreview(user.profilePicture?.url || "");
      setForm((prev) => ({ ...prev, currentPassword: "", password: "" }));
      addNotification({
        title: "Profile updated",
        description: "Your profile settings were saved successfully.",
      });
    } catch (err) {
      if (err?.fields) setFieldErrors(err.fields);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your profile information.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            This information is shown across the admin dashboard.
            {!isAdmin &&
              " Your email, role, profession, and department can only be changed by an Admin."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex items-center gap-4">
              <Avatar size="lg">
                <AvatarImage src={avatarPreview} alt={form.fullName} />
                <AvatarFallback>{initials(form.fullName)}</AvatarFallback>
              </Avatar>
              <div className="space-y-1.5">
                <Label htmlFor="avatar">Profile photo</Label>
                <Input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="max-w-xs"
                />
                {fieldErrors.profilePicture && (
                  <p className="text-xs text-destructive">
                    {fieldErrors.profilePicture}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={form.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  aria-invalid={!!fieldErrors.fullName}
                  required
                />
                {fieldErrors.fullName && (
                  <p className="text-xs text-destructive">
                    {fieldErrors.fullName}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  aria-invalid={!!fieldErrors.email}
                  disabled={!isAdmin}
                  required
                />
                {fieldErrors.email && (
                  <p className="text-xs text-destructive">
                    {fieldErrors.email}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="profession">Profession</Label>
                <Input
                  id="profession"
                  value={form.profession}
                  placeholder="Frontend Engineer"
                  onChange={(e) => handleChange("profession", e.target.value)}
                  disabled={!isAdmin}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="department">Department</Label>
                <Select
                  value={form.department}
                  onValueChange={(v) => handleChange("department", v)}
                  disabled={!isAdmin}
                >
                  <SelectTrigger id="department" className="w-full">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {DEPARTMENTS.map((d) => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Leave blank to keep current"
                  value={form.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  aria-invalid={!!fieldErrors.password}
                />
                {fieldErrors.password && (
                  <p className="text-xs text-destructive">
                    {fieldErrors.password}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Required to set a new password"
                  value={form.currentPassword}
                  onChange={(e) =>
                    handleChange("currentPassword", e.target.value)
                  }
                  // Only meaningful while changing the password.
                  disabled={!form.password}
                  required={!!form.password}
                  aria-invalid={!!fieldErrors.currentPassword}
                />
                {fieldErrors.currentPassword && (
                  <p className="text-xs text-destructive">
                    {fieldErrors.currentPassword}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="role">Role</Label>
                <Input id="role" value={profile.role} disabled />
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={saving}
                className="bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
              >
                {saving && <Loader2 className="size-4 animate-spin" />}
                {saving ? "Saving…" : "Save Changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
