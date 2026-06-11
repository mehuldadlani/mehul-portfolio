"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import NumberFlow from "@number-flow/react";

const TWO_DIGITS = { minimumIntegerDigits: 2, useGrouping: false } as const;

/* Live clock + date in IST (Bangalore) — digits roll via NumberFlow */
export function Clock({ className = "" }: { className?: string }) {
  const [t, setT] = useState<{ h: number; m: number; s: number } | null>(null);
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const timeFmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Kolkata",
    });
    const dateFmt = new Intl.DateTimeFormat("en-GB", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "Asia/Kolkata",
    });
    const tick = () => {
      const d = new Date();
      const parts = timeFmt.formatToParts(d);
      const get = (type: string) =>
        Number(parts.find((p) => p.type === type)?.value ?? 0);
      setT({ h: get("hour"), m: get("minute"), s: get("second") });
      setDate(dateFmt.format(d).toUpperCase());
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className={className} suppressHydrationWarning>
      {t ? (
        <>
          {date} ·{" "}
          <NumberFlow value={t.h} format={TWO_DIGITS} style={{ lineHeight: 1 }} />
          :
          <NumberFlow value={t.m} format={TWO_DIGITS} style={{ lineHeight: 1 }} />
          :
          <NumberFlow value={t.s} format={TWO_DIGITS} style={{ lineHeight: 1 }} />{" "}
          IST
        </>
      ) : (
        "--:--:-- IST"
      )}
    </span>
  );
}

/* Decrypt-on-hover text — restartable scramble for nav links and CTAs */
export function HoverScramble({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [out, setOut] = useState(text);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  function start() {
    if (reduce) return;
    if (timer.current) clearInterval(timer.current);
    let frame = 0;
    const total = 12;
    timer.current = setInterval(() => {
      frame++;
      const revealed = Math.floor((frame / total) * text.length);
      let s = "";
      for (let i = 0; i < text.length; i++) {
        s +=
          i < revealed || text[i] === " "
            ? text[i]
            : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setOut(frame >= total ? text : s);
      if (frame >= total && timer.current) clearInterval(timer.current);
    }, 26);
  }

  useEffect(() => {
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  return (
    <span className={className} onMouseEnter={start}>
      {out}
    </span>
  );
}

/* One-time console signature for visitors who open devtools */
export function ConsoleSig() {
  useEffect(() => {
    console.log(
      "%cOPERATIONAL MANIFEST v3.0%c\n> mehuldadlani.dev — Next.js · raw WebGL · Motion\n> Reading the console? Talk shop: mehuldadlani13@gmail.com",
      "color:#86c6f4;font-family:monospace;letter-spacing:0.2em;",
      "font-family:monospace;"
    );
  }, []);
  return null;
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
