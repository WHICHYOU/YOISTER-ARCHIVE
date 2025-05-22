"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface Props {
  open: boolean;
  onOpenChangeAction: (open: boolean) => void;
  onSubmitAction: (reflection: string) => void;
}

export default function PostVoteReflectionModal({
  open,
  onOpenChangeAction,
  onSubmitAction,
}: Props) {
  const [input, setInput] = useState("");

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        const el = document.querySelector<HTMLInputElement>(
          "input[placeholder^='e.g.']"
        );
        el?.focus();
      }, 100);
    } else {
      setInput("");
    }
  }, [open]);

  const handleSubmit = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    onSubmitAction(trimmed);
    onOpenChangeAction(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChangeAction}>
      <DialogContent className="space-y-4">
        <DialogTitle className="text-lg font-bold">
          Reflect on Your Choice
        </DialogTitle>
        <p className="text-sm text-muted-foreground">
          Give this decision a name, feeling, or impulse. How would you describe
          it?
        </p>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. Seeking clarity. Felt nostalgic. Pure instinct."
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
        />
        <div className="flex justify-end">
          <Button tabIndex={0} role="button" onKeyDown={(e) => e.key === "Enter" && {handleSubmit} disabled={!input.trim()}>
            Submit Reflection
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
