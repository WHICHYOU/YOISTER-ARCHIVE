'use client';

import * as React from 'react';
import * as DrawerPrimitive from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils';

interface DrawerProps
  extends React.ComponentProps<typeof DrawerPrimitive.Root> {
  children: React.ReactNode;
}

export function Drawer({ children, ...props }: DrawerProps) {
  return <DrawerPrimitive.Root {...props}>{children}</DrawerPrimitive.Root>;
}
