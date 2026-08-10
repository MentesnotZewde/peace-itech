"use client";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { ProfileProvider } from "@/components/dashboard/profile-provider";
import { NotificationsProvider } from "@/components/dashboard/notifications-provider";

export default function DashboardLayout({ children }) {
  return (
    <ProfileProvider>
      <NotificationsProvider>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <DashboardHeader />
            <main className="flex flex-1 flex-col gap-4 p-4">{children}</main>
          </SidebarInset>
        </SidebarProvider>
      </NotificationsProvider>
    </ProfileProvider>
  );
}
