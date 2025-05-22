"use client";
import { TribeList } from "@/components/tribes/TribeList";

export default function TribesPage() {
  return (
    <main className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Discover Tribes</h1>
      <TribeList />
    </main>
  );
}
