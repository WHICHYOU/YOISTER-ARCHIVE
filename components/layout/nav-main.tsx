"use client";

import { MailIcon, PlusCircleIcon, MoreHorizontalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

import Link from "next/link";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: React.ElementType;
  }[];
}) {
  const { isMobile } = useSidebar();

  return (
    <Sidebar>
      <SidebarHeader>
        <Button variant="outline" className="text-xl font-semibold">
          Documents
        </Button>
      </SidebarHeader>

      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <Link href={item.url} passHref legacyBehavior>
              <Button
                asChild
                variant="ghost"
                className="flex w-full justify-start items-center gap-2 text-sidebar-foreground hover:text-sidebar-foreground/70"
              >
                <button type="button">
                  {item.icon && <item.icon className="w-4 h-4" />}
                  <span>{item.title}</span>
                </button>
              </Button>
            </Link>
          </SidebarMenuItem>
        ))}

        <SidebarMenuItem>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <SidebarTrigger>
                  <PlusCircleIcon className="mr-2" />
                  <span>Quick Create</span>
                </SidebarTrigger>
              </TooltipTrigger>
              <TooltipContent side="right">
                <span>Quickly start a new item</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <Button variant="ghost" className="w-full text-sidebar-foreground/70">
            <MoreHorizontalIcon className="mr-2" />
            <span>More</span>
          </Button>
        </SidebarMenuItem>
      </SidebarMenu>

      <SidebarFooter>
        <Button variant="ghost" className="w-full">
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
