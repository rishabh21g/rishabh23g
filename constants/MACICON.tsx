import React from "react";

export function MacTogglesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* top toggle */}
      <rect x="4" y="5" width="16" height="6" rx="3" />
      <circle cx="8" cy="8" r="1.7" />

      {/* bottom toggle */}
      <rect x="4" y="13" width="16" height="6" rx="3" />
      <circle cx="8" cy="16" r="1.7" />
    </svg>
  );
}