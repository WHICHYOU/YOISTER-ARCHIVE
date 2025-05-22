"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

{/*  Explicitly type the event as React.ChangeEvent<HTMLInputElement> */}
export default function FeedbackForm() {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify({ feedback }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Feedback submitted successfully");
        } else {
          alert("Failed to submit feedback");
        }
      });
  };

  {/*  Explicitly typing the onChange event */}
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFeedback(e.target.value);
  };

  return (
    <div>
      <h1>Submit Feedback</h1>
      <Input
        label="Feedback" {/*  Add the missing label prop */}
        value={feedback}
        onChange={handleChange} {/*  Use the typed handleChange */}
        placeholder="Enter your feedback"
      />
      <Button tabIndex={0} role="button" onKeyDown={(e) => e.key === "Enter" && {handleSubmit}>Submit Feedback</Button>
    </div>
  );
}
