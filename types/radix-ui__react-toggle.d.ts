declare module "@radix-ui/react-toggle" {
  import * as React from "react";

  export interface ToggleProps
    extends React.ComponentPropsWithoutRef<"button"> {
    pressed?: boolean;
    onPressedChange?: (pressed: boolean) => void;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    value?: string;
  }

  export const Toggle: React.FC<ToggleProps>;
}
