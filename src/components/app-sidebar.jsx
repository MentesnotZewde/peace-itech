"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { PieChartIcon, MapIcon } from "lucide-react";
import { FaUsersCog } from "react-icons/fa";
import { AiOutlineSolution } from "react-icons/ai";
import { GrProjects } from "react-icons/gr";
import { IoNewspaperOutline } from "react-icons/io5";
import { SlEvent } from "react-icons/sl";
import { MdOutlineInsights } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";

// This is sample data.
const data = {
  teams: [
    {
      name: "PeaceItech Inc",
      logo: "/logo-icon.png",
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Users list",
      url: "#",
      icon: <FaUsersCog className="text-sidebar-primary" />,
      items: [
        {
          title: "Employees",
          url: "/dashboard/employees",
        },
      ],
    },

    {
      title: "Projects",
      url: "",
      icon: <GrProjects className="text-sidebar-primary" />,
      items: [
        {
          title: "Manage Projects",
          url: "/dashboard/projects",
        },
      ],
    },
    {
      title: "Services",
      url: "#",
      icon: <AiOutlineSolution className="text-sidebar-primary" />,
      isActive: true,
      items: [
        {
          title: "Manage Services",
          url: "/dashboard/services",
        },
      ],
    },
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: <Settings2Icon className="text-sidebar-primary" />,
    //   items: [
    //     {
    //       title: "General",
    //       url: "/dashboard/settings",
    //     },
    //   ],
    // },
    ,
  ],
  Media: [
    {
      name: "News",
      url: "#",
      icon: <IoNewspaperOutline className="text-sidebar-primary" />,
    },
    {
      name: "Events",
      url: "#",
      icon: <SlEvent className="text-sidebar-primary" />,
    },
    {
      name: "Insights",
      url: "#",
      icon: <MdOutlineInsights className="text-sidebar-primary" />,
    },
    {
      name: "Company Updates",
      url: "#",
      icon: <RxUpdate className="text-sidebar-primary" />,
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.Media} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
