"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { GrAdd } from "react-icons/gr";

type UserNote = {
  id: string;
  text: string;
  createdAt: number;
};

const STORAGE_KEY = "portfolio.userNotes.v1";

function safeParseNotes(raw: string | null): UserNote[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((n) => n && typeof n.id === "string" && typeof n.text === "string")
      .map((n) => ({
        id: n.id,
        text: n.text,
        createdAt: typeof n.createdAt === "number" ? n.createdAt : Date.now(),
      }));
  } catch {
    return [];
  }
}

function newId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export default function Notes() {
  const pinnedNotes = useMemo(
    () => [
      "Open Resume for full details.",
      "Built with Next.js + Tailwind. + Framer Motion.  ",
      "Current focus: Golang + React Native.",
      "Always shipping small improvements.",
      "Say hi via Contact.",
    ],
    []
  );

  const [userNotes, setUserNotes] = useState<UserNote[]>([]);
  const [draft, setDraft] = useState("");

  // Load from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    setUserNotes(safeParseNotes(window.localStorage.getItem(STORAGE_KEY)));
  }, []);

  // Persist to localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(userNotes));
  }, [userNotes]);

  const addNote = () => {
    const text = draft.trim();
    if (!text) return;

    setUserNotes((prev) => [
      { id: newId(), text, createdAt: Date.now() },
      ...prev,
    ]);
    setDraft("");
  };

  return (
    <section className="w-100 max-w-[92vw] max-h-[55vh] overflow-y-auto pr-2">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-2xl font-semibold tracking-tight text-foreground">
            Notes
          </div>
          <div className="mt-1 text-sm text-muted-foreground/70">
            Quick thoughts, saved locally on this device.
          </div>
        </div>
      </div>

      <div className="mt-4 h-px w-full bg-border/30" />

      {/* Add note */}
      <div className="mt-4 flex items-center justify-center gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Write a note…"
          className={[
            "flex-1 resize-none rounded-md",
            "bg-background/10 backdrop-blur-md",
            "ring-1 ring-border/25",
            "px-3 py-2",
            "text-sm text-foreground/90",
            "placeholder:text-muted-foreground/40",
            "outline-none focus:ring-2 focus:ring-ring/30",
          ].join(" ")}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              addNote();
            }
          }}
        />
        <Button
          variant="outline"
          size="icon-lg"
          className="bg-background/20 backdrop-blur-md border-border/30"
          onClick={addNote}
          disabled={!draft.trim()}
        >
          <GrAdd/>
        </Button>
      </div>

      {/* Pinned notes */}
      <div className="mt-6">
        <div className="text-[0.7rem] uppercase tracking-[0.25em] text-muted-foreground/60">
          Pinned
        </div>
        <div className="mt-3 space-y-2">
          {pinnedNotes.map((t) => (
            <div
              key={t}
              className="rounded-md bg-muted/10 ring-1 ring-border/20 px-3 py-2 text-sm text-muted-foreground/75"
            >
              {t}
            </div>
          ))}
        </div>
      </div>

      {/* User notes */}
      <div className="mt-7">
        <div className="text-[0.7rem] uppercase tracking-[0.25em] text-muted-foreground/60">
          Your Notes
        </div>

        <div className="mt-3 space-y-2">
          {userNotes.length === 0 ? (
            <div className="text-sm text-muted-foreground/60">
              No notes yet — add one above.
            </div>
          ) : (
            userNotes.map((n) => (
              <div
                key={n.id}
                className="rounded-md bg-background/10 ring-1 ring-border/20 px-3 py-2"
              >
                <div className="text-sm text-foreground/85 whitespace-pre-wrap">
                  {n.text}
                </div>
                <div className="mt-1 text-[0.7rem] text-muted-foreground/50">
                  {new Date(n.createdAt).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}