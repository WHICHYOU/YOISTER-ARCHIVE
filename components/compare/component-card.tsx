"use client";

import { cn } from "@/lib/utils";
import React from "react"; {/*  Import React for React.ReactNode */}

{/*  Define a local interface for the component prop */}
interface LocalComponentProps {
  name?: string; {/*  Assuming name is a string */}
  meta?: {
    colSpan?: number; {/*  Assuming colSpan is a number */}
    style?: number; {/*  Assuming style is a number */}
    {/*  Add other properties from component.meta if needed */}
  };
}

{/*  Define an interface for the ComponentCard's props */}
interface ComponentCardProps {
  isSearchPage?: boolean;
  children: React.ReactNode;
  component: LocalComponentProps;
  className?: string;
}

const ComponentCard = ({
  isSearchPage = false,
  children,
  component,
  className,
}: ComponentCardProps) => {
  const getColSpanClasses = (includeStart = false) => {
    const baseClasses =
      component.meta?.colSpan === 2
        ? "col-span-12 sm:col-span-6 lg:col-span-6"
        : component.meta?.colSpan === 3
        ? "col-span-12 sm:col-span-12 lg:col-span-12"
        : "col-span-12 sm:col-span-6 lg:col-span-4";

    const startClasses =
      includeStart && component.meta?.colSpan !== 3
        ? component.meta?.colSpan === 2
          ? "sm:col-start-4 lg:col-start-4"
          : "sm:col-start-4 lg:col-start-5"
        : "";

    return cn(baseClasses, startClasses);
  };

  const styleClasses =
    component.meta?.style === 1
      ? "flex justify-center items-center"
      : component.meta?.style === 2
      ? "text-center"
      : "";

  return (
    <div
      className={cn(
        "group/item relative border has-[[data-comp-loading=true]]:border-none",
        isSearchPage
          ? "col-span-12 grid grid-cols-12"
          : cn(getColSpanClasses(), styleClasses),
        className
      )}
      data-slot={component.name}
    >
      {isSearchPage ? (
        <div className={cn(getColSpanClasses(true), styleClasses)}>
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export { ComponentCard };
