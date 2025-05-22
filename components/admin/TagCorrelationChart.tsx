"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TagCorrelationChartProps {
  data: {
    labels: string[];
    values: number[];
  };
}

export default function TagCorrelationChart({
  data,
}: TagCorrelationChartProps) {
  const max = Math.max(...data.values, 1); {/*  Avoid division by zero */}

  return (
    <Card className="p-6 space-y-4">
      <h3 className="text-lg font-semibold">Tag Correlation Overview</h3>
      <div className="space-y-3">
        {data.labels.map((label, index) => (
          <div key={label} className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{label}</span>
              <Badge>{data.values[index]}</Badge>
            </div>
            <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded h-2">
              <div
                className="bg-orange-500 h-2 rounded transition-all"
                style={{ width: `${(data.values[index] / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
