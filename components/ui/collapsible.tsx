"use client";

import { useState } from "react";
import { Button } from "./button";

const Collapsible = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="collapsible-container">
      <Button variant="outline" tabIndex={0} role="button" onKeyDown={(e) => e.key === "Enter" && {() => setIsOpen(!isOpen)}>
        {isOpen ? "Close" : "Open"}
      </Button>
      {isOpen && <div className="collapsible-content p-4">{children}</div>}
    </div>
  );
};

export { Collapsible };
