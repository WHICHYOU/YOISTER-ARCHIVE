export default function UserEvolutionTree() {
  return (
    <div className="border p-4 rounded-md bg-white dark:bg-black text-sm space-y-2">
      <h3 className="font-semibold">🧬 Your Evolution Path</h3>
      <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
        <li>Voted in Taste vs Logic → Gained Tag: "Intuition"</li>
        <li>Chose Images over Words → Evolving toward Visual</li>
        <li>5-Day Streak → Stability emerging</li>
      </ul>
    </div>
  );
}