"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Camera as CameraIcon, Trash2, RotateCcw } from "lucide-react";

type SavedShot = {
  id: string;
  dataUrl: string; // base64 image
  createdAt: number;
};

const STORAGE_KEY = "portfolio.camera.shots.v1";
const FACING_KEY = "portfolio.camera.facing.v1";

function newId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function safeParseShots(raw: string | null): SavedShot[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((x) => x && typeof x.id === "string" && typeof x.dataUrl === "string")
      .map((x) => ({
        id: x.id,
        dataUrl: x.dataUrl,
        createdAt: typeof x.createdAt === "number" ? x.createdAt : Date.now(),
      }))
      .slice(0, 30);
  } catch {
    return [];
  }
}

export default function Camera() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [status, setStatus] = useState<
    "idle" | "starting" | "ready" | "denied" | "unavailable" | "error"
  >("idle");

  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const [shots, setShots] = useState<SavedShot[]>([]);

  // load persisted state
  useEffect(() => {
    if (typeof window === "undefined") return;
    setShots(safeParseShots(window.localStorage.getItem(STORAGE_KEY)));

    const savedFacing = window.localStorage.getItem(FACING_KEY);
    if (savedFacing === "user" || savedFacing === "environment") setFacingMode(savedFacing);
  }, []);

  // persist shots
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(shots));
  }, [shots]);

  // persist facing mode
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(FACING_KEY, facingMode);
  }, [facingMode]);

  async function stopStream() {
    const s = streamRef.current;
    streamRef.current = null;
    if (s) s.getTracks().forEach((t) => t.stop());
  }

  async function startStream(mode: "user" | "environment") {
    if (!navigator?.mediaDevices?.getUserMedia) {
      setStatus("unavailable");
      return;
    }

    setStatus("starting");
    await stopStream();

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: mode },
        audio: false,
      });

      streamRef.current = stream;

      const v = videoRef.current;
      if (!v) return;

      v.srcObject = stream;
      await v.play();

      setStatus("ready");
    } catch (e: any) {
      if (e?.name === "NotAllowedError" || e?.name === "PermissionDeniedError") {
        setStatus("denied");
      } else {
        setStatus("error");
      }
    }
  }

  // start camera, restart when facingMode changes
  useEffect(() => {
    startStream(facingMode);
    return () => {
      stopStream();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facingMode]);

  const canCapture = status === "ready";

  const title = useMemo(() => {
    if (status === "starting") return "Starting camera…";
    if (status === "denied") return "Camera permission denied";
    if (status === "unavailable") return "Camera not available";
    if (status === "error") return "Camera error";
    return "Camera";
  }, [status]);

  function capture() {
    const v = videoRef.current;
    if (!v) return;

    const w = v.videoWidth || 1280;
    const h = v.videoHeight || 720;

    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(v, 0, 0, w, h);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.86);

    setShots((prev) => [{ id: newId(), dataUrl, createdAt: Date.now() }, ...prev].slice(0, 30));
  }

  function clearAll() {
    setShots([]);
    if (typeof window !== "undefined") window.localStorage.removeItem(STORAGE_KEY);
  }

  function deleteOne(id: string) {
    setShots((prev) => prev.filter((s) => s.id !== id));
  }

  return (
    <section className="w-190 max-w-[92vw]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-2xl font-semibold tracking-tight text-foreground">{title}</div>
          <div className="mt-1 text-sm text-muted-foreground/70">
            Captures are saved locally on this device.
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="bg-background/20 backdrop-blur-md border-border/30"
            onClick={() => setFacingMode((m) => (m === "user" ? "environment" : "user"))}
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            Flip
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="bg-background/20 backdrop-blur-md border-border/30"
            onClick={clearAll}
            disabled={shots.length === 0}
          >
            <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
            Clear
          </Button>
        </div>
      </div>

      <div className="mt-4 h-px w-full bg-border/30" />

      <div className="mt-4 grid gap-4">
        {/* Preview */}
        <div className="rounded-lg ring-1 ring-border/25 bg-background/10 overflow-hidden">
          <div className="aspect-video bg-muted/10">
            <video
              ref={videoRef}
              muted
              playsInline
              className="h-full w-full object-cover"
            />
          </div>

          <div className="p-3 flex items-center justify-between gap-3">
            <div className="text-xs text-muted-foreground/60">
              {status === "ready"
                ? "Ready"
                : status === "starting"
                  ? "Requesting camera…"
                  : status === "denied"
                    ? "Allow camera access in the browser"
                    : status === "unavailable"
                      ? "No camera API in this browser"
                      : "Unable to start camera"}
            </div>

            <Button onClick={capture} disabled={!canCapture}>
              <CameraIcon className="h-4 w-4" aria-hidden="true" />
              Capture
            </Button>
          </div>
        </div>

        {/* Saved */}
        <div>
          <div className="text-[0.7rem] uppercase tracking-[0.25em] text-muted-foreground/60">
            Saved
          </div>

          {shots.length === 0 ? (
            <div className="mt-2 text-sm text-muted-foreground/60">No captures yet.</div>
          ) : (
            <div className="mt-3 grid grid-cols-3 gap-2">
              {shots.map((s) => (
                <div key={s.id} className="relative overflow-hidden rounded-md ring-1 ring-border/25 bg-muted/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.dataUrl} alt="Capture" className="h-24 w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => deleteOne(s.id)}
                    className="absolute top-1 right-1 rounded-md bg-background/40 backdrop-blur-md ring-1 ring-border/30 px-2 py-1 text-[0.65rem] text-foreground/80 hover:bg-background/60"
                    aria-label="Delete capture"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="mt-2 text-xs text-muted-foreground/50">
            Note: localStorage has size limits (large photos may fill it).
          </div>
        </div>
      </div>
    </section>
  );
}