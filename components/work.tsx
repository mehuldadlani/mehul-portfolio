import { work, currentYear } from "@/lib/content";
import { Reveal } from "@/components/motion";
import { SectionHead } from "@/components/section-head";

export function Work() {
  return (
    <section id="work" className="px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-[1280px]">
        <SectionHead
          index="01"
          title="Active build"
          meta={`selected work · 2023→${String(currentYear).slice(2)}`}
        />

        <div className="border-t border-[var(--line)]">
          {work.map((w) => (
            <Reveal key={w.company}>
              <article className="group grid grid-cols-1 gap-5 border-b border-[var(--line)] py-9 transition-colors duration-500 hover:bg-[color-mix(in_oklab,var(--bg-deep)_45%,transparent)] md:grid-cols-12 md:gap-8 md:px-3">
                <div className="md:col-span-4">
                  <div className="flex items-baseline gap-3 font-mono">
                    <span className="text-[12px] text-accent">{w.index}</span>
                    <h3 className="font-display text-2xl font-medium text-ink md:text-[1.7rem]">
                      {w.company}
                    </h3>
                  </div>
                  <div className="mt-3 flex flex-col gap-1 pl-8 font-mono text-[11px] text-faint">
                    <span className="text-muted">{w.role}</span>
                    <span className="tabular-nums">{w.period}</span>
                    <span>{w.mode}</span>
                  </div>
                </div>

                <div className="md:col-span-8 md:pl-6">
                  <p className="font-mono text-[13px] leading-relaxed text-ink/90">
                    {w.summary}
                  </p>
                  <ul className="mt-5 flex flex-col gap-3">
                    {w.points.map((p, i) => (
                      <li
                        key={i}
                        className="flex gap-3 font-mono text-[12.5px] leading-relaxed text-muted"
                      >
                        <span className="mt-0.5 flex-none text-accent">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {w.stack.map((t) => (
                      <span
                        key={t}
                        className="border border-[var(--line)] px-2.5 py-1 font-mono text-[10.5px] text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
