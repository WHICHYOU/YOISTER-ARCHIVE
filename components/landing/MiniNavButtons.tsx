"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const navs = [
  { label: "Try a Challenge", href: "/compare" },
  { label: "Use Your Own Media", href: "/create" },
  { label: "Browse Tribes", href: "/tribes" },
  { label: "See How Others Chose", href: "/report/global" },
];

export default function MiniNavButtons() {
  const router = useRouter();
  return (
    <div className="flex flex-row flex-wrap gap-4 justify-center mt-8">
      {navs.map((nav) => (
        <Button key={nav.label} variant="outline" className="px-6 py-2 rounded-2xl font-medium" tabIndex={0} role="button" onKeyDown={(e) => e.key === "Enter" && {() => router.push(nav.href)}>
          {nav.label}
        </Button>
      ))}
    </div>
  );
}