"use client";
{/*  components/layout/nav-documents.tsx */}

import {
  FolderIcon,
  MoreHorizontalIcon,
  ShareIcon,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  SheetRoot,
  SheetComponent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTriggerComponent,
} from "@/components/ui/sheet";
import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function NavDocuments({
  items,
}: {
  items: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
}) {
  const { isMobile } = useSidebar();

  const handleMoreClick = () => {
    
  };

  return (
    <Sidebar>
      {/* Sidebar Header */}
      <SidebarHeader>
        <Button variant="outline" className="text-xl font-semibold">
          Documents
        </Button>
      </SidebarHeader>

      {/* Sidebar Menu */}
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.name}>
            {/* Custom link-style button */}
            <Button
              asChild
              className="w-full flex items-center gap-2 text-sidebar-foreground hover:text-sidebar-foreground/70"
            >
              <a href={item.url}>
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </a>
            </Button>

            {/* Sheet for additional options */}
            <SheetRoot>
              <SheetTriggerComponent tabIndex={0} role="button" onKeyDown={(e) => e.key === "Enter" && {handleMoreClick}>
                <Button variant="ghost" className="text-sidebar-foreground/70">
                  <MoreHorizontalIcon />
                  <span className="sr-only">More</span>
                </Button>
              </SheetTriggerComponent>

              <SheetComponent
                side={isMobile ? "bottom" : "right"}
                className="w-48 p-4"
              >
                <SheetHeader>
                  <SheetTitle>Options</SheetTitle>
                  <SheetDescription>Choose an action</SheetDescription>
                </SheetHeader>
                <div className="space-y-2">
                  <Button className="w-full flex items-center gap-2">
                    <FolderIcon className="w-4 h-4" />
                    Open
                  </Button>
                  <Button className="w-full flex items-center gap-2">
                    <ShareIcon className="w-4 h-4" />
                    Share
                  </Button>
                </div>
              </SheetComponent>
            </SheetRoot>
          </SidebarMenuItem>
        ))}

        {/* Optional More button at bottom */}
        <SidebarMenuItem>
          <Button variant="ghost" className="w-full text-sidebar-foreground/70">
            <MoreHorizontalIcon className="text-sidebar-foreground/70" />
            <span>More</span>
          </Button>
        </SidebarMenuItem>
      </SidebarMenu>

      {/* Sidebar Footer */}
      <SidebarFooter>
        <Button variant="ghost" className="w-full">
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
