"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MonitorX } from "lucide-react";
import { Button } from "@/components/ui/button";

const CHANNEL = "peace-itech-admin-session";
// How long a new tab waits for an existing one to answer before claiming the
// session. Same-origin BroadcastChannel delivery is immediate; this is just
// slack for a busy main thread.
const CLAIM_TIMEOUT_MS = 350;

/**
 * Keeps the admin dashboard to one tab. A new tab announces itself; if another
 * tab is already active it answers, and the newcomer is blocked until the user
 * explicitly moves the session over.
 */
export function SingleTabGuard({ children }) {
  // "claiming" until we know whether another tab holds the session.
  const [state, setState] = useState("claiming");
  const channelRef = useRef(null);
  const idRef = useRef(null);
  const stateRef = useRef("claiming");

  const setBoth = useCallback((next) => {
    stateRef.current = next;
    setState(next);
  }, []);

  useEffect(() => {
    // Without BroadcastChannel there's nothing to coordinate through, so fail
    // open rather than locking the user out of their own dashboard. Deferred
    // to a task so no state is set synchronously during the effect.
    if (typeof window === "undefined" || !("BroadcastChannel" in window)) {
      const fallback = setTimeout(() => setBoth("active"), 0);
      return () => clearTimeout(fallback);
    }

    const id =
      globalThis.crypto?.randomUUID?.() ?? String(Math.random()).slice(2);
    idRef.current = id;

    const channel = new BroadcastChannel(CHANNEL);
    channelRef.current = channel;

    channel.onmessage = (event) => {
      const message = event.data;
      if (!message || message.id === id) return;

      switch (message.type) {
        case "claim":
          // Another tab is starting up — tell it this one is already here.
          if (stateRef.current === "active") {
            channel.postMessage({ type: "occupied", id });
          }
          break;
        case "occupied":
          if (stateRef.current === "claiming") setBoth("blocked");
          break;
        case "takeover":
          // Someone else deliberately moved the session to their tab.
          if (stateRef.current === "active") setBoth("blocked");
          break;
        case "release":
          // The active tab closed; a blocked tab can take over.
          if (stateRef.current === "blocked") {
            setBoth("active");
            channel.postMessage({ type: "takeover", id });
          }
          break;
      }
    };

    channel.postMessage({ type: "claim", id });
    const timer = setTimeout(() => {
      if (stateRef.current === "claiming") setBoth("active");
    }, CLAIM_TIMEOUT_MS);

    const release = () => {
      if (stateRef.current === "active") {
        channel.postMessage({ type: "release", id });
      }
    };
    window.addEventListener("pagehide", release);

    return () => {
      clearTimeout(timer);
      release();
      window.removeEventListener("pagehide", release);
      channel.close();
    };
  }, [setBoth]);

  const takeOver = () => {
    channelRef.current?.postMessage({ type: "takeover", id: idRef.current });
    setBoth("active");
  };

  if (state === "claiming") return null;

  if (state === "blocked") {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <div className="max-w-md space-y-4 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-muted">
            <MonitorX className="size-6 text-muted-foreground" />
          </div>
          <h1 className="text-xl font-semibold tracking-tight">
            The dashboard is open in another tab
          </h1>
          <p className="text-sm text-muted-foreground">
            To keep your work consistent, the admin dashboard runs in a single
            tab at a time. Switch back to the other tab, or continue here — the
            other tab will be locked instead.
          </p>
          <Button
            onClick={takeOver}
            className="bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
          >
            Continue in this tab
          </Button>
        </div>
      </div>
    );
  }

  return children;
}
