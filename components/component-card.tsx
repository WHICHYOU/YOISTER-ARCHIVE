"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ComponentCardProps {
  title: string;
  description: string;
  className?: string;
  children?: React.ReactNode;
  isSearchPage?: boolean;
}

export default function ComponentCard({
  title,
  description,
  className,
  children,
}: ComponentCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-white dark:bg-zinc-900 shadow-sm p-4",
        className
      )}
    >
      <div className="mb-3">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div>{children}</div>
    </div>
  );
}
