"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ContributionCalendar, ContributionWeek } from "@/types/github";



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
  const username = "YOUR_GITHUB_USERNAME";

  const [calendar, setCalendar] = useState<ContributionCalendar | null>(null);

  useEffect(() => {
    // Replace this with your API call (see section 2).
    // For now: minimal fallback layout so you can see the UI.
    const weeks: ContributionWeek[] = Array.from({ length: 20 }).map((_, w) => ({
      firstDay: `2026-01-${String(w + 1).padStart(2, "0")}`,
      contributionDays: Array.from({ length: 7 }).map((__, d) => ({
        date: `2026-01-${String(w + 1).padStart(2, "0")}`,
        weekday: d,
        contributionCount: (w * d) % 13,
      })),
    }));

    setCalendar({
      totalContributions: 1538,
      weeks,
      months: [
        { name: "Jan", firstDay: "2026-01-01", totalWeeks: 4 },
        { name: "Feb", firstDay: "2026-02-01", totalWeeks: 4 },
      ],
    });
  }, []);

  const monthLabels = useMemo(() => {
    if (!calendar) return [];
    // Place month label above the week column where the month starts.
    // GitHub provides firstDay; we find the first week with firstDay >= month.firstDay.
    return calendar.months
      .map((m) => {
        const idx = calendar.weeks.findIndex((w) => w.firstDay >= m.firstDay);
        return { name: m.name, weekIndex: Math.max(idx, 0) };
      })
      .filter((x, i, arr) => i === 0 || x.weekIndex !== arr[i - 1].weekIndex);
  }, [calendar]);

  if (!calendar) {
    return (
      <Card className="w-170 bg-background/20 backdrop-blur-3xl border border-border/30">
        <CardContent className="p-4">
          <div className="h-24 w-full rounded-md bg-muted/30" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-170 bg-background/20 backdrop-blur-3xl border border-border/30">
      <CardContent className="p-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="text-xs text-muted-foreground">{username}</div>
          <div className="text-xs text-muted-foreground">
            {calendar.totalContributions.toLocaleString()} contributions this year
          </div>
        </div>

        {/* Month labels */}
        <div className="mb-2 grid grid-flow-col auto-cols-3 gap-0.75 pl-7">
          {calendar.weeks.map((_, weekIndex) => {
            const label = monthLabels.find((m) => m.weekIndex === weekIndex)?.name;
            return (
              <div key={weekIndex} className="h-4 text-[10px] text-muted-foreground/80">
                {label ?? ""}
              </div>
            );
          })}
        </div>

        <div className="flex">
          {/* Left day labels (subtle, like GitHub) */}
          <div className="mr-2 w-6.5 pt-2.5 text-[10px] text-muted-foreground/70">
            <div className="h-3" />
            <div className="h-3" />
            <div className="h-3">Mon</div>
            <div className="h-3" />
            <div className="h-3">Wed</div>
            <div className="h-3" />
            <div className="h-3">Fri</div>
          </div>

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
                      className={`h-3 w-3 rounded-[3px] ${cellClass(level)}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}