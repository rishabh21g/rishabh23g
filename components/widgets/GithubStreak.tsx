"use client";

import React, { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FiGithub } from "react-icons/fi";
import { AnimatePresence, motion, useDragControls } from "framer-motion";
import { useGithub } from "@/hooks/useGithub";

function levelForCount(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 6) return 2;
  if (count <= 12) return 3;
  return 4;
}

function cellClass(level: 0 | 1 | 2 | 3 | 4) {
  switch (level) {
    case 0:
      return "bg-muted/35 ring-1 ring-border/25";
    case 1:
      return "bg-primary/20 ring-1 ring-border/25";
    case 2:
      return "bg-primary/35 ring-1 ring-border/25";
    case 3:
      return "bg-primary/55 ring-1 ring-border/25";
    case 4:
      return "bg-primary/80 ring-1 ring-border/25";
  }
}

export default function GithubStreak() {
  const username = "rishabh21g";
  const dragControls = useDragControls();
  
  // Use extracted hook
  const { calendar } = useGithub(username);

  const monthLabels = useMemo(() => {
    if (!calendar) return [];
    return calendar.months
      .map((m) => {
        const idx = calendar.weeks.findIndex((w) => w.firstDay >= m.firstDay);
        return { name: m.name, weekIndex: Math.max(idx, 0) };
      })
      .filter((x, i, arr) => i === 0 || x.weekIndex !== arr[i - 1].weekIndex);
  }, [calendar]);

  return (
    <motion.div
      className="absolute right-7 bottom-24 z-40 "
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      style={{ touchAction: "none" }}
    >
      <AnimatePresence initial={true}>
        {calendar && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8, filter: "blur(8px)" }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.18, ease: "easeOut" },
            }}
          >
            <Card className="w-fit bg-card/80 backdrop-blur-3xl border border-border/30 shadow-sm">
              <div className="border-b border-border/30 bg-card/60 backdrop-blur-3xl rounded-t-xl">
                {/* Drag handle row */}
                <div
                  onPointerDown={(e) => dragControls.start(e.nativeEvent)}
                  className="
                    bg-transparent
                    flex items-center justify-center
                    py-2
                    cursor-grab active:cursor-grabbing
                    select-none
                  "
                >
                  <span className="h-0.5 w-12 rounded-full bg-primary/90" aria-hidden="true" />
                </div>

                {/* Info row */}
                <div
                  onPointerDown={(e) => dragControls.start(e.nativeEvent)}
                  className="flex items-center justify-between px-3 pb-2 select-none gap-8"
                >
                  <div className="flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap">
                    <FiGithub size={12} className="text-muted-foreground" />
                    <span>{username}</span>
                  </div>

                  <div className="text-xs text-muted-foreground whitespace-nowrap">
                    {`${calendar.totalContributions.toLocaleString()} contributions this year`}
                  </div>
                </div>
              </div>

              <CardContent className="p-[0.6rem] pt-0">
                {/* Month labels */}
                <div className="mb-2 grid grid-flow-col auto-cols-3 gap-0.75 pl-7">
                  {calendar.weeks.map((_, weekIndex) => {
                    const label = monthLabels.find((m) => m.weekIndex === weekIndex)?.name;
                    return (
                      <div key={weekIndex} className="h-3 text-xs text-muted-foreground/80 cursor-default">
                        {label ?? ""}
                      </div>
                    );
                  })}
                </div>

                <div className="flex">
                  {/* Heatmap grid: weeks as columns, 7 rows */}
                  <div className="grid grid-flow-col auto-cols-3 gap-0.75">
                    {calendar.weeks.map((week, weekIdx) => (
                      <div key={week.firstDay + weekIdx} className="grid grid-rows-7 gap-0.75">
                        {week.contributionDays.map((day) => {
                          const level = levelForCount(day.contributionCount);
                          return (
                            <div
                              key={day.date + day.weekday}
                              title={`${day.date}: ${day.contributionCount} contributions`}
                              className={`h-2 w-2 rounded-[3px] ${cellClass(level)} transition-colors duration-500`}
                            />
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}