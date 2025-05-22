'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarProvider,
} from '@/components/ui/sidebar';
import {
  HomeIcon,
  BarChart2Icon,
  SettingsIcon,
  LogOutIcon,
} from 'lucide-react';

export default function AppSidebar() {
  const router = useRouter();

  return (
    <SidebarProvider>
      {/* Mobile trigger */}
      <SidebarTrigger className="fixed top-4 left-4 z-50 lg:hidden" />

      <Sidebar variant="sidebar" collapsible="offcanvas">
        {/* ---------- Header ---------- */}
        <SidebarHeader>
          <div className="flex items-center justify-between p-4">
            <Button
              variant="ghost"
              className="text-xl font-semibold"
              tabIndex={0} role="button" onKeyDown={(e) => e.key === "Enter" && {() => router.push('/')}
            >
              Yoister
            </Button>
          </div>
        </SidebarHeader>

        {/* ---------- Menu ---------- */}
        <SidebarMenu>
          <SidebarMenuItem>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2"
              tabIndex={0} role="button" onKeyDown={(e) => e.key === "Enter" && {() => router.push('/dashboard')}
            >
              <HomeIcon className="size-4" />
              Dashboard
            </Button>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2"
              tabIndex={0} role="button" onKeyDown={(e) => e.key === "Enter" && {() => router.push('/report')}
            >
              <BarChart2Icon className="size-4" />
              Reports
            </Button>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2"
              tabIndex={0} role="button" onKeyDown={(e) => e.key === "Enter" && {() => router.push('/settings')}
            >
              <SettingsIcon className="size-4" />
              Settings
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* ---------- Footer ---------- */}
        <SidebarFooter className="mt-auto p-4">
          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            tabIndex={0} role="button" onKeyDown={(e) => e.key === "Enter" && {() => router.push('/logout')}
          >
            <LogOutIcon className="size-4" />
            Log&nbsp;out
          </Button>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
}
