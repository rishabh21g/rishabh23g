"use client";

import React, { useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { useVisitor } from "@/hooks/useVisitor";

export function VisitorCount() {
  const { counts, fetchVisits } = useVisitor();

  useEffect(() => {
    fetchVisits(false); 
  }, [fetchVisits]);

  if (!counts) return null;

  return (
    <div className="flex items-center gap-1 text-xs">
      <ArrowUp className="w-3 h-3" />
      <span>{counts.totalVisits + 1}</span>
    </div>
  );
}