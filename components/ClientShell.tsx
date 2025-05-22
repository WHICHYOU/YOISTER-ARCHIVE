'use client';

import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { GlobalNavFAB } from '@/components/ui/GlobalNavFAB';
import { Toaster } from 'sonner';

export function ClientShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); {/*  always defined client-side */}

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname} {/*  page-transition key */}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        <div className="min-h-screen bg-gradient-to-b from-white to-muted/60 text-base text-neutral-800 selection:bg-primary-100 selection:text-primary-800">
          {children}
          <GlobalNavFAB />
          <Toaster position="top-right" richColors />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
