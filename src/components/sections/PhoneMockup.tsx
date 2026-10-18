"use client";

import { Check, CloudOff, Send } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { LeafIllustration } from "@/components/illustrations/LeafIllustration";

type Phase = "scanning" | "result";

const PHASE_MS: Record<Phase, number> = { scanning: 3200, result: 4000 };

/** Loops scanning → result while on screen; parks on the result when motion is reduced. */
function useScanPhase(active: boolean, reduceMotion: boolean): Phase {
  const [phase, setPhase] = useState<Phase>("scanning");

  useEffect(() => {
    if (reduceMotion || !active) return;
    const timer = window.setTimeout(
      () => setPhase((current) => (current === "scanning" ? "result" : "scanning")),
      PHASE_MS[phase],
    );
    return () => window.clearTimeout(timer);
  }, [phase, active, reduceMotion]);

  return reduceMotion ? "result" : phase;
}

/**
 * Illustrative mock of the app's scan → result flow (copy from the app's
 * strings). Decorative, so it is hidden from assistive technology.
 */
export function PhoneMockup() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduceMotion = useReducedMotion() ?? false;
  const phase = useScanPhase(inView, reduceMotion);

  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 700], [0, -70]);

  return (
    <motion.div ref={ref} style={{ y: parallaxY }} className="relative mx-auto w-fit" aria-hidden>
      <motion.div
        initial={{ opacity: 0, y: 48, rotate: -3 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      >
        <div className="relative h-[580px] w-[284px] rounded-[2.75rem] bg-night p-3 shadow-[0_40px_80px_-24px_rgba(32,30,29,0.55)] ring-1 ring-ink/10">
          <div className="absolute top-3 left-1/2 z-20 h-6 w-24 -translate-x-1/2 rounded-b-2xl bg-night" />
          <div className="relative flex h-full flex-col overflow-hidden rounded-[2.2rem] bg-[#11100f] text-cream">
            <div className="flex items-center justify-between px-5 pt-9 pb-3">
              <span className="text-sm font-bold">Scan a leaf</span>
              <span className="rounded-full bg-leaf/15 px-2.5 py-1 text-[11px] font-bold text-leaf">
                On-device
              </span>
            </div>

            <div className="relative mx-4 flex-1 overflow-hidden rounded-3xl bg-gradient-to-b from-[#2a3a22] to-[#1b2416]">
              <LeafIllustration
                pattern="blast"
                idPrefix="hero-leaf"
                className="absolute top-1/2 left-1/2 w-[150%] max-w-none -translate-x-1/2 -translate-y-1/2 -rotate-[58deg]"
              />
              <ViewfinderCorners />
              {phase === "scanning" && (
                <div
                  className="absolute inset-x-6 top-8 h-0.5 rounded-full bg-leaf shadow-[0_0_16px_4px_rgba(182,224,122,0.55)] motion-safe:animate-scan"
                  style={{ ["--scan-distance" as string]: "300px" }}
                />
              )}
              <div className="absolute inset-x-0 bottom-4 flex justify-center">
                <span className="rounded-full bg-night/80 px-3 py-1.5 text-[11px] font-semibold backdrop-blur">
                  {phase === "scanning" ? "Rice leaf detected · hold steady" : "Ready to scan"}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center py-5">
              <div className="size-14 rounded-full border-4 border-cream/80 p-1">
                <div className="size-full rounded-full bg-cream" />
              </div>
            </div>

            <AnimatePresence>{phase === "result" && <ResultSheet />}</AnimatePresence>
          </div>
        </div>

        <FloatingChip className="top-24 -left-16" delay={0}>
          <CloudOff className="size-4 text-olive-700" />
          Works offline
        </FloatingChip>
        <FloatingChip className="top-[56%] -right-16" delay={1.2}>
          <span className="flex size-5 items-center justify-center rounded-full bg-verified text-white">
            <Check className="size-3" strokeWidth={3} />
          </span>
          Report sent to MAO
        </FloatingChip>
      </motion.div>
    </motion.div>
  );
}

function ResultSheet() {
  return (
    <motion.div
      className="absolute inset-x-0 bottom-0 rounded-t-[1.75rem] bg-cream p-5 text-ink"
      initial={{ y: "100%" }}
      animate={{ y: "0%" }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
    >
      <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-ink/15" />
      <p className="text-[11px] font-bold tracking-wider text-earth-700 uppercase">Scan result</p>
      <div className="mt-1 flex items-start justify-between gap-2">
        <div>
          <p className="text-xl font-extrabold">Rice Blast</p>
          <p className="text-xs text-earth-700 italic">Magnaporthe oryzae</p>
        </div>
        <span className="rounded-full bg-alert/10 px-2.5 py-1 text-[11px] font-bold text-alert">
          High
        </span>
      </div>
      <div className="mt-4 rounded-2xl bg-paper p-3 text-xs leading-relaxed text-earth-800">
        <p className="font-bold text-ink">What to do now</p>
        Drain the field and avoid standing water on leaves.
      </div>
      <div className="mt-4 flex h-11 items-center justify-center gap-2 rounded-2xl bg-ink text-sm font-bold text-cream">
        <Send className="size-4" />
        Report to MAO
      </div>
    </motion.div>
  );
}

function ViewfinderCorners() {
  const corner = "absolute size-7 border-leaf/90";
  return (
    <>
      <span className={`${corner} top-5 left-5 rounded-tl-xl border-t-2 border-l-2`} />
      <span className={`${corner} top-5 right-5 rounded-tr-xl border-t-2 border-r-2`} />
      <span className={`${corner} bottom-14 left-5 rounded-bl-xl border-b-2 border-l-2`} />
      <span className={`${corner} right-5 bottom-14 rounded-br-xl border-r-2 border-b-2`} />
    </>
  );
}

function FloatingChip({
  children,
  className,
  delay,
}: {
  children: React.ReactNode;
  className: string;
  delay: number;
}) {
  return (
    <motion.div
      className={`absolute hidden items-center gap-2 rounded-2xl bg-paper/95 px-3.5 py-2.5 text-sm font-bold whitespace-nowrap text-ink shadow-xl ring-1 shadow-ink/10 ring-ink/5 backdrop-blur sm:flex ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
      transition={{
        opacity: { delay: 0.8 + delay * 0.3, duration: 0.5 },
        scale: { delay: 0.8 + delay * 0.3, duration: 0.5 },
        y: { delay, duration: 5, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      {children}
    </motion.div>
  );
}
