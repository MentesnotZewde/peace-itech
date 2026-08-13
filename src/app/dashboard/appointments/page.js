"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  CalendarCheck2,
  CalendarClock,
  CalendarX2,
  ExternalLink,
  Loader2,
  Mail,
  Phone,
  RefreshCw,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeleteAlertDialog } from "@/components/dashboard/users/delete-alert-dialog";
import { appointmentsApi } from "@/lib/api-client";
import { APPOINTMENT_STATUSES } from "@/lib/appointment-status";
import {
  formatSlotLabel,
  todayInBusinessTimezone,
} from "@/lib/appointment-slots";

const FILTERS = ["All", ...APPOINTMENT_STATUSES];

const STATUS_STYLES = {
  Pending:
    "bg-amber-500/12 text-amber-600 border-amber-500/20 dark:text-amber-400",
  Confirmed:
    "bg-[#005BFF]/12 text-[#005BFF] border-[#005BFF]/20 dark:text-[#12B7FF]",
  Completed:
    "bg-emerald-500/12 text-emerald-600 border-emerald-500/20 dark:text-emerald-400",
  Cancelled:
    "bg-muted text-muted-foreground border-border line-through decoration-1",
};

const formatDay = (date) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

export default function AppointmentsPage() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("All");
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [savingId, setSavingId] = useState(null);
  const [toDelete, setToDelete] = useState(null);

  // `refreshKey` re-runs this for the same filter, after the refresh button.
  useEffect(() => {
    let active = true;

    async function loadItems() {
      try {
        const { items: list } = await appointmentsApi.list({ status });
        if (!active) return;
        setItems(list || []);
      } catch (err) {
        if (!active) return;
        toast.error("Could not load appointments", {
          description: err.message,
        });
      } finally {
        if (active) setLoading(false);
      }
    }

    loadItems();

    return () => {
      active = false;
    };
  }, [status, refreshKey]);

  function reload() {
    setLoading(true);
    setRefreshKey((key) => key + 1);
  }

  function changeFilter(next) {
    setLoading(true);
    setStatus(next);
  }

  const today = todayInBusinessTimezone();

  const stats = useMemo(() => {
    const upcoming = items.filter(
      (item) => item.date >= today && item.status !== "Cancelled",
    );
    return {
      upcoming: upcoming.length,
      pending: items.filter((item) => item.status === "Pending").length,
      today: items.filter(
        (item) => item.date === today && item.status !== "Cancelled",
      ).length,
    };
  }, [items, today]);

  async function changeStatus(item, next) {
    setSavingId(item._id);
    try {
      const { item: updated } = await appointmentsApi.setStatus(item._id, next);
      setItems((current) =>
        current.map((row) => (row._id === updated._id ? updated : row)),
      );
      toast.success(`Marked ${next.toLowerCase()}`);
    } catch (error) {
      toast.error(error.message || "Could not update the appointment");
    } finally {
      setSavingId(null);
    }
  }

  async function remove() {
    if (!toDelete) return;
    try {
      await appointmentsApi.remove(toDelete._id);
      setItems((current) => current.filter((row) => row._id !== toDelete._id));
      toast.success("Appointment deleted");
    } catch (error) {
      toast.error(error.message || "Could not delete the appointment");
    } finally {
      setToDelete(null);
    }
  }

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Upcoming", value: stats.upcoming, icon: CalendarClock },
          { label: "Awaiting confirmation", value: stats.pending, icon: CalendarCheck2 },
          { label: "Today", value: stats.today, icon: CalendarX2 },
        ].map(({ label, value, icon: Icon }) => (
          <Card key={label}>
            <CardContent className="flex items-center gap-4 pt-6">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#005BFF]/10 text-[#005BFF] dark:bg-[#12B7FF]/12 dark:text-[#12B7FF]">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-2xl font-semibold">{value}</p>
                <p className="text-sm text-muted-foreground">{label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-4">
          <div>
            <CardTitle>Appointments</CardTitle>
            <CardDescription>
              Bookings made from the public booking page, soonest first.
            </CardDescription>
          </div>

          <div className="flex items-center gap-2">
            <Select value={status} onValueChange={changeFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FILTERS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="icon"
              onClick={reload}
              title="Refresh"
            >
              <RefreshCw className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {loading ? (
            <p className="flex items-center gap-2 py-10 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Loading appointments…
            </p>
          ) : items.length === 0 ? (
            <p className="py-10 text-center text-sm text-muted-foreground">
              No appointments yet.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>When</TableHead>
                    <TableHead>Who</TableHead>
                    <TableHead>Topic</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell className="whitespace-nowrap align-top">
                        <p className="font-medium">{formatDay(item.date)}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatSlotLabel(item.time)} · {item.durationMinutes}{" "}
                          min
                        </p>
                        {item.googleEventLink ? (
                          <a
                            href={item.googleEventLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 inline-flex items-center gap-1 text-xs text-[#005BFF] hover:underline dark:text-[#12B7FF]"
                          >
                            Google Calendar
                            <ExternalLink className="size-3" aria-hidden="true" />
                          </a>
                        ) : null}
                      </TableCell>

                      <TableCell className="align-top">
                        <p className="font-medium">{item.name}</p>
                        {item.company ? (
                          <p className="text-sm text-muted-foreground">
                            {item.company}
                          </p>
                        ) : null}
                        <a
                          href={`mailto:${item.email}`}
                          className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
                        >
                          <Mail className="size-3.5" aria-hidden="true" />
                          {item.email}
                        </a>
                        {item.phone ? (
                          <a
                            href={`tel:${item.phone}`}
                            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
                          >
                            <Phone className="size-3.5" aria-hidden="true" />
                            {item.phone}
                          </a>
                        ) : null}
                      </TableCell>

                      <TableCell className="max-w-xs align-top">
                        <p className="text-sm font-medium">{item.topic || "—"}</p>
                        {item.message ? (
                          <p className="mt-1 text-sm text-muted-foreground">
                            {item.message}
                          </p>
                        ) : null}
                      </TableCell>

                      <TableCell className="align-top">
                        <Badge
                          variant="outline"
                          className={STATUS_STYLES[item.status]}
                        >
                          {item.status}
                        </Badge>
                      </TableCell>

                      <TableCell className="align-top text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Select
                            value={item.status}
                            onValueChange={(next) => changeStatus(item, next)}
                            disabled={savingId === item._id}
                          >
                            <SelectTrigger className="w-36">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {APPOINTMENT_STATUSES.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setToDelete(item)}
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <DeleteAlertDialog
        open={Boolean(toDelete)}
        onOpenChange={(open) => !open && setToDelete(null)}
        onConfirm={remove}
        title="Delete this appointment?"
        description={
          toDelete
            ? `${toDelete.name} on ${formatDay(toDelete.date)} at ${formatSlotLabel(toDelete.time)}. This also removes the Google Calendar event and cannot be undone.`
            : ""
        }
      />
    </div>
  );
}
