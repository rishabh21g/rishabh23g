import React, { useRef, useState } from "react";
import {
  animate,
  motion,
  type MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export interface DockIconProps {
  label: string;
  icon: LucideIcon;
  active?: boolean;
  onClick?: () => void;

  mouseX: MotionValue<number | null>;

  // Tuning knobs (optional)
  radius?: number;
  maxScale?: number;
}

export default function DockIcon({
  label,
  icon: Icon,
  active,
  onClick,
  mouseX,
  radius = 140,
  maxScale = 1.38,
}: DockIconProps) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Cursor distance from the icon center
  const distance = useTransform(mouseX, (x) => {
    if (x === null) return 9999;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return 9999;
    const center = rect.left + rect.width / 2;
    return x - center;
  });

  const absDistance = useTransform(distance, (d) => Math.abs(d));

  // Proximity magnification (macOS-like)
  const rawScale = useTransform(
    absDistance,
    [0, radius * 0.5, radius],
    [maxScale, (maxScale + 1) / 2, 1]
  );
  const rawLift = useTransform(absDistance, [0, radius * 0.5, radius], [12, 7, 0]);

  const proximityScale = useSpring(rawScale, { stiffness: 600, damping: 35 });
  const proximityLift = useSpring(rawLift, { stiffness: 600, damping: 35 });

  // Subtle bounce on hover (additive to lift)
  const bounce = useMotionValue(0);

  // Press-down click animation (multiplicative with proximity scale)
  const press = useMotionValue(1);

  const combinedScale = useTransform<number, number>(
    [proximityScale, press],
    ([s, p]) => s * p
  );
  const combinedY = useTransform<number, number>(
    [proximityLift, bounce],
    ([lift, b]) => -(lift + b)
  );
  const y = useSpring(combinedY, { stiffness: 600, damping: 35 });

  const isEmphasized = hovered || active;

  const runBounce = async () => {
    bounce.set(0);

    await animate(bounce, 7, {
      type: "spring",
      stiffness: 700,
      damping: 18,
      mass: 0.4,
    });

    await animate(bounce, 0, {
      type: "spring",
      stiffness: 700,
      damping: 18,
      mass: 0.4,
    });
  };

  const pressIn = () => {
    animate(press, 0.94, { type: "spring", stiffness: 700, damping: 30, mass: 0.2 });
  };

  const pressOut = () => {
    animate(press, 1, { type: "spring", stiffness: 700, damping: 30, mass: 0.2 });
  };

  return (
    <div className="relative flex flex-col items-center gap-1">
      {/* Tooltip */}
      <div
        className={cn(
          "pointer-events-none absolute -top-16  whitespace-nowrap",
          "rounded-md border border-border/40 bg-popover/80 px-2 py-1",
          "text-xs font-medium tracking-wide text-primary backdrop-blur",
          "transition-all duration-150 z-85",
          hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
        )}
      >
        {label}
      </div>

      <motion.div
        ref={ref}
        style={{ scale: combinedScale, y, transformOrigin: "center bottom" }}
        onPointerEnter={() => {
          setHovered(true);
          runBounce();
        }}
        onPointerLeave={() => setHovered(false)}
        className="flex flex-col items-center will-change-transform"
      >
        <Button
          type="button"
          aria-label={label}
          onClick={onClick}
          onPointerDown={pressIn}
          onPointerUp={pressOut}
          onPointerCancel={pressOut}
          variant="ghost"
          size="icon-lg"
          className={cn(
            "h-10 w-10 rounded-xl p-3",
            "bg-muted/90 ring-1 ring-border/30 backdrop-blur-md",
            "hover:bg-muted/55",
            isEmphasized ? "text-primary" : "text-muted-foreground/70"
          )}
        >
          <Icon className="h-6 w-6" />
        </Button>

        <div className={cn("mt-1 h-1 w-1 rounded-full bg-primary", active ? "opacity-100" : "opacity-0")} />
      </motion.div>
    </div>
  );
}