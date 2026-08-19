"use client";

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNotifications } from "@/components/dashboard/notifications-provider";
import { formatRelativeTime } from "@/lib/relative-time";

export function NotificationBell() {
  const { notifications, unreadCount, markAllRead, markRead } =
    useNotifications();

  // The relative labels below are derived from a stored timestamp, so they need
  // a nudge to stay accurate while the dashboard sits open. Only ticks while
  // there is something to re-label.
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (notifications.length === 0) return;

    const id = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(id);
  }, [notifications.length]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-medium text-destructive-foreground">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-96 p-0">
        <div className="flex items-center justify-between border-b px-3 py-2.5">
          <span className="text-sm font-medium text-foreground">
            Notifications
          </span>
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={markAllRead}
              className="text-xs text-sidebar-primary hover:underline"
            >
              Mark all as read
            </button>
          )}
        </div>

        <div className="max-h-80 overflow-y-auto">
          {notifications.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-muted-foreground">
              You&apos;re all caught up.
            </p>
          ) : (
            notifications.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => markRead(n.id)}
                className="flex w-full items-start gap-2.5 border-b px-3 py-2.5 text-left last:border-b-0 hover:bg-muted"
              >
                <span
                  className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                    n.read ? "bg-transparent" : "bg-sidebar-primary"
                  }`}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {n.title}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {n.description}
                  </p>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    {formatRelativeTime(n.createdAt, now)}
                  </p>
                </div>
              </button>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
