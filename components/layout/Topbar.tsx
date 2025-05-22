"use client";

import ThemeToggle from "../theme/ThemeToggle";

export default function Topbar() {
  return (
    <header className="w-full border-b p-4 flex justify-between items-center">
      <div className="font-semibold text-lg">Your Today, Becoming Tomorrow</div>
      <ThemeToggle />
    </header>
  );
}