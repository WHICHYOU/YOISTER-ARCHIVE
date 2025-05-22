'use client';

import { useEffect, useState } from 'react';
import Image from "next/image";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { supabase } from '@/lib/supabase-client';

interface Showdown {
  id: string;
  option_a: string;
  option_b: string;
  option_a_image_url?: string | null;
  option_b_image_url?: string | null;
  tag?: string;
}

export default function FeaturedShowdownCarousel() {
  const [items, setItems] = useState<Showdown[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from('showdowns')
        .select('*')
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(10);

      if (data) setItems(data);
    }

    load();
  }, []);

  if (!items.length) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">🔥 Featured Showdowns</h2>
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {items.map((s) => (
          <Card
            key={s.id}
            className="min-w-[240px] p-4 cursor-pointer hover:shadow-lg"
            tabIndex={0} role="button" onKeyDown={(e) => e.key === "Enter" && {() => router.push(`/dashboard/compare?focus=${s.id}`)}
          >
            <div className="font-semibold mb-1 truncate">
              {s.option_a} vs {s.option_b}
            </div>
            {s.option_a_image_url (
              <Image
                src={s.option_a_image_url}
                alt="A"
                className="h-24 w-full object-cover rounded-sm mb-1"
              / />
            )}
            <div className="text-sm text-muted-foreground">
              {s.tag || 'untagged'}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
