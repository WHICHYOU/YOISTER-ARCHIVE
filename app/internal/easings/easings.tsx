"use client";

import React from "react";

export const easings = {
  linear: (t: number) => t,
  easeInQuad: (t: number) => t * t,
  easeOutQuad: (t: number) => t * (2 - t),
  easeInOutQuad: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
};

export default function EasingsDemo() {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Easing Functions</h2>
      <pre>{JSON.stringify(easings, null, 2)}</pre>
    </div>
  );
}
