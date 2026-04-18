"use client";

import { BEST_KEY, GRID, TICK_MS } from "@/constants/GAME";
import { Cell, Dir } from "@/types/game";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { BiReset } from "react-icons/bi";
import { LuPause, LuPlay } from "react-icons/lu";
import { MdClear } from "react-icons/md";
import { Button } from "../ui/button";




function eq(a: Cell, b: Cell) {
    return a.x === b.x && a.y === b.y;
}

function randCell(exclude: Cell[]) {
    while (true) {
        const c = { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) };
        if (!exclude.some((s) => eq(s, c))) return c;
    }
}

function isOpposite(a: Dir, b: Dir) {
    return (
        (a === "up" && b === "down") ||
        (a === "down" && b === "up") ||
        (a === "left" && b === "right") ||
        (a === "right" && b === "left")
    );
}

export default function Game() {
    const [running, setRunning] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    const [snake, setSnake] = useState<Cell[]>([
        { x: 8, y: 10 },
        { x: 7, y: 10 },
        { x: 6, y: 10 },
    ]);
    const [dir, setDir] = useState<Dir>("right");
    const dirRef = useRef<Dir>("right");

    const [food, setFood] = useState<Cell>(() => randCell([{ x: 8, y: 10 }, { x: 7, y: 10 }, { x: 6, y: 10 }]));
    const [score, setScore] = useState(0);
    const [best, setBest] = useState<number>(() => {
        if (typeof window === "undefined") return 0;
        const n = Number(localStorage.getItem(BEST_KEY));
        return Number.isFinite(n) ? n : 0;
    });

    const head = snake[0];

    const cells = useMemo(() => {
        const snakeSet = new Set(snake.map((c) => `${c.x},${c.y}`));
        return Array.from({ length: GRID * GRID }, (_, i) => {
            const x = i % GRID;
            const y = Math.floor(i / GRID);
            const key = `${x},${y}`;
            const isHead = head?.x === x && head?.y === y;
            const isSnake = snakeSet.has(key);
            const isFood = food.x === x && food.y === y;
            return { key, isHead, isSnake, isFood };
        });
    }, [snake, food, head]);

    function reset() {
        const initial = [
            { x: 8, y: 10 },
            { x: 7, y: 10 },
            { x: 6, y: 10 },
        ];
        setSnake(initial);
        setDir("right");
        dirRef.current = "right";
        setFood(randCell(initial));
        setScore(0);
        setGameOver(false);
        setRunning(false);
    }

    useEffect(() => {
        dirRef.current = dir;
    }, [dir]);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            const k = e.key.toLowerCase();

            let next: Dir | null = null;
            if (k === "arrowup" || k === "w") next = "up";
            if (k === "arrowdown" || k === "s") next = "down";
            if (k === "arrowleft" || k === "a") next = "left";
            if (k === "arrowright" || k === "d") next = "right";

            if (k === " " || k === "p") {
                setRunning((r) => !r);
                e.preventDefault();
                return;
            }

            if (k === "r") {
                reset();
                e.preventDefault();
                return;
            }

            if (!next) return;

            // prevent scroll from arrows
            if (k.startsWith("arrow")) e.preventDefault();

            const current = dirRef.current;
            if (!isOpposite(current, next)) {
                setDir(next);
                dirRef.current = next;
            }
        };

        window.addEventListener("keydown", onKeyDown, { passive: false });
        return () => window.removeEventListener("keydown", onKeyDown as any);
    }, []);

    useEffect(() => {
        if (!running || gameOver) return;

        const id = window.setInterval(() => {
            setSnake((prev) => {
                const d = dirRef.current;
                const h = prev[0];

                const nextHead: Cell = { x: h.x, y: h.y };
                if (d === "up") nextHead.y -= 1;
                if (d === "down") nextHead.y += 1;
                if (d === "left") nextHead.x -= 1;
                if (d === "right") nextHead.x += 1;

                // wall collision
                if (nextHead.x < 0 || nextHead.x >= GRID || nextHead.y < 0 || nextHead.y >= GRID) {
                    setGameOver(true);
                    setRunning(false);
                    return prev;
                }

                // self collision (allow moving into last tail cell only if we are not growing)
                const willEat = eq(nextHead, food);
                const body = willEat ? prev : prev.slice(0, -1);
                if (body.some((c) => eq(c, nextHead))) {
                    setGameOver(true);
                    setRunning(false);
                    return prev;
                }

                const next = [nextHead, ...prev];

                if (willEat) {
                    setScore((s) => {
                        const ns = s + 1;
                        setBest((b) => {
                            const nb = Math.max(b, ns);
                            localStorage.setItem(BEST_KEY, String(nb));
                            return nb;
                        });
                        return ns;
                    });
                    setFood(randCell(next));
                    return next; // keep tail (grow)
                }

                next.pop(); // move (drop tail)
                return next;
            });
        }, TICK_MS);

        return () => window.clearInterval(id);
    }, [running, gameOver, food]);

    return (
        <div className="space-y-1 p-2   w-150 max-w-[92vw]
        max-h-[80vh] overflow-hidden ">
            <div className="flex items-center justify-between gap-3 w-full">
                <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                    Snake
                </div>

                <div className="flex items-center gap-3 text-[0.7rem] text-muted-foreground">
                    <span>
                        Score: <span className="text-foreground/80">{score}</span>
                    </span>
                    <span>
                        Best: <span className="text-foreground/80">{best}</span>
                    </span>
                    <span className={gameOver ? "text-destructive" : ""}>
                        {gameOver ? "Game Over" : running ? "Running" : "Paused"}
                    </span>
                </div>
            </div>

                <div
                    className="mx-auto grid gap-1 w-full max-w-220 grid-cols-[repeat(var(--grid),minmax(0,1fr))] "
                    style={{ ["--grid" as any]: GRID }}
                >
                    {cells.map((c) => (
                        <div
                            key={c.key}
                            className={[
                                "aspect-square rounded-lg  ring-border/25",
                                c.isFood ? "bg-primary/90" : "",
                                c.isHead ? "bg-foreground/70" : c.isSnake ? "bg-foreground/35" : "bg-background/40",
                            ].join(" ")}
                        />
                    ))}
                </div>

            <div className="flex items-center justify-center w-full gap-2 my-1">
             

                <div className="flex items-center gap-">
                    <Button
                        onClick={() => setRunning((r) => !r)}
                    >
                        {running ? <LuPause className="h-4 w-4 text-foreground/80" aria-hidden="true" /> : <LuPlay className="h-4 w-4 text-foreground/80" aria-hidden="true"  />}
                    </Button>

                    <Button
                        onClick={reset}
                    >
                        <BiReset className="h-4 w-4 text-foreground/80" aria-hidden="true"  />
                    </Button>

                    <Button
                        onClick={() => {
                            localStorage.removeItem(BEST_KEY);
                            setBest(0);
                        }}
                    >
                        <MdClear className="h-4 w-4 text-foreground/80" aria-hidden="true" />
                    </Button>
                </div>
            </div>
        </div>
    );
}