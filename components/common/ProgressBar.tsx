import React from "react";

interface ProgressBarProps {
  streak: number; {/*  Explicitly type the streak prop as a number */}
}

const ProgressBar: React.FC<ProgressBarProps> = ({ streak }) => {
  return (
    <div>
      Your streak: {streak}
      <div className="progress-bar" style={{ width: `${streak}%` }} />
    </div>
  );
};

export { ProgressBar };
