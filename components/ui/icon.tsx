"use client";

import type { LucideIcon } from "lucide-react";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface DockIconProps {
  label: string;          // tooltip text (use uppercase labels like screenshot)
  icon: LucideIcon;
  active?: boolean;       // show dot under icon
  onClick?: () => void;
}

export default function DockIcon({ label, icon: Icon, active, onClick }: DockIconProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative flex flex-col items-center">
      {/* Tooltip */}
      <div
        className={cn(
          "pointer-events-none absolute -top-9",
          "rounded-md border border-border/40 bg-popover/80 px-2 py-1",
          "text-[11px] font-medium tracking-wide text-primary backdrop-blur",
          "transition-all duration-150",
          hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
        )}
      >
        {label}
      </div>

      {/* Icon tile */}
      <button
        type="button"
        aria-label={label}
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          "grid place-items-center",
          "h-10 w-10 rounded-xl",
          "bg-muted/40 ring-1 ring-border/30",
          "backdrop-blur-md",
          "transition-colors",
          "hover:bg-muted/55"
        )}
      >
        <Icon className="h-5 w-5 text-primary" />
      </button>

      {/* Dot indicator (only when active) */}
      <div className={cn("mt-1 h-1 w-1 rounded-full bg-primary", active ? "opacity-100 " : "opacity-0")} />
    </div>
  );
}