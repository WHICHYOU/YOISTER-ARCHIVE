import React from "react";

export default function TagBadge({ label }: { label: string }) {
  return (
    <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
      #{label}
    </span>
  );
}