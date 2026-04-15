import React from "react";
import { RESUME, type ResumeLink, type ResumeProject } from "@/constants/RESUME";
import { Button } from "@/components/ui/button";
import { ExternalLink, Mail, MapPin } from "lucide-react";

function displayFromLink(link: ResumeLink) {
  const href = link.href;

  if (href.startsWith("mailto:")) return href.replace("mailto:", "");

  if (link.key === "twitter") {
    const handle = href.replace(/^https?:\/\/(www\.)?x\.com\//, "").split(/[/?#]/)[0];
    return handle ? `@${handle}` : "x.com";
  }

  if (link.key === "github") {
    const user = href.replace(/^https?:\/\/(www\.)?github\.com\//, "").split(/[/?#]/)[0];
    return user || "github.com";
  }

  if (link.key === "linkedin") {
    const tail = href.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, "").split(/[/?#]/)[0];
    return tail ? `in/${tail}` : "linkedin.com";
  }

  return href;
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-muted/20 ring-1 ring-border/25 px-2.5 py-1 text-[0.65rem] text-foreground/80">
      {children}
    </span>
  );
}

function LinkInline({ link }: { link: ResumeLink }) {
  const Icon = link.icon;
  const text = displayFromLink(link);
  const isExternal = link.href.startsWith("http");

  return (
    <a
      href={link.href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      className="inline-flex items-center gap-1.5 hover:text-foreground/80 transition-colors"
    >
      <Icon className="h-3.5 w-3.5 text-muted-foreground/70" aria-hidden="true" />
      <span className="text-xs text-muted-foreground/70">{text}</span>
    </a>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[0.7rem] uppercase tracking-[0.25em] text-muted-foreground/60">
      {children}
    </div>
  );
}

function ProjectLinkButton({ link }: { link: ResumeLink }) {
  const Icon = link.icon;
  const isExternal = link.href.startsWith("http");

  return (
    <Button
      asChild
      variant="outline"
      size="xs"
      className="bg-background/10 backdrop-blur-md border-border/30"
    >
      <a href={link.href} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noreferrer" : undefined}>
        <Icon className="h-3 w-3 text-muted-foreground/80" aria-hidden="true" />
        {link.label}
      </a>
    </Button>
  );
}

function ProjectBlock({ project }: { project: ResumeProject }) {
  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="text-sm font-semibold text-foreground/90">{project.name}</div>
          {project.subtitle ? (
            <div className="mt-1 text-xs text-muted-foreground/60">{project.subtitle}</div>
          ) : null}

          {project.stack?.length ? (
            <div className="mt-2 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <Chip key={s}>{s}</Chip>
              ))}
            </div>
          ) : null}
        </div>

        {project.links?.length ? (
          <div className="flex flex-wrap items-center justify-end gap-1 shrink-0">
            {project.links.map((l) => (
              <ProjectLinkButton key={`${project.name}-${l.key}-${l.href}`} link={l} />
            ))}
          </div>
        ) : null}
      </div>

      <ul className="mt-3 space-y-2 pl-4 list-disc marker:text-muted-foreground/50">
        {project.highlights.map((h) => (
          <li key={h} className="text-xs leading-relaxed text-muted-foreground/70">
            {h}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Resume() {
  const { basics, skills, experience, projects, education, achievements } = RESUME;

  const viewLink =
    basics.links.find((l) => l.key === "portfolio") ??
    basics.links.find((l) => l.href.startsWith("http")) ??
    basics.links[0];

  const mailLink = basics.links.find((l) => l.key === "mail");

  const inlineKeys: Array<ResumeLink["key"]> = ["github", "twitter", "linkedin", "instagram", "spotify"];
  const inlineLinks = basics.links.filter((l) => inlineKeys.includes(l.key));

  return (
    <section
      className={[
        "w-190 max-w-[92vw]",
        "max-h-[75vh] overflow-y-auto pr-2",
      ].join(" ")}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground truncate">
            {basics.name}
          </h1>
          <div className="mt-1 text-sm text-muted-foreground/70">{basics.headline}</div>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
            <div className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-muted-foreground/70" aria-hidden="true" />
              <span className="text-xs text-muted-foreground/70">{basics.location}</span>
            </div>

            {mailLink ? (
              <a
                href={mailLink.href}
                className="inline-flex items-center gap-1.5 hover:text-foreground/80 transition-colors"
              >
                <Mail className="h-3.5 w-3.5 text-muted-foreground/70" aria-hidden="true" />
                <span className="text-xs text-muted-foreground/70">{displayFromLink(mailLink)}</span>
              </a>
            ) : null}

            {inlineLinks.map((link) => (
              <LinkInline key={link.key} link={link} />
            ))}
          </div>
        </div>

        {viewLink ? (
          <Button
            asChild
            variant="outline"
            size="sm"
            className="bg-background/20 backdrop-blur-md border-border/30"
          >
            <a href={viewLink.href} target="_blank" rel="noreferrer">
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              View online
            </a>
          </Button>
        ) : null}
      </div>

      <div className="mt-5 h-px w-full bg-border/30" />

      {/* Skills */}
      <div className="mt-6">
        <SectionLabel>Skills</SectionLabel>

        <div className="mt-4 space-y-3">
          {[
            { label: "Languages", items: skills.languages },
            { label: "Libraries / Frameworks", items: skills.librariesFrameworks },
            { label: "Data / Infra", items: skills.database },
            { label: "Tools / OS", items: skills.toolsOS },
            { label: "Theoretical", items: skills.theoretical },
          ].map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-[160px_1fr] gap-x-6 gap-y-2 items-start"
            >
              <div className="text-xs text-muted-foreground/60">{row.label}</div>
              <div className="flex flex-wrap gap-2">
                {row.items.map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-7 h-px w-full bg-border/30" />

      {/* Experience */}
      <div className="mt-6">
        <SectionLabel>Experience</SectionLabel>

        <div className="mt-4 space-y-6">
          {experience.map((job) => (
            <div key={`${job.company}-${job.role}-${job.start}`}>
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

              <ul className="mt-3 space-y-2 pl-4 list-disc marker:text-muted-foreground/50">
                {job.highlights.map((h) => (
                  <li key={h} className="text-xs leading-relaxed text-muted-foreground/70">
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-7 h-px w-full bg-border/30" />

      {/* Projects */}
      <div className="mt-6">
        <SectionLabel>Projects</SectionLabel>

        <div className="mt-4 space-y-6">
          {projects.map((p) => (
            <ProjectBlock key={p.name} project={p} />
          ))}
        </div>
      </div>

      <div className="mt-7 h-px w-full bg-border/30" />

      {/* Achievements */}
      <div className="mt-6">
        <SectionLabel>Achievements</SectionLabel>

        <div className="mt-4 space-y-6">
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

      <div className="mt-7 h-px w-full bg-border/30" />

      {/* Education */}
      <div className="mt-6">
        <SectionLabel>Education</SectionLabel>

        <div className="mt-4 space-y-4">
          {education.map((e) => (
            <div key={`${e.school}-${e.degree}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-foreground/90">{e.degree}</div>
                  <div className="mt-1 text-xs text-muted-foreground/60">
                    {e.school}
                    {e.location ? ` · ${e.location}` : ""}
                  </div>
                </div>

                {(e.start || e.end) ? (
                  <div className="text-xs text-muted-foreground/60 shrink-0">
                    {e.start ?? ""}
                    {e.start || e.end ? " — " : ""}
                    {e.end ?? ""}
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}