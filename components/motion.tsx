"use client";

import {
  motion,
  useReducedMotion,
  useInView,
  type Variants,
  type HTMLMotionProps,
} from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------
   useReveal — fires on scroll-into-view, but ALWAYS resolves to
   visible via a mount failsafe. Content can never stay hidden if the
   IntersectionObserver never runs (headless render, hidden tab,
   in-app browser). Robustness over purity.
------------------------------------------------------------------ */
function useReveal(amount = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    once: true,
    amount,
    margin: "0px 0px -80px 0px",
  });
  const [failsafe, setFailsafe] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setFailsafe(true), 2000);
    return () => clearTimeout(t);
  }, []);
  return { ref, show: inView || failsafe };
}

/* ------------------------------------------------------------------
   Reveal — fade + small rise as the element scrolls into view.
------------------------------------------------------------------ */
export function Reveal({
  children,
  delay = 0,
  y = 22,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const { ref, show } = useReveal(0.25);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={
        show
          ? { opacity: 1, y: 0 }
          : reduce
            ? { opacity: 0 }
            : { opacity: 0, y }
      }
      transition={{
        duration: reduce ? 0.3 : 0.7,
        delay: reduce ? 0 : delay,
        ease: EASE,
      }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------
   Stagger container + items, with the same failsafe.
------------------------------------------------------------------ */
const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export function StaggerGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { ref, show } = useReveal(0.18);
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial={false}
      animate={show ? "show" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  y = 18,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotion();
  const itemVariants: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0.3 : 0.6, ease: EASE },
    },
  };
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------
   Magnetic — subtle pull toward the cursor. Pointer-fine only;
   disabled under reduced motion. Direct style writes, no re-render.
------------------------------------------------------------------ */
export function Magnetic({
  children,
  className,
  strength = 0.3,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
} & HTMLMotionProps<"div">) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const y = (e.clientY - (rect.top + rect.height / 2)) * strength;
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  }
  function onLeave() {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0px, 0px)";
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{ transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)" }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
