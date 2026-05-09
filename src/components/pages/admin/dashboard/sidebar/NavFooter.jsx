"use client";

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { CallSvg, SettingsSvg } from "@/components/base/svgs/SvgIcon";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavFooter({ isCollapsed }) {
  const pathname = usePathname();

  // active detection
  const helpActive = pathname === "/admin/help" || pathname.includes("/admin/help");
  const settingsActive =
    pathname === "/admin/settings" || pathname.includes("/admin/settings");

  return (
    <SidebarMenu
      className={`flex flex-col gap-6 text-sm transition-all duration-200 ${
        isCollapsed ? "px-0" : ""
      }`}
    >
      {/* Help Centre */}
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          className={`
            flex items-center gap-2 rounded-full px-4 py-7 transition-colors hover:bg-[#f3f3f3]
            ${
              helpActive
                ? "bg-[#4285F4] text-white"
                : "text-[#202124] "
            }
          `}
        >
          {/* <Link href="/admin/help" className="flex items-center gap-2">
            <CallSvg className={`w-6 h-6 ${helpActive ? "stroke-white" : "stroke-[#191919]"}`} />
            Help Centre
          </Link> */}
        </SidebarMenuButton>
      </SidebarMenuItem>

      {/* Settings */}
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          className={`
            flex items-center gap-2 rounded-full px-4 py-7 transition-colors hover:bg-[#f3f3f3]
            ${
              settingsActive
                ? "bg-[#4285F4] text-white"
                : "text-[#202124] "
            }
          `}
        >
          <Link href="/admin/settings" className="flex items-center gap-2">
            <SettingsSvg
              className={`w-6 h-6 ${
                settingsActive ? "stroke-white" : "stroke-[#191919]"
              }`}
            />
            Settings
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
