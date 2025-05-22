type ToggleProps = {
  checked: boolean;
  onChange: (val: boolean) => void;
};

export function Toggle({ checked, onChange }: ToggleProps) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      tabIndex={0} role="button" onKeyDown={(e) => e.key === "Enter" && {() => onChange(!checked)}
      className="px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded"
    >
      {checked ? "On" : "Off"}
    </button>
  );
}
