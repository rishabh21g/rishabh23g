'use client';

import React, { useEffect, useState } from 'react';
import { FiWifi, FiWifiOff } from 'react-icons/fi';
import { MdBluetooth, MdBluetoothConnected, MdBluetoothDisabled } from 'react-icons/md';

type NetworkInfoLike = {
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
};

function getNetworkInfo(): NetworkInfoLike | null {
  const nav = navigator as unknown as { connection?: NetworkInfoLike };
  return nav.connection ?? null;
}

const Connection = () => {
  const [online, setOnline] = useState<boolean | null>(null);
  const [networkInfo, setNetworkInfo] = useState<NetworkInfoLike | null>(null);
  const [bluetoothAvailable, setBluetoothAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    // Wi‑Fi/Internet (best effort)
    const syncOnline = () => setOnline(navigator.onLine);
    syncOnline();

    window.addEventListener('online', syncOnline);
    window.addEventListener('offline', syncOnline);

    // Network quality (Chrome/Android etc. only; safe if missing)
    setNetworkInfo(getNetworkInfo());

    return () => {
      window.removeEventListener('online', syncOnline);
      window.removeEventListener('offline', syncOnline);
    };
  }, []);

  useEffect(() => {
    // Bluetooth availability (Chromium only; safe if missing)
    let cancelled = false;

    const nav = navigator as unknown as {
      bluetooth?: {
        getAvailability?: () => Promise<boolean>;
        addEventListener?: (type: 'availabilitychanged', listener: () => void) => void;
        removeEventListener?: (type: 'availabilitychanged', listener: () => void) => void;
      };
    };

    const bt = nav.bluetooth;
    if (!bt?.getAvailability) {
      setBluetoothAvailable(null);
      return;
    }

    const sync = async () => {
      try {
        const available = await bt.getAvailability!();
        if (!cancelled) setBluetoothAvailable(available);
      } catch {
        if (!cancelled) setBluetoothAvailable(null);
      }
    };

    const onAvailabilityChanged = () => void sync();

    void sync();
    bt.addEventListener?.('availabilitychanged', onAvailabilityChanged);

    return () => {
      cancelled = true;
      bt.removeEventListener?.('availabilitychanged', onAvailabilityChanged);
    };
  }, []);

  const wifiOnline = online === true;
  const wifiKnownOffline = online === false;


  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground select-none">
      {/* Wi‑Fi */}
      {wifiKnownOffline ? (
        <FiWifiOff
          className="h-4 w-4 text-muted-foreground/50"
          title="Offline"
          aria-label="Offline"
        />
      ) : (
        <FiWifi
          className="h-4 w-4 text-foreground/80"
          title={wifiOnline ? 'Online' : 'Status unknown'}
          aria-label={wifiOnline ? 'Online' : 'Status unknown'}
        />
      )}

      {/* Bluetooth (this is availability, not “connected to a device”) */}
      {bluetoothAvailable === false ? (
        <MdBluetoothDisabled
          className="h-4 w-4 text-muted-foreground/50"
          title="Bluetooth unavailable"
          aria-label="Bluetooth unavailable"
        />
      ) : bluetoothAvailable === true ? (
        <MdBluetoothConnected
          className="h-4 w-4 text-foreground/80"
          title="Bluetooth available"
          aria-label="Bluetooth available"
        />
      ) : (
        <MdBluetooth
          className="h-4 w-4 text-muted-foreground/50"
          title="Bluetooth status unknown"
          aria-label="Bluetooth status unknown"
        />
      )}
    </div>
  );
};

export default Connection;