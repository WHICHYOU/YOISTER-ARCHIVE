"use client"; // Ensures this file runs on the client side

import { useState } from "react";

// Assuming 'option' is a string, update this if necessary to a more specific type
export const useVoting = () => {
  const [showToast, setShowToast] = useState(false);

  // Explicitly type the 'option' parameter
  const handleVote = (option: string) => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); // Hide toast after 3 seconds
  };

  return { showToast, handleVote };
};
