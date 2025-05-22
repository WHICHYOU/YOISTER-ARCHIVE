'use client';
{/*  May 21, Carousel change. app/page.tsx */}

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase-client';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Bar } from 'react-chartjs-2';
import MiniNavButtons from '@/components/landing/MiniNavButtons';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface Vote {
  tag: string;
  choice: string;
  voted_at?: string;
  location?: string;
  showdown_id: string;
  reflection_label?: string;
}

export default function UserReportPage() {
  const { userId } = useParams();
  const [votes, setVotes] = useState<Vote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVotes() {
      const { data, error } = await supabase
        .from('votes')
        .select(
          'tag, choice, voted_at, location, showdown_id, reflection_label'
        )
        .eq('user_id', userId);

      if (!error && data) {
        setVotes(data);
      }
      setLoading(false);
    }

    fetchVotes();
  }, [userId]);

  const tagCount: Record<string, number> = {};
  votes.forEach(({ tag }) => {
    if (tag) tagCount[tag] = (tagCount[tag] || 0) + 1;
  });

  const sortedTags = Object.entries(tagCount).sort((a, b) => b[1] - a[1]);

  const badges = sortedTags.map(([tag, count]) => {
    let label = 'Newcomer';
    if (count >= 10) label = 'Master';
    else if (count >= 5) label = 'Explorer';
    else if (count >= 3) label = 'Initiate';
    return { tag, count, label };
  });

  const uniqueDays = new Set(
    votes.map((v) => new Date(v.voted_at || '').toDateString())
  );
  const streak = uniqueDays.size;

  const chartData = {
    labels: sortedTags.map(([tag]) => tag),
    datasets: [
      {
        label: 'Votes per Tag',
        data: sortedTags.map(([, count]) => count),
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 1 } },
    },
  };

  return (
    <main className="min-h-screen py-12 px-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">🗺️ Your Identity Map</h1>

      {loading ? (
        <Skeleton className="w-[320px] h-[200px]" />
      ) : (
        <div className="space-y-6 w-full max-w-xl">
          {/* 🔥 Streak */}
          <div className="text-center mb-2">
            <span className="text-sm text-muted-foreground">
              🔥 Days Active:
            </span>
            <Badge variant="outline" className="ml-2">
              {streak}
            </Badge>
          </div>

          {/* 📊 Chart */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <Bar data={chartData} options={chartOptions} />
          </div>

          {/* 🏷️ Tags + Badges */}
          {badges.map(({ tag, count, label }) => (
            <div
              key={tag}
              className="flex items-center justify-between p-3 border rounded-lg bg-gray-50"
            >
              <div>
                <div className="font-medium text-gray-700">{tag}</div>
                <div className="text-xs text-muted-foreground">
                  {count} votes
                </div>
              </div>
              <Badge variant="secondary">{label}</Badge>
            </div>
          ))}

          {/* 🧵 Reflection Timeline */}
          <div className="border-t pt-4">
            <h3 className="text-sm text-gray-600 mb-2">🧾 Recent Choices</h3>
            <ul className="space-y-3 text-sm text-gray-700">
              {votes
                .slice(-8)
                .reverse()
                .map((vote, i) => (
                  <li key={i} className="text-muted-foreground">
                    ✅ <strong>{vote.tag}</strong>: {vote.choice}
                    {vote.reflection_label && (
                      <div className="text-xs text-blue-700 italic mt-1">
                        "{vote.reflection_label}"
                      </div>
                    )}
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(vote.voted_at || '').toLocaleString()} ·{' '}
                      {vote.location || 'Unknown location'}
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}

      <MiniNavButtons />
    </main>
  );
}
{/*  "use client"; */}
{/*  /* app/report/[userId]/page.tsx */ */}

{/*  import { useEffect, useState } from "react"; */}
{/*  import MiniNavButtons from "@/components/landing/MiniNavButtons"; */}
{/*  import { useParams } from "next/navigation"; */}
{/*  import { supabase } from "@/lib/supabase"; */}
{/*  import { Skeleton } from "@/components/ui/skeleton"; */}
{/*  import { Badge } from "@/components/ui/badge"; */}
{/*  import { Bar } from "react-chartjs-2"; */}
{/*  import { */}
{/*    Chart as ChartJS, */}
{/*    CategoryScale, */}
{/*    LinearScale, */}
{/*    BarElement, */}
{/*    Tooltip, */}
{/*    Legend, */}
{/*  } from "chart.js"; */}

{/*  ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend); */}

{/*  interface Vote { */}
{/*    tag: string; */}
{/*    choice: string; */}
{/*    inserted_at?: string; */}
{/*  } */}

{/*  export default function UserReportPage() { */}
{/*    const { userId } = useParams(); */}
{/*    const [votes, setVotes] = useState<Vote[]>([]); */}
{/*    const [loading, setLoading] = useState(true); */}

{/*    useEffect(() => { */}
{/*      async function fetchVotes() { */}
{/*        const { data, error } = await supabase */}
{/*          .from("votes") */}
{/*          .select("tag, choice, inserted_at") */}
{/*          .eq("user_id", userId); */}

{/*        if (!error && data) setVotes(data); */}
{/*        setLoading(false); */}
{/*      } */}

{/*      fetchVotes(); */}
{/*    }, [userId]); */}

{/*    const tagCount: Record<string, number> = {}; */}
{/*    votes.forEach(({ tag }) => { */}
{/*      tagCount[tag] = (tagCount[tag] || 0) + 1; */}
{/*    }); */}

{/*    const sortedTags = Object.entries(tagCount).sort((a, b) => b[1] - a[1]); */}

{/*    // Determine badge thresholds */}
{/*    const badges = sortedTags.map(([tag, count]) => { */}
{/*      let label = "Newcomer"; */}
{/*      if (count >= 10) label = "Master"; */}
{/*      else if (count >= 5) label = "Explorer"; */}
{/*      else if (count >= 3) label = "Initiate"; */}
{/*      return { tag, count, label }; */}
{/*    }); */}

{/*    // Streak detection */}
{/*    const uniqueDays = new Set( */}
{/*      votes.map((v) => new Date(v.inserted_at!).toDateString()) */}
{/*    ); */}
{/*    const streak = uniqueDays.size; */}

{/*    const chartData = { */}
{/*      labels: sortedTags.map(([tag]) => tag), */}
{/*      datasets: [ */}
{/*        { */}
{/*          label: "Votes per Tag", */}
{/*          data: sortedTags.map(([, count]) => count), */}
{/*          backgroundColor: "rgba(59, 130, 246, 0.7)", */}
{/*          borderRadius: 4, */}
{/*        }, */}
{/*      ], */}
{/*    }; */}

{/*    const chartOptions = { */}
{/*      responsive: true, */}
{/*      plugins: { */}
{/*        legend: { display: false }, */}
{/*      }, */}
{/*      scales: { */}
{/*        y: { beginAtZero: true, ticks: { stepSize: 1 } }, */}
{/*      }, */}
{/*    }; */}

{/*    return ( */}
{/*      <main className="min-h-screen py-12 px-4 flex flex-col items-center"> */}
{/*        <h1 className="text-2xl font-bold mb-6">Your Taste Profile</h1> */}

{/*        {loading ? ( */}
{/*          <Skeleton className="w-[320px] h-[200px]" /> */}
{/*        ) : ( */}
{/*          <div className="space-y-6 w-full max-w-md"> */}
{/*            <div className="mb-4 text-center"> */}
{/*              <span className="text-sm text-gray-500">🔥 Your streak: </span> */}
{/*              <Badge variant="outline">{streak} days active</Badge> */}
{/*            </div> */}

{/*            <div className="bg-white p-4 rounded-lg shadow-sm"> */}
{/*              <Bar data={chartData} options={chartOptions} /> */}
{/*            </div> */}

{/*            {badges.map(({ tag, count, label }) => ( */}
{/*              <div */}
{/*                key={tag} */}
{/*                className="flex items-center justify-between p-3 border rounded-lg bg-gray-50" */}
{/*              > */}
{/*                <div> */}
{/*                  <div className="font-medium text-gray-700">{tag}</div> */}
{/*                  <div className="text-xs text-muted-foreground"> */}
{/*                    {count} votes */}
{/*                  </div> */}
{/*                </div> */}
{/*                <Badge variant="secondary">{label}</Badge> */}
{/*              </div> */}
{/*            ))} */}

{/*            <div className="border-t pt-4"> */}
{/*              <h3 className="text-sm text-gray-600 mb-2">Recent Picks</h3> */}
{/*              <ul className="space-y-1 text-sm text-gray-700"> */}
{/*                {votes */}
{/*                  .slice(-5) */}
{/*                  .reverse() */}
{/*                  .map((vote, i) => ( */}
{/*                    <li key={i}> */}
{/*                      <strong>{vote.tag}:</strong> {vote.choice} */}
{/*                    </li> */}
{/*                  ))} */}
{/*              </ul> */}
{/*            </div> */}
{/*          </div> */}
{/*        )} */}
{/*      </main> */}
{/*    ); */}
{/*  } */}

{/*  <MiniNavButtons /> */}
