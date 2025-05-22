import * as React from "react";

export function FadeIn({ children }: { children: React.ReactNode }) {
  return <div className="animate-fadeInUp">{children}</div>;
}