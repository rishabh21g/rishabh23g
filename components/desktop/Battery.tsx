'use client';

import React, { useEffect, useState } from 'react';
import type { IconType } from 'react-icons';
import {
  FaBatteryEmpty,
  FaBatteryQuarter,
  FaBatteryHalf,
  FaBatteryThreeQuarters,
  FaBatteryFull,
  FaBolt,
} from 'react-icons/fa';
import {
  MdBatteryCharging20,
  MdBatteryCharging30,
  MdBatteryCharging50,
  MdBatteryCharging60,
  MdBatteryCharging80,
  MdBatteryCharging90,
  MdBatteryChargingFull,
} from 'react-icons/md';

type BatteryManagerLike = {
  charging: boolean;
  level: number; // 0..1
  addEventListener: (type: 'levelchange' | 'chargingchange', listener: () => void) => void;
  removeEventListener: (type: 'levelchange' | 'chargingchange', listener: () => void) => void;
};

type NavigatorWithBattery = Navigator & {
  getBattery: () => Promise<BatteryManagerLike>;
};

function hasBatteryAPI(navigator: Navigator): navigator is NavigatorWithBattery {
  return typeof (navigator as Partial<NavigatorWithBattery>).getBattery === 'function';
}
function batteryIconFor(percent: number | null, charging: boolean | null): IconType {
  if (charging) {
    if (percent === null) return MdBatteryChargingFull;
    if (percent <= 20) return MdBatteryCharging20;
    if (percent <= 30) return MdBatteryCharging30;
    if (percent <= 50) return MdBatteryCharging50;
    if (percent <= 60) return MdBatteryCharging60;
    if (percent <= 80) return MdBatteryCharging80;
    if (percent <= 90) return MdBatteryCharging90;
    return MdBatteryChargingFull;
  }

  // not charging: keep your FontAwesome battery levels
  if (percent === null) return FaBatteryEmpty;
  if (percent <= 10) return FaBatteryEmpty;
  if (percent <= 35) return FaBatteryQuarter;
  if (percent <= 60) return FaBatteryHalf;
  if (percent <= 85) return FaBatteryThreeQuarters;
  return FaBatteryFull;
}

const Battery = () => {
  const [percent, setPercent] = useState<number | null>(null);
  const [charging, setCharging] = useState<boolean | null>(null);

  useEffect(() => {
    let battery: BatteryManagerLike | null = null;
    let cancelled = false;

    const sync = () => {
      if (!battery || cancelled) return;
      setPercent(Math.round(battery.level * 100));
      setCharging(battery.charging);
    };

    const init = async () => {
      if (!hasBatteryAPI(navigator)) {
        setPercent(null);
        setCharging(null);
        return;
      }

      battery = await navigator.getBattery();
      sync();

      battery.addEventListener('levelchange', sync);
      battery.addEventListener('chargingchange', sync);
    };

    init().catch(() => {
      setPercent(null);
      setCharging(null);
    });

    return () => {
      cancelled = true;
      if (!battery) return;
      battery.removeEventListener('levelchange', sync);
      battery.removeEventListener('chargingchange', sync);
    };
  }, []);

  const safePercent = percent ?? 0;
  const BatteryIcon = batteryIconFor(percent , charging);

  return (
    <div className="flex items-center gap-2">
      <span className="flex items-center gap-1 text-xs text-foreground/80 tabular-nums">
        {percent === null ? '--' : `${percent}%`}
        <BatteryIcon className="h-4 w-4 text-foreground/80" aria-hidden="true" />
      </span>
    </div>
  );
};


export default Battery;