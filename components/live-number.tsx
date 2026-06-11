"use client";

import NumberFlow from "@number-flow/react";
import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

/* Rolls a number up once when scrolled into view. NumberFlow disables its
   own transitions under prefers-reduced-motion. */
export function LiveNumber({
  value,
  className = "",
}: {
  value: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [v, setV] = useState(0);

  useEffect(() => {
    if (inView) setV(value);
  }, [inView, value]);

  return (
    <span ref={ref} className={className}>
      <NumberFlow
        value={v}
        format={{ useGrouping: true }}
        transformTiming={{ duration: 900, easing: "cubic-bezier(0.16,1,0.3,1)" }}
        spinTiming={{ duration: 900, easing: "cubic-bezier(0.16,1,0.3,1)" }}
      />
    </span>
  );
}
