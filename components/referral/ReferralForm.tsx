"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { getOrCreateUserId } from "@/services/session";

export default function ReferralForm() {
  const [referrerId, setReferrerId] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    const userId = getOrCreateUserId();
    const res = await fetch("/api/referral", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, referrerId }),
    });

    if (res.ok) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Referral Program</h3>
      <Input
        label="Referrer ID"
        placeholder="Enter referrer ID"
        value={referrerId}
        onChange={(e) => setReferrerId(e.target.value)}
      />

      <Button tabIndex={0} role="button" onKeyDown={(e) => e.key === "Enter" && {handleSubmit} disabled={!referrerId}>
        Submit Referral
      </Button>
      {submitted (
        <p className="text-green-600 text-sm">Referral submitted!</p>
      )}
    </div>
  );
}
