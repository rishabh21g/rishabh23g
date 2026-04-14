"use client";
import Dock from "@/components/desktop/Dock";
import MenuBar from "@/components/desktop/MenuBar";
import { Button } from "@/components/ui/button";
import CalendarComp from "@/components/windows/Calendar";
import GithubStreak from "@/components/windows/GithubStreak";
import Image from "next/image";

export default function Home() {
  return (
    <main className="desktop-bg min-h-screen w-screen overflow-hidden">
      <MenuBar />
      <CalendarComp />
      <GithubStreak/>
      <Dock />
    </main>
  );
}
