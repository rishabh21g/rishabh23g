"use client";

import React, { useEffect, useState } from "react";
import { Calendar } from "../ui/calendar";
import { Card, CardContent } from "../ui/card";
import { motion, useDragControls } from "framer-motion";
import { CalendarDays } from "lucide-react";

export default function CalendarComp() {
  const dragControls = useDragControls();

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeZone, setTimeZone] = useState<string | undefined>(undefined);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  useEffect(() => {
    setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      className="absolute right-8 top-56 z-40"
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      style={{ touchAction: "none" }}
    >
      <Card className="w-fit bg-card/80 backdrop-blur-3xl border border-border/30">
        <div
          onPointerDown={(e) => dragControls.start(e.nativeEvent)}
          className="
            flex items-center justify-center
             py-2
            bg-card/60 backdrop-blur-3xl
            cursor-grab active:cursor-grabbing
            select-none
          "
        >
          <span className="bg-primary/90 w-12 h-0.5 rounded-full" aria-hidden="true"></span>
        </div>

        <CardContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            timeZone={timeZone}
            showOutsideDays={false}
            className="
              p-1
              text-xs
              [--cell-size:--spacing(7)]
              [--cell-radius:var(--radius-sm)]
            "
            classNames={{
              months: "relative flex flex-col gap-1",
              month: "flex w-full flex-col gap-2",
              week: "mt-1 flex w-full",

              weekdays: "flex w-full",
              weekday: "flex-1 text-center text-[10px] font-normal text-muted-foreground/70 select-none",

              month_caption: "flex h-8 w-full items-center justify-center px-8",
              caption_label: "text-xs text-muted-foreground select-none",
              nav: "absolute inset-x-0 top-0 flex w-full items-center justify-between px-2",

              today: "rounded-[var(--radius-sm)] bg-primary/20 ring-1 ring-border/25 text-foreground",
              day_button:
                "hover:bg-primary/20 hover:text-foreground dark:hover:text-foreground [&>span]:text-[10px] [&>span]:opacity-70",
            }}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
}