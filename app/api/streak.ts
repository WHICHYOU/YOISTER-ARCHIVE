import { NextApiRequest, NextApiResponse } from "next";
import { updateUserStreak } from "@/lib/streaks";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { userId, lastVoteDate } = req.body as {
      userId: string;
      lastVoteDate: string;
    };

    const result = await updateUserStreak(userId, lastVoteDate);
    return res.status(200).json(result);
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
