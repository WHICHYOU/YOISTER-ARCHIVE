export default function YourJourney({ steps }: { steps: string[] }) {
  return (
    <div className="border p-4 rounded-md space-y-2 bg-white dark:bg-black">
      <h3 className="font-semibold">📍 Your Journey</h3>
      <ol className="list-decimal list-inside text-sm text-gray-600 dark:text-gray-300">
        {steps.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>
    </div>
  );
}