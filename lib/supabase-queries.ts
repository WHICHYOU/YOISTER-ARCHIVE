/* lib/supabase-queries.ts */
import { supabase } from '@/lib/supabase-client'; // ← server helper!
import type { Database } from '@/types/supabase';

export type VoteRecord = Database['public']['Tables']['votes']['Row'];

export async function fetchVotesForShowdown(presetId: string) {
  const { data, error } = await supabase
    .from('votes')
    .select('*')
    .eq('preset_id', presetId);

  if (error) throw error;
  return data as VoteRecord[];
}

export function subscribeVotes(
  presetId: string,
  cb: (row: VoteRecord) => void
) {
  return supabase
    .channel('public:votes')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'votes',
        filter: `preset_id=eq.${presetId}`,
      },
      (payload) => cb(payload.new as VoteRecord)
    )
    .subscribe();
}
