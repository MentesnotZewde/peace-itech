"use client";

import { createContext, useCallback, useContext, useState } from "react";

const NotificationsContext = createContext(null);

// Ids only need to be unique within one session. Date.now() alone collides
// when two actions land in the same millisecond, which breaks React keys.
let nextId = 0;

export function NotificationsProvider({ children }) {
  // Starts empty on purpose: the bell only ever shows things that actually
  // happened in this session, raised by addNotification from real actions.
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((notification) => {
    setNotifications((prev) => [
      {
        ...notification,
        // Set after the spread so a caller can't supply a stale id or an
        // already-read flag.
        id: `${Date.now()}-${(nextId += 1)}`,
        createdAt: Date.now(),
        read: false,
      },
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
