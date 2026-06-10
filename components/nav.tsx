"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/content";
import { Clock } from "@/components/telemetry";
import { ArrowUpRight } from "@/components/icons";

const links = [
  { n: "01", label: "Work", href: "#work" },
  { n: "02", label: "Stack", href: "#stack" },
  { n: "03", label: "Artifacts", href: "#projects" },
  { n: "04", label: "Contact", href: "#contact" },
];

const CV_URL = "https://cv.mehuldadlani.dev";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0" style={{ zIndex: "var(--z-nav)" }}>
      <div
        className={`border-b transition-colors duration-500 ${
          scrolled
            ? "border-[var(--line)] bg-[color-mix(in_oklab,var(--bg-deep)_82%,transparent)] backdrop-blur-xl"
            : "border-transparent"
        }`}
      >
        <nav className="mx-auto flex h-12 max-w-[1280px] items-center justify-between gap-4 px-4 sm:px-6">
          <a
            href="#top"
            className="font-mono text-[13px] font-medium tracking-tight text-ink"
          >
            mehuldadlani
            <span className="blink ml-0.5 text-accent">_</span>
          </a>

          <div className="hidden items-center gap-7 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="link-sweep flex items-center gap-1.5 font-mono text-[12px] text-muted transition-colors hover:text-ink"
              >
                <span className="text-[10px] text-faint">{l.n}</span>
                {l.label}
              </a>
            ))}
            <a
              href={CV_URL}
              target="_blank"
              rel="noreferrer"
              className="link-sweep inline-flex items-center gap-1 font-mono text-[12px] text-accent transition-colors hover:text-ink"
            >
              CV
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>

          <div className="hidden items-center gap-4 font-mono text-[10.5px] text-faint lg:flex">
            <span className="flex items-center gap-1.5 text-accent">
              <span className="blink h-1.5 w-1.5 rounded-full bg-accent" />
              OPERATIONAL
            </span>
            <span className="h-3 w-px bg-[var(--line-strong)]" />
            <Clock className="tabular-nums" />
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="font-mono text-xs text-ink md:hidden"
            aria-expanded={open}
          >
            {open ? "[ CLOSE ]" : "[ MENU ]"}
          </button>
        </nav>

        <div
          className={`overflow-hidden border-t border-[var(--line)] bg-[var(--bg-deep)] md:hidden ${
            open ? "max-h-72" : "max-h-0 border-t-transparent"
          } transition-[max-height] duration-400`}
        >
          <div className="flex flex-col px-4 py-2">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 border-b border-[var(--line)] py-3 font-mono text-sm text-muted last:border-0"
              >
                <span className="text-[11px] text-faint">{l.n}</span>
                {l.label}
              </a>
            ))}
            <a
              href={CV_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 border-b border-[var(--line)] py-3 font-mono text-sm text-accent"
            >
              <ArrowUpRight className="h-3.5 w-3.5" />
              CV / Résumé
            </a>
            <div className="flex items-center gap-2 py-3 font-mono text-[11px] text-accent">
              <span className="blink h-1.5 w-1.5 rounded-full bg-accent" />
              OPERATIONAL · <Clock />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
