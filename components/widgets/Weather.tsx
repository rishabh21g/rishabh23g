"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, useDragControls } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Cloud, CloudRain, Sun, CloudSnow, Wind } from "lucide-react";
import { Geo, OpenMeteoResponse } from "@/types/waether";



function labelForWeatherCode(code: number) {
  if (code === 0) return "Clear";
  if ([1, 2, 3].includes(code)) return "Partly cloudy";
  if ([45, 48].includes(code)) return "Fog";
  if ([51, 53, 55, 56, 57].includes(code)) return "Drizzle";
  if ([61, 63, 65, 66, 67].includes(code)) return "Rain";
  if ([71, 73, 75, 77].includes(code)) return "Snow";
  if ([80, 81, 82].includes(code)) return "Showers";
  if ([95, 96, 99].includes(code)) return "Thunderstorm";
  return "Weather";
}

function iconForWeatherCode(code: number) {
  if (code === 0) return Sun;
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return CloudRain;
  if ([71, 73, 75, 77].includes(code)) return CloudSnow;
  if ([1, 2, 3, 45, 48].includes(code)) return Cloud;
  return Cloud;
}

async function fetchWeather({ lat, lon }: Geo) {
  const url =
    "https://api.open-meteo.com/v1/forecast" +
    `?latitude=${encodeURIComponent(lat)}` +
    `&longitude=${encodeURIComponent(lon)}` +
    `&current=temperature_2m,weather_code,wind_speed_10m` +
    `&timezone=auto`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch weather");
  return (await res.json()) as OpenMeteoResponse;
}

export default function Weather() {
  const dragControls = useDragControls();

  const [geo, setGeo] = useState<Geo | null>(null);
  const [data, setData] = useState<OpenMeteoResponse | null>(null);
  const [status, setStatus] = useState<
    "idle" | "locating" | "loading" | "ready" | "denied" | "error"
  >("idle");

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setStatus("error");
      return;
    }

    setStatus("locating");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGeo({ lat: pos.coords.latitude, lon: pos.coords.longitude });
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) setStatus("denied");
        else setStatus("error");
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 5 * 60 * 1000 }
    );
  }, []);

  useEffect(() => {
    if (!geo) return;

    setStatus("loading");
    fetchWeather(geo)
      .then((json) => {
        setData(json);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, [geo]);

  const current = data?.current;
  const tempUnit = data?.current_units?.temperature_2m ?? "°C";
  const windUnit = data?.current_units?.wind_speed_10m ?? "km/h";

  const label = useMemo(() => {
    const code = current?.weather_code;
    return typeof code === "number" ? labelForWeatherCode(code) : "Weather";
  }, [current?.weather_code]);

  const Icon = useMemo(() => {
    const code = current?.weather_code;
    return typeof code === "number" ? iconForWeatherCode(code) : Cloud;
  }, [current?.weather_code]);

  return (
    <motion.div
      className="absolute left-8 top-14 z-40"
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      style={{ touchAction: "none" }}
    >
      <Card className="w-52 bg-background/20 backdrop-blur-3xl border border-border/30">
        <CardContent className="p-0.5">
          <div
            onPointerDown={(e) => dragControls.start(e.nativeEvent)}
            className="flex items-center justify-center pb-2 cursor-grab active:cursor-grabbing select-none"
          >
            <span className="h-0.5 w-12 rounded-full bg-primary/90" aria-hidden="true" />
          </div>

          <div className="px-3 pb-3 select-none">
            <div className="text-[0.65rem] uppercase tracking-[0.35em] text-muted-foreground/50">
              WEATHER
            </div>

            {status === "locating" && (
              <div className="mt-2 text-sm text-muted-foreground/70">
                Getting location…
              </div>
            )}

            {status === "loading" && (
              <div className="mt-2 text-sm text-muted-foreground/70">
                Loading weather…
              </div>
            )}

            {status === "denied" && (
              <div className="mt-2 text-sm text-muted-foreground/70">
                Location permission denied
              </div>
            )}

            {status === "error" && (
              <div className="mt-2 text-sm text-muted-foreground/70">
                Weather unavailable
              </div>
            )}

            {status === "ready" && current && (
              <div className="mt-2 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-md bg-muted/30 ring-1 ring-border/25">
                  <Icon className="h-5 w-5 text-primary/90" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="text-2xl font-semibold text-foreground tabular-nums">
                    {Math.round(current.temperature_2m)}
                    <span className="text-sm font-medium text-muted-foreground/70">
                      {tempUnit}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground/70 truncate">
                    {label}
                  </div>

                  <div className="mt-1 flex items-center gap-1 text-[0.7rem] text-muted-foreground/60">
                    <Wind className="h-3.5 w-3.5" />
                    <span className="tabular-nums">
                      {Math.round(current.wind_speed_10m)} {windUnit}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}