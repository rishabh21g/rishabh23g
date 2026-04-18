
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

function appplyMode(mode: COLORMODE) {
    document.body.classList.toggle("dark", mode === "dark")
    localStorage.setItem(MODE_KEY , mode)
}

function getInitialMode() : COLORMODE{
    const saved = localStorage.getItem(MODE_KEY)
    if( saved === "dark" || saved === "light") return saved
    return window.matchMedia?.(("prefers-color-scheme: dark")).matches ? "dark" : "light"
}
export function ThemeMode() {
    useEffect(()=>{
        const savedMode = getInitialMode()
        appplyMode(savedMode)

    }, [])
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <IoMdOptions className="h-4 w-4 text-foreground/80" aria-hidden="true" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={()=>{
                    appplyMode("dark")
                }}>
                    <CiDark className="h-4 w-4 text-foreground/80" aria-hidden="true" />
                    Dark 
                </DropdownMenuItem>
                <DropdownMenuItem onClick={()=>{
                    appplyMode("light")
                }}>
                    <CiLight className="h-4 w-4 text-foreground/80" aria-hidden="true" />
                    Light
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
