/* components/tribes/TribeList.tsx */
'use client';

import React from 'react';
import { TribeCard } from './TribeCard';

const tribes = [
  { name: 'Visual Explorers', members: 1024, tag: 'Visual' },
  { name: 'Curious Wanderers', members: 687, tag: 'Temporal' },
  { name: 'Narrative Weavers', members: 842, tag: 'Emotional' },
];

export function TribeList() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {tribes.map((tribe, idx) => (
        <TribeCard
          key={idx}
          {...tribe}
          tabIndex={0} role="button" onKeyDown={(e) => e.key === "Enter" && {() => {
            {/*  TODO: navigate to `/tribes/${tribe.tag.toLowerCase()}` */}
            console.log('Selected tribe:', tribe.name);
          }}
        />
      ))}
    </div>
  );
}
