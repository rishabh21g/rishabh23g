"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";

import MenuBar from "@/components/desktop/MenuBar";
import { RESUME, type ResumeLink } from "@/constants/RESUME";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function isExternalHref(href: string) {
  return /^https?:\/\//i.test(href);
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md bg-muted/60 ring-1 ring-border/25 px-2.5 py-1 text-[0.65rem] text-foreground/80">
      {children}
    </span>
  );
}

function ProgressPill({ value }: { value?: string }) {
  if (!value) return null;

  const v = value.toLowerCase();
  const inProgress = v.includes("progress");
  const closed = v.includes("closed") || v.includes("done");

  return (
    <span
      className={[
        "inline-flex items-center rounded-sm px-2 py-0.5 text-xs lowercase tracking-wide",
        "ring-1",
        inProgress
          ? "bg-primary/10 text-foreground/80 ring-primary/20"
          : closed
            ? "bg-muted/60 text-muted-foreground/70 ring-border/25"
            : "bg-muted/60 text-muted-foreground/70 ring-border/25",
      ].join(" ")}
    >
      {value}
    </span>
  );
}

function LinkButton({ link }: { link: ResumeLink }) {
  const Icon = link.icon;
  const external = isExternalHref(link.href);

  return (
    <Button asChild variant="outline" size="sm" className="bg-muted/60 backdrop-blur-md border-border/30">
      <a href={link.href} target={external ? "_blank" : undefined} rel={external ? "noreferrer noopener" : undefined}>
        <Icon className="h-3.5 w-3.5 text-muted-foreground/80" aria-hidden="true" />
        {link.label}
      </a>
    </Button>
  );
}

export default function Mobile() {
  const reduceMotion = useReducedMotion();
  const { basics, summary, skills, experience, projects, client_projects, education, achievements } = RESUME;

  const reveal = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 24,
      filter: reduceMotion ? "blur(0px)" : "blur(14px)",
    },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
  } as const;

  const viewport = { once: true, amount: 0.25 } as const;

  return (
    <div className="block sm:hidden no-scrollbar">
      {/* fixed header */}
      <MenuBar />

      <div className="pt-12 px-3 pb-6 mx-auto w-full max-w-130 space-y-4 no-scrollbar">
        {/* Basics */}
        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={viewport} style={{ willChange: "transform, filter, opacity" }}>
          <Card className="bg-background/10 backdrop-blur-xl ring-0">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <CardTitle className="text-4xl font-extrabold">{basics.name}</CardTitle>
                  <CardDescription className="mt-1">{basics.headline}</CardDescription>

                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground/70">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                      {basics.location}
                    </span>

                    <a
                      href={`mailto:${basics.email}`}
                      className="inline-flex items-center gap-1.5 hover:text-foreground/80 transition-colors"
                    >
                      <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                      {basics.email}
                    </a>
                  </div>
                </div>

                {basics.avatarSrc ? (
                  <Image
                    src={basics.avatarSrc}
                    alt={basics.name}
                    width={56}
                    height={56}
                    className="h-14 w-14 rounded-full ring-1 ring-border/30 object-cover bg-muted/30"
                    priority
                  />
                ) : null}
              </div>
            </CardHeader>

            <CardContent>
              <p className="text-xs text-muted-foreground/70 leading-relaxed">{summary}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {basics.links.map((l) => (
                  <LinkButton key={`${l.key}-${l.href}`} link={l} />
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <hr className="border-border/90" />

        {/* Experience */}
        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={viewport} style={{ willChange: "transform, filter, opacity" }}>
          <Card className="bg-background/10 backdrop-blur-xl ring-0">
            <CardHeader>
              <CardTitle className="text-sm">Experience</CardTitle>
              <CardDescription>Recent roles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {experience.map((job) => (
                <div key={`${job.company}-${job.role}-${job.start}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-foreground/90">
                        {job.company} <span className="font-normal text-muted-foreground/60">— {job.role}</span>
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground/60">{job.location}</div>
                    </div>
                    <div className="text-xs text-muted-foreground/60 shrink-0">
                      {job.start} — {job.end}
                    </div>
                  </div>

                  <ul className="mt-3 space-y-2 pl-4 list-disc marker:text-muted-foreground/50">
                    {job.highlights.map((h) => (
                      <li key={h} className="text-xs leading-relaxed text-muted-foreground/70">
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <hr className="border-border/90" />

        {/* Skills */}
        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={viewport} style={{ willChange: "transform, filter, opacity" }}>
          <Card className="bg-background/10 backdrop-blur-xl ring-0">
            <CardHeader>
              <CardTitle className="text-sm">Skills</CardTitle>
              <CardDescription>Stack overview</CardDescription>
            </CardHeader>
            <CardContent className="space-y-1">
              <div>
                <div className="text-[0.7rem] uppercase tracking-tight text-muted-foreground/60">Languages</div>
                <div className="mt-1 flex flex-wrap gap-1 ">{skills.languages.map((s) => <Chip key={s}>{s}</Chip>)}</div>
              </div>

              <div>
                <div className="text-[0.7rem] uppercase tracking-tight text-muted-foreground/60">Frameworks</div>
                <div className="mt-1 flex flex-wrap gap-1">{skills.librariesFrameworks.map((s) => <Chip key={s}>{s}</Chip>)}</div>
              </div>

              <div>
                <div className="text-[0.7rem] uppercase tracking-tight text-muted-foreground/60">Data / Infra</div>
                <div className="mt-1 flex flex-wrap gap-1">{skills.database.map((s) => <Chip key={s}>{s}</Chip>)}</div>
              </div>

              <div>
                <div className="text-[0.7rem] uppercase tracking-tight text-muted-foreground/60">Tools / OS</div>
                <div className="mt-1 flex flex-wrap gap-1">{skills.toolsOS.map((s) => <Chip key={s}>{s}</Chip>)}</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <hr className="border-border/90" />

        {/* Projects */}
        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={viewport} style={{ willChange: "transform, filter, opacity" }}>
          <Card className="bg-background/10 backdrop-blur-xl ring-0">
            <CardHeader>
              <CardTitle className="text-sm">Projects</CardTitle>
              <CardDescription>Selected work</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[...projects, ...(client_projects ?? [])].map((p) => (
                <div key={p.name}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="text-sm font-semibold text-foreground/90 truncate">{p.name}</div>
                        <ProgressPill value={(p as any).progress} />
                      </div>
                      {p.subtitle ? <div className="mt-1 text-xs text-muted-foreground/60">{p.subtitle}</div> : null}

                      {p.stack?.length ? (
                        <div className="mt-2 flex flex-wrap gap-2">{p.stack.map((s) => <Chip key={s}>{s}</Chip>)}</div>
                      ) : null}
                    </div>

                    {p.links?.length ? (
                      <div className="flex flex-wrap items-center justify-end gap-1 shrink-0">
                        {p.links.map((l) => (
                          <LinkButton key={`${p.name}-${l.key}-${l.href}`} link={l} />
                        ))}
                      </div>
                    ) : null}
                  </div>

                  <ul className="mt-3 space-y-2 pl-4 list-disc marker:text-muted-foreground/50">
                    {p.highlights.map((h) => (
                      <li key={h} className="text-xs leading-relaxed text-muted-foreground/70">
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <hr className="border-border/90" />

        {/* Education + Achievements */}
        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={viewport} style={{ willChange: "transform, filter, opacity" }}>
          <Card className="bg-background/10 backdrop-blur-xl ring-0">
            <CardHeader>
              <CardTitle className="text-sm">Education & Achievements</CardTitle>
              <CardDescription>Highlights</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="text-[0.7rem] uppercase tracking-[0.25em] text-muted-foreground/60">Education</div>
                <div className="mt-3 space-y-3">
                  {education.map((e) => (
                    <div key={`${e.school}-${e.degree}`} className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-foreground/90">{e.degree}</div>
                        <div className="mt-1 text-xs text-muted-foreground/60">{e.school}</div>
                      </div>
                      <div className="text-xs text-muted-foreground/60 shrink-0">
                        {e.start ?? ""}{e.start || e.end ? " — " : ""}{e.end ?? ""}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[0.7rem] uppercase tracking-[0.25em] text-muted-foreground/60">Achievements</div>
                <div className="mt-3 space-y-4">
                  {achievements.map((a) => (
                    <div key={`${a.title}-${a.date}`}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-foreground/90">
                            {a.title}
                            {a.org ? <span className="font-normal text-muted-foreground/60"> — {a.org}</span> : null}
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground/60 shrink-0">{a.date}</div>
                      </div>

                      <ul className="mt-3 space-y-2 pl-4 list-disc marker:text-muted-foreground/50">
                        {a.highlights.map((h) => (
                          <li key={h} className="text-xs leading-relaxed text-muted-foreground/70">
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        {/* Footer */}
        <footer className="py-6 text-center text-xs text-muted-foreground/60">
          © {new Date().getFullYear()} Rishabh Gupta. All rights reserved.
        </footer>
        </motion.div>
      </div>
    </div>
  );
}