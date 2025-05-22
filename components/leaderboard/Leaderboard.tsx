"use client";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";

export default function Leaderboard() {
  const [leaders, setLeaders] = useState<any[]>([]);

  useEffect(() => {
    async function fetchLeaderboard() {
      const res = await fetch("/api/leaderboard");
      const data = await res.json();
      setLeaders(data);
    }

    fetchLeaderboard();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Leaderboard</h2>
      {leaders.length ? (
        <ul>
          {leaders.map((user: any) => (
            <li key={user.id} className="flex justify-between">
              <span>{user.name}</span>
              <span>{user.points} Points</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No leaderboard data available.</p>
      )}
    </div>
  );
}
