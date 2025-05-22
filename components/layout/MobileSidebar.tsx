"use client";

import React from "react";
import { Button } from "../ui/button";
import {
  SheetRoot,
  SheetTriggerPrimitive,
  SheetComponent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../ui/sheet";
import { Collapsible } from "../ui/collapsible";

const MobileSidebar = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <SheetRoot open={open} onOpenChange={setOpen}>
      <SheetTriggerPrimitive asChild>
        <Button className="lg:hidden text-white">☰</Button>
      </SheetTriggerPrimitive>
      <SheetComponent side="left" className="w-[300px] bg-sidebar p-4">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>Select an option</SheetDescription>
        </SheetHeader>
        <Collapsible>
          <Button
            className="w-full mb-4 text-white"
            tabIndex={0} role="button" onKeyDown={(e) => e.key === "Enter" && {() => setOpen(false)}
          >
            Dashboard
          </Button>
          <Button
            className="w-full mb-4 text-white"
            tabIndex={0} role="button" onKeyDown={(e) => e.key === "Enter" && {() => setOpen(false)}
          >
            Compare
          </Button>
          <div className="space-y-2">
            <div className="text-white font-semibold">Settings</div>
            <Button
              className="w-full text-white text-left"
              tabIndex={0} role="button" onKeyDown={(e) => e.key === "Enter" && {() => setOpen(false)}
            >
              Account
            </Button>
            <Button
              className="w-full text-white text-left"
              tabIndex={0} role="button" onKeyDown={(e) => e.key === "Enter" && {() => setOpen(false)}
            >
              Preferences
            </Button>
          </div>
        </Collapsible>
      </SheetComponent>
    </SheetRoot>
  );
};

export default MobileSidebar;
