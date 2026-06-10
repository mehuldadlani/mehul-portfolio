"use client";

import { useReducedMotion, useInView, animate } from "motion/react";
import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------
   CountUp — animates a number into view. Static fallback under
   reduced motion. Monochrome; the value carries no color of its own.
------------------------------------------------------------------ */
export function CountUp({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  className = "",
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(
    reduce ? value.toFixed(decimals) : "0"
  );

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(value.toFixed(decimals));
      return;
    }
    const controls = animate(0, value, {
      duration: 1.3,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [inView, value, decimals, reduce]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
