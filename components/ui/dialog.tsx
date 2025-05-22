"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import { cn } from "../../lib/utils";

type DialogContextType = {
  open: boolean;
  setOpen: (value: boolean) => void;
};
const DialogContext = createContext<DialogContextType | undefined>(undefined);

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}
function Dialog({ open, onOpenChange, children }: DialogProps) {
  {/*  Provide open state to children */}
  return (
    <DialogContext.Provider value={{ open, setOpen: onOpenChange }}>
      {children}
    </DialogContext.Provider>
  );
}

interface DialogContentProps {
  children: ReactNode;
  className?: string;
  role?: string;
  "aria-labelledby"?: string;
}
function DialogContent({
  children,
  className,
  role = "dialog",
  ...rest
}: DialogContentProps) {
  const ctx = useContext(DialogContext);
  const ref = useRef<HTMLDivElement>(null);

  {/*  Focus trap */}
  useEffect(() => {
    if (ctx?.open && ref.current) {
      ref.current.focus();
    }
  }, [ctx?.open]);

  if (!ctx?.open) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm",
        className
      )}
    >
      <div
        tabIndex={-1}
        ref={ref}
        className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md outline-none"
        role={role}
        {...rest}
      >
        {children}
      </div>
    </div>
  );
}

interface DialogTitleProps {
  children: ReactNode;
  id?: string;
  className?: string;
}
function DialogTitle({ children, id, className }: DialogTitleProps) {
  return (
    <h2 id={id} className={cn("text-xl font-bold tracking-tight", className)}>
      {children}
    </h2>
  );
}

{/*  Export in a way that matches your imports */}
export { Dialog, DialogContent, DialogTitle };

{/*  // components/ui/dialog.tsx */}
{/*  import React from "react"; */}
{/*  import { cn } from "../../lib/utils"; // Assuming the cn utility is defined */}

{/*  interface DialogProps { */}
{/*    isOpen: boolean; */}
{/*    close: () => void; */}
{/*    title: string; */}
{/*    children: React.ReactNode; */}
{/*    className?: string; // Allow for custom styling */}
{/*  } */}

{/*  const Dialog: React.FC<DialogProps> = ({ */}
{/*    isOpen, */}
{/*    close, */}
{/*    title, */}
{/*    children, */}
{/*    className, */}
{/*  }) => { */}
{/*    if (!isOpen) return null; */}

{/*    return ( */}
{/*      <div */}
{/*        className={cn( */}
{/*          "fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50", */}
{/*          className */}
{/*        )} */}
{/*      > */}
{/*        <div className="bg-white p-6 rounded-lg max-w-sm"> */}
{/*          <h3 className="text-xl font-bold">{title}</h3> */}
{/*          {children} */}
{/*          <div className="flex justify-end mt-4"> */}
{/*            <button */}
{/*              onClick={close} */}
{/*              className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-md" */}
{/*            > */}
{/*              Close */}
{/*            </button> */}
{/*          </div> */}
{/*        </div> */}
{/*      </div> */}
{/*    ); */}
{/*  }; */}

{/*  export {Dialog}; */}
