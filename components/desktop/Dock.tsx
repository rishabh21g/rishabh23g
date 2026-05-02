"use client";

import React from "react";
import { APPS, type DockApp, type DockAppId } from "@/types/dock";
import DockIcon from "@/components/ui/icon";
import { motion, useMotionValue } from "framer-motion";

type DockProps = {
  activeIds: Set<DockAppId>;
  onToggle: (id: DockAppId) => void;
  apps?: DockApp[];
  className?: string;
};

export default function Dock({
  activeIds,
  onToggle,
  apps = APPS,
  className,
}: DockProps) {
  const mouseX = useMotionValue(Infinity);

  return (
    <nav className="fixed bottom-6 left-0 right-0 z-80 flex justify-center mx-2 pointer-events-none">
      <motion.div
        className={[
          "relative flex items-end gap-2 rounded-2xl px-3 pb-2 pt-2.5 pointer-events-auto",
          "bg-card/70 backdrop-blur-3xl shadow-[0_8px_32px_rgba(0,0,0,0.3)]",
          "border border-border/30",
          className ?? "",
        ].join(" ")}
        // Listen to mouse movement over the container
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
      >
        {apps.map((app) => (
          <DockIcon
            key={app.id}
            label={app.label}
            icon={app.icon}
            active={activeIds.has(app.id)}
            onClick={() => onToggle(app.id)}
            mouseX={mouseX}
            baseSize={48}
            maxSize={72}
            distanceThreshold={120}
          />
        ))}
      </motion.div>
    </nav>
  );
}