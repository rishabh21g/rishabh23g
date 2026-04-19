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
import { useEffect } from "react";


const CLICK_SOUND = "/audio/mouse-click.mp3"
let clickSound : HTMLAudioElement | null = null

function getClickSound(){
  if (clickSound) return clickSound
  clickSound = new Audio(CLICK_SOUND)
  clickSound.preload = "auto"
  clickSound.volume = 0.1
  return clickSound
}
export default function Home() {
  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return; 
      const target = e.target as Element | null;
      if (!target) return;

      const hit = target.closest(
        [
          '[data-slot="button"]',
          'button',
          '[role="button"]',
          'input[type="button"]',
          'input[type="submit"]',
          '[data-slot="dropdown-menu-trigger"]',
          '[data-slot="dropdown-menu-item"]',
        ].join(",")
      );
      if (!hit) return;

      if ((hit as HTMLElement).hasAttribute("data-disabled")) return;
      if (hit instanceof HTMLButtonElement && hit.disabled) return;

      const audio = getClickSound();
      audio.currentTime = 0;
      audio.play().catch(() => {});
    };

    window.addEventListener("pointerdown", onPointerDown, true);
    return () => window.removeEventListener("pointerdown", onPointerDown, true);
  }, []);


 
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
      <div className="block md:hidden">
        <Mobile />
      </div>
    </main>
  );
}
