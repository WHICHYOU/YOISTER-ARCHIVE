{/*  lib/shadow-gap.ts */}

import type { MinimalVote } from "./prediction-engine";

export interface ShadowGapResult {
  unchosenOptions: string[];
  dominantBias: string;
}

export function detectShadowGap(votes: MinimalVote[]): ShadowGapResult {
  const allOptions = votes.flatMap((v) => [
    v.showdown.optionA,
    v.showdown.optionB,
  ]);
  const chosen = new Set(votes.map((v) => v.choice));
  const unchosen = allOptions.filter((opt) => !chosen.has(opt));

  const counts: Record<string, number> = {};
  unchosen.forEach((opt) => {
    counts[opt] = (counts[opt] || 0) + 1;
  });

  const dominant =
    Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || "none";

  return {
    unchosenOptions: Array.from(new Set(unchosen)),
    dominantBias: dominant,
  };
}
