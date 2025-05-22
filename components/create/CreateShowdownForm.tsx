"use client";

import { useState } from "react";
import { Modal } from "../ui/modal"; {/*  Assuming Modal is imported correctly */}
import { Button } from "../ui/button"; {/*  Assuming Button is imported correctly */}
import { Input } from "../ui/input"; {/*  Assuming Input is imported correctly */}

const CreateShowdownForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showdownName, setShowdownName] = useState("");

  const handleSubmit = () => {
    setIsOpen(true);
  };

  {/*  Explicitly typing the event as React.ChangeEvent<HTMLInputElement> */}
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowdownName(e.target.value);
  };

  return (
    <div>
      <Input
        label="Showdown Name" {/*  Add the label prop here */}
        value={showdownName}
        onChange={handleChange} {/*  Using the typed handleChange */}
        placeholder="Enter showdown name"
      />
      <Button tabIndex={0} role="button" onKeyDown={(e) => e.key === "Enter" && {handleSubmit}>Create Showdown</Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="modal-header">
          <h2>Create New Showdown</h2>
        </div>
        <div className="modal-body">
          <div>Your showdown has been successfully created!</div>
        </div>
        <div className="modal-footer">
          <Button tabIndex={0} role="button" onKeyDown={(e) => e.key === "Enter" && {() => setIsOpen(false)}>Close</Button>
        </div>
      </Modal>
    </div>
  );
};

export { CreateShowdownForm };
