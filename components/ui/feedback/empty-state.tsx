import * as React from "react";

export function EmptyState({ message = "Nothing to display." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="text-neutral-400 mb-4 text-4xl">😕</div>
      <p className="text-neutral-600 dark:text-neutral-300">{message}</p>
    </div>
  );
}