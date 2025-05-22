"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { AnimatePresence } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";

const MotionDiv = motion.div as React.FC<HTMLMotionProps<"div">>;
const MotionArticle = motion.article as React.FC<HTMLMotionProps<"article">>;

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
    const seen = localStorage.getItem("yoister_onboarded");
    if (!seen) setShowOnboarding(true);

    async function fetchData() {
      try {
        const res = await fetch("/api/some-endpoint");
        if (!res.ok) throw new Error("Failed to load");
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
    localStorage.setItem("yoister_onboarded", "1");
    setShowOnboarding(false);
  };

  return (
    <main role="main" aria-label="Yoister Showdowns" className="p-4 md:p-8">
      <AnimatePresence mode="wait">
        <MotionDiv
          className="grid gap-4 md:grid-cols-2"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
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
              <p className="text-lg">No data found.</p>
              <p className="text-sm mt-2">
                Try adding something or check your filters.
              </p>
              <Button className="mt-4" tabIndex={0} role="button" onKeyDown={(e) => e.key === "Enter" && {() => router.push("/create")}>
                Create New
              </Button>
            </div>
          )}

          {!loading &&
            !error &&
            data.map((item, i) => (
              <MotionArticle
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
                    {item.title || "Untitled"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description || "No description."}
                  </p>
                  <Button
                    className="mt-2"
                    tabIndex={0} role="button" onKeyDown={(e) => e.key === "Enter" && {() => router.push(`/detail/${item.id}`)}
                  >
                    View
                  </Button>
                </Card>
              </MotionArticle>
            ))}
        </MotionDiv>
      </AnimatePresence>

      <Dialog open={showOnboarding} onOpenChange={setShowOnboarding}>
        <DialogContent role="dialog" aria-labelledby="welcome-heading">
          <DialogTitle id="welcome-heading">Welcome to Yoister</DialogTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Start by comparing things you love. Your preferences will shape who
            you are.
          </p>
          <Button className="mt-4" tabIndex={0} role="button" onKeyDown={(e) => e.key === "Enter" && {dismissOnboarding}>
            Let's Begin
          </Button>
        </DialogContent>
      </Dialog>
    </main>
  );
}
