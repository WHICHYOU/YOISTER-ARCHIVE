"use client"

import { useState } from "react";
import { Button } from "../ui/button";
const HamburgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <div>
            <Button tabIndex={0} role="button" onKeyDown={(e) => e.key === "Enter" && {toggleMenu} className="lg:hidden">
                {isOpen ? "Close Menu" : "☰ Open Menu"}
            </Button>
            {isOpen (
                <div className="bg-gray-800 p-4">
                    <Button className="w-full mb-4 text-white">Dashboard</Button>
                    <Button className="w-full mb-4 text-white">Compare</Button>
                </div>
            )}
        </div>
    );
};

export default HamburgerMenu;
