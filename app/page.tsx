"use client";

import MenuBar from "@/components/desktop/MenuBar";
import Desktop from "@/components/desktop/Desktop";
import Resume from "@/components/Screens/Resume";

// widgets...
import Weather from "@/components/widgets/Weather";
import Quotes from "@/components/widgets/Quotes";
import CalendarComp from "@/components/widgets/Calendar";
import GithubStreak from "@/components/widgets/GithubStreak";
import Visitors from "@/components/widgets/Visitors";
import Music from "@/components/widgets/Music";
import ThemeCard from "@/components/widgets/ThemeCard";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Home() {

  const resumeRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress: resumeProgress } = useScroll({
    target: resumeRef,
    offset: ["start 1.85", "start 0.25"],
  });

  const fast = useTransform(resumeProgress, [0, 0.35], [0, 1], { clamp: true });
  const resumeY = useTransform(fast, [0, 1], [24, 0]);
  const resumeOpacity = useTransform(fast, [0, 1], [0, 1]);
  const resumeFilter = useTransform(fast, [0, 1], ["blur(14px)", "blur(0px)"]);

  return (
    <main className="desktop-bg min-h-screen w-screen overflow-x-hidden sm:overflow-hidden">

      {/* Desktop layout */}
      <div className="hidden sm:block">
        <MenuBar />
        <Desktop />
        <Weather />
        <Quotes />
        <CalendarComp />
        <GithubStreak />
        <Visitors />
        <Music />
        <ThemeCard />
      </div>

      {/* Mobile layout */}
      <div className="block sm:hidden pt-2 px-4 pb-3 mx-6">

        <motion.section
          id="resume"
          ref={resumeRef}
          className="pt-12 scroll-mt-16"
          style={{ y: resumeY, opacity: resumeOpacity, filter: resumeFilter }}
        >
          <MenuBar />
          <Resume />
        </motion.section>
      </div>
    </main>
  );
}
