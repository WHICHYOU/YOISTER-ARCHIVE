{/*  Showdown creation API */}
import { NextApiRequest, NextApiResponse } from 'next';

interface Showdown {
  id: string;
  optionA: string;
  optionB: string;
  creatorId: string;
}

export async function createCustomShowdown(userId: string, optionA: string, optionB: string): Promise<Showdown> {
  const newShowdown: Showdown = {
    id: `showdown-${Date.now()}`,
    optionA,
    optionB,
    creatorId: userId,
  };
  return newShowdown;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userId, optionA, optionB } = req.body as { userId: string; optionA: string; optionB: string };
    const showdown = await createCustomShowdown(userId, optionA, optionB);
    return res.status(200).json({ showdown });
  }
  return res.status(405).json({ message: 'Method Not Allowed' });
}
