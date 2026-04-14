"use client";
import Dock from "@/components/desktop/Dock";
import MenuBar from "@/components/desktop/MenuBar";
import CalendarComp from "@/components/windows/Calendar";
import GithubStreak from "@/components/windows/GithubStreak";
import Visitors from "@/components/windows/Visitors";
import Image from "next/image";

export default function Home() {
  return (
    <main className="desktop-bg min-h-screen w-screen overflow-hidden">
      <MenuBar />
      <CalendarComp />
      <GithubStreak/>
      <Visitors/>
      <Dock />
    </main>
  );
}
