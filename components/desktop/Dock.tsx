"use client";

import React from "react";
import { APPS } from "@/types/dock";
import DockIcon from "@/components/ui/icon";

export default function Dock() {
  // demo: mark some apps active (replace with your window manager state)
  const activeIds = new Set<string>(["contact"]);

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center">
      <div
        className="
          flex items-end gap-1 mx-2
          rounded-2xl
          bg-background/20 backdrop-blur-3xl
          border border-border/30
          p-3
        "
      >
        {APPS.map((app) => (
          <DockIcon
            key={app.id}
            label={app.label}
            icon={app.icon}
            active={activeIds.has(app.id)}
            onClick={() => console.log(app.id)}
          />
        ))}

        </div>
    </div>
  );
}