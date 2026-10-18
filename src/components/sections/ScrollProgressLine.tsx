"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";

/**
 * Connector between the "How it works" steps that draws itself as the section
 * scrolls through the viewport: horizontal on desktop, vertical on mobile.
 */
export function ScrollProgressLine() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.55"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0">
      {/* Desktop: runs between the centres of the first and last step markers. */}
      <div className="absolute top-7 right-[16.66%] left-[16.66%] hidden h-1 rounded-full bg-ink/10 md:block">
        <motion.div
          className="h-full origin-left rounded-full bg-gradient-to-r from-clay-700 to-olive"
          style={{ scaleX: progress }}
        />
      </div>
      {/* Mobile: runs down the left edge behind the markers. */}
      <div className="absolute top-7 bottom-16 left-[26px] w-1 rounded-full bg-ink/10 md:hidden">
        <motion.div
          className="h-full w-full origin-top rounded-full bg-gradient-to-b from-clay-700 to-olive"
          style={{ scaleY: progress }}
        />
      </div>
    </div>
  );
}
