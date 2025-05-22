"use client";
import React from "react";

type TribeCardProps = {
  name: string;
  members: number;
  tag: string;
  onClick?: () => void;
};

export function TribeCard({ name, members, tag, onClick }: TribeCardProps) {
  return (
    <button
      className="border rounded-xl p-4 bg-white shadow hover:shadow-lg transition cursor-pointer"
      tabIndex={0}  role="button" type="button" onKeyDown={(e) => e.key === "Enter" && {onClick}
    >
      <h3 className="font-semibold">{name}</h3>
      <p className="text-xs text-muted-foreground mb-1">{tag}</p>
      <p className="text-sm">{members} members</p>
    </button>
  );
}
