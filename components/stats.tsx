import { stats } from "@/lib/content";
import { StaggerGroup, StaggerItem } from "@/components/motion";
import { CountUp } from "@/components/effects";

export function Stats() {
  return (
    <section className="border-y border-[var(--line)] bg-[color-mix(in_oklab,var(--bg-deep)_45%,transparent)]">
      <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 md:py-16">
        <div className="mb-6 flex items-center gap-3">
          <span className="label text-accent">00</span>
          <span className="label">Telemetry · live readout</span>
          <span className="dash hidden flex-1 sm:block" />
        </div>

        <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((s, i) => (
            <StaggerItem key={s.label}>
              <div className="panel tick flex min-h-[170px] flex-col justify-between p-5 md:p-6">
                <span className="tick-b" />
                <div className="flex items-center justify-between font-mono text-[10.5px] text-faint">
                  <span>0{i + 1}</span>
                  <span className="text-accent">{s.unit}</span>
                </div>
                <div>
                  <div className="font-display text-[clamp(2.8rem,7vw,4.2rem)] font-medium leading-[0.9] tracking-tight text-ink">
                    <CountUp
                      value={s.value}
                      prefix={s.prefix}
                      suffix={s.suffix}
                      decimals={s.decimals}
                    />
                  </div>
                  <div className="mt-3 font-mono text-[11px] uppercase tracking-wide text-muted">
                    {s.label}
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
