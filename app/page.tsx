'use client';

import React, { useState } from 'react';
import Image from "next/image";
import Image from "next/image";
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import presets from '@/data/presets.json';
import { useUser } from '@/lib/useUser';
import { submitVote } from '@/lib/supabase-client';

interface ShowdownOption {
  label: string;
  image: string;
}

interface Showdown {
  id: string;
  title: string;
  description: string;
  optionA: ShowdownOption;
  optionB: ShowdownOption;
}

export default function Page() {
  const { user } = useUser();
  const [votes, setVotes] = useState<Record<string, 'left' | 'right'>>({});

  const handleVote = async (showdownId: string, choice: 'left' | 'right') => {
    if (!user?.id || votes[showdownId]) return;
    await submitVote({
      user_id: user.id,
      preset_id: showdownId,
      chosen_option: choice === 'left' ? 'A' : 'B',
      tag_axis: showdownId, {/*  optional if used for categorization */}
    });
    setVotes((prev) => ({ ...prev, [showdownId]: choice }));
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-10">
      <Carousel opts={{ align: 'center', loop: false }}>
        <CarouselContent>
          {(presets as Showdown[]).map((showdown) => (
            <CarouselItem key={showdown.id} className="pl-2 md:pl-4">
              <Card className="p-4">
                <CardContent className="flex flex-col items-center gap-4">
                  <div className="text-center">
                    <h2 className="text-xl font-bold mb-1">{showdown.title}</h2>
                    <p className="text-sm text-muted-foreground mb-4">
                      {showdown.description}
                    </p>
                  </div>
                  <div className="flex gap-4 w-full">
                    {['left', 'right'].map((side) => {
                      const option =
                        side === 'left' ? showdown.optionA : showdown.optionB;
                      return (
                        <motion.button
                          key={side}
                          className={`relative w-1/2 overflow-hidden rounded-lg border focus:outline-none transition-transform ${
                            votes[showdown.id] === side
                              ? 'ring-2 ring-black scale-95'
                              : 'hover:scale-105'
                          }`}
                          tabIndex={0} role="button" onKeyDown={(e) => e.key === "Enter" && {() =>
                            handleVote(showdown.id, side as 'left' | 'right')
                          }
                          disabled={!!votes[showdown.id]}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Image
                            src={option.image}
                            alt={option.label}
                            className="w-full h-48 object-cover"
                          / />
                          <div className="absolute bottom-0 w-full bg-black/60 text-white text-center py-2 text-sm font-semibold">
                            {option.label}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
