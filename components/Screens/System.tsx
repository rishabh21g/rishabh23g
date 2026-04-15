import React from "react";
import { RESUME } from "@/constants/RESUME";

export default function System() {
  return (
    <section className="flex h-full flex-col  w-full">

      <div className="mt-4 space-y-4 overflow-y-auto max-h-80 w-full">
        {RESUME.systems.map((section) => (
          <div key={section.title}>
            <div className="text-[0.6rem] uppercase tracking-tighter text-muted-foreground/50">
              {section.title}
            </div>

            <div className="mt-3 h-px w-full bg-border/30" />

            <div className="mt-2 ">
              {section.items.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between gap-6 py-3 border-b border-border/20"
                >
                  <div className="text-sm text-foreground/90">{item.name}</div>
                  <div className="text-xs text-muted-foreground/60 text-right">
                    {item.meta}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}