"use client";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { ProfileProvider } from "@/components/dashboard/profile-provider";
import { NotificationsProvider } from "@/components/dashboard/notifications-provider";
import { ProjectsProvider } from "@/components/dashboard/projects-provider";

export default function DashboardLayout({ children }) {
  return (
    <ProfileProvider>
      <NotificationsProvider>
        <ProjectsProvider>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="min-w-0">
              <DashboardHeader />
              <div className="flex min-w-0 flex-1 flex-col gap-4 p-4">
                {children}
              </div>
            </SidebarInset>
          </SidebarProvider>
        </ProjectsProvider>
      </NotificationsProvider>
    </ProfileProvider>
  );
}
