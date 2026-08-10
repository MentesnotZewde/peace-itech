"use client";

import { createContext, useCallback, useContext, useState } from "react";

const NotificationsContext = createContext(null);

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    title: "Welcome to PeaceItech Admin",
    description: "This is your dashboard notification center.",
    time: "Just now",
    read: false,
  },
  {
    id: 2,
    title: "Project delivery reminder",
    description: "Acme Corp's project is due soon — check the Projects tab.",
    time: "2h ago",
    read: false,
  },
  {
    id: 3,
    title: "Weekly summary ready",
    description: "Your team's activity summary for last week is available.",
    time: "1d ago",
    read: true,
  },
];

export function NotificationsProvider({ children }) {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const addNotification = useCallback((notification) => {
    setNotifications((prev) => [
      { id: Date.now(), time: "Just now", read: false, ...notification },
      ...prev,
    ]);
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const markRead = useCallback((id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAllRead,
        markRead,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationsContext);
  if (!ctx) {
    throw new Error("useNotifications must be used within NotificationsProvider");
  }
  return ctx;
}
