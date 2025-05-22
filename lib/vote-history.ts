{/*  lib/vote-history.ts */}

import type { MinimalVote } from "./prediction-engine";

interface TimestampedVote extends MinimalVote {
  timestamp: string;
}

export function groupVotesByDay(
  votes: TimestampedVote[]
): Record<string, TimestampedVote[]> {
  return votes.reduce((acc, vote) => {
    const day = new Date(vote.timestamp).toISOString().split("T")[0];
    if (!acc[day]) acc[day] = [];
    acc[day].push(vote);
    return acc;
  }, {} as Record<string, TimestampedVote[]>);
}

export function getVoteStreak(votes: TimestampedVote[]): number {
  const grouped = groupVotesByDay(votes);
  const days = Object.keys(grouped).sort().reverse();

  let streak = 0;
  let lastDate = new Date();
  for (const day of days) {
    const current = new Date(day);
    const diff = Math.round(
      (lastDate.getTime() - current.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (diff <= 1) {
      streak++;
      lastDate = current;
    } else {
      break;
    }
  }

  return streak;
}
