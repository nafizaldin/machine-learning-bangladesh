"use client";

import { AppSidebar } from "@/components/pages/admin/dashboard/sidebar/AppSidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Search, HelpCircle, Bell } from "lucide-react";
import { NavUser } from "../dashboard/sidebar/NavUser";

export default function AdminLayout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="py-8 px-6 bg-white">
        <header className="flex justify-between items-center mb-6">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            {/* Sidebar Toggle */}
            <SidebarTrigger className="text-gray-600 hover:text-gray-900">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 12H21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 6H21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 18H21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </SidebarTrigger>

            {/* Search Bar */}
            {/* <div className="relative ml-4 h-full w-[31.75rem]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 " />
              <input
                type="search"
                placeholder="Search..."
                className="w-full rounded-full border border-gray-300 pl-10 pr-4 text-sm text-[#191919] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary bg-white h-[3.5rem]"
              />
            </div> */}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-6">
            {/* Help Button */}
            {/* <button className="text-[#191919] bg-gray-100 px-3 py-4 rounded-full hover:bg-gray-200 transition">
              <HelpCircle className="h-6 w-6" />
            </button> */}

            {/* Notification Bell */}
            {/* <button className="text-[#191919] relative bg-gray-100 px-3 py-4 rounded-full hover:bg-gray-200 transition">
              <Bell className="h-6 w-6" />
            </button> */}

            {/* User Profile */}
            <div className="relative rounded-full p-0.5">
              <div
                className="rounded-full flex items-center gap-2 pl-3 pr-4 h-[3.5rem]"
                style={{ backgroundColor: "#f3f3f3" }}
              >
                <NavUser
                  user={{
                    name: "Mehrin Jahan",
                    avatar: "/avatars/mehrin.jpg",
                  }}
                  textColor="#191919"
                />
              </div>
            </div>
          </div>
        </header>

        <main className="min-h-screen text-[#191919]">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
