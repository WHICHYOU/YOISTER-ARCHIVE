"use client";
import React from "react";

type IdentityData = {
  traits: string[];
};

export function IdentityCard({ traits }: IdentityData) {
  return (
    <div className="p-4 rounded-xl border bg-white shadow">
      <h3 className="font-semibold mb-2">Your Identity Snapshot</h3>
      <ul className="text-sm text-muted-foreground space-y-1">
        {traits.map((trait, idx) => (
          <li key={idx}>• {trait}</li>
        ))}
      </ul>
    </div>
  );
}
