{/*  components/page-grid.tsx */}
import React from "react";
import { cn } from "@/lib/utils";

interface PageGridProps {
  children: React.ReactNode;
  className?: string;
}

const PageGrid: React.FC<PageGridProps> = ({ children, className }) => {
  return <div className={cn("page-grid", className)}>{children}</div>;
};

export default PageGrid;
