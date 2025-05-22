"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const showdowns = [
  { id: "intro-01", question: "Freedom or Stability?", a: "Freedom", b: "Stability", a_image: "", b_image: "", media_type: "text" },
  { id: "intro-02", question: "Apple or Orange?", a: "Apple", b: "Orange", a_image: "", b_image: "", media_type: "text" },
  { id: "intro-03", question: "Mess or Control?", a: "Mess", b: "Control", a_image: "", b_image: "", media_type: "text" },
];

export default function SignatureShowdown() {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * showdowns.length));
  const [voted, setVoted] = useState(false);
  const { toast } = useToast();
  const current = showdowns[index];

  function handleVote(option: "a" | "b") {
    setVoted(true);
    toast({
      title: `You chose "${option === "a" ? current.a : current.b}"`,
      description: "Curious what that says about you? Explore more paths below.",
    });
    setTimeout(() => {
      setIndex((i) => (i + 1) % showdowns.length);
      setVoted(false);
    }, 900);
  }

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center space-y-6">
      <div className="text-lg sm:text-xl text-center mb-2">{current.question}</div>
      <div className="flex flex-row justify-center gap-8">
        <Button disabled={voted} size="lg" className="min-w-[128px] text-xl" tabIndex={0} role="button" onKeyDown={(e) => e.key === "Enter" && {() => handleVote("a")}>{current.a}</Button>
        <Button disabled={voted} size="lg" className="min-w-[128px] text-xl" tabIndex={0} role="button" onKeyDown={(e) => e.key === "Enter" && {() => handleVote("b")}>{current.b}</Button>
      </div>
    </div>
  );
}