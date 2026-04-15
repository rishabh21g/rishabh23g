import React from "react";
import { RESUME } from "@/constants/RESUME";

const TAG_KEYWORDS = [
  "Go",
  "Golang",
  "TypeScript",
  "JavaScript",
  "React",
  "Next.js",
  "React Native",
  "Expo",
  "Node.js",
  "Express",
  "PostgreSQL",
  "Redis",
  "Docker",
  "WebSocket",
  "TanStack Query",
  "Context API",
  "Canvas",
  "CI/CD",
  "Vercel",
];

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-muted/20 ring-1 ring-border/25 px-2.5 py-1 text-[0.65rem] text-muted-foreground/70">
      {children}
    </span>
  );
}

function extractTags(highlights: string[]) {
  const hay = highlights.join(" ").toLowerCase();
  const tags = TAG_KEYWORDS.filter((t) => hay.includes(t.toLowerCase()));
  return Array.from(new Set(tags)).slice(0, 6);
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
          const summary = job.highlights?.[0] ?? "";
          const tags = extractTags(job.highlights ?? []);

          return (
            <div key={`${job.company}-${job.role}-${job.start}`} className="py-6">
              <div className="flex items-start justify-between gap-6">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <div className="text-lg font-semibold tracking-tight text-foreground/90">
                      {job.company}
                    </div>
                    <div className="text-xs text-muted-foreground/60">
                      {job.role}
                    </div>
                  </div>

                  {summary ? (
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground/70">
                      {summary}
                    </p>
                  ) : null}

                  {tags.length ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {tags.map((t) => (
                        <Chip key={t}>{t}</Chip>
                      ))}
                    </div>
                  ) : null}
                </div>

                <div className="shrink-0 text-xs text-muted-foreground/60">
                  {job.start} — {job.end}
                </div>
              </div>

              {idx !== experience.length - 1 ? (
                <div className="mt-6 h-px w-full bg-border/20" />
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}