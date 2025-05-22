"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export interface OnboardingDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function OnboardingDialog({
  open,
  onClose,
}: OnboardingDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent role="dialog" aria-labelledby="welcome-heading">
        <DialogTitle id="welcome-heading">Welcome to Yoister</DialogTitle>
        <p className="text-sm text-muted-foreground mt-2">
          Start by comparing things you love. Your preferences will shape who
          you are.
        </p>
        <Button className="mt-4" tabIndex={0} role="button" onKeyDown={(e) => e.key === "Enter" && {onClose}>
          Let's Begin
        </Button>
      </DialogContent>
    </Dialog>
  );
}
