"use client";
import React from "react";

export default function ProgressBar({ streak = 0 }: { streak: number }) {
  const MAX = 7;

  return (
    <div className="w-full max-w-md">
      <p className="text-sm mb-1 text-zinc-600 dark:text-zinc-300">
        Your streak: {streak} day{streak !== 1 ? "s" : ""}
      </p>
      <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2">
        <div
          className="bg-indigo-600 h-2 rounded-full transition-all"
          style={{ width: `${(streak / MAX) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}
