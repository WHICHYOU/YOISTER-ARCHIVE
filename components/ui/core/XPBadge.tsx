export default function XPBadge({ level }: { level: number }) {
  return (
    <span className="inline-block bg-purple-600 text-white text-xs px-2 py-1 rounded-full shadow-sm">
      XP Lv.{level}
    </span>
  );
}