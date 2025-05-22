import { supabase } from './supabase-client';

{/*  Define a type for the data returned by the showdowns table */}
interface Showdown {
  id: string;
  tags: string[]; {/*  Explicitly define tags as an array of strings */}
}

export async function generateUserInsight(userId: string) {
  const { data: votes } = await supabase
    .from('votes')
    .select('showdown_id, choice')
    .eq('user_id', userId);

  const { data: showdowns } = await supabase
    .from('showdowns')
    .select('id, tags');

  {/*  Explicitly type showdowns as an array of Showdown */}
  const tagScores: Record<string, number> = {};

  votes?.forEach((vote) => {
    const showdown = showdowns?.find((s) => s.id === vote.showdown_id);
    {/*  Now that showdown is typed, TypeScript knows that showdown.tags is a string[] */}
    showdown?.tags.forEach((tag: string) => {
      tagScores[tag] = (tagScores[tag] || 0) + 1;
    });
  });

  const dominant =
    Object.entries(tagScores).sort((a, b) => b[1] - a[1])[0]?.[0] || null;
  return { tags: tagScores, dominant };
}
