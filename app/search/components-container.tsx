"use client";

import React from "react";

interface ComponentsContainerProps {
  children: React.ReactNode;
}

export default function ComponentsContainer({ children }: ComponentsContainerProps) {
  return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{children}</div>;
}
