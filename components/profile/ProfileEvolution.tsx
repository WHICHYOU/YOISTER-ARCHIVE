'use client';

{/*  May 21, Carousel change. app/page.tsx */}

import React, { useState, useEffect } from 'react';
import ProgressBar from '../streaks/ProgressBar';
import { supabase } from '@/lib/supabase-client';
import { Badge } from '@/components/ui/badge';
import { Wand2 } from 'lucide-react';

interface ProfileEvolutionProps {
  userId: string;
}

interface Vote {
  tag: string;
  choice: string;
  voted_at?: string;
  reflection_label?: string;
}

const generateAISummary = (votes: Vote[]): string => {
  if (votes.length === 0) return 'You haven't made any decisions yet.';

  const freq: Record<string, number> = {};
  votes.forEach((v) => {
    if (!v.tag) return;
    freq[v.tag] = (freq[v.tag] || 0) + 1;
  });

  const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
  const [topTag, topCount] = sorted[0] || [];

  return topTag
    ? `You're leaning strongly into '${topTag}' — ${topCount} decisions reflect this.`
    : 'Not enough data to define a clear direction yet.';
};

const ProfileEvolution: React.FC<ProfileEvolutionProps> = ({ userId }) => {
  const [votes, setVotes] = useState<Vote[]>([]);
  const [streak, setStreak] = useState<number>(0);

  useEffect(() => {
    async function fetchEvolutionData() {
      const { data, error } = await supabase
        .from('votes')
        .select('tag, choice, voted_at, reflection_label')
        .eq('user_id', userId);

      if (!error && data) {
        setVotes(data);
        const days = new Set(
          data.map((v) => new Date(v.voted_at || '').toDateString())
        );
        setStreak(days.size);
      }
    }

    fetchEvolutionData();
  }, [userId]);

  const recentReflections = votes
    .filter((v) => v.reflection_label)
    .slice(-5)
    .reverse();

  const tagCounts: Record<string, number> = {};
  votes.forEach((v) => {
    if (!v.tag) return;
    tagCounts[v.tag] = (tagCounts[v.tag] || 0) + 1;
  });

  const topTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-bold">Your Profile Evolution</h2>

      <div className="text-sm text-muted-foreground mb-2">
        Your preferences are shaping a living profile, one choice at a time.
      </div>

      <div className="space-y-3">
        <div>
          <h3 className="text-sm font-medium mb-1">🔥 Streak</h3>
          <ProgressBar streak={streak} />
        </div>

        <div>
          <h3 className="text-sm font-medium mb-1">🏷️ Most Chosen Themes</h3>
          <div className="flex flex-wrap gap-2">
            {topTags.slice(0, 5).map(([tag, count]) => (
              <Badge key={tag} variant="outline">
                {tag} ({count})
              </Badge>
            ))}
          </div>
        </div>

        {recentReflections.length > 0 && (
          <div>
            <h3 className="text-sm font-medium mb-1">🧠 Recent Reflections</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              {recentReflections.map((v, i) => (
                <li key={i}>{v.reflection_label}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="text-sm mt-4 border-t pt-4">
          <div className="flex items-center gap-2 font-medium mb-1">
            <Wand2 className="h-4 w-4" />
            AI Summary
          </div>
          <p>{generateAISummary(votes)}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileEvolution;

{/*  "use client"; */}

{/*  import React, { useState, useEffect } from "react"; */}
{/*  import ProgressBar from "../streaks/ProgressBar"; */}

{/*  interface ProfileEvolutionProps { */}
{/*    userId: string; */}
{/*  } */}

{/*  interface EvolutionData { */}
{/*    [key: string]: string | number | boolean; */}
{/*  } */}

{/*  const ProfileEvolution: React.FC<ProfileEvolutionProps> = ({ userId }) => { */}
{/*    const [evolution, setEvolution] = useState<EvolutionData>({}); */}
{/*    const [streak, setStreak] = useState(0); */}

{/*    useEffect(() => { */}
{/*      fetch(`/api/evolution?userId=${userId}`) */}
{/*        .then((res) => res.json()) */}
{/*        .then((data) => { */}
{/*          setEvolution(data.profile || {}); */}
{/*          setStreak(data.streak || 0); */}
{/*        }) */}
{/*        .catch((error) => */}
{/*          console.error("Error fetching profile evolution:", error) */}
{/*        ); */}
{/*    }, [userId]); */}

{/*    return ( */}
{/*      <div> */}
{/*        <h2>Your Profile Evolution</h2> */}
{/*        <div>Your preferences are evolving based on your choices!</div> */}
{/*        <div> */}
{/*          <h3>Streak:</h3> */}
{/*          <ProgressBar streak={streak} /> */}
{/*        </div> */}
{/*        <div> */}
{/*          <h3>Profile Changes:</h3> */}
{/*          <ul> */}
{/*            {Object.entries(evolution).map(([key, value]) => ( */}
{/*              <li key={key}> */}
{/*                {key}: {String(value)} */}
{/*              </li> */}
{/*            ))} */}
{/*          </ul> */}
{/*        </div> */}
{/*      </div> */}
{/*    ); */}
{/*  }; */}

{/*  export default ProfileEvolution; */}
