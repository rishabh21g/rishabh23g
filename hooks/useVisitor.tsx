"use client";

import { useState, useCallback } from "react";

type VisitorCounts = { totalVisits: number; uniqueVisitors: number };

export function useVisitor() {
  const [counts, setCounts] = useState<VisitorCounts | null>(null);

  // By passing `increment: true`, we can easily control which component 
  // triggers the actual POST request versus just fetching the current count.
  const fetchVisits = useCallback(async (increment = false) => {
    try {
      if (increment) {
        await fetch("/api/visitors", { method: "POST" });
      }
      
      const res = await fetch("/api/visitors", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setCounts(data);
      } else {
        console.error("Failed to load visitors");
      }
    } catch (error) {
      console.error("Error fetching visitors:", error);
    }
  }, []);

  return { counts, fetchVisits };
}