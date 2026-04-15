"use client";

import React from "react";
import { motion, useDragControls } from "framer-motion";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { WindowProps } from "@/types/window";



export default function Window({
  title,
  children,
  defaultPosition,
  zIndex,
  isActive,
  onClose,
  onFocus,
  className,
}: WindowProps) {
  const dragControls = useDragControls();

  return (
    <motion.div
      className={cn("absolute", className)}
      style={{ left: defaultPosition.left, top: defaultPosition.top, zIndex }}
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      onPointerDown={onFocus}
      onMouseDown={onFocus}
      initial={{ opacity: 0, scale: 0.95, y: 8, filter: "blur(8px)" }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.18, ease: "easeOut" },
      }}
      exit={{
        opacity: 0,
        scale: 0.98,
        y: 8,
        filter: "blur(8px)",
        transition: { duration: 0.14, ease: "easeIn" },
      }}
    >
      <Card
        className={cn(
          "max-h-2/4 overflow-hidden",
          "bg-card/85 backdrop-blur-3xl border border-border/30 shadow-none",
          "py-1 gap-0",
          isActive ? "ring-1 ring-border/60  shadow-accent" : "ring-1 ring-border/20"
        )}
      >
        <div
          onPointerDown={(e) => dragControls.start(e.nativeEvent)}
          className={cn(
            "relative flex items-center px-3 py-2 select-none",
            "border-b border-border/30 bg-card/60 backdrop-blur-3xl",
            "cursor-grab active:cursor-grabbing"
          )}
        >
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Close window"
              className={cn(
                "h-2 w-2 rounded-full transition",
                isActive ? "bg-destructive/70" : "bg-destructive/30 opacity-60"
              )}
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
            />
            <span className="h-2 w-2 rounded-full bg-muted/40" aria-hidden="true" />
            <span className="h-2 w-2 rounded-full bg-muted/40" aria-hidden="true" />
          </div>

          <div className="pointer-events-none  absolute left-1/2 -translate-x-1/2 text-[0.6rem] tracking-[0.2em] text-muted-foreground">
            {title}
          </div>

          <div className="ml-auto w-10" aria-hidden="true" />
        </div>

        <div className={cn("p-6 overflow-auto", "contentClassName")}>{children}</div>
      </Card>
    </motion.div>
  );
}