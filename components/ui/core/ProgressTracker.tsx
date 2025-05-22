export default function ProgressTracker({ value }: { value: number }) {
  return (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
      <div
        className="bg-green-500 h-3 rounded-full"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}