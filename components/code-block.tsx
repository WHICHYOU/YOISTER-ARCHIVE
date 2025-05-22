"use client";

import { useLayoutEffect, useState, JSX } from "react";

type Props = {
  code: string | null;
  lang: string;
  initial?: JSX.Element;
  preHighlighted?: JSX.Element | null;
};

export default function CodeBlock({
  code,
  lang,
  initial,
  preHighlighted,
}: Props) {
  const [content, setContent] = useState<JSX.Element | null>(
    preHighlighted || initial || null
  );

  useLayoutEffect(() => {
    if (preHighlighted) {
      setContent(preHighlighted);
      return;
    }

    let isMounted = true;

    if (code) {
      const highlighted = (
        <pre
          className={`language-${lang} rounded-md bg-zinc-950 p-4 overflow-auto`}
        >
          <code className={`language-${lang}`}>{code}</code>
        </pre>
      );

      if (isMounted) setContent(highlighted);
    } else {
      setContent(
        <pre className="rounded-md bg-zinc-950 p-4 text-zinc-400">
          No code available
        </pre>
      );
    }

    return () => {
      isMounted = false;
    };
  }, [code, lang, preHighlighted]);

  return content ? (
    <div className="[&_code]:font-mono [&_code]:text-[13px] [&_pre]:leading-snug">
      {content}
    </div>
  ) : (
    <pre className="rounded-md bg-zinc-950 p-4">Loading...</pre>
  );
}
