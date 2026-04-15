import React from "react";
import { RESUME, type ResumeLink } from "@/constants/RESUME";
import { cn } from "@/lib/utils";

function displayFromLink(link: ResumeLink) {
  const href = link.href;

  if (href.startsWith("mailto:")) return href.replace("mailto:", "");
  if (href.startsWith("tel:")) return href.replace("tel:", "");

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
  if (link.key === "instagram") {
    const tail = href.replace(/^https?:\/\/(www\.)?instagram\.com\//, "").split(/[/?#]/)[0];
    return tail ? `@${tail}` : "instagram.com";
  }
  if (link.key === "spotify") {
    const tail = href.replace(/^https?:\/\/(open\.)?spotify\.com\//, "").split(/[/?#]/)[0];
    return tail ? `@rishabh21g` : "spotify.com";
  }


  if (link.key === "portfolio") {
    try {
      return new URL(href).host;
    } catch {
      return href;
    }
  }

  return href;
}


function Row({ link }: { link: ResumeLink }) {
  const Icon = link.icon;
  const right = displayFromLink(link);
  const isExternal = link.href.startsWith("http");

  return (
    <a
      href={link.href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      className={cn(
        "flex items-start gap-3",
        "px-3 py-2",
        "border-b border-border/30",
        "transition-colors hover:bg-muted/10"
      )}
    >
      <Icon className="mt-0.5 h-4 w-4 text-muted-foreground/70 shrink-0" aria-hidden="true" />
      <div className="min-w-0">
        <div className="text-sm font-medium text-foreground/90">{link.label}</div>
        <div className="mt-1 text-xs text-muted-foreground/60 break-all">{right}</div>
      </div>
    </a>
  );
}

export default function Contact() {
  const { basics } = RESUME;



  return (
    <section className="flex flex-col gap-2 w-88 max-w-full h-80">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Let&apos;s Connect
        </h2>
        <p className="mt-2 text-sm text-muted-foreground/70 leading-relaxed max-w-[60ch]">
          Open for collaborations, freelance work or any kind of chat.
        </p>
      </div>

      <div className="h-px " />

      <div className="rounded-lg overflow-scroll scroll-smooth">
        <div>
          {basics.links.map((link) => (
            <Row key={link.key} link={link} />
          ))}
        </div>
      </div>
    </section>
  );
}