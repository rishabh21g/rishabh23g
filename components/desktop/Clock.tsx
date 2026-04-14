"use client";

import React, { useEffect, useState } from "react";

export function Clock() {
  const [time, setTime] = useState<Date | undefined>(new Date());

  useEffect(() => {

    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000 *60);

    return () => clearInterval(timer);
  }, []);



  const formattedTime = time?.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });

  const formattedDate = time?.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "2-digit",
  });

  return (
    <div className="flex items-center gap-2 text-sm text-primary tabular-nums">
      <span >{formattedDate}</span>
      <span className="text-primary/80">{formattedTime}</span>
    </div>
  );
}
