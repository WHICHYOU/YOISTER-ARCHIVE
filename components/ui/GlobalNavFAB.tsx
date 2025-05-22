"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  User,
  Users,
  Calendar,
  BarChartBig,
  Menu,
} from "lucide-react";

export function GlobalNavFAB() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: "Explore", href: "/search", icon: Compass },
    { label: "Profile", href: "/profile", icon: User },
    { label: "Tribes", href: "/tribes/main", icon: Users },
    { label: "Report", href: "/report/me", icon: BarChartBig },
    { label: "Calendar", href: "/calendar", icon: Calendar },
  ];

  const normalizePath = (path: string) => path.replace(/\/$/, "");

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="default"
            className="rounded-full w-14 h-14 p-0 flex items-center justify-center text-xl shadow-lg"
            aria-label="Open Navigation Menu"
            title="Main Navigation"
          >
            <Menu className="w-6 h-6" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          align="end"
          className="w-56 p-3 bg-white shadow-xl rounded-md space-y-1"
        >
          <AnimatePresence>
            {navItems.map((item, index) => {
              const isActive =
                normalizePath(pathname) === normalizePath(item.href);
              const Icon = item.icon;

              return (
                <motion.button
                  key={item.href}
                  tabIndex={0} role="button" onKeyDown={(e) => e.key === "Enter" && {() => {
                    router.push(item.href);
                    setOpen(false);
                  }}
                  aria-current={isActive ? "page" : undefined}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: { delay: index * 0.04 },
                  }}
                  exit={{ opacity: 0, x: 12 }}
                  className={`flex items-center w-full gap-2 px-3 py-2 rounded-md text-sm hover:bg-muted transition ${
                    isActive ? "bg-muted font-semibold" : ""
                  }`}
                  title={item.label}
                >
                  <Icon className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="truncate">{item.label}</span>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </PopoverContent>
      </Popover>
    </div>
  );
}
