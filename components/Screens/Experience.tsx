import React from "react";
import { RESUME } from "@/constants/RESUME";

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-muted/20 ring-1 ring-border/25 px-2.5 py-1 text-[0.65rem] text-muted-foreground/70">
      {children}
    </span>
  );
}

export default function Experience() {
  const { experience } = RESUME;

  return (
    <section className="w-140 max-w-[92vw] max-h-[55vh] overflow-y-auto pr-2">
      <div className="text-[0.7rem] uppercase tracking-[0.25em] text-muted-foreground/60">
        Experience
      </div>

      <div className="mt-4 h-px w-full bg-border/30" />

      <div className="mt-4">
        {experience.map((job, idx) => {
          // Using the specific techTags from RESUME.ts instead of extracting them
          const tags = job.techTags || [];

          return (
            <div key={`${job.company}-${job.role}-${job.start}`} className="py-6">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-foreground/90">
                    {job.company}{" "}
                    <span className="font-normal text-muted-foreground/60">— {job.role}</span>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground/60">{job.location}</div>
                </div>

                <div className="text-xs text-muted-foreground/60 shrink-0">
                  {job.start} — {job.end}
                </div>
              </div>

              {job.highlights && job.highlights.length > 0 && (
                <ul className="mt-3 space-y-2 pl-4 list-disc marker:text-muted-foreground/50">
                  {job.highlights.map((point, i) => (
                    <li key={i} className="text-xs leading-relaxed text-muted-foreground/70">
                      {point}
                    </li>
                  ))}
                </ul>
              )}

              {tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {tags.map((t) => (
                    <Chip key={t}>{t}</Chip>
                  ))}
                </div>
              )}

              {idx !== experience.length - 1 && (
                <div className="mt-6 h-px w-full bg-border/20" />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}