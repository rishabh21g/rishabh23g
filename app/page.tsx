"use client";

import MenuBar from "@/components/desktop/MenuBar";
import Desktop from "@/components/desktop/Desktop";

import About from "@/components/Screens/About";
import Experience from "@/components/Screens/Experience";
import Resume from "@/components/Screens/Resume";
import Contact from "@/components/Screens/Contact";

// widgets...
import Weather from "@/components/widgets/Weather";
import Quotes from "@/components/widgets/Quotes";
import CalendarComp from "@/components/widgets/Calendar";
import GithubStreak from "@/components/widgets/GithubStreak";
import Visitors from "@/components/widgets/Visitors";
import Music from "@/components/widgets/Music";
import ThemeCard from "@/components/widgets/ThemeCard";

export default function Home() {
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
      <div className="block sm:hidden pt-7 px-4 pb-10">
        <div className="flex gap-6 text-[0.7rem] uppercase tracking-[0.25em] text-muted-foreground/60 overflow-x-auto whitespace-nowrap">
          <a href="#about" className="text-foreground/90 border-b border-foreground/40 pb-2">About</a>
          <a href="#experience" className="pb-2">Experience</a>
          <a href="#resume" className="pb-2">Projects</a>
          <a href="#contact" className="pb-2">Contact</a>
          <a href="#resume" className="pb-2">Résumé</a>
        </div>

        <div id="about" className="pt-6">
          <About />
        </div>

        <div id="experience" className="pt-12">
          <Experience />
        </div>

        <div id="resume" className="pt-12">
          <Resume />
        </div>

        <div id="contact" className="pt-12">
          <Contact />
        </div>
      </div>
    </main>
  );
}
