import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
}