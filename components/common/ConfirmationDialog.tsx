"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";

const ConfirmationDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    alert("Confirmed!");
    setIsOpen(false);
  };

  return (
    <div>
      {/* Button to open the dialog */}
      <Button tabIndex={0} role="button" onKeyDown={(e) => e.key === "Enter" && {() => setIsOpen(true)}>Delete</Button>

      {/* Dialog usage according to provided API */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <div>
            <h3>Are you sure you want to delete this item?</h3>
            <Button className="mr-4" tabIndex={0} role="button" onKeyDown={(e) => e.key === "Enter" && {() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button tabIndex={0} role="button" onKeyDown={(e) => e.key === "Enter" && {handleConfirm}>Confirm</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export { ConfirmationDialog };
