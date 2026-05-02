"use client";

import React, { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FiGithub } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
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

export default function MobileGithubStreak() {
  const username = "rishabh21g";
  const { calendar, loading, error } = useGithub(username);

  const monthLabels = useMemo(() => {
    if (!calendar) return [];
    return calendar.months
      .map((m) => {
        const idx = calendar.weeks.findIndex((w) => w.firstDay >= m.firstDay);
        return { name: m.name, weekIndex: Math.max(idx, 0) };
      })
      .filter((x, i, arr) => i === 0 || x.weekIndex !== arr[i - 1].weekIndex);
  }, [calendar]);

  if (loading || error) return null;

  return (
    <div className="w-full mt-3">
      <AnimatePresence initial={true}>
        {calendar && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.3, ease: "easeOut" },
            }}
          >
            <Card className="w-full bg-card/40 backdrop-blur-3xl ring-0 border border-border/40 overflow-hidden rounded-md mx-auto">

              {/* Extremely tight scrollable heatmap area */}
              <CardContent className="p-2 sm:p-3 overflow-x-auto no-scrollbar">
                <div className="min-w-max">
                  {/* Tight Month labels */}
                  <div className="mb-1 grid grid-flow-col auto-cols-3 gap-0.5 pl-4">
                    {calendar.weeks.map((_, weekIndex) => {
                      const label = monthLabels.find((m) => m.weekIndex === weekIndex)?.name;
                      return (
                        <div key={weekIndex} className="h-2 text-[8px] leading-none text-muted-foreground/70">
                          {label ?? ""}
                        </div>
                      );
                    })}
                  </div>

                  {/* Compact Heatmap grid */}
                  <div className="flex">
                    <div className="grid grid-flow-col auto-cols-3 gap-1">
                      {calendar.weeks.map((week, weekIdx) => (
                        <div key={week.firstDay + weekIdx} className="grid grid-rows-7 gap-1">
                          {week.contributionDays.map((day) => {
                            const level = levelForCount(day.contributionCount);
                            return (
                              <div
                                key={day.date + day.weekday}
                                className={`h-2 w-2 rounded-[1.5px] ${cellClass(level)}`}
                              />
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}