"use client";
import { useEffect, useState } from "react";
interface User {
  id: string;
}
export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const stored = localStorage.getItem("user_id");
    if (stored) {
      setUser({ id: stored });
    } else {
      setUser(null);
    }
  }, []);
  return { user };
}