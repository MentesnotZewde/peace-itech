"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { COUNTRY_CODES, parsePhone } from "@/lib/country-codes";
import { Paperclip } from "lucide-react";

const emptyFrom = (fields) =>
  Object.fromEntries(fields.map((f) => [f.key, ""]));

function PhoneField({ id, value, onChange, required }) {
  const initial = parsePhone(value);
  const [code, setCode] = useState(initial.code);
  const [number, setNumber] = useState(initial.number);

  const emit = (nextCode, nextNumber) => {
    setCode(nextCode);
    setNumber(nextNumber);
    onChange(nextNumber ? `${nextCode} ${nextNumber}`.trim() : "");
  };

  return (
    <div className="flex gap-2">
      <Select value={code} onValueChange={(v) => emit(v, number)}>
        <SelectTrigger id={id} className="w-26 shrink-0">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {COUNTRY_CODES.map((c) => (
            <SelectItem key={c.iso} value={c.dial}>
              {c.flag} {c.dial}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        type="tel"
        value={number}
        onChange={(e) => emit(code, e.target.value)}
        placeholder="9XX XXX XXX"
        required={required}
        className="flex-1"
      />
    </div>
  );
}

function FileField({ id, value, onChange, accept, required }) {
  return (
    <div className="space-y-1.5">
      <Input
        id={id}
        type="file"
        accept={accept}
        required={required && !value}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          onChange({ name: file.name, url: URL.createObjectURL(file) });
        }}
      />
      {value?.name && (
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          <Paperclip className="h-3 w-3" />
          {value.name}
        </p>
      )}
    </div>
  );
}

export function UserFormDialog({
  open,
  onOpenChange,
  fields,
  initialData,
  onSubmit,
  title,
}) {
  const [form, setForm] = useState(() => initialData ?? emptyFrom(fields));

  const handleChange = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Fill in the details below and save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.key} className="space-y-1.5">
              <Label htmlFor={field.key}>{field.label}</Label>
              {field.type === "select" ? (
                <Select
                  value={form[field.key]}
                  onValueChange={(v) => handleChange(field.key, v)}
                >
                  <SelectTrigger id={field.key}>
                    <SelectValue
                      placeholder={`Select ${field.label.toLowerCase()}`}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : field.type === "phone" ? (
                <PhoneField
                  id={field.key}
                  value={form[field.key]}
                  onChange={(v) => handleChange(field.key, v)}
                  required={field.required}
                />
              ) : field.type === "file" ? (
                <FileField
                  id={field.key}
                  value={form[field.key]}
                  onChange={(v) => handleChange(field.key, v)}
                  accept={field.accept}
                  required={field.required}
                />
              ) : field.type === "textarea" ? (
                <Textarea
                  id={field.key}
                  value={form[field.key] ?? ""}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  required={field.required}
                  rows={4}
                />
              ) : (
                <Input
                  id={field.key}
                  type={field.type || "text"}
                  value={form[field.key] ?? ""}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  required={field.required}
                />
              )}
            </div>
          ))}
          <DialogFooter className="pt-2">
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
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
