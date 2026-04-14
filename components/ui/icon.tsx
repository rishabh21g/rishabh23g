import React, { useMemo, useRef, useState } from "react";
import { motion, type MotionValue, useSpring, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export interface DockIconProps {
  label: string;
  icon: LucideIcon;
  active?: boolean;
  onClick?: () => void;

  mouseX: MotionValue<number | null>;
}

export default function DockIcon({ label, icon: Icon, active, onClick, mouseX }: DockIconProps) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (x) => {
    if (x === null) return 9999;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return 9999;
    const center = rect.left + rect.width / 2;
    return x - center;
  });

  const absDistance = useTransform(distance, (d) => Math.abs(d));

  const rawScale = useTransform(absDistance, [0, 70, 140], [1.38, 1.18, 1]);
  const rawLift = useTransform(absDistance, [0, 70, 140], [12, 7, 0]);

  const scale = useSpring(rawScale, { stiffness: 600, damping: 35 });
  const lift = useSpring(rawLift, { stiffness: 600, damping: 35 });

  const isEmphasized = hovered || active;

  return (
    <div className="relative flex flex-col items-center gap-1">
      {/* Tooltip */}
      <div
        className={cn(
          "pointer-events-none absolute -top-9",
          "rounded-md border border-border/40 bg-popover/80 px-2 py-1",
          "text-xs font-medium tracking-wide text-primary backdrop-blur",
          "transition-all duration-150",
          hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
        )}
      >
        {label}
      </div>

      <motion.div
        ref={ref}
        style={{ scale, y: useTransform(lift, (v) => -v), transformOrigin: "center bottom" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="flex flex-col items-center will-change-transform"
      >
        <Button
          type="button"
          aria-label={label}
          onClick={onClick}
          variant="ghost"
          size="icon-lg"
          className={cn(
            "h-10 w-10 rounded-xl p-1.5",
            "bg-muted/40 ring-1 ring-border/30 backdrop-blur-md",
            "hover:bg-muted/55",
            isEmphasized ? "text-primary" : "text-muted-foreground/70"
          )}
        >
          <Icon className="h-5 w-5" />
        </Button>

        <div className={cn("mt-1 h-1 w-1 rounded-full bg-primary", active ? "opacity-100" : "opacity-0")} />
      </motion.div>
    </div>
  );
}