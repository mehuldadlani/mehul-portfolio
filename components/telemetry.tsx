"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

/* Live clock + date in IST (Bangalore) */
export function Clock({ className = "" }: { className?: string }) {
  const [now, setNow] = useState<string>("--:--:--");
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setNow(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Asia/Kolkata",
        }).format(d)
      );
      setDate(
        new Intl.DateTimeFormat("en-GB", {
          weekday: "short",
          day: "2-digit",
          month: "short",
          year: "numeric",
          timeZone: "Asia/Kolkata",
        })
          .format(d)
          .toUpperCase()
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className={className} suppressHydrationWarning>
      {date} · {now} IST
    </span>
  );
}

/* Live FPS meter */
export function Fps({ className = "" }: { className?: string }) {
  const [fps, setFps] = useState(60);
  useEffect(() => {
    let raf = 0;
    let frames = 0;
    let last = performance.now();
    const loop = (t: number) => {
      frames++;
      if (t - last >= 1000) {
        setFps(Math.round((frames * 1000) / (t - last)));
        frames = 0;
        last = t;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <span className={className} suppressHydrationWarning>
      {String(fps).padStart(2, "0")} FPS
    </span>
  );
}

/* Scramble-decode text when scrolled into view */
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\<>#*+=-";

export function Scramble({
  text,
  className = "",
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  as?: "span" | "h1" | "h2" | "div";
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [out, setOut] = useState(reduce ? text : "");

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setOut(text);
      return;
    }
    let frame = 0;
    const total = 28;
    const id = setInterval(() => {
      frame++;
      const revealed = Math.floor((frame / total) * text.length);
      let s = "";
      for (let i = 0; i < text.length; i++) {
        if (i < revealed || text[i] === " ") s += text[i];
        else s += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setOut(s);
      if (frame >= total) {
        setOut(text);
        clearInterval(id);
      }
    }, 28);
    return () => clearInterval(id);
  }, [inView, text, reduce]);

  return (
    <Tag ref={ref as never} className={className} suppressHydrationWarning>
      {out || text}
    </Tag>
  );
}
