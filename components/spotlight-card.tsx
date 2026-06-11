"use client";

import { useRef, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";

/* Pointer-tracked spotlight + optional subtle tilt on a panel
   (Motion Primitives patterns, tuned to the blueprint accent).
   The glow is an inner element, not a pseudo-element, because .tick
   already owns the panel's ::before/::after corner ticks. */
export function SpotlightCard({
  as: Tag = "div",
  className = "",
  tilt = false,
  children,
}: {
  as?: "div" | "article";
  className?: string;
  tilt?: boolean;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
    if (tilt && !reduce && window.matchMedia("(pointer: fine)").matches) {
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateX(${(-py * 3).toFixed(2)}deg) rotateY(${(px * 3).toFixed(2)}deg)`;
    }
  }

  function onLeave() {
    const el = ref.current;
    if (el) el.style.transform = "";
  }

  return (
    <Tag
      ref={ref as never}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`spotlight ${className}`}
      style={
        tilt
          ? { transition: "transform 0.4s var(--ease-out-quint)" }
          : undefined
      }
    >
      <span aria-hidden className="spot-glow" />
      {children}
    </Tag>
  );
}
