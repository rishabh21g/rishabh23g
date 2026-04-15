import React from "react";
import Image from "next/image";
import { RESUME } from "@/constants/RESUME";
import { Button } from "@/components/ui/button";
import type { ResumeLinkKey } from "@/constants/RESUME";

const FOOTER_LINK_KEYS: ResumeLinkKey[] = ["twitter", "github", "portfolio"];

export default function About() {
  const { basics, summary } = RESUME;

  const roleLine = basics.headline.toUpperCase();


  const footerLinks = basics.links.filter((l) => FOOTER_LINK_KEYS.includes(l.key));

  return (
    <section className="flex h-full flex-col">
      {/* Top */}
      <div className="flex flex-col">
        <h1 className="text-3xl font-semibold tracking-tight leading-[0.9] sm:text-6xl">
          {basics.name.split(" ").slice(0, -1).join(" ") || basics.name}
          <br />
          {basics.name.split(" ").slice(-1)[0]}
        </h1>

        <div className="mt-5 text-[0.65rem] uppercase tracking-tight text-muted-foreground/70">
          {roleLine}
        </div>

        <div className="mt-4 h-px w-full bg-border/30" />
      </div>

      {/* Middle */}
      <div className="flex-1">
        <p className="mt-4 max-w-[60ch] text-sm leading-relaxed text-muted-foreground/70">
          {summary}
        </p>
      </div>

      {/* Bottom */}
      <div className="mt-28 h-px w-full bg-border/30" />

      <footer className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {basics.avatarSrc ? (
            <Image
              src={basics.avatarSrc}
              alt={basics.name}
              width={40}
              height={40}
              className="h-10 w-10 rounded-lg ring-1 ring-border/30 object-cover bg-muted/30"
            />
          ) : (
            <div className="h-10 w-10 rounded-lg ring-1 ring-border/30 bg-muted/30 grid place-items-center text-xs text-muted-foreground">
              {basics.name.slice(0, 2).toUpperCase()}
            </div>
          )}

          <div className="leading-tight">
            <div className="text-xs tracking-normal uppercase text-muted-foreground/70">
              {basics.handle}
            </div>
            <div className="mt-0.5 text-[0.7rem] text-muted-foreground/60">
              {basics.location}
              {typeof basics.age === "number" ? ` · ${basics.age}` : ""}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 ">
          {footerLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Button key={link.key} asChild variant="ghost" size="icon-sm">
                <a href={link.href} target="_blank" rel="noreferrer" aria-label={link.label}>
                  <Icon className="h-4 w-4 text-muted-foreground/80" aria-hidden="true" />
                </a>
              </Button>
            );
          })}
        </div>
      </footer>
    </section>
  );
}