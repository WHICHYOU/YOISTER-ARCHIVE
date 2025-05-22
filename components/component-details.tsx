"use client";

import React, { useState, useEffect } from "react";
import { CodeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import CodeBlock from "@/components/code-block";
import CopyButton from "@/components/copy-button";
import OpenInV0 from "@/components/open-in-v0";

export default function ComponentDetails({
  component,
}: {
  component: { name: string };
}) {
  const [code, setCode] = useState<string | null>(null);

  useEffect(() => {
    const handleEmptyCode = () => {
      setCode("");
    };

    const loadCode = async () => {
      try {
        const response = await fetch(`/r/${component.name}.json`);
        if (!response.ok) {
          handleEmptyCode();
          return;
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          handleEmptyCode();
          return;
        }

        const data = await response.json();
        const codeContent = data.files?.[0]?.content || "";
        setCode(codeContent);
      } catch (error) {
        console.error("Failed to load code:", error);
        handleEmptyCode();
      }
    };

    loadCode();
  }, [component.name]);

  return (
    <div className="absolute top-2 right-2 flex gap-2 peer-data-comp-loading:hidden">
      <OpenInV0
        componentSource={`https:{/* originui.com/r/${component.name}.json`} */}
      />

      <Button
        variant="ghost"
        className="text-muted-foreground/80 hover:text-foreground transition-none hover:bg-transparent p-2"
      >
        <CodeIcon size={16} aria-hidden />
      </Button>

      <div className="sm:max-w-[600px]">
        <div className="text-left">
          <h2 className="text-xl font-semibold">Installation</h2>
          <p className="sr-only">
            Use the CLI to add components to your project
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Install via npm or yarn
          </p>
          <div className="flex gap-4">
            <div className="bg-gray-800 text-white p-4 rounded-md">
              <pre>{`npm install ${component.name}`}</pre>
            </div>
            <div className="bg-gray-800 text-white p-4 rounded-md">
              <pre>{`yarn add ${component.name}`}</pre>
            </div>
          </div>
        </div>

        <div className="min-w-0 space-y-5 mt-6">
          <div className="space-y-4">
            <p className="text-lg font-semibold tracking-tight">Code</p>
            <div className="relative">
              {code === "" ? (
                <p className="text-muted-foreground text-sm">
                  No code available. If you think this is an error, please{" "}
                  <a
                    href="https:{/* github.com/origin-space/originui/issues" */}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground font-medium underline hover:no-underline"
                  >
                    open an issue
                  </a>
                  .
                </p>
              ) : (
                <>
                  <CodeBlock code={code} lang="tsx" />
                  <CopyButton componentSource={code || ""} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
