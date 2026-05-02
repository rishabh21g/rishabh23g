"use client";

import React, { useEffect, useState } from "react";
import { RESUME } from "@/constants/RESUME";
import { SectionId, SECTIONS } from "./types/types";
import { SectionTabs } from "./SectionTabs";
import { SectionShell } from "./SectionShell";
import { HomeSection } from "./HomeSection";
import { WorkSection } from "./WorkSection";
import { StackSection } from "./StackSection";
import { EducationSection } from "./EducationSection";
import { ProjectsSection } from "./ProjectSection";
import MobileGithubStreak from "./Github";

export default function Mobile() {
  const [activeId, setActiveId] = useState<SectionId>("home");
  const resume = RESUME;

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveId(id);
          }
        },
        // Trigger slightly below the sticky headers
        { threshold: 0.2, rootMargin: "-60px 0px -40% 0px" }
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="block sm:hidden bg-card w-full min-h-screen pb-12">

      <SectionTabs active={activeId} />

      <div className="pt-2 px-3 pb-6 mx-auto w-full space-y-6">
        <section id="home" className="scroll-mt-24">
          <SectionShell sectionKey="home">
            <HomeSection resume={resume} />
          </SectionShell>
        </section>
        <section>
          <MobileGithubStreak />
        </section>
        <section id="work" className="scroll-mt-24">
          <SectionShell sectionKey="work">
            <WorkSection resume={resume} />
          </SectionShell>
        </section>

        <section id="skills" className="scroll-mt-24">
          <SectionShell sectionKey="skills">
            <StackSection resume={resume} />
          </SectionShell>
        </section>

        <section id="projects" className="scroll-mt-24">
          <SectionShell sectionKey="projects">
            <ProjectsSection resume={resume} />
          </SectionShell>
        </section>

        <section id="education" className="scroll-mt-24">
          <SectionShell sectionKey="education">
            <EducationSection resume={resume} />
          </SectionShell>
        </section>


        <footer className="pt-8 text-center text-xs text-muted-foreground/60 border-t border-border/20 mt-8">
          © {new Date().getFullYear()} Rishabh Gupta. All rights reserved.
        </footer>
      </div>
    </div>
  );
}