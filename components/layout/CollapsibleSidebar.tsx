"use client";

import React, { useState } from "react";
import { Button } from "../ui/button"; {/*  Assuming this is your custom button component */}
import { Collapsible } from "../ui/collapsible"; {/*  Correct path to your custom collapsible component */}
import { DropdownMenu } from "../ui/dropdown-menu"; {/*  Correct path to your custom dropdown-menu component */}

{/*  Custom Collapsible component */}
const CustomCollapsible: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => setIsOpen(!isOpen);

  return (
    <div>
      <button
        tabIndex={0} role="button" onKeyDown={(e) => e.key === "Enter" && {toggleCollapse}
        className="w-full text-white bg-gray-700 hover:bg-gray-600 p-2 rounded mb-4"
      >
        {isOpen ? "Hide" : "Show"} Menu
      </button>
      {isOpen && <div>{children}</div>}
    </div>
  );
};

{/*  Custom DropdownMenu component */}
const CustomDropdownMenu: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      <button
        className="w-full mb-4 text-white bg-gray-700 hover:bg-gray-600 p-2 rounded"
        tabIndex={0} role="button" onKeyDown={(e) => e.key === "Enter" && {toggleMenu}
      >
        Settings
      </button>
      {isOpen (
        <div className="absolute left-0 mt-2 bg-gray-700 p-2 rounded shadow-lg">
          {children}
        </div>
      )}
    </div>
  );
};

{/*  DropdownMenu Item */}
const DropdownMenuItem: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <button className="block w-full text-white py-2 px-4 hover:bg-gray-600 rounded">
      {children}
    </button>
  );
};

const CollapsibleSidebar = () => {
  return (
    <div className="lg:block w-64 bg-gray-800 p-4">
      <CustomCollapsible>
        <Button className="w-full mb-4 text-white">Dashboard</Button>
        <Button className="w-full mb-4 text-white">Compare</Button>
        <CustomDropdownMenu>
          <DropdownMenuItem>Account</DropdownMenuItem>
          <DropdownMenuItem>Preferences</DropdownMenuItem>
        </CustomDropdownMenu>
      </CustomCollapsible>
    </div>
  );
};

export default CollapsibleSidebar;
