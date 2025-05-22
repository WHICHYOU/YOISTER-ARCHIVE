'use client';

import { motion } from 'framer-motion';

import { ChartAreaInteractive as ChartArea } from '@/components/chart-area-interactive';

export default function ReportPage() {
  return (
    <main className="p-6 md:p-10">
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold tracking-tight">Your Report</h1>
        <p className="text-muted-foreground text-sm">
          See how your identity evolves based on your decisions.
        </p>

        <div className="bg-muted/40 border rounded-xl p-6">
          <p className="text-sm text-muted-foreground">
            Detailed visualizations coming soon.
          </p>
        </div>
      </motion.div>
      <section className="mt-10">
        <ChartArea />
      </section>
      \n{' '}
    </main>
  );
}
