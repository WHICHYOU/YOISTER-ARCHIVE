"use client";

import type * as React from "react";
import type { LucideIcon } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger, {/*  fallback for SidebarMenuButton */}
} from "@/components/ui/sidebar";

export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
  }[];
} & React.ComponentPropsWithoutRef<"div">) {
  return (
    <div {...props} className="px-4">
      <SidebarMenu>
        {items.map((item: { title: string; url: string; icon: LucideIcon }) => (
          <SidebarMenuItem key={item.title}>
            <SidebarTrigger>
              <a href={item.url} className="flex items-center gap-2">
                <item.icon className="w-4 h-4" />
                <span>{item.title}</span>
              </a>
            </SidebarTrigger>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </div>
  );
}
