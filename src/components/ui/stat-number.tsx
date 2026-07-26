"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";

const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

/** Number that counts up from 0 once it scrolls into view. Static (no motion
 *  value flicker) when reduced motion is requested. */
export function StatNumber({
  value,
  suffix = "",
  className,
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const reduce = useReducedMotionSafe();
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const started = useRef(false);
  const count = useMotionValue(reduce ? value : 0);
  const rounded = useTransform(count, (v) => `${Math.round(v).toLocaleString("en-US")}${suffix}`);

  useEffect(() => {
    if (!inView || started.current || reduce) return;
    started.current = true;
    const controls = animate(count, value, { duration: 1.4, ease: EASE_EXPO });
    return () => controls.stop();
  }, [inView, reduce, count, value]);

  return (
    <motion.span ref={ref} className={className}>
      {reduce ? `${value.toLocaleString("en-US")}${suffix}` : rounded}
    </motion.span>
  );
}
