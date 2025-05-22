export default function UserInsightBubble({ text }: { text: string }) {
  return (
    <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 dark:text-gray-300">
      "{text}"
    </blockquote>
  );
}