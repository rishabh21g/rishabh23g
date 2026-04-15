"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ContributionCalendar } from "@/types/github";
import { FiGithub } from "react-icons/fi";
import { motion, useDragControls } from "framer-motion";

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
  const [calendar, setCalendar] = useState<ContributionCalendar | null>(null);

  const fetchContribution = async () => {
    const response = await fetch(`/api/github?user=${username}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to load Github streak!");
    }

    const data = (await response.json()) as ContributionCalendar;
    setCalendar(data);
  };

  useEffect(() => {
    fetchContribution().catch(console.error);
    // username is a constant, so no deps needed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <Card className="w-fit bg-background/20 backdrop-blur-3xl border border-border/30">
        <div className="border-b border-border/30 bg-background/10 backdrop-blur-3xl">
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
            className="flex items-center justify-between px-3 pb-2 select-none"
          >
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <FiGithub size={12} className="text-muted-foreground" />
              <span>{username}</span>
            </div>

            <div className="text-xs text-muted-foreground">
              {calendar
                ? `${calendar.totalContributions.toLocaleString()} contributions this year`
                : "Loading..."}
            </div>
          </div>
        </div>

        <CardContent className="p-2">
          {!calendar ? (
            <div className="h-24 w-200 rounded-md bg-muted/30" />
          ) : (
            <>
              {/* Month labels */}
              <div className="mb-2 grid grid-flow-col auto-cols-3 gap-0.75 pl-7">
                {calendar.weeks.map((_, weekIndex) => {
                  const label = monthLabels.find((m) => m.weekIndex === weekIndex)?.name;
                  return (
                    <div key={weekIndex} className="h-3 text-xs text-muted-foreground/80">
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
                            className={`h-2 w-2 rounded-[3px] ${cellClass(level)}`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}