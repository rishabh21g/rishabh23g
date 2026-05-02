import { cn } from "@/lib/utils";
import { SectionId, SECTIONS } from "./types/types";
import { motion } from "framer-motion";
import { VisitorCount } from "../desktop/VisitorCount";
import { Clock } from "../desktop/Clock";

export function SectionTabs({
  active,
}: {
  active: SectionId;
}) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      // Adding a slight offset to account for the sticky header
      const offset = 80;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth"
      });
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-card/80 backdrop-blur-xl border-b border-border/30">
       <header
            className="
             h-9
              bg-card/70 backdrop-brightness-80 backdrop-blur-3xl
              border-b border-border/30
              flex items-center justify-between px-4 
            "
          >
            <div className="flex items-center gap-2 text-sm text-foreground/80">
              <span className="font-semibold">RG</span>
            </div>
      
            <div className="flex items-center gap-4 text-sm text-foreground/80">
            <VisitorCount/>
              <Clock />
            </div>
          </header>
      <div className="flex mb-2 items-center gap-2 overflow-x-auto px-4 pt-2 pb-0" style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}>
        {SECTIONS.map((s) => {
          const isActive = s.id === active;
          return (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={cn(
                "relative px-3 py-2 text-[11px] font-medium uppercase tracking-widest whitespace-nowrap transition-colors",
                isActive ? "text-primary" : "text-muted-foreground/60 hover:text-muted-foreground"
              )}
            >
              <span className="relative z-10">{s.label}</span>
              
              {/* Animated Underline */}
              {isActive && (
                <motion.div
                  layoutId="mobile-tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}