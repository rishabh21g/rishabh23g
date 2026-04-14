"use client";

import React, { useEffect, useState } from "react";
import { motion, useDragControls } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

type VisitorCounts = { totalVisits: number; uniqueVisitors: number };

export default function Visitors() {
  const dragControls = useDragControls();
  const [counts, setCounts] = useState<VisitorCounts | null>(null);

   const fetchVisits = async () => {
      await fetch("/api/visitors", { method: "POST" }); 
      const res = await fetch("/api/visitors", { cache: "no-store" });
      const data = await res.json()
      setCounts(data)
      if (!res.ok) throw new Error("Failed to load visitors");
    };
    

  useEffect(() => {
    fetchVisits().catch(console.error);
  }, []);

  return (
   <motion.div
      className="absolute left-80 top-16 z-40"
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      style={{ touchAction: "none" }}
    >
      <Card className="w-44 bg-background/20 backdrop-blur-3xl border border-border/30">
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
            <div className="text-xs tracking-tighter text-muted-foreground/50 ">
              VISITORS
            </div>

            <div className="mt-1 text-4xl font-semibold text-foreground tabular-nums">
              {counts ? counts.totalVisits.toLocaleString() : "_"}
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