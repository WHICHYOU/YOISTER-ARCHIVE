import { NextApiRequest, NextApiResponse } from "next";
import { fetchAnalyticsData } from "@/lib/analytics";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const analyticsData = await fetchAnalyticsData();
    return res.status(200).json({ analyticsData });
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
