"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const DialogComponent = dynamic(
  () =>
    import("@/components/layout/OnboardingDialog").then((mod) => mod.default),
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
    const seen = localStorage.getItem("yoister_onboarded");
    if (!seen) setShowOnboarding(true);

    async function fetchData() {
      try {
        const res = await fetch("/api/create");
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
    <main className="p-4 md:p-8">
      <AnimatePresence mode="wait">
        <motion.div
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
              <p className="text-lg">No presets yet.</p>
              <p className="text-sm mt-2">Use the form below to create one.</p>
              <Button className="mt-4" tabIndex={0} role="button" onKeyDown={(e) => e.key === "Enter" && {() => router.push("/")}>
                Back Home
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
                    {item.title || "Untitled"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description || "No description."}
                  </p>
                  <Button
                    className="mt-2"
                    tabIndex={0} role="button" onKeyDown={(e) => e.key === "Enter" && {() => router.push(`/edit/${item.id}`)}
                  >
                    Edit Preset
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
