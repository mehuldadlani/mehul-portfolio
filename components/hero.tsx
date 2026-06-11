"use client";

import { motion, useReducedMotion } from "motion/react";
import { profile, timeline } from "@/lib/content";
import { Magnetic } from "@/components/motion";
import { DitherShader } from "@/components/dither-shader";
import { Scramble, HoverScramble, Fps } from "@/components/telemetry";
import { ArrowUpRight, GitHub, LinkedIn, Mail } from "@/components/icons";

const EASE = [0.16, 1, 0.3, 1] as const;
const MORSE = "-- . .... ..- .-.."; // MEHUL

export function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduce ? 0.4 : 0.7, delay, ease: EASE },
  });

  return (
    <section
      id="top"
      className="relative grid min-h-[100svh] grid-cols-1 items-stretch gap-6 px-4 pt-20 pb-8 sm:px-6 lg:grid-cols-[1.04fr_0.96fr] lg:gap-8 lg:pt-24"
    >
      {/* LEFT — dossier */}
      <div className="flex flex-col justify-center">
        <motion.div {...rise(0.05)} className="flex items-center gap-3">
          <span className="label">Operational Manifest</span>
          <span className="dash flex-1" />
          <span className="label">v3.0</span>
        </motion.div>

        <motion.div {...rise(0.1)} className="mt-7">
          <div className="label text-faint">Subject</div>
          <h1 className="font-display mt-2 text-[clamp(2.6rem,8vw,5.2rem)] font-medium leading-[0.94] tracking-[-0.02em] text-ink">
            <Scramble text="MEHUL" as="div" />
            <Scramble text="DADLANI" as="div" />
          </h1>
          <div className="mt-3 font-mono text-[11px] tracking-[0.25em] text-faint">
            ID: {MORSE}
          </div>
        </motion.div>

        <motion.p
          {...rise(0.2)}
          className="mt-6 max-w-md font-mono text-[13px] leading-relaxed text-muted"
        >
          <span className="text-accent">{">"}</span> Product engineer. I build
          mobile products end to end, across Flutter, backend, and the release
          train, with a Web3 and security spine.
        </motion.p>

        {/* status grid */}
        <motion.dl
          {...rise(0.28)}
          className="mt-7 grid max-w-md grid-cols-2 gap-x-6 gap-y-3 font-mono text-[11px]"
        >
          <Stat k="STATUS" v="OPEN TO WORK" accent />
          <Stat k="BASE" v="BANGALORE, IN" />
          <Stat k="NOW" v="@ KLYDO" />
          <Stat k="FOCUS" v="MOBILE·WEB3·SEC" />
        </motion.dl>

        {/* trajectory gantt */}
        <motion.div {...rise(0.36)} className="mt-7 max-w-md">
          <div className="label mb-2 flex items-center justify-between">
            <span>Trajectory</span>
            <span>dur</span>
          </div>
          <div className="border-t border-[var(--line)]">
            {timeline.map((t, i) => (
              <div
                key={t.org}
                className="grid grid-cols-[5.2rem_1fr_auto] items-center gap-3 border-b border-[var(--line)] py-2.5 font-mono text-[11.5px]"
              >
                <span className="truncate text-ink">{t.org}</span>
                <div className="h-1.5 w-full bg-[var(--line)]">
                  <motion.div
                    initial={reduce ? false : { scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      duration: 0.9,
                      delay: 0.55 + i * 0.09,
                      ease: EASE,
                    }}
                    className={`h-full origin-left ${t.live ? "blink" : ""}`}
                    style={{
                      width: `${Math.max(8, (t.months / 48) * 100)}%`,
                      background: t.live ? "var(--accent)" : "var(--muted)",
                    }}
                  />
                </div>
                <span className="tabular-nums text-[10.5px] text-faint">
                  {t.period}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div {...rise(0.44)} className="mt-8 flex flex-wrap gap-3">
          <Magnetic className="inline-flex">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 border border-[var(--line-strong)] bg-[var(--surface)] px-5 py-2.5 font-mono text-[12px] text-ink transition-colors hover:border-accent hover:text-accent"
            >
              <HoverScramble text="[ SEE_THE_WORK ]" />
            </a>
          </Magnetic>
          <a
            href={`mailto:${profile.email}`}
            className="group inline-flex items-center gap-2 px-2 py-2.5 font-mono text-[12px] text-muted transition-colors hover:text-accent"
          >
            <Mail className="h-4 w-4" /> {profile.email}
          </a>
        </motion.div>
      </div>

      {/* RIGHT — shader panel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, ease: EASE }}
        className="panel tick relative min-h-[44vh] overflow-hidden lg:min-h-0"
      >
        <span className="tick-b" />
        <DitherShader className="absolute inset-0" />

        {/* overlay HUD */}
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-4">
          <div className="flex items-start justify-between font-mono text-[10px] text-[oklch(0.92_0.04_250)]">
            <span className="bg-[color-mix(in_oklab,var(--bg-deep)_55%,transparent)] px-1.5 py-0.5">
              ASCII_DITHER // FBM_WARP
            </span>
            <span className="bg-[color-mix(in_oklab,var(--bg-deep)_55%,transparent)] px-1.5 py-0.5">
              <Fps />
            </span>
          </div>
          <div className="flex items-end justify-between">
            <span className="font-mono text-[10px] text-[oklch(0.92_0.04_250)]">
              <span className="bg-[color-mix(in_oklab,var(--bg-deep)_55%,transparent)] px-1.5 py-0.5">
                SHADER_OUTPUT · 0x10
              </span>
            </span>
            <div className="pointer-events-auto flex items-center gap-3 bg-[color-mix(in_oklab,var(--bg-deep)_55%,transparent)] px-2 py-1.5">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="text-[oklch(0.92_0.04_250)] transition-opacity hover:opacity-70"
              >
                <GitHub className="h-4 w-4" />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="text-[oklch(0.92_0.04_250)] transition-opacity hover:opacity-70"
              >
                <LinkedIn className="h-4 w-4" />
              </a>
              <ArrowUpRight className="h-3.5 w-3.5 text-[oklch(0.92_0.04_250)]" />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Stat({ k, v, accent }: { k: string; v: string; accent?: boolean }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="text-faint">{k}</dt>
      <dd className={accent ? "text-accent" : "text-ink"}>{v}</dd>
    </div>
  );
}
