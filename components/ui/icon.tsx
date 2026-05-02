import React, { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  type MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export interface DockIconProps {
  label: string;
  icon: LucideIcon;
  active?: boolean;
  onClick?: () => void;
  mouseX: MotionValue<number>;
  baseSize?: number;
  maxSize?: number;
  distanceThreshold?: number;
}

export default function DockIcon({
  label,
  icon: Icon,
  active,
  onClick,
  mouseX,
  baseSize = 48, // Equivalent to h-12 w-12
  maxSize = 72,
  distanceThreshold = 120,
}: DockIconProps) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  // Layout-based distance calculation
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Calculate dynamic size instead of CSS scale
  const sizeTransform = useTransform(
    distance,
    [-distanceThreshold, 0, distanceThreshold],
    [baseSize, maxSize, baseSize]
  );
  
  // Spring physics for smooth settling
  const size = useSpring(sizeTransform, { 
    mass: 0.1, 
    stiffness: 200, 
    damping: 14 
  });

  return (
    <div className="relative flex flex-col items-center gap-1">
      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className={cn(
              "absolute bottom-full mb-2 whitespace-nowrap",
              "rounded-md bg-popover/80 px-2 py-1",
              "text-xs font-medium tracking-wide text-primary backdrop-blur z-85",
              "border border-border/30 shadow-lg pointer-events-none"
            )}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dock Icon Button */}
      <motion.button
        ref={ref}
        type="button"
        aria-label={label}
        style={{ width: size, height: size }}
        className={cn(
          "rounded-xl flex items-center justify-center p-2 mb-1",
          "bg-muted/30 backdrop-blur-md shadow-2xl border border-border/10",
          "focus:outline-none ",
          active || hovered ? "text-primary" : "text-muted-foreground/70"
        )}
        whileTap={{ scale: 0.88 }}
        onClick={onClick}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
      >
        {/* Fill to the container size maintaining padding */}
        <Icon className="w-1/2 h-1/2" />
      </motion.button>

      {/* Active Indicator */}
      <span
        className="w-1 h-1 rounded-full absolute -bottom-1"
        style={{
          background: active ? "var(--primary)" : "transparent",
          transition: "background 0.2s",
        }}
      />
    </div>
  );
}