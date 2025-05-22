"use client";

type ShareCardProps = {
  tribe: string;
  topChoice: string;
  category: string;
};

export default function ShareCard({ tribe, topChoice, category }: ShareCardProps) {
  return (
    <div className="p-6 rounded-xl border bg-white shadow space-y-2 text-sm">
      <h3 className="font-semibold">Your Journey Snapshot</h3>
      <ul className="text-muted-foreground">
        <li>• Tribe: {tribe}</li>
        <li>• Most Voted: {topChoice}</li>
        <li>• Top Type: {category}</li>
      </ul>
    </div>
  );
}
