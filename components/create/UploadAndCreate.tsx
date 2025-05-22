"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

{/*  Temporary toast-like UI without external dependency */}
function ToastMessage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white border rounded-lg shadow-md p-4 w-72">
      <h4 className="text-sm font-semibold">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

export default function UploadAndCreate() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [toast, setToast] = useState<{
    title: string;
    description: string;
  } | null>(null);

  const showToast = (title: string, description: string) => {
    setToast({ title, description });
    setTimeout(() => setToast(null), 3000);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files).filter((f) =>
      ["image/jpeg", "image/png", "video/mp4", "video/quicktime"].includes(
        f.type
      )
    );
    setFiles(droppedFiles);
    showToast("Files ready!", `${droppedFiles.length} files selected.`);
  };

  const handleUpload = () => {
    if (!files.length) return;
    setUploading(true);
    setProgress(0);
    const totalSteps = 100;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= totalSteps) {
          clearInterval(interval);
          showToast("Upload Complete", "Showdown created from files!");
          setUploading(false);
          return totalSteps;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <>
      {toast (
        <ToastMessage title={toast.title} description={toast.description} />
      )}
      <section
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-muted rounded-xl p-6 bg-muted/30 text-center space-y-4"
      >
        <p className="text-muted-foreground">
          Drag and drop JPG, PNG, MP4, or MOV files here
        </p>
        {files.length > 0 (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {files.map((file, i) => (
              <div
                key={i}
                className="rounded-md bg-background p-2 text-xs text-left truncate shadow-sm"
              >
                {file.name}
              </div>
            ))}
          </div>
        )}
        {uploading && <Progress value={progress} />}
        <Button tabIndex={0} role="button" onKeyDown={(e) => e.key === "Enter" && {handleUpload} disabled={uploading || !files.length}>
          {uploading ? "Uploading..." : "Create Showdown"}
        </Button>
      </section>
    </>
  );
}
