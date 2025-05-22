"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard/compare", label: "Compare" },
  { href: "/create", label: "Create" },
  { href: "/report/me", label: "Report" },
  { href: "/explore", label: "Explore Tribes" },
  { href: "/invites", label: "Invites" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 bg-gray-100 dark:bg-gray-900 p-4 border-r">
      <h2 className="text-lg font-bold mb-4">Yoister</h2>
      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`block px-3 py-2 rounded ${
                pathname === item.href
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-200 dark:hover:bg-gray-800"
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}