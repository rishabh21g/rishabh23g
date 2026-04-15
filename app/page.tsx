"use client";

import MenuBar from "@/components/desktop/MenuBar";
import Desktop from "@/components/desktop/Desktop";
import Resume from "@/components/Screens/Resume";
import Mobile from "@/components/mobile/Mobile";

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
      <div className="block sm:hidden">
        <Mobile />
      </div>
    </main>
  );
}
