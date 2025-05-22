import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function getShowdowns() {
  const { data, error } = await supabase.from("showdowns").select("*").order("createdAt", { ascending: false });
  if (error) throw error;
  return data;
}

export async function castVote(showdownId: string, userId: string, selectedItem: string) {
  const { data, error } = await supabase.from("votes").insert([{ showdownId, userId, selectedItem }]);
  if (error) throw error;
  return data;
}
