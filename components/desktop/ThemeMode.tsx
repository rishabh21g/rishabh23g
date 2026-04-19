import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IoMdOptions } from "react-icons/io";
import { CiDark, CiLight } from "react-icons/ci";
import { useEffect } from "react";

type COLORMODE = "dark" | "light"
const MODE_KEY = "mode"

function setTransitionOrigin(x: number, y: number) {
    const root = document.documentElement;
    const r = Math.hypot(
        Math.max(x, innerWidth - x),
        Math.max(y, innerHeight - y)
    );
    root.style.setProperty("--vt-x", `${x}px`);
    root.style.setProperty("--vt-y", `${y}px`);
    root.style.setProperty("--vt-r", `${r}px`);
}

function applyMode(mode: COLORMODE, origin?: { x: number; y: number }) {
    const reduced =
        window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

    const update = () => {
        document.body.classList.toggle("dark", mode === "dark")
        localStorage.setItem(MODE_KEY, mode)
    };

    const x = origin?.x ?? window.innerWidth; // top-right
    const y = origin?.y ?? 0;

    if (reduced || typeof (document as any).startViewTransition !== "function") {
        update();
        return;
    }

    setTransitionOrigin(x, y);
    (document as any).startViewTransition(() => update());
}

function getInitialMode(): COLORMODE {
    const saved = localStorage.getItem(MODE_KEY)
    if (saved === "dark" || saved === "light") return saved
    return "dark"
}
export function ThemeMode() {
    useEffect(() => {
        const savedMode = getInitialMode();
        document.body.classList.toggle("dark", savedMode === "dark");
    }, []);
    return (
        <DropdownMenu>
            <DropdownMenuTrigger >
                <IoMdOptions className="h-4 w-4 text-foreground/80" aria-hidden="true" />

            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem
                    onClick={(e) => applyMode("dark", { x: e.clientX, y: e.clientY })}
                >
                    <button type="button" aria-label="Options" className="flex items-center justify-center gap-1">
                        <CiDark className="h-4 w-4 text-foreground/80" aria-hidden="true" />
                        Dark
                    </button>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={(e) => applyMode("light", { x: e.clientX, y: e.clientY })}
                >
                    <button type="button" aria-label="Options" className="flex items-center justify-center gap-1">
                        <CiLight className="h-4 w-4 text-foreground/80" aria-hidden="true" />
                        Light
                    </button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
