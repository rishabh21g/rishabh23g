import React from "react";

/**
 * Renders a resume line, underlining anything wrapped in **double asterisks**.
 * Keeps the data in RESUME.ts as plain strings while letting key points stand out.
 */
export function Highlighted({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <span
            key={i}
            className="text-foreground/90 underline decoration-border/60 decoration-1 underline-offset-[3px]"
          >
            {part.slice(2, -2)}
          </span>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      )}
    </>
  );
}
