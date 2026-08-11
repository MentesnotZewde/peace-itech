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

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Fill in the details below and save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={`${field.key}-${formKey}`} className="space-y-1.5">
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
              ) : field.type === "money" ? (
                <MoneyField
                  id={field.key}
                  value={form[field.key]}
                  onChange={(v) => handleChange(field.key, v)}
                  required={field.required}
                />
              ) : field.type === "file" ? (
                <FileField
                  id={field.key}
                  value={form[field.key]}
                  onChange={(v, file) => handleChange(field.key, v, file)}
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
          ))}
          <DialogFooter className="pt-2">
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
