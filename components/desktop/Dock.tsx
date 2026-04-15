"use client";

import React from "react";
import { APPS, type DockAppId } from "@/types/dock";
import DockIcon from "@/components/ui/icon";
import { motion, useMotionValue } from "framer-motion";

type DockProps = {
  activeIds: Set<DockAppId>;
  onToggle: (id: DockAppId) => void;
};

export default function Dock({ activeIds, onToggle }: DockProps) {
  const mouseX = useMotionValue<number | null>(null);

  return (
    <div className="fixed bottom-6 left-0 right-0 z-100 flex justify-center">
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
            onClick={() => onToggle(app.id)}
            mouseX={mouseX}
          />
        ))}
      </motion.div>
    </div>
  );
}