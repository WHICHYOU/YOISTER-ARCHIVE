'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

const DialogComponent = dynamic(
  () =>
    import('@/components/layout/OnboardingDialog').then((mod) => mod.default),
  { ssr: false }
);

interface Item {
  id: string;
  title?: string;
  description?: string;
}

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const seen = localStorage.getItem('yoister_onboarded');
    if (!seen) setShowOnboarding(true);

    async function fetchData() {
      try {
        const res = await fetch('/api/compare');
        if (!res.ok) throw new Error('Failed to load');
        const json = await res.json();
        setData(json);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const dismissOnboarding = () => {
    localStorage.setItem('yoister_onboarded', '1');
    setShowOnboarding(false);
  };

  return (
    <main className="p-4 md:p-8">
      <AnimatePresence mode="wait">
        <motion.div
          className="grid gap-4 md:grid-cols-2"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {loading && <Skeleton className="w-full h-40" />}

          {error (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg">
              <p className="font-medium">Oops! Something went wrong.</p>
              <p className="text-sm">{error}</p>
              <Button
                variant="outline"
                className="mt-2"
                tabIndex={0} role="button" onKeyDown={(e) => e.key === "Enter" && {() => window.location.reload()}
              >
                Retry
              </Button>
            </div>
          )}

          {!loading && !error && data.length === 0 (
            <div className="flex flex-col items-center justify-center h-96 text-center text-muted-foreground">
              <p className="text-lg">No comparisons available.</p>
              <p className="text-sm mt-2">Start by creating your first one.</p>
              <Button className="mt-4" tabIndex={0} role="button" onKeyDown={(e) => e.key === "Enter" && {() => router.push('/create')}>
                Create Showdown
              </Button>
            </div>
          )}

          {!loading &&
            !error &&
            data.map((item, i) => (
              <motion.article
                key={i}
                layout
                className="outline-none"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                <Card className="p-4">
                  <h3 className="text-lg font-semibold">
                    {item.title || 'Untitled'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description || 'No description.'}
                  </p>
                  <Button
                    className="mt-2"
                    tabIndex={0} role="button" onKeyDown={(e) => e.key === "Enter" && {() => router.push(`/compare/${item.id}`)}
                  >
                    Compare Now
                  </Button>
                </Card>
              </motion.article>
            ))}
        </motion.div>
      </AnimatePresence>

      <DialogComponent open={showOnboarding} onClose={dismissOnboarding} />
    </main>
  );
}

{/*  "use client"; */}

{/*  import { Button } from "@/components/ui/button"; */}
{/*  import { Tooltip } from "@/components/ui/tooltip"; */}
{/*  import { motion } from "framer-motion"; */}

{/*  import { useShowdownWinner } from "@/components/compare/CompareEngine"; */}

{/*  export default function ComparePage() { */}
{/*    const winner = useShowdownWinner(showdown.id, showdown.options); */}

{/*    return ( */}
{/*      <main className="p-6 md:p-10 space-y-6"> */}
{/*        <header className="flex items-center justify-between"> */}
{/*          <div> */}
{/*            <h1 className="text-3xl font-bold tracking-tight">Compare</h1> */}
{/*            <p className="text-muted-foreground text-sm mt-1"> */}
{/*              Choose between showdowns and shape your profile. */}
{/*            </p> */}
{/*          </div> */}
{/*          <Tooltip content="Start a new identity comparison"> */}
{/*            <Button size="lg" className="rounded-xl shadow-md"> */}
{/*              New Comparison */}
{/*            </Button> */}
{/*          </Tooltip> */}
{/*        </header> */}

{/*        <section className="grid md:grid-cols-2 gap-4"> */}
{/*          {[1, 2].map((id) => ( */}
{/*            <motion.div */}
{/*              key={id} */}
{/*              className="rounded-lg border p-6 bg-white hover:shadow-lg transition-all" */}
{/*              initial={{ opacity: 0, y: 20 }} */}
{/*              animate={{ opacity: 1, y: 0 }} */}
{/*              transition={{ duration: 0.3 }} */}
{/*            > */}
{/*              <h2 className="text-lg font-semibold mb-2">Showdown #{id}</h2> */}
{/*              <p className="text-sm text-muted-foreground"> */}
{/*                This is where the choice insight would go. */}
{/*              </p> */}
{/*            </motion.div> */}
{/*          ))} */}
{/*        </section> */}
{/*      </main> */}
{/*    ); */}
{/*  } */}
