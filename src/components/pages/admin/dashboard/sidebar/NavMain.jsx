"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { ArrowRightSvg } from "@/components/base/svgs/SvgIcon";

export function NavMain({ items }) {
  const pathname = usePathname();


  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const subMenuActive = item.items?.some(
            (sub) => pathname === sub.url || pathname.includes(sub.url)
          );

          const menuActive = pathname === item.url || pathname.includes(item.url)


          return item.items ? (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={subMenuActive}
              className="group/collapsible"
            >
              <SidebarMenuItem className="py-3 flex-shrink-0">
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={`flex-shrink-0 rounded-full px-4 py-7 flex items-center gap-2 transition-colors duration-200 hover:bg-[#f3f3f3] hover:text-primary
                      ${
                        subMenuActive
                          ? "bg-[#4285F4] text-white"
                          : " text-[#202124]"
                      }`}
                  >
                    {item.icon && (
                      <item.icon
                        className="w-6 h-6"
                      />
                    )}
                    <span>{item.title}</span>
                    <ArrowRightSvg
                      className={`ml-auto transition-transform duration-200 
                        group-data-[state=open]/collapsible:rotate-90 
                        ${subMenuActive ? "hover:text-primary" : "text-[#202124] group-hover/collapsible:text-primary"}`}
                    />
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items.map((subItem) => {
                      const issubMenuActive =
                        pathname === subItem.url || pathname.includes(subItem.url);

                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            className={`flex-shrink-0 rounded-full pl-12 flex items-center gap-2 transition-colors duration-200 hover:bg-[#f3f3f3] hover:text-primary
                              ${
                                issubMenuActive
                                  ? "bg-[#4285F4] text-white"
                                  : "text-[#202124]"
                              } ${subItem?.hidden && "hidden"}`}
                          >
                            <Link href={subItem.url} className="py-6 flex items-center gap-2">
                              {subItem.icon && (
                                <subItem.icon
                                  className="w-6 h-6"
                                />
                              )}
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ) : (
            <SidebarMenuItem key={item.url} className="py-3 flex-shrink-0">
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                
                className={`rounded-full px-4 py-7 flex items-center gap-2 transition-colors duration-200 hover:bg-[#f3f3f3] hover:text-primary
                  ${
                    menuActive
                      ? "bg-[#4285F4] text-white"
                      : "text-[#202124]"
                  }`}
              >
                <Link href={item.url} className="flex items-center gap-2">
                  {item.icon && (
                    <item.icon
                      className='w-6 h-6'
                    />
                  )}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
