"use client";
import { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const mockUser: User = { id: "demo", name: "Guest" };
    setUser(mockUser);
  }, []);

  return { user };
}
