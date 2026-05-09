"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSidebar, Sidebar, SidebarHeader, SidebarContent, SidebarFooter } from "@/components/ui/sidebar";
import { NavMain } from "./NavMain";
import { NavFooter } from "./NavFooter";
import { BlogSvg, ContactSvg, DashboardSvg, ResourceSvg, SubscriberSvg } from "@/components/base/svgs/SvgIcon";

const navMain = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: DashboardSvg,
    isActive: true,
  },
  {
    title: "Contact Forms",
    url: "/admin/contact-forms",
    icon: ContactSvg,
  },
  {
    title: "Subscriber List",
    url: "/admin/subscriber-list",
    icon: SubscriberSvg,
  },
  {
    title: "Blogs & Articles",
    icon: BlogSvg,
    items: [
      { title: "Blog List", url: "/admin/blogs/blog-list" },
      { title: "Create New", url: "/admin/blogs/create-new-blog" },
      { title: "Update One", url: "/admin/blogs/update/", hidden: true },
    ],
  },
  {
    title: "Events",
    icon: BlogSvg,
    items: [
      { title: "Event List", url: "/admin/events/event-list" },
      { title: "Create New", url: "/admin/events/create-new-event" },
      { title: "Update One", url: "/admin/events/update/", hidden: true },
    ],
  },
  {
    title: "Resources",
    icon: ResourceSvg,
    items: [
      { title: "Consumer's List", url: "/admin/resources/consumer-list" },
      { title: "Resource List", url: "/admin/resources/resource-list" },
      { title: "Create New", url: "/admin/resources/create-new-resource" },
    ],
  },
  {
    title: "Role Management",
    url: "/admin/role-management",
    icon: ResourceSvg,
  },
];

export function AppSidebar(props) {
  const { state } = useSidebar();

  return (
    <Sidebar
      collapsible="icon"
      {...props}
      className="text-[#202124] py-8 px-6 h-screen pointer-events-auto bg-white"
    >
      <Link href="/">
        <SidebarHeader className="pb-[2.75rem] flex flex-row items-center justify-center">
          {state === "collapsed" ? (
            <div className="w-8 h-8 relative">
              <Image src="/logo.png" alt="ML Bangladesh" fill className="object-contain object-left" />
            </div>
          ) : (
            <Image src="/logo.png" alt="ML Bangladesh" width={140} height={41} className="object-contain h-9 w-auto" />
          )}
        </SidebarHeader>
      </Link>

      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>

      <SidebarFooter>
        <NavFooter isCollapsed={state === "collapsed"} />
      </SidebarFooter>
    </Sidebar>
  );
}
