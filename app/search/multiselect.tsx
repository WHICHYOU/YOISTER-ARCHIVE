"use client";

import React, { useState } from "react";

interface MultiSelectProps {
  options: string[];
  onChange: (selected: string[]) => void;
}

export default function MultiSelect({ options, onChange }: MultiSelectProps) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleOption = (option: string) => {
    const updated = selected.includes(option)
      ? selected.filter((o) => o !== option)
      : [...selected, option];
    setSelected(updated);
    onChange(updated);
  };

  return (
    <div className="space-y-2">
      {options.map((option) => (
        <label key={option} className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={selected.includes(option)}
            onChange={() => toggleOption(option)}
          />
          <span>{option}</span>
        </label>
      ))}
    </div>
  );
}
