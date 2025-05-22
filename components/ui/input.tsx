{/*  components/ui/input.tsx */}

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: string;
  className?: string;
}

const Input = ({
  label,
  type = "text",
  className = "",
  ...props
}: InputProps) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-text">{label}</label>
      )}
      <input
        type={type}
        className={`mt-1 block w-full p-2 border rounded-lg ${className}`}
        {...props}
      />
    </div>
  );
};

export { Input };
