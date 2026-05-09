"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSnapshot } from "valtio";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import authStore from "@/store/authStore";

import {
  BadgeCheck,
  Bell,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";

export function NavUser() {
  const { user, logout } = useSnapshot(authStore);

  function onLogout() {
    logout();
    window.location.href = "/orifine-admin";
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="cursor-pointer flex items-center gap-2 rounded-full px-3 py-2
                hover:bg-[#f0f0f0] data-[state=open]:bg-[#f0f0f0]"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user?.thumb || ""} alt={user?.username || ""} />
                <AvatarFallback className="rounded-lg">
                  {user?.username[0] || ""}
                </AvatarFallback>
              </Avatar>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium text-[#191919]">
                  {user?.username || ""}
                </span>
                <span className="truncate text-xs text-gray-600">
                  {user?.email || ""}
                </span>
              </div>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="10"
                viewBox="0 0 18 10"
                fill="none"
              >
                <path
                  d="M16.5 1.25L9 8.75L1.5 1.25"
                  stroke="#191919"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-56 rounded-lg border border-gray-200 bg-white shadow-md"
            side="bottom"
            align="center"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-2 py-2 text-left">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user?.thumb || ""} alt={user?.username || ""} />
                  <AvatarFallback className="rounded-lg">
                    {user?.username[0] || ""}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium text-[#191919]">
                    {user?.username || ""}
                  </span>
                  <span className="truncate text-xs text-gray-600">
                    {user?.email || ""}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />
{/* 
            <DropdownMenuItem className="cursor-pointer text-[#191919] hover:bg-[#f0f0f0] flex items-center gap-2">
              <Sparkles />
              Upgrade to Pro
            </DropdownMenuItem> */}

            <DropdownMenuSeparator />

            {/* <DropdownMenuItem className="cursor-pointer text-[#191919] hover:bg-[#f0f0f0] flex items-center gap-2">
              <BadgeCheck />
              Account
            </DropdownMenuItem> */}

            {/* <DropdownMenuItem className="cursor-pointer text-[#191919] hover:bg-[#f0f0f0] flex items-center gap-2">
              <CreditCard />
              Billing
            </DropdownMenuItem> */}

            {/* <DropdownMenuItem className="cursor-pointer text-[#191919] hover:bg-[#f0f0f0] flex items-center gap-2">
              <Bell />
              Notifications
            </DropdownMenuItem> */}

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={onLogout}
              className="cursor-pointer text-[#191919] hover:bg-[#f0f0f0] flex items-center gap-2"
            >
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
