// app/report/api/report.ts

import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const reportHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.query;  // Get userId from the query parameter

  if (!userId || typeof userId !== 'string') {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    // Fetch user insights from Supabase (Adjust the table and columns as per your schema)
    const { data, error } = await supabase
      .from('votes') // This could be 'insights' or any other table you're using for user data
      .select('tags, dominant') // Adjust based on your actual column names
      .eq('user_id', userId); // Filter by userId

    if (error) {
      return res.status(500).json({ message: 'Error fetching insights', error });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ message: 'No insights found for this user' });
    }

    // Return the data as a JSON response
    return res.status(200).json(data[0]);  // Return the first matching entry
  } catch (err: unknown) {
    // TypeScript: Ensure err is an instance of Error
    if (err instanceof Error) {
      return res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
    
    // If err is not an instance of Error, fallback to a generic error message
    return res.status(500).json({ message: 'Internal Server Error', error: 'An unknown error occurred' });
  }
};

export default reportHandler;
