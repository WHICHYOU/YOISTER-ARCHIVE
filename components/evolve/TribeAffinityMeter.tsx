export default function TribeAffinityMeter({ tribe, value }: { tribe: string; value: number }) {
  return (
    <div className="mb-2">
      <div className="text-xs mb-1 text-gray-500 dark:text-gray-400">{tribe}</div>
      <div className="w-full bg-gray-200 dark:bg-gray-800 h-2 rounded">
        <div className="bg-blue-500 h-2 rounded" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}