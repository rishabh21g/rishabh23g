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
      className="absolute left-8 bottom-48 z-40"
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      style={{ touchAction: "none" }}
    >
      <Card className="w-[min(320px,calc(100vw-4rem))] bg-background/20 backdrop-blur-3xl border border-border/30">
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
            <div className="text-[0.65rem] uppercase tracking-[0.35em] text-muted-foreground/70">
              {activeLabel}
            </div>
          </div>

          {/* tiles */}
          <div className="flex items-center gap-2 px-2 pb-4">
            {THEMES.slice(0, 4).map((t) => {
              const selected = t.id === active;

              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setActive(t.id);
                    applyThemeToBody(t.id);
                  }}
                  className="group text-left"
                >
                  <div
                    className={cn(
                      "relative h-10 w-10 rounded-xl ring-1 ring-border/30 bg-muted/25 overflow-hidden",
                      selected ? "ring-2 ring-foreground/60" : "hover:bg-muted/35"
                    )}
                  >
                    {/* simple “cover” look using gradients, no new assets */}
                    <div
                      className={cn(
                        "absolute inset-0 opacity-90",
                        t.id === "theme-default" && "bg-linear-to-br from-muted/40 to-muted/10",
                        t.id === "theme-logic" && "bg-linear-to-br from-primary/35 to-muted/10",
                        t.id === "theme-midnight" && "bg-linear-to-br from-muted/50 to-background/10",
                        t.id === "theme-weeknd" && "bg-linear-to-br from-primary/40 to-muted/10"
                      )}
                    />
                    <div className="absolute inset-0 ring-1 ring-border/20 rounded-xl" />

                    {/* bottom-right dot like screenshot */}
                    <div
                      className={cn(
                        "absolute bottom-2 right-2 h-2 w-2 rounded-full bg-foreground transition-opacity",
                        selected ? "opacity-80" : "opacity-0 group-hover:opacity-40"
                      )}
                    />
                  </div>

                  <div className="mt-2 text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground/60">
                    {t.label}
                  </div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}