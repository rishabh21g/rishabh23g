import { AnimatePresence, useReducedMotion , motion } from "framer-motion";
import { useMemo } from "react";

export function SectionShell({
  sectionKey,
  children,
}: {
  sectionKey: string;
  children: React.ReactNode;
}) {
  const reduceMotion = useReducedMotion();

  const anim = useMemo(() => {
    if (reduceMotion) {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.15 } },
        exit: { opacity: 0, transition: { duration: 0.12 } },
      } as const;
    }

    return {
      initial: { opacity: 0, y: 10, filter: "blur(14px)" },
      animate: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.22, ease: [0.12, 1, 0.2, 1] },
      },
      exit: {
        opacity: 0,
        y: -6,
        filter: "blur(14px)",
        transition: { duration: 0.16, ease: [0.2, 0, 0.2, 1] },
      },
    } as const;
  }, [reduceMotion]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div key={sectionKey} {...anim} style={{ willChange: "transform, filter, opacity" }}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
