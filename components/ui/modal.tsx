import React from "react";

{/*  Define types for the props of Modal component */}
interface ModalProps {
  isOpen: boolean; {/*  isOpen should be a boolean */}
  onClose: () => void; {/*  onClose should be a function that takes no arguments and returns nothing */}
  children: React.ReactNode; {/*  children can be any React node (elements, text, etc.) */}
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <button
          tabIndex={0} role="button" onKeyDown={(e) => e.key === "Enter" && {onClose}
          className="absolute top-2 right-2 text-gray-500"
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export { Modal };
