'use client';

import { useUser } from '@/lib/useUser';
import { supabase } from '@/lib/supabase-client';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Wand2, Sparkles } from 'lucide-react';
import ProfileEvolution from '@/components/profile/ProfileEvolution';
import ProgressBar from '@/components/streaks/ProgressBar';

interface Vote {
  tag: string;
  voted_at?: string;
  reflection_label?: string;
}

export default function ProfilePage() {
  const { user } = useUser();
  const [votes, setVotes] = useState<Vote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVotes() {
      if (!user?.id) return;
      const { data, error } = await supabase
        .from('votes')
        .select('tag, voted_at, reflection_label')
        .eq('user_id', user.id);
      if (!error && data) setVotes(data);
      setLoading(false);
    }
    fetchVotes();
  }, [user?.id]);

  const uniqueDays = new Set(
    votes.map((v) => new Date(v.voted_at || '').toDateString())
  );
  const streak = uniqueDays.size;

  const tagCount: Record<string, number> = {};
  votes.forEach(({ tag }) => {
    if (tag) tagCount[tag] = (tagCount[tag] || 0) + 1;
  });
  const topTags = Object.entries(tagCount).sort((a, b) => b[1] - a[1]);

  const reflections = votes
    .filter((v) => v.reflection_label)
    .slice(-5)
    .reverse();

  const generateAISummary = (): string => {
    if (topTags.length === 0) return 'You haven't made enough decisions yet.';
    const [tag, count] = topTags[0];
    return `You're leaning into '${tag}' — ${count} of your recent choices reflect this theme.`;
  };

  return (
    <main className="min-h-screen px-4 py-8 pb-24 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-2 text-center">
        Your Identity in Motion
      </h1>
      <p className="text-muted-foreground text-sm text-center max-w-md mb-6">
        Built from your choices. Shaped by your stories.
      </p>

      {loading || !user ? (
        <Skeleton className="w-full max-w-md h-48" />
      ) : (
        <div className="w-full max-w-2xl space-y-8">
          {/* 🔥 Daily Streak */}
          <section>
            <h2 className="text-sm font-semibold mb-1">🔥 Daily Streak</h2>
            <ProgressBar streak={streak} />
            <p className="text-xs text-muted-foreground mt-1">
              {streak} active day{streak !== 1 ? 's' : ''}.
            </p>
          </section>

          {/* 🧠 AI Summary */}
          <section className="border-t pt-4">
            <div className="flex items-center gap-2 text-sm font-semibold mb-1">
              <Wand2 className="h-4 w-4" /> AI Summary
            </div>
            <p className="text-muted-foreground text-sm">
              {generateAISummary()}
            </p>
          </section>

          {/* 🧵 Reflections */}
          {reflections.length > 0 (
            <section className="border-t pt-4">
              <h2 className="text-sm font-semibold mb-1">
                🧵 Recent Reflections
              </h2>
              <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                {reflections.map((r, i) => (
                  <li key={i}>{r.reflection_label}</li>
                ))}
              </ul>
            </section>
          )}

          {/* 🏷️ Top Tags */}
          {topTags.length > 0 (
            <section className="border-t pt-4">
              <h2 className="text-sm font-semibold mb-1">
                🏷️ Top Identity Themes
              </h2>
              <div className="flex flex-wrap gap-2">
                {topTags.slice(0, 6).map(([tag, count]) => (
                  <Badge key={tag} variant="outline">
                    {tag} ({count})
                  </Badge>
                ))}
              </div>
            </section>
          )}

          {/* 📈 Profile Evolution */}
          <section className="border-t pt-4">
            <ProfileEvolution userId={user.id} />
          </section>

          {/* 🌱 CTA */}
          <section className="border-t pt-4 text-center">
            <Sparkles className="mx-auto h-6 w-6 text-primary" />
            <p className="text-sm text-muted-foreground mt-2">
              You're shaping a personal identity graph. Every choice matters.
            </p>
            <Button
              className="mt-3"
              tabIndex={0} role="button" onKeyDown={(e) => e.key === "Enter" && {() => (window.location.href = '/compare')}
            >
              Make Your Next Choice →
            </Button>
          </section>
        </div>
      )}
    </main>
  );
}
