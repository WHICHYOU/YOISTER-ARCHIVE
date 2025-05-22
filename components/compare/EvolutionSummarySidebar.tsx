'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-client';
import { useUser } from '@/lib/useUser';
import { Badge } from '@/components/ui/badge';

interface Vote {
  tag: string;
}

export default function EvolutionSummarySidebar() {
  const { user } = useUser();
  const [tags, setTags] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!user) return;
    const userId = user.id;

    async function fetchVotes() {
      const { data } = await supabase
        .from('votes')
        .select('tag')
        .eq('user_id', userId);
      if (data) {
        const count: Record<string, number> = {};
        data.forEach((v: Vote) => {
          if (v.tag) count[v.tag] = (count[v.tag] || 0) + 1;
        });
        setTags(count);
      }
    }

    fetchVotes();
  }, [user]);

  const mastery = (count: number) =>
    count > 20
      ? 'Master'
      : count > 10
      ? 'Explorer'
      : count > 5
      ? 'Initiate'
      : 'Newcomer';

  return (
    <aside className="bg-gray-50 rounded-xl shadow-inner p-4 w-full max-w-xs">
      <h3 className="font-bold mb-2">Your Evolution</h3>
      {Object.keys(tags).length === 0 && (
        <span className="text-muted-foreground">
          No identity tags yet. Start voting!
        </span>
      )}
      <ul>
        {Object.entries(tags).map(([tag, count]) => (
          <li key={tag} className="mb-2 flex items-center gap-2">
            <Badge>{tag}</Badge>
            <span className="text-xs text-gray-600">{mastery(count)}</span>
            <span className="ml-auto text-xs">{count} votes</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
