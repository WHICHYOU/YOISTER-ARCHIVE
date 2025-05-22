declare module "@radix-ui/react-switch" {
  import * as React from "react";

  export interface SwitchProps
    extends React.ComponentPropsWithoutRef<"button"> {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    value?: string;
  }

  export const Switch: React.FC<SwitchProps>;
}
