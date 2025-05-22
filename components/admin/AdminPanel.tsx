import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

const AdminPanel = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
      <Card className="p-4 shadow-md">
        <p className="mb-4">Most voted showdown: Ramen vs Pasta</p>
        <Button tabIndex={0} role="button" onKeyDown={(e) => e.key === "Enter" && {() => alert("Manage Showdowns")}>
          Manage Showdowns
        </Button>
      </Card>
    </div>
  );
};

export default AdminPanel;
