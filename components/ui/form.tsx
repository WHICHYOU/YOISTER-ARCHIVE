import React from "react";
import { Input } from "./input";
import { Button } from "./button";

{/*  Define the types for the Form component's props */}
interface FormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}

const Form = ({ onSubmit, children }: FormProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className="max-w-lg mx-auto p-4 bg-background shadow-lg rounded-lg"
    >
      {children}
      <Button type="submit" variant="primary">
        Submit
      </Button>
    </form>
  );
};

export { Form };
