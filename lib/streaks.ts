{/*  lib/streak.ts */}

export async function updateUserStreak(
  userId: string,
  lastVoteDate: string
): Promise<{ userId: string; streak: number }> {
  {/*  In a real-world scenario, fetch user streak from DB based on `lastVoteDate` */}
  {/*  For now, simulate streak logic */}

  const today = new Date().toISOString().split("T")[0];
  const lastVoteDay = new Date(lastVoteDate).toISOString().split("T")[0];

  const streak = today === lastVoteDay ? 1 : Math.floor(Math.random() * 5) + 1;

  return {
    userId,
    streak,
  };
}
