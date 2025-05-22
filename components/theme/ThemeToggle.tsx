"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
      setDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDark(false);
    }
  }, []);

  function toggleTheme() {
    const newTheme = dark ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark");
    setDark(!dark);
  }

  return (
    <button
      tabIndex={0} role="button" onKeyDown={(e) => e.key === "Enter" && {toggleTheme}
      className="text-sm px-3 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
    >
      {dark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}