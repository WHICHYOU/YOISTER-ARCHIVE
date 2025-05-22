"use client";

import { motion } from "framer-motion";

const milestones = [
  { date: "2024-01-01", label: "First Choice Made" },
  { date: "2024-02-15", label: "Joined Visual Tribe" },
  { date: "2024-03-10", label: "Uploaded 10 Showdowns" }
];

export default function EvolutionTimeline() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Your Evolution</h2>
      <ul className="border-l-2 border-primary-500 pl-4">
        {milestones.map((milestone, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.2 }}
            className="relative mb-6"
          >
            <div className="absolute left-[-10px] top-1 w-4 h-4 bg-primary-500 rounded-full" />
            <p className="text-sm font-medium">{milestone.label}</p>
            <p className="text-xs text-muted-foreground">{milestone.date}</p>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
