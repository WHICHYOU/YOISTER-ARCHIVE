'use client';
{/*  @/components/layout/sidebar-layout.tsx */}

import React from 'react';
import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import Header from './header';
import { useRouter } from 'next/navigation';
import { LogOutIcon, HomeIcon, BarChart2Icon } from 'lucide-react';

const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar variant="sidebar" collapsible="offcanvas">
        {/* Sidebar Header */}
        <SidebarHeader>
          <div className="p-4 flex justify-between items-center">
            <Button
              variant="ghost"
              className="text-xl font-semibold"
              tabIndex={0} role="button" onKeyDown={(e) => e.key === "Enter" && {() => router.push('/')}
            >
              Yoister Dashboard
            </Button>
          </div>
        </SidebarHeader>

        {/* Sidebar Menu */}
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
        </SidebarMenu>

        {/* Sidebar Footer */}
        <SidebarFooter className="mt-auto p-4">
          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            tabIndex={0} role="button" onKeyDown={(e) => e.key === "Enter" && {() => router.push('/logout')}
          >
            <LogOutIcon className="size-4" />
            Log out
          </Button>
        </SidebarFooter>
      </Sidebar>

      {/* Main content area */}
      <div className="flex-1 overflow-y-auto">
        <Header />
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
};

export default SidebarLayout;
