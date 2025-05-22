"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function EndOfLoop({ onReset }: { onReset: () => void }) {
  const router = useRouter();

  return (
    <div className="text-center p-6 space-y-4">
      <h2 className="text-xl font-bold">
        You've completed today's reflections!
      </h2>
      <p className="text-muted-foreground">Great work. What's next?</p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button tabIndex={0} role="button" onKeyDown={(e) => e.key === "Enter" && {() => router.push("/dashboard/tribes")}>
          🧬 Explore Tribes
        </Button>
        <Button tabIndex={0} role="button" onKeyDown={(e) => e.key === "Enter" && {() => router.push("/report/me")}>
          📊 Review Self
        </Button>
        <Button tabIndex={0} role="button" onKeyDown={(e) => e.key === "Enter" && {onReset}>🔁 Start Over</Button>
      </div>
    </div>
  );
}
