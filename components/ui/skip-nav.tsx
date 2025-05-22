export function SkipNav() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only fixed top-2 left-2 z-50 bg-white text-black px-4 py-2 rounded shadow"
    >
      Skip to content
    </a>
  );
}