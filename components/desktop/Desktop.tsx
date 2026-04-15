"use client";

import React, { useMemo, useState } from "react";
import type { DockAppId } from "@/types/dock";
import Dock from "@/components/desktop/Dock";
import MenuBar from "@/components/desktop/MenuBar";
import Window from "@/components/desktop/Window";

import About from "@/components/Screens/About";
import Contact from "@/components/Screens/Contact";
import Experience from "@/components/Screens/Experience";
import Terminal from "@/components/Screens/Terminal";
import Resume from "@/components/Screens/Resume";
import System from "@/components/Screens/System";
import Notes from "@/components/Screens/Notes";
import { DEFAULT_POS,  REGISTRY,  } from "@/types/desktop";



export default function Desktop() {
  // About first (open by default)
  const [stack, setStack] = useState<DockAppId[]>(["about"]); // last = on top

  const activeId = stack[stack.length - 1];

  const activeIds = useMemo(() => new Set(stack), [stack]);

  const toggleApp = (id: DockAppId) => {
    setStack((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

   const focusApp = (id: DockAppId) => {
    setStack((prev) => (prev.includes(id) ? [...prev.filter((x) => x !== id), id] : prev));
  };

  return (
    <div className="w-full h-full">
      <MenuBar />

      {stack.map((id, idx) => {
        const { title, Component } = REGISTRY[id];
        return (
          <Window
            key={id}
            title={title}
            defaultPosition={DEFAULT_POS[id]}
            zIndex={60 + idx}
            isActive={id === activeId}
            onClose={() => toggleApp(id)}
            onFocus={() => focusApp(id)}
          >
            <Component />
          </Window>
        );
      })}

      <Dock activeIds={activeIds} onToggle={toggleApp} />
    </div>
  );
}