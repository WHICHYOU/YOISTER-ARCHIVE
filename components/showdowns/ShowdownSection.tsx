"use client";
{/*  May 21, Carousel change. app/page.tsx */}

import Image from "next/image";
import { motion } from "framer-motion";

export interface ShowdownCardProps {
  label: string;
  image: string;
  onClick: () => void;
  selected: boolean;
  disabled: boolean;
}

export function ShowdownCard({
  label,
  image,
  onClick,
  selected,
  disabled,
}: ShowdownCardProps) {
  return (
    <motion.button
      tabIndex={0} role="button" onKeyDown={(e) => e.key === "Enter" && {onClick}
      disabled={disabled}
      whileTap={{ scale: 0.95 }}
      className={`relative w-full h-64 overflow-hidden rounded-lg border transition-all ${
        selected ? "ring-4 ring-black" : "hover:scale-[1.02]"
      }`}
    >
      <Image
        src={image}
        alt={label}
        fill
        className="object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = "/presets/placeholder.jpg";
        }}
      />
      <div className="absolute bottom-0 w-full bg-black/50 backdrop-blur text-white text-center py-2 text-lg font-semibold">
        {label}
      </div>
    </motion.button>
  );
}
