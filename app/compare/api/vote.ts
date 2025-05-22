// app/compare/api/vote.ts

import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const voteHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { vote } = req.body;

    if (!vote || !vote.option) {
      return res.status(400).json({ message: 'Vote option is required' });
    }

    // Insert vote into Supabase table (make sure the table is created in Supabase)
    const { data, error } = await supabase
      .from('votes')
      .insert([{ option: vote.option }]);

    if (error) {
      return res.status(500).json({ message: error.message });
    }

    return res.status(200).json({ message: 'Vote recorded successfully!', data });
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default voteHandler;
