import * as React from "react";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ message = "Something went wrong.", onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="text-red-500 mb-4 text-4xl">🚨</div>
      <p className="text-red-600 dark:text-red-400 mb-4">{message}</p>
      {onRetry (
        <button
          tabIndex={0} role="button" onKeyDown={(e) => e.key === "Enter" && {onRetry}
          className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600"
        >
          Retry
        </button>
      )}
    </div>
  );
}