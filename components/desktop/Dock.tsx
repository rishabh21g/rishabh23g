"use client";

import React from "react";
import { APPS, type DockApp, type DockAppId } from "@/types/dock";
import DockIcon from "@/components/ui/icon";
import { motion, useMotionValue } from "framer-motion";


type DockProps = {
  activeIds: Set<DockAppId>;
  onToggle: (id: DockAppId) => void;

  // Reusable/customizable (optional)
  apps?: DockApp[];
  radius?: number;
  maxScale?: number;
  className?: string;
};

export default function Dock({
  activeIds,
  onToggle,
  apps = APPS,
  radius = 140,
  maxScale = 1.38,
  className,
}: DockProps) {
  const mouseX = useMotionValue<number | null>(null);

  return (
    <div className="fixed bottom-6 left-0 right-0 z-80 flex justify-center">
      <motion.div
        onPointerMove={(e) => mouseX.set(e.clientX)}
        onPointerLeave={() => mouseX.set(null)}
        className={[
          "relative flex items-end gap-1 mx-2 rounded-2xl p-3",
          "bg-background/20 backdrop-blur-2xl",
          "border border-border/30",
          "before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl",
          "before:bg-linear-to-b before:from-background/35 before:to-transparent before:opacity-70",
          className ?? "",
        ].join(" ")}
      >
        {apps.map((app) => (
          <DockIcon
            key={app.id}
            label={app.label}
            icon={app.icon}
            active={activeIds.has(app.id)}
            onClick={() => onToggle(app.id)}
            mouseX={mouseX}
            radius={radius}
            maxScale={maxScale}
          />
        ))}
      </motion.div>
    </div>
  );
}