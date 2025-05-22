'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-client';
import { ShowdownCard } from '@/components/showdowns/ShowdownCard';

interface Showdown {
  id: string;
  title: string;
  description?: string;
  option_a: string;
  option_b: string;
  option_a_image_url?: string;
  option_b_image_url?: string;
}

export function ShowdownList() {
  const [showdowns, setShowdowns] = useState<Showdown[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPresets() {
      const { data, error } = await supabase
        .from('presets')
        .select('*')
        .limit(10);

      if (error) {
        console.error('Error loading presets:', error);
      } else if (data) {
        setShowdowns(data);
      }

      setLoading(false);
    }

    fetchPresets();
  }, []);

  if (loading) {
    return <p className="text-center p-8">Loading...</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4">
      {showdowns.map((showdown) => (
        <ShowdownCard
          key={showdown.id}
          id={showdown.id}
          title={showdown.title}
          description={showdown.description}
          optionA={showdown.option_a}
          optionB={showdown.option_b}
          imageA={showdown.option_a_image_url}
          imageB={showdown.option_b_image_url}
        />
      ))}
    </div>
  );
}
