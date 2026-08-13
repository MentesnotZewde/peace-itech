"use client";

import { useRef, useState } from "react";
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
import { cn } from "@/lib/utils";
import { COUNTRY_CODES, parsePhone } from "@/lib/country-codes";
import { CURRENCIES, formatMoney, parseMoney } from "@/lib/project-progress";
import { Loader2, Paperclip } from "lucide-react";

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

function MoneyField({ id, value, onChange, required }) {
  const initial = parseMoney(value);
  const [currency, setCurrency] = useState(initial.currency);
  const [amount, setAmount] = useState(initial.amount);

  const emit = (nextCurrency, nextAmount) => {
    setCurrency(nextCurrency);
    setAmount(nextAmount);
    onChange(formatMoney(nextCurrency, nextAmount));
  };

  return (
    <div className="flex gap-2">
      <Select value={currency} onValueChange={(v) => emit(v, amount)}>
        <SelectTrigger id={id} className="w-24 shrink-0">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {CURRENCIES.map((c) => (
            <SelectItem key={c} value={c}>
              {c}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        inputMode="decimal"
        value={amount}
        onChange={(e) => emit(currency, e.target.value)}
        placeholder="12,400"
        required={required}
        className="flex-1"
      />
    </div>
  );
}

function FileField({ id, value, onChange, accept, required }) {
  const preview = typeof value === "string" ? { url: value } : value;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-3">
        {preview?.url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={preview.url}
            alt=""
            className="size-10 shrink-0 rounded-full object-cover ring-1 ring-border"
          />
        )}
        <Input
          id={id}
          type="file"
          accept={accept}
          required={required && !preview}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            // The preview keeps the old shape; the File itself is handed to the
            // caller separately so it can be sent as multipart.
            onChange({ name: file.name, url: URL.createObjectURL(file) }, file);
          }}
        />
      </div>
      {preview?.name && (
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          <Paperclip className="h-3 w-3" />
          {preview.name}
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
  const [form, setForm] = useState(() => ({
    ...emptyFrom(fields),
    ...(initialData ?? {}),
  }));
  const [files, setFiles] = useState({});
  const [fieldErrors, setFieldErrors] = useState({});
  const [pending, setPending] = useState(false);
  // Bumped after a successful create so composite/file inputs remount empty
  // instead of holding on to what was just saved.
  const [formKey, setFormKey] = useState(0);
  const formRef = useRef(null);

  const handleChange = (key, value, file) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (file) setFiles((prev) => ({ ...prev, [key]: file }));
    // Clear a server-side complaint as soon as the field is touched.
    setFieldErrors((prev) => (prev[key] ? { ...prev, [key]: null } : prev));
  };

  // `showWhen` hides a field until the rest of the form calls for it — e.g.
  // portfolio details only once a project is being marked Completed.
  const visibleFields = fields.filter((field) =>
    field.showWhen ? field.showWhen(form) : true,
  );

  // Short forms stay a single comfortable column; longer ones pair up on wider
  // screens so the dialog doesn't turn into a tall strip.
  const twoColumn = visibleFields.length > 6;

  // The browser enforces `required` on inputs, but not on a Radix select or a
  // file that was uploaded on a previous save, so check them here. Hidden
  // fields are never required.
  const missingRequired = () => {
    const missing = {};

    for (const field of visibleFields) {
      const required = field.requiredWhen
        ? field.requiredWhen(form)
        : field.required;
      if (!required) continue;

      const value = form[field.key];
      const filled =
        field.type === "file"
          ? Boolean(files[field.key] || value?.url || value)
          : typeof value === "string"
            ? value.trim() !== ""
            : Boolean(value);

      if (!filled) missing[field.key] = `${field.label} is required`;
    }

    return missing;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const missing = missingRequired();
    if (Object.keys(missing).length) {
      setFieldErrors(missing);
      return;
    }

    setPending(true);
    setFieldErrors({});

    try {
      await onSubmit(form, files);

      // On a create the same dialog is reused for the next entry, so wipe it —
      // otherwise reopening "Add" shows whatever was just saved.
      if (!initialData) {
        setForm(emptyFrom(fields));
        setFiles({});
        formRef.current?.reset();
        setFormKey((k) => k + 1);
      }

      onOpenChange(false);
    } catch (err) {
      // Keep the dialog open so the entered values aren't lost, and show what
      // the API objected to.
      if (err?.fields) setFieldErrors(err.fields);
    } finally {
      setPending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(next) => !pending && onOpenChange(next)}>
      {/* Capped height with its own scroll area: long forms (a project being
          marked Completed carries a dozen fields) must never push the Save
          button off-screen. */}
      <DialogContent
        className={cn(
          "flex max-h-[90dvh] flex-col gap-0 p-0 sm:max-w-md",
          twoColumn && "sm:max-w-2xl",
        )}
      >
        {/* pr-10 keeps the title clear of the absolutely-positioned close button. */}
        <DialogHeader className="shrink-0 border-b px-4 py-3 pr-10 text-left">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Fill in the details below and save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex min-h-0 flex-1 flex-col"
        >
          <div
            className={cn(
              "min-h-0 flex-1 overflow-y-auto px-4 py-4",
              twoColumn ? "grid gap-4 sm:grid-cols-2" : "space-y-4",
            )}
          >
          {visibleFields.map((field) => {
            // `requiredWhen` lets a field become mandatory based on what else
            // is filled in — e.g. portfolio details once a project is marked
            // Completed.
            const required = field.requiredWhen
              ? field.requiredWhen(form)
              : field.required;

            const fullWidth = ["textarea", "file"].includes(field.type);

            return (
            <div
              key={`${field.key}-${formKey}`}
              className={cn("space-y-1.5", fullWidth && "sm:col-span-2")}
            >
              <Label htmlFor={field.key}>
                {field.label}
                {required && <span className="text-destructive"> *</span>}
              </Label>
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
                  required={required}
                />
              ) : field.type === "money" ? (
                <MoneyField
                  id={field.key}
                  value={form[field.key]}
                  onChange={(v) => handleChange(field.key, v)}
                  required={required}
                />
              ) : field.type === "file" ? (
                <FileField
                  id={field.key}
                  value={form[field.key]}
                  onChange={(v, file) => handleChange(field.key, v, file)}
                  accept={field.accept}
                  required={required}
                />
              ) : field.type === "textarea" ? (
                <Textarea
                  id={field.key}
                  value={form[field.key] ?? ""}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  required={required}
                  rows={4}
                />
              ) : (
                <Input
                  id={field.key}
                  type={field.type || "text"}
                  value={form[field.key] ?? ""}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  required={required}
                  placeholder={field.placeholder}
                  autoComplete={field.autoComplete}
                  aria-invalid={!!fieldErrors[field.key]}
                />
              )}
              {fieldErrors[field.key] && (
                <p className="text-xs text-destructive">
                  {fieldErrors[field.key]}
                </p>
              )}
            </div>
            );
          })}
          </div>
          {/* mx-0/mb-0 cancel DialogFooter's negative margins, which exist to
              offset the dialog's default padding — this one has none. */}
          <DialogFooter className="mx-0 mb-0 shrink-0 border-t px-4 py-3">
            <Button
              type="button"
              variant="outline"
              disabled={pending}
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={pending}
              className="bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
            >
              {pending && <Loader2 className="size-4 animate-spin" />}
              {pending ? "Saving…" : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
