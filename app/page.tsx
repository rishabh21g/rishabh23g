"use client";
import Desktop from "@/components/desktop/Desktop";
import Dock from "@/components/desktop/Dock";
import MenuBar from "@/components/desktop/MenuBar";
import CalendarComp from "@/components/widgets/Calendar";
import GithubStreak from "@/components/widgets/GithubStreak";
import Music from "@/components/widgets/Music";
import Visitors from "@/components/widgets/Visitors";

export default function Home() {
  return (
    <main className="desktop-bg min-h-screen w-screen overflow-hidden">
      <MenuBar />
      <Desktop/>
      <CalendarComp />
      <GithubStreak/>
      <Visitors/>
      <Music/>
    </main>
  );
}
