import React from "react";

{/*  Define the props interface for the Radio component */}
interface RadioProps {
  label: string; {/*  label is a string */}
  checked: boolean; {/*  checked is a boolean indicating if the radio button is selected */}
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; {/*  onChange is a function that handles the change event */}
}

const Radio = ({ label, checked, onChange }: RadioProps) => {
  return (
    <div className="flex items-center">
      <input
        type="radio"
        checked={checked}
        onChange={onChange}
        className="form-radio text-blue-600"
      />
      <span className="ml-2">{label}</span>
    </div>
  );
};

export { Radio };
