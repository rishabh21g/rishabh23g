"use client";

import React, { useEffect, useState } from "react";

export function Clock() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setMounted(true);
    setTime(new Date());

    const timer = setInterval(() => {
      setTime(new Date());
    }, 60_000);

    return () => clearInterval(timer);
  }, []);

  // Prevent SSR/CSR mismatch (don’t render date/time until client mounts)
  if (!mounted || !time) {
    return <div className="text-sm text-foreground/80 tabular-nums">—</div>;
  }

  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });

  const formattedDate = time.toLocaleDateString("en-US", {
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
