"use client";

import React, { useCallback, useRef, useMemo, ReactNode } from "react";

interface InfiniteScrollProps {
  isLoading: boolean;
  hasMore: boolean;
  next: () => unknown;
  threshold?: number;
  root?: Element | Document | null;
  rootMargin?: string;
  reverse?: boolean;
  children?: ReactNode; {/*  🔥 Required for proper JSX usage */}
}

export default function InfiniteScroll({
  isLoading,
  hasMore,
  next,
  threshold = 1,
  root = null,
  rootMargin = "0px",
  reverse,
  children,
}: InfiniteScrollProps) {
  const observer = useRef<IntersectionObserver | null>(null);

  const observerRef = useCallback(
    (element: HTMLElement | null) => {
      let safeThreshold = threshold;
      if (threshold < 0 || threshold > 1) {
        console.warn(
          "threshold should be between 0 and 1. You are exceeding the range. Defaulting to 1."
        );
        safeThreshold = 1;
      }

      if (isLoading || !hasMore) return;

      if (observer.current) observer.current.disconnect();
      if (!element) return;

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            next();
          }
        },
        { threshold: safeThreshold, root, rootMargin }
      );

      observer.current.observe(element);
    },
    [hasMore, isLoading, next, threshold, root, rootMargin]
  );

  const flattenChildren = useMemo(
    () => React.Children.toArray(children),
    [children]
  );

  return (
    <>
      {flattenChildren.map((child, index) => {
        if (!React.isValidElement(child)) {
          if (process.env.NODE_ENV === "development") {
            console.warn(
              "InfiniteScroll: children must be valid React elements"
            );
          }
          return child;
        }

        const isObserveTarget = reverse
          ? index === 0
          : index === flattenChildren.length - 1;
        const ref = isObserveTarget ? observerRef : null;

        {/*  @ts-ignore: Allow assigning ref dynamically */}
        return React.cloneElement(child, { ref });
      })}
    </>
  );
}
