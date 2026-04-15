"use client";
import Desktop from "@/components/desktop/Desktop";
import Dock from "@/components/desktop/Dock";
import MenuBar from "@/components/desktop/MenuBar";
import CalendarComp from "@/components/widgets/Calendar";
import GithubStreak from "@/components/widgets/GithubStreak";
import Music from "@/components/widgets/Music";
import ThemeCard from "@/components/widgets/ThemeCard";
import Visitors from "@/components/widgets/Visitors";
import Weather from "@/components/widgets/Weather";
import  Quotes from "@/components/widgets/Quotes";
export default function Home() {
  return (
    <main className="desktop-bg min-h-screen w-screen overflow-hidden">
      <MenuBar />
      <Desktop/>
      <Weather/>
      <Quotes/>
      <CalendarComp />
      <GithubStreak/>
      <Visitors/>
      <Music/>
      <ThemeCard/>
    </main>
  );
}
