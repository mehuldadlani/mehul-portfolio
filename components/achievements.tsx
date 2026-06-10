import { awards, skills, education } from "@/lib/content";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion";
import { SectionHead } from "@/components/section-head";

export function Achievements() {
  return (
    <section
      id="wins"
      className="border-t border-[var(--line)] px-4 py-20 sm:px-6 md:py-28"
    >
      <div className="mx-auto max-w-[1280px]">
        <SectionHead index="05" title="Log" meta="receipts · $2k+ won" />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          {/* award log */}
          <div className="lg:col-span-7">
            <StaggerGroup className="border-t border-[var(--line)]">
              {awards.map((a, i) => (
                <StaggerItem key={a.event}>
                  <div className="flex items-center gap-5 border-b border-[var(--line)] py-4 font-mono">
                    <span className="w-6 text-[10.5px] text-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="w-10 flex-none border border-[var(--line-strong)] py-1 text-center text-[10.5px] text-accent">
                      {a.place}
                    </span>
                    <span className="flex-1 text-[13px] text-ink">
                      {a.title}
                    </span>
                    <span className="hidden text-[11px] text-muted sm:inline">
                      {a.event}
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>

            <Reveal className="mt-6 flex items-center justify-between border border-[var(--line)] bg-[color-mix(in_oklab,var(--bg-deep)_45%,transparent)] px-4 py-3 font-mono text-[11.5px]">
              <span className="text-faint">EDU</span>
              <span className="text-ink">{education.school}</span>
              <span className="hidden text-muted sm:inline">
                {education.degree}
              </span>
              <span className="tabular-nums text-muted">
                {education.period}
              </span>
            </Reveal>
          </div>

          {/* stack readout */}
          <div className="lg:col-span-5 lg:border-l lg:border-[var(--line)] lg:pl-10">
            <div className="label mb-5">Stack · readout</div>
            <div className="flex flex-col gap-6">
              {skills.map((s, i) => (
                <Reveal key={s.group} delay={i * 0.05}>
                  <div>
                    <div className="font-mono text-[10.5px] text-faint">
                      {String(i + 1).padStart(2, "0")} / {s.group.toUpperCase()}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {s.items.map((it) => (
                        <span
                          key={it}
                          className="border border-[var(--line)] px-2.5 py-1 font-mono text-[11px] text-ink/85"
                        >
                          {it}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
