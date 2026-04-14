"use client";

import React, { useMemo, useState } from "react";
import { APPS } from "@/types/dock";
import DockIcon from "@/components/ui/icon";
import { motion, useMotionValue } from "framer-motion";

export default function Dock() {
  const activeIds = useMemo(() => new Set<string>(["contact"]), []);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const mouseX = useMotionValue<number | null>(null);

  const scaleFor = (index: number) => {
    if (hoveredIndex === null) return 1;
    const d = Math.abs(index - hoveredIndex);
    if (d === 0) return 1.35;
    if (d === 1) return 1.18;
    if (d === 2) return 1.08;
    return 1;
  };

  const liftFor = (index: number) => {
    if (hoveredIndex === null) return 0;
    const d = Math.abs(index - hoveredIndex);
    if (d === 0) return 10;
    if (d === 1) return 6;
    if (d === 2) return 3;
    return 0;
  };

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(null)}
        className="
          flex items-end gap-1 mx-2 rounded-2xl p-3
          bg-background/20 backdrop-blur-3xl
          border border-border/30
        "
      >
        {APPS.map((app) => (
        <DockIcon
          key={app.id}
          label={app.label}
          icon={app.icon}
          active={activeIds.has(app.id)}
          onClick={() => console.log(app.id)}
          mouseX={mouseX}
        />
      ))}
      </motion.div>
    </div>
  );
}