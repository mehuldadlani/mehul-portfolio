"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 600, damping: 34, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 600, damping: 34, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-none");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as Element | null;
      setHover(!!el?.closest?.("a, button, [data-cursor], input, textarea, canvas"));
    };
    const dn = () => setDown(true);
    const up = () => setDown(false);
    const leave = () => {
      x.set(-100);
      y.set(-100);
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousedown", dn);
    window.addEventListener("mouseup", up);
    document.addEventListener("mouseleave", leave);
    return () => {
      document.documentElement.classList.remove("cursor-none");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", dn);
      window.removeEventListener("mouseup", up);
      document.removeEventListener("mouseleave", leave);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0"
      style={{ x: sx, y: sy, zIndex: 9999 }}
    >
      <div
        className="reticle"
        data-hover={hover}
        data-down={down}
      >
        <span className="r-corner r-tl" />
        <span className="r-corner r-tr" />
        <span className="r-corner r-bl" />
        <span className="r-corner r-br" />
        <span className="r-dot" />
      </div>
    </motion.div>
  );
}
