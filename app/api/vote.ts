// app/api/vote.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase-client';

// Expected structure of the vote payload
interface VotePayload {
  user_id: string;
  showdown_id: string; // Preset ID (or showdown ID if unified)
  choice: 'left' | 'right';
  tag_axis?: string;
  reflection_label?: string;
  choose_again?: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const {
    user_id,
    showdown_id,
    choice,
    tag_axis,
    reflection_label,
    choose_again,
  }: VotePayload = req.body;

  if (!user_id || !showdown_id || !choice) {
    return res.status(400).json({ message: 'Missing required vote data' });
  }

  try {
    const { data, error } = await supabase.from('votes').insert([
      {
        user_id,
        preset_id: showdown_id, // Matches your schema — use custom_showdown_id if applicable
        chosen_option: choice === 'left' ? 'A' : 'B',
        tag_axis,
        reflection_label,
        choose_again,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error('[Vote Error]', error.message);
      return res
        .status(500)
        .json({ message: 'Vote failed', error: error.message });
    }

    return res.status(200).json({ success: true, vote: data?.[0] });
  } catch (err) {
    console.error('[Vote Exception]', err);
    return res
      .status(500)
      .json({ message: 'Unexpected server error', error: String(err) });
  }
}

// // Vote API (store choice: strings)
// import { NextApiRequest, NextApiResponse } from 'next';

// // Define a type for the showdown object within the vote payload
// interface VoteShowdown {
//   optionA: string;
//   optionB: string;
// }

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     const { choice, showdown } = req.body as { choice: string; showdown: VoteShowdown };

//     const vote = await saveVote(choice, showdown);
//     return res.status(200).json(vote);
//   }

//   return res.status(405).json({ message: 'Method Not Allowed' });
// }

// const saveVote = async (choice: string, showdown: VoteShowdown) => {
//   // Logic to save vote in data: anybase
//   return { success: true };
// };
