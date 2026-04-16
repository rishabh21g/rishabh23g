"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, useDragControls } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ThemeId, THEMES } from "@/types/themes";

const STORAGE_KEY = "theme";

function applyThemeToBody(theme: ThemeId) {
  const body = document.body;
  body.classList.remove(...THEMES.map((t) => t.id));
  body.classList.add(theme);
  localStorage.setItem(STORAGE_KEY, theme);
}

export default function ThemeCard() {
  const dragControls = useDragControls();
  const [active, setActive] = useState<ThemeId>("theme-default");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as ThemeId | null;
    const initial = saved && THEMES.some((t) => t.id === saved) ? saved : "theme-default";
    setActive(initial);
    applyThemeToBody(initial);
  }, []);

  const activeLabel = useMemo(
    () => THEMES.find((t) => t.id === active)?.label ?? "DEFAULT",
    [active]
  );

  return (
    <motion.div
      className="absolute left-100 bottom-28 z-40"
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      style={{ touchAction: "none" }}
    >
      <Card className="w-[min(220px,calc(100vw-4rem))] bg-card/80 backdrop-blur-3xl border border-border/30">
        <CardContent className="p-0.5">
          {/* handle */}
          <div
            onPointerDown={(e) => dragControls.start(e.nativeEvent)}
            className="flex items-center justify-center pb-2 cursor-grab active:cursor-grabbing select-none"
          >
            <span className="h-0.5 w-12 rounded-full bg-primary/90" aria-hidden="true" />
          </div>

          {/* header */}
          <div className="flex items-center justify-between px-4 pb-3 select-none">
            <div className="text-[0.65rem] uppercase tracking-[0.35em] text-muted-foreground/70">
              THEME
            </div>
            <div className="text-[0.65rem] uppercase tracking-tighter text-muted-foreground/70">
              {activeLabel}
            </div>
          </div>

          {/* themes */}
          <div className="flex flex-wrap items-center gap-1.5 px-3 pb-4">
            {THEMES.map((t) => {
              const selected = t.id === active;

              return (
                <button
                  key={t.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => {
                    setActive(t.id);
                    applyThemeToBody(t.id);
                  }}
                  className={cn(
                    "rounded-md px-2 py-1 text-[0.65rem] uppercase tracking-tight transition-colors",
                    selected
                      ? "bg-foreground/10 text-foreground"
                      : "text-muted-foreground/70 hover:text-foreground/80 hover:bg-muted/20"
                  )}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}