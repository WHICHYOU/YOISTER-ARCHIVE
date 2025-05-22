import { NextApiRequest, NextApiResponse } from "next";
import { updateProfileEvolution } from "@/lib/evolution";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { userId, newVotes } = req.body as {
      userId: string;
      newVotes: { tag: string }[];
    };

    const result = await updateProfileEvolution(userId, newVotes);
    return res.status(200).json({ success: true, result });
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
