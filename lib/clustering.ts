import { supabase } from './supabase-client';

type ShowdownRecord = {
  id: string;
  tags: string[];
};

export async function assignUserTribe(userId: string): Promise<string | null> {
  const { data: votes } = await supabase
    .from('votes')
    .select('showdown_id')
    .eq('user_id', userId);

  if (!votes || votes.length === 0) return null;

  const showdownIds = votes.map((v) => v.showdown_id);

  const { data: showdowns } = (await supabase
    .from('showdowns')
    .select('id, tags')) as unknown as { data: ShowdownRecord[] };

  const tagCounter: Record<string, number> = {};

  showdowns?.forEach((s) => {
    s.tags.forEach((tag: string) => {
      tagCounter[tag] = (tagCounter[tag] || 0) + 1;
    });
  });

  const sortedTags = Object.entries(tagCounter).sort((a, b) => b[1] - a[1]);
  const topTag = sortedTags[0]?.[0] || null;

  if (topTag) {
    await supabase.from('users').update({ tribe: topTag }).eq('id', userId);
  }

  return topTag;
}
