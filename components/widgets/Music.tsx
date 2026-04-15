"use client";

import React, { useEffect, useState } from "react";
import { motion, useDragControls } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Signal } from "lucide-react";
import { SiSpotify } from "react-icons/si";

type NowPlaying = {
  playing: boolean;
  title: string | null;
  artist: string | null;
  album: string | null;
  artUrl: string | null;
  trackUrl: string | null;
};

export default function Music() {
  const dragControls = useDragControls();
  const [now, setNow] = useState<NowPlaying | null>(null);

  useEffect(() => {
    let alive = true;

    const load = async () => {
      // const res = await fetch("/api/spotify/now-playing", { cache: "no-store" });
      // if (!res.ok) throw new Error("Failed to load now playing");
      // const data = (await res.json()) as NowPlaying;
      // if (alive) setNow(data);
    };

    load().catch(console.error);
    const id = window.setInterval(() => load().catch(() => {}), 10000);

    return () => {
      alive = false;
      window.clearInterval(id);
    };
  }, []);

  const title = now?.title ?? "Not playing";
  const artist = now?.artist ?? "Spotify";

  return (
    <motion.div
      className="absolute left-8 bottom-16 z-40"
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      style={{ touchAction: "none" }}
    >
      <Card className="w-xs bg-background/20 backdrop-blur-3xl border border-border/30">
        <CardContent className="p-0.5">
          <div
            onPointerDown={(e) => dragControls.start(e.nativeEvent)}
            className="flex items-center justify-center pb-2 cursor-grab active:cursor-grabbing select-none"
          >
            <span className="h-0.5 w-12 rounded-full bg-primary/90" aria-hidden="true" />
          </div>

          <div className="flex items-center gap-3 px-3 pb-1">
            <div className="grid h-12 w-12 place-items-center overflow-hidden rounded-md bg-muted/30 ring-1 ring-border/25">
              {now?.artUrl ? (
                <Image
                  src={now.artUrl}
                  alt=""
                  width={48}
                  height={48}
                  className="h-12 w-12 object-cover"
                />
              ) : (
                <SiSpotify className="text-primary/90" size={24} />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="truncate text-sm text-foreground">{title}</div>
              <div className="truncate text-xs text-muted-foreground">{artist}</div>
            </div>

            <div className="flex items-center gap-1 pr-1">
              <Signal className={now?.playing ? "h-6 w-6 text-foreground/80" : "h-6 w-6 text-muted-foreground/40"} />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}