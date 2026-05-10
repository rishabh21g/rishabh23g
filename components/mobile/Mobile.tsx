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
import { motion, useReducedMotion, Variants } from "framer-motion";

export default function Mobile() {
  const [activeId, setActiveId] = useState<SectionId>("home");
  const resume = RESUME;
  const reduceMotion = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: reduceMotion ? {} : { staggerChildren: 0.06, delayChildren: 0.05 },
    },
  };

  //  type the bezier as a 4-number tuple, not number[]
  const ease = [0.12, 1, 0.2, 1] as const;

  const item: Variants = reduceMotion
    ? {
        hidden: { opacity: 1, y: 0, filter: "blur(0px)" },
        show: { opacity: 1, y: 0, filter: "blur(0px)" },
      }
    : {
        hidden: { opacity: 0, y: 10, filter: "blur(14px)" },
        show: {
          opacity: [0, 0.95, 0.8, 1],
          y: 0,
          filter: ["blur(14px)", "blur(2px)", "blur(6px)", "blur(0px)"],
          transition: { duration: 0.55, ease },
        },
      };

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

      <motion.div variants={container} initial="hidden" animate="show">
        <motion.section id="home" className="scroll-mt-24" variants={item}>
          <SectionShell sectionKey="home">
            <HomeSection resume={resume} />
          </SectionShell>
        </motion.section>

        <motion.section variants={item}>
          <MobileGithubStreak />
        </motion.section>

        <motion.section id="work" className="scroll-mt-24" variants={item}>
          <SectionShell sectionKey="work">
            <WorkSection resume={resume} />
          </SectionShell>
        </motion.section>

        <motion.section id="skills" className="scroll-mt-24" variants={item}>
          <SectionShell sectionKey="skills">
            <StackSection resume={resume} />
          </SectionShell>
        </motion.section>

        <motion.section id="projects" className="scroll-mt-24" variants={item}>
          <SectionShell sectionKey="projects">
            <ProjectsSection resume={resume} />
          </SectionShell>
        </motion.section>

        <motion.section id="education" className="scroll-mt-24" variants={item}>
          <SectionShell sectionKey="education">
            <EducationSection resume={resume} />
          </SectionShell>
        </motion.section>

        <motion.footer
          className="pt-8 text-center text-xs text-muted-foreground/60 border-t border-border/20 mt-8"
          variants={item}
        >
          © {new Date().getFullYear()} Rishabh Gupta. All rights reserved.
        </motion.footer>
      </motion.div>
    </div>
  );
}