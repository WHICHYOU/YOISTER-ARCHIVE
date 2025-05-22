"use client";
import React from "react";

type InsightCardProps = {
  insight: string;
};

export function InsightCard({ insight }: InsightCardProps) {
  return (
    <div className="p-4 border rounded-lg bg-muted text-sm">
      {insight}
    </div>
  );
}
