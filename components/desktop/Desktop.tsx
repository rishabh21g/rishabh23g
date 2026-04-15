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

const REGISTRY: Record<DockAppId, { title: string; Component: React.ComponentType }> = {
  about: { title: "ABOUT", Component: About },
  contact: { title: "CONTACT", Component: Contact },
  experience: { title: "EXPERIENCE", Component: Experience },
  terminal: { title: "TERMINAL", Component: Terminal },
  resume: { title: "RESUME", Component: Resume },
  system: { title: "SYSTEM", Component: System },
  notes: { title: "NOTES", Component: Notes },
};

const DEFAULT_POS: Record<DockAppId, { left: number; top: number }> = {
  about: { left: 520, top: 50 },
  experience: { left: 110, top: 130 },
  contact: { left: 260, top: 140 },
  terminal: { left: 140, top: 180 },
  resume: { left: 220, top: 200 },
  system: { left: 300, top: 180 },
  notes: { left: 340, top: 120 },
};

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
    <>
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
    </>
  );
}