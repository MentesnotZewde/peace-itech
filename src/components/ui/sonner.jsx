"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner";
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({
  ...props
}) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme}
      className="toaster group font-sans"
      position="top-right"
      richColors
      closeButton
      expand
      duration={4000}
      visibleToasts={4}
      icons={{
        success: (
          <CircleCheckIcon className="size-4" />
        ),
        info: (
          <InfoIcon className="size-4" />
        ),
        warning: (
          <TriangleAlertIcon className="size-4" />
        ),
        error: (
          <OctagonXIcon className="size-4" />
        ),
        loading: (
          <Loader2Icon className="size-4 animate-spin" />
        ),
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)"
        }
      }
      toastOptions={{
        classNames: {
          // Sonner ships its own system font stack, so the app font has to be
          // forced back on — the rest is a tighter, more modern type scale.
          toast:
            "cn-toast font-sans! gap-3 rounded-xl px-4 py-3.5 shadow-lg shadow-black/5",
          title: "text-sm font-semibold tracking-tight",
          description: "text-[0.8125rem] leading-relaxed opacity-80",
          actionButton: "text-xs font-medium rounded-lg",
          cancelButton: "text-xs font-medium rounded-lg",
        },
      }}
      {...props} />
  );
}

export { Toaster }
