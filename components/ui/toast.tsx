"use client";

import * as React from "react";

export function Toast({
  message,
  onClose,
}: {
  message: string;
  onClose?: () => void;
}) {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 bg-neutral-800 text-white px-4 py-2 rounded shadow-lg z-50">
      {message}
    </div>
  );
}
