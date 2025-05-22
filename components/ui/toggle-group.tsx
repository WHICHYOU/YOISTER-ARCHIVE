"use client";

import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

{/*  Define fallback styling in absence of `toggleVariants` */}
const toggleVariants = ({
  variant,
  size,
}: {
  variant?: string;
  size?: string;
}) =>
  cn(
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
    variant === "default" && "bg-muted hover:bg-muted/80",
    variant === "outline" &&
      "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
    size === "default" && "h-9 px-3",
    size === "sm" && "h-8 px-2",
    size === "lg" && "h-10 px-4"
  );

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  size: "default",
  variant: "default",
});

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(
  (
    { className, variant = "default", size = "default", children, ...props },
    ref
  ) => {
    return (
      <ToggleGroupPrimitive.Root
        ref={ref}
        className={cn("flex items-center justify-center gap-1", className)}
        {...props} {/*  includes user-defined `type`, avoids double assignment */}
      >
        <ToggleGroupContext.Provider value={{ variant, size }}>
          {children}
        </ToggleGroupContext.Provider>
      </ToggleGroupPrimitive.Root>
    );
  }
);

ToggleGroup.displayName = "ToggleGroup";

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof toggleVariants>
>(({ className, children, variant, size, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleVariants({
          variant: context?.variant || variant,
          size: context?.size || size,
        }),
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
});
ToggleGroupItem.displayName = "ToggleGroupItem";

export { ToggleGroup, ToggleGroupItem };
