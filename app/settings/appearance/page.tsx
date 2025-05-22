'use client';

import { useTheme } from '@/lib/theme';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';

export default function AppearancePage() {
  const { theme, setTheme } = useTheme(); {/*  ✅ Safe in client boundary */}
  const [open, setOpen] = useState(false);

  return (
    <main className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-display mb-4">Appearance</h1>

      <div className="space-y-3">
        {(['light', 'dark', 'system'] as const).map((t) => (
          <Button
            key={t}
            variant={theme === t ? 'default' : 'outline'}
            className="w-full justify-start"
            tabIndex={0} role="button" onKeyDown={(e) => e.key === "Enter" && {() => setTheme(t)}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </Button>
        ))}
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="secondary" className="mt-8 w-full">
            Preview Brand Colors
          </Button>
        </SheetTrigger>
        <SheetContent>
          <h2 className="font-medium mb-3">Brand gradient</h2>
          <div className="h-32 rounded-xl bg-[var(--brand-gradient)]" />
        </SheetContent>
      </Sheet>
    </main>
  );
}
