/* components/ui/button.tsx */
'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: 'default' | 'outline' | 'ghost' | 'primary' | 'secondary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

/* 🟢 common core styles */
const base =
  'inline-flex items-center justify-center rounded-md text-sm font-medium ' +
  'transition-colors focus:outline-none focus:ring-2 focus:ring-ring ' +
  'focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

const variants = {
  /* …same map including "secondary" key… */
  default: 'bg-primary-500 text-white hover:bg-primary-600',
  outline:
    'border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800',
  ghost:
    'bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-200',
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary:
    'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 ' +
    'dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700',
} as const;

const sizes = {
  default: 'h-10 px-4 py-2',
  sm: 'h-8 px-3 text-sm',
  lg: 'h-12 px-6 text-base',
  icon: 'h-9 w-9 p-0',
} as const;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'default',
      size = 'default',
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp: any = asChild ? Slot : 'button';
    return (
      <Comp
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
