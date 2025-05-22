"use client";
import { useEffect } from "react";

export function useVoteSubscription(callback: () => void) {
  useEffect(() => {
    const interval = setInterval(() => {
      callback();
    }, 3000);

    return () => clearInterval(interval);
  }, [callback]);
}
