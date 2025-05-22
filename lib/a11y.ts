export function handleKeyNav(e: React.KeyboardEvent<HTMLDivElement>, callback: () => void) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    callback();
  }
}