"use client";

import React, { useState } from "react";

interface SearchFieldProps {
  onSearch: (query: string) => void;
}

export default function SearchField({ onSearch }: SearchFieldProps) {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <input
      type="text"
      placeholder="Search..."
      value={query}
      onChange={handleChange}
      className="w-full p-2 border rounded"
    />
  );
}
