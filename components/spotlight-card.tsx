"use client";

import { useRef, type ReactNode } from "react";

/* Pointer-tracked spotlight on a panel (Motion Primitives pattern, tuned to
   the blueprint accent). The glow is an inner element, not a pseudo-element,
   because .tick already owns the panel's ::before/::after corner ticks. */
export function SpotlightCard({
  as: Tag = "div",
  className = "",
  children,
}: {
  as?: "div" | "article";
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement | null>(null);

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  return (
    <Tag
      ref={ref as never}
      onMouseMove={onMove}
      className={`spotlight ${className}`}
    >
      <span aria-hidden className="spot-glow" />
      {children}
    </Tag>
  );
}
