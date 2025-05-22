"use client";
import { Home, PlusCircle, BarChart, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const items = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/create", icon: PlusCircle, label: "Create" },
  { href: "/report", icon: BarChart, label: "Report" },
  { href: "/profile", icon: User, label: "Profile" },
];

export function BottomNav() {
  const path = usePathname();
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-surface shadow-t dark:bg-surface-muted md:hidden">
      <ul className="flex justify-around py-2">
        {items.map(({ href, icon: Icon, label }) => {
          const active = path === href || path.startsWith(href + "/");
          return (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  "flex flex-col items-center text-xs",
                  active ? "text-brand-500" : "text-foreground/70"
                )}
              >
                <Icon className="h-5 w-5 mb-0.5" strokeWidth={active ? 2.5 : 1.8} />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
