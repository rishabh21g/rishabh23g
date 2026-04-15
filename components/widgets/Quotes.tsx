"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

type Quote = { text: string; author?: string };

export default function Quotes() {
  const dragControls = useDragControls();

  const quotes: Quote[] = useMemo(
    () => [
      {
        text:
          "If you want to be happy, eliminate the fear of a bad future and the memory of a bad past.",
      },
      { text: "Discipline is choosing what you want most over what you want now." },
      { text: "Consistency beats intensity." },
      { text: "Make it work, then make it right, then make it fast." },
      { text: "Small steps, every day." },
      { text: "Focus on the process. Results follow." },
    ],
    []
  );

  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (quotes.length <= 1) return;
    const id = window.setInterval(() => {
      setIdx((i) => (i + 1) % quotes.length);
    }, 6000);
    return () => window.clearInterval(id);
  }, [quotes.length]);

  const q = quotes[idx];

  return (
    <motion.div
      className="absolute right-8 top-14 z-40"
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
          <div className="px-4 pb-2 select-none">
            <div className="text-[0.65rem] uppercase tracking-[0.35em] text-muted-foreground/70">
              QUOTES
            </div>
          </div>

          {/* slider */}
          <div className="px-3 pb-2">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0, transition: { duration: 0.22, ease: "easeOut" } }}
                exit={{ opacity: 0, x: -10, transition: { duration: 0.18, ease: "easeIn" } }}
                className="min-h-6"
              >
                <div className="text-sm text-center leading-relaxed text-foreground/85">
                  {q.text}
                </div>
                {q.author ? (
                  <div className="mt-2 text-xs text-muted-foreground/60">
                    — {q.author}
                  </div>
                ) : null}
              </motion.div>
            </AnimatePresence>

            {/* subtle progress dots (minimal) */}
            <div className="mt-3 flex items-center gap-1.5 justify-center">
              {quotes.map((_, i) => (
                <span
                  key={i}
                  className={[
                    "h-1 w-1 rounded-full transition-opacity",
                    i === idx ? "bg-primary/80 opacity-90" : "bg-muted/60 opacity-90",
                  ].join(" ")}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}