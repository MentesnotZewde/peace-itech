"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Loader2,
  MapPin,
} from "lucide-react";

import ScrollReveal from "@/components/ui/ScrollReveal";
import {
  APPOINTMENT_TOPICS,
  SLOT_MINUTES,
  formatSlotLabel,
  lastBookableDate,
  todayInBusinessTimezone,
} from "@/lib/appointment-slots";

const formatLongDate = (date) => {
  if (!date) return "";
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
};

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  topic: APPOINTMENT_TOPICS[0],
  message: "",
};

const fieldClass =
  "h-11 w-full rounded-[0.6rem] border border-[#005BFF]/14 bg-white/80 px-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/70 focus:border-[#005BFF]/60 focus:ring-2 focus:ring-[#005BFF]/15 dark:border-[#12B7FF]/18 dark:bg-[#0B1830]/70";

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <div className="mt-1.5">{children}</div>
      {error ? <p className="mt-1.5 text-xs text-red-500">{error}</p> : null}
    </label>
  );
}

export default function BookAppointmentContent() {
  const minDate = useMemo(() => todayInBusinessTimezone(), []);
  const maxDate = useMemo(() => lastBookableDate(), []);

  const [date, setDate] = useState(minDate);
  const [slots, setSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [time, setTime] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(null);

  // Re-reads availability whenever the day changes, so a slot someone else
  // took a minute ago disappears rather than failing on submit. `refreshKey`
  // re-runs it for the same day, after a clash or a second booking.
  useEffect(() => {
    if (!date) return undefined;
    let active = true;

    async function loadSlots() {
      try {
        const response = await fetch(
          `/api/appointments/availability?date=${encodeURIComponent(date)}`,
        );
        const payload = await response.json();
        if (!active) return;
        setSlots(response.ok ? payload.slots || [] : []);
      } catch {
        if (active) setSlots([]);
      } finally {
        if (active) setLoadingSlots(false);
      }
    }

    loadSlots();

    return () => {
      active = false;
    };
  }, [date, refreshKey]);

  function pickDate(value) {
    setDate(value);
    setTime("");
    setLoadingSlots(true);
  }

  function refreshSlots() {
    setLoadingSlots(true);
    setRefreshKey((key) => key + 1);
  }

  const update = (key) => (event) => {
    setForm((current) => ({ ...current, [key]: event.target.value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  async function handleSubmit(event) {
    event.preventDefault();
    if (submitting) return;

    if (!time) {
      setErrors({ time: "Pick a time slot" });
      return;
    }

    setSubmitting(true);
    setErrors({});

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          date,
          time,
          // Recorded so the team knows which clock the visitor booked against.
          visitorTimezone:
            Intl.DateTimeFormat().resolvedOptions().timeZone || "",
        }),
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        setErrors(
          payload.fields || {
            form: payload.error || "Could not book that slot",
          },
        );
        // A 409 means the slot went while the form was open.
        if (response.status === 409) {
          setTime("");
          refreshSlots();
        }
        return;
      }

      setConfirmed(payload.appointment);
    } catch {
      setErrors({ form: "Network error. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  if (confirmed) {
    return (
      <main className="flex-1">
        <section className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <ScrollReveal className="mx-auto max-w-xl text-center">
            <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#005BFF]/10 text-[#005BFF] dark:bg-[#12B7FF]/12 dark:text-[#12B7FF]">
              <CheckCircle2 className="size-7" aria-hidden="true" />
            </span>
            <h1 className="mt-6 text-3xl font-semibold tracking-normal text-foreground sm:text-4xl">
              Your appointment is booked.
            </h1>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              We&apos;ve reserved{" "}
              <span className="font-semibold text-foreground">
                {formatLongDate(confirmed.date)} at{" "}
                {formatSlotLabel(confirmed.time)}
              </span>
              . A member of our team will confirm shortly at{" "}
              <span className="font-semibold text-foreground">
                {confirmed.email}
              </span>
              .
            </p>

            <button
              type="button"
              onClick={() => {
                setConfirmed(null);
                setForm(emptyForm);
                setTime("");
                refreshSlots();
              }}
              className="mt-8 inline-flex h-11 items-center gap-2 rounded-[0.65rem] border border-[#005BFF]/20 px-5 text-sm font-semibold text-foreground transition hover:border-[#005BFF]/50 dark:border-[#12B7FF]/25"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Book another time
            </button>
          </ScrollReveal>
        </section>
      </main>
    );
  }

  return (
    <main className="flex-1">
      <section className="relative overflow-hidden px-4 py-16 transition-colors sm:px-6 sm:py-20 lg:px-8">
        <div className="absolute left-1/2 top-10 -z-10 size-[30rem] max-w-[92vw] -translate-x-1/2 rounded-full bg-[#12B7FF]/10 blur-3xl dark:bg-[#005BFF]/12" />

        <div className="mx-auto max-w-5xl">
          <ScrollReveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#005BFF] dark:text-[#12B7FF]">
              Book an appointment
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-normal text-foreground sm:text-5xl">
              Pick a time that works for you.
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-muted-foreground">
              A {SLOT_MINUTES}-minute consultation with our team. Choose a day
              and slot below — we&apos;ll confirm by email.
            </p>
          </ScrollReveal>

          <form onSubmit={handleSubmit} className="mt-12">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
              {/* Step 1 — day and slot */}
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <CalendarDays
                    className="size-4 text-[#005BFF] dark:text-[#12B7FF]"
                    aria-hidden="true"
                  />
                  Choose a date
                </div>

                <input
                  type="date"
                  value={date}
                  min={minDate}
                  max={maxDate}
                  onChange={(event) => pickDate(event.target.value)}
                  className={`${fieldClass} mt-3`}
                />

                <div className="mt-7 flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Clock3
                    className="size-4 text-[#005BFF] dark:text-[#12B7FF]"
                    aria-hidden="true"
                  />
                  Available times
                </div>

                <div className="mt-3 min-h-[6rem]">
                  {loadingSlots ? (
                    <p className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                      Checking availability…
                    </p>
                  ) : slots.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      No times left on {formatLongDate(date)}. We&apos;re open
                      Monday to Friday — try another day.
                    </p>
                  ) : (
                    <div className="grid grid-cols-3 gap-2">
                      {slots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => {
                            setTime(slot);
                            setErrors((current) => ({
                              ...current,
                              time: undefined,
                            }));
                          }}
                          className={`h-10 rounded-[0.55rem] border text-sm font-medium transition ${
                            time === slot
                              ? "border-transparent bg-[#005BFF] text-white shadow-[0_10px_24px_rgba(0,91,255,0.22)]"
                              : "border-[#005BFF]/16 text-foreground hover:border-[#005BFF]/45 dark:border-[#12B7FF]/18"
                          }`}
                        >
                          {formatSlotLabel(slot)}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {errors.time ? (
                  <p className="mt-2 text-xs text-red-500">{errors.time}</p>
                ) : null}

                <p className="mt-6 flex items-start gap-2 text-xs leading-5 text-muted-foreground">
                  <MapPin className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
                  Times are shown in our local timezone (East Africa Time).
                </p>
              </div>

              {/* Step 2 — who's coming */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Field label="Full name" error={errors.name}>
                    <input
                      required
                      value={form.name}
                      onChange={update("name")}
                      placeholder="Your name"
                      className={fieldClass}
                    />
                  </Field>
                </div>

                <Field label="Email" error={errors.email}>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    placeholder="you@company.com"
                    className={fieldClass}
                  />
                </Field>

                <Field label="Phone" error={errors.phone}>
                  <input
                    value={form.phone}
                    onChange={update("phone")}
                    placeholder="Optional"
                    className={fieldClass}
                  />
                </Field>

                <Field label="Company" error={errors.company}>
                  <input
                    value={form.company}
                    onChange={update("company")}
                    placeholder="Optional"
                    className={fieldClass}
                  />
                </Field>

                <Field label="What's it about?" error={errors.topic}>
                  <select
                    value={form.topic}
                    onChange={update("topic")}
                    className={fieldClass}
                  >
                    {APPOINTMENT_TOPICS.map((topic) => (
                      <option key={topic} value={topic}>
                        {topic}
                      </option>
                    ))}
                  </select>
                </Field>

                <div className="sm:col-span-2">
                  <Field label="Anything we should know?" error={errors.message}>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={update("message")}
                      placeholder="Optional — a sentence on what you'd like to cover."
                      className={`${fieldClass} h-auto py-3`}
                    />
                  </Field>
                </div>

                <div className="sm:col-span-2">
                  {time ? (
                    <p className="mb-4 rounded-[0.6rem] border border-[#005BFF]/14 px-4 py-3 text-sm text-muted-foreground dark:border-[#12B7FF]/18">
                      Booking{" "}
                      <span className="font-semibold text-foreground">
                        {formatLongDate(date)} at {formatSlotLabel(time)}
                      </span>
                    </p>
                  ) : null}

                  {errors.form ? (
                    <p className="mb-4 text-sm text-red-500">{errors.form}</p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-[0.65rem] bg-[#005BFF] text-sm font-semibold text-white shadow-[0_14px_30px_rgba(0,91,255,0.22)] transition hover:bg-[#004FE0] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                        Booking…
                      </>
                    ) : (
                      "Confirm appointment"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
