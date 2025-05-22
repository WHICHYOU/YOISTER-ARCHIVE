'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Button } from './button';

export function ThemeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const current = theme === 'system' ? resolvedTheme : theme;

  const toggle = () => setTheme(current === 'dark' ? 'light' : 'dark');

  return (
    <Button tabIndex={0} role="button" onKeyDown={(e) => e.key === "Enter" && {toggle} variant="ghost" aria-label="Toggle theme">
      {current === 'dark' ? '🌞 Light' : '🌙 Dark'}
    </Button>
  );
}