"use client";

import { motion } from "framer-motion";
import React from "react";

const milestones = [
  { date: "2024-01-01", label: "First Choice Made" },
  { date: "2024-02-15", label: "Joined Visual Tribe" },
  { date: "2024-03-10", label: "Uploaded 10 Showdowns" },
];

export default function EvolutionTimeline() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Your Evolution</h2>
      <ul className="border-l-2 border-primary-500 pl-4">
        {milestones.map((milestone, i) => (
          <li key={i} className="relative mb-6">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              style={{
                position: "relative",
                {/*  mimic your className styles here */}
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: -10,
                  top: 4,
                  width: 16,
                  height: 16,
                  backgroundColor: "#f97316", {/*  bg-primary-500 (orange-500) */}
                  borderRadius: "9999px",
                }}
              />
              <p className="text-sm font-medium">{milestone.label}</p>
              <p className="text-xs text-muted-foreground">{milestone.date}</p>
            </motion.div>
          </li>
        ))}
      </ul>
    </div>
  );
}
