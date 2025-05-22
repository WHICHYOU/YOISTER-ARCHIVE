// lib/api.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const getData = async (tableName: string) => {
  const { data, error } = await supabase.from(tableName).select();
  if (error) throw new Error(error.message);
  return data;
};

export const insertData = async (tableName: string, data: any) => {
  const { data: insertedData, error } = await supabase
    .from(tableName)
    .insert([data]);
  if (error) throw new Error(error.message);
  return insertedData;
};
