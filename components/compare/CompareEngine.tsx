'use client';

import { useEffect, useState } from 'react';
import { ShowdownOption } from '@/types/showdown';
import { VoteRecord } from '@/lib/supabase-queries';
import { fetchVotesForShowdown, subscribeVotes } from '@/lib/supabase-queries';

/* ------------------------------------------------------------------ */
/*  Scoring helpers                                                   */
/* ------------------------------------------------------------------ */

/** Return a map: optionId → up-vote count */
function buildScore(
  options: ShowdownOption[],
  votes: VoteRecord[]
): Record<string, number> {
  const base: Record<string, number> = {};
  options.forEach((o) => (base[o.id] = 0));

  votes.forEach((v) => {
    const votedId = v.chosen_option === 'A' ? options[0].id : options[1].id;

    if (votedId in base) base[votedId] += 1;
  });

  return base;
}

/**
 * Compute winning option (or null if tie / no votes).
 * Tie break → returns null so UI can decide how to label.
 */
export function computeWinner(
  options: ShowdownOption[],
  votes: VoteRecord[]
): ShowdownOption | null {
  if (!options.length) return null;

  const score = buildScore(options, votes);
  const top = Math.max(...Object.values(score));
  const tied = options.filter((o) => score[o.id] === top);

  return tied.length === 1 ? tied[0] : null;
}

/* ------------------------------------------------------------------ */
/*  React hook                                                        */
/* ------------------------------------------------------------------ */

export function useShowdownWinner(
  showdownId: string,
  options: ShowdownOption[]
) {
  const [winner, setWinner] = useState<ShowdownOption | null>(null);

  /** Refresh from DB & recompute */
  const refresh = async () => {
    const votes = await fetchVotesForShowdown(showdownId);
    setWinner(computeWinner(options, votes));
  };

  useEffect(() => {
    refresh();

    const channel = subscribeVotes(showdownId, () => {
      refresh();
    });

    return () => {
      if (channel) channel.unsubscribe();
    };
  }, [showdownId, options]);

  return winner;
}
