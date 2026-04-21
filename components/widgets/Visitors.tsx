"use client";

import React, { useEffect, useState } from "react";
import { motion, useDragControls } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useVisitor } from "@/hooks/useVisitor";


export default function Visitors() {
  const dragControls = useDragControls();
  const {counts, fetchVisits} = useVisitor()




  useEffect(() => {
    fetchVisits(true)
  }, []);

  return (
    <motion.div
      className="absolute left-8 bottom-46 z-40"
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      style={{ touchAction: "none" }}
    >
      <Card className="w-44 bg-card/80 backdrop-blur-3xl border border-border/30">
        <CardContent className="p-0.5">
          {/* handle */}
          <div
            onPointerDown={(e) => dragControls.start(e.nativeEvent)}
            className="flex items-center justify-center pb-2 cursor-grab active:cursor-grabbing select-none"
          >
            <span
              className="h-0.5 w-12 rounded-full bg-primary/90"
              aria-hidden="true"
            />
          </div>

          {/* content */}
          <div className="text-center select-none">
            <div className="text-[0.65rem] uppercase tracking-[0.35em] text-muted-foreground/50 ">
              VISITORS
            </div>

            <div className="mt-1 text-4xl font-semibold text-foreground tabular-nums">
              {counts ? counts.totalVisits : "_"}
            </div>

            <div className="mt-1 text-sm text-muted-foreground/60">
              total visits
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>

  );
}