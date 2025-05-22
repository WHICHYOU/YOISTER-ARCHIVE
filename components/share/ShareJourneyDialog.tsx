"use client";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ShareCard from "./ShareCard";

export default function ShareJourneyDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const shareProps = {
    tribe: "Visual Explorers",
    topChoice: "Late Night",
    category: "Nostalgic"
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-md space-y-4">
          <ShareCard {...shareProps} />
          <div className="flex gap-2 justify-end">
            <Button tabIndex={0} role="button" onKeyDown={(e) => e.key === "Enter" && {() => navigator.clipboard.writeText('https:{/* yoister.app/my-journey')}>Copy Link</Button> */}
            <Button variant="outline" tabIndex={0} role="button" onKeyDown={(e) => e.key === "Enter" && {onClose}>Close</Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
