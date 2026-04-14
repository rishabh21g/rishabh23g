"use client";
import React, { useEffect, useState } from "react";
import { Calendar } from "../ui/calendar";
import { Card, CardContent } from "../ui/card";

export default function CalendarComp() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeZone, setTimeZone] = useState<string | undefined>(undefined);

  useEffect(() => {
    setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  return (
    <Card
      className="
        mx-auto w-fit p-0
        bg-background/20 backdrop-blur-3xl
        border border-border/30
        ring-1 ring-foreground/10
      "
    >
      <CardContent className="p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          timeZone={timeZone}
          showWeekNumber
          className="bg-transparent"
          classNames={{
            month_caption: "text-foreground/80",
            weekday: "text-muted-foreground/70",
            week_number: "text-muted-foreground/60",
            button_previous: "text-foreground/70 hover:text-foreground",
            button_next: "text-foreground/70 hover:text-foreground",
          }}
        />
      </CardContent>
    </Card>
  );
}