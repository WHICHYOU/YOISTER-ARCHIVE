import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

{/*  Initialize Supabase client */}
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const showdownHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { showdownName, options } = req.body;

    {/*  Validate input */}
    if (!showdownName || !options || options.length < 2) {
      return res.status(400).json({ message: 'Both items are required for the showdown.' });
    }

    try {
      {/*  Insert showdown into Supabase table (make sure the table is created in Supabase) */}
      const { data, error } = await supabase
        .from('showdowns')
        .insert([{ showdown_name: showdownName, options }]);

      if (error) {
        throw error;
      }

      return res.status(200).json({ message: 'Showdown created successfully!', data });
    } catch (error) {
      console.error("Error inserting showdown: ", error);
      return res.status(500).json({ message: 'Failed to create showdown.' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default showdownHandler;
