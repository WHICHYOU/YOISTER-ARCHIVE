import * as React from "react";

export function ResponsiveContainer({ children }: { children: React.ReactNode }) {
  return <div className="px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto">{children}</div>;
}