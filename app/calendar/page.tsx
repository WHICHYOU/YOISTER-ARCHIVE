"use client";

import { Calendar } from "@/components/ui/calendar";
import { motion } from "framer-motion";

export default function CalendarPage() {
  return (
    <main className="p-6 md:p-10">
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
        <p className="text-muted-foreground text-sm">Your choice history, visualized over time.</p>
        <Calendar />
      </motion.div>
    </main>
  );
}
