{/*  components/common/Popover.tsx */}

import React from 'react';
import { Button } from '../ui/button'; {/*  Assuming Button is located here */}

{/*  Define PopoverProps with Trigger and Content properties */}
interface PopoverProps {
  isOpen: boolean;
  close: () => void;
  children: React.ReactNode;
}

const Popover: React.FC<PopoverProps> = ({ isOpen, close, children }) => {
  if (!isOpen) return null;

  return (
    <div className="popover-container">
      <div className="popover-content">
        {children}
      </div>
      <button tabIndex={0} role="button" onKeyDown={(e) => e.key === "Enter" && {close}>Close</button>
    </div>
  );
};

export { Popover };
