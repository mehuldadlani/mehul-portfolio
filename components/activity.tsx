import { Reveal } from "@/components/motion";
import { SectionHead } from "@/components/section-head";

type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

async function getContributions(): Promise<Day[] | null> {
  try {
    const res = await fetch(
      "https://github-contributions-api.jogruber.de/v4/mehuldadlani?y=last",
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return null;
    const data = (await res.json()) as { contributions: Day[] };
    return data.contributions ?? null;
  } catch {
    return null;
  }
}

const LEVEL: Record<number, string> = {
  0: "color-mix(in oklab, var(--ink) 5%, transparent)",
  1: "color-mix(in oklab, var(--accent) 26%, var(--bg-deep))",
  2: "color-mix(in oklab, var(--accent) 48%, var(--bg-deep))",
  3: "color-mix(in oklab, var(--accent) 72%, var(--bg-deep))",
  4: "var(--accent)",
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function utcMonth(date: string) {
  return new Date(date + "T00:00:00Z").getUTCMonth();
}
function utcDay(date: string) {
  return new Date(date + "T00:00:00Z").getUTCDay();
}

export async function Activity() {
  const days = await getContributions();

  // bucket into week-columns (rows = Sun..Sat)
  const weeks: (Day | null)[][] = [];
  let total = 0;
  let maxDay = 0;
  let activeDays = 0;
  let longest = 0;
  let run = 0;
  let current = 0;

  if (days) {
    let week: (Day | null)[] = new Array(7).fill(null);
    days.forEach((d) => {
      total += d.count;
      if (d.count > maxDay) maxDay = d.count;
      if (d.count > 0) {
        activeDays++;
        run++;
        if (run > longest) longest = run;
      } else {
        run = 0;
      }
      week[utcDay(d.date)] = d;
      if (utcDay(d.date) === 6) {
        weeks.push(week);
        week = new Array(7).fill(null);
      }
    });
    if (week.some(Boolean)) weeks.push(week);
    // trailing streak
    for (let i = days.length - 1; i >= 0; i--) {
      if (days[i].count > 0) current++;
      else break;
    }
  }

  // month label per column (only when the month flips)
  const monthLabels = weeks.map((w, i) => {
    const first = w.find(Boolean);
    if (!first) return "";
    const m = utcMonth(first.date);
    const prev = weeks[i - 1]?.find(Boolean);
    const pm = prev ? utcMonth(prev.date) : -1;
    return m !== pm ? MONTHS[m] : "";
  });

  return (
    <section
      id="activity"
      className="border-t border-[var(--line)] px-4 py-20 sm:px-6 md:py-28"
    >
      <div className="mx-auto max-w-[1280px]">
        <SectionHead index="02" title="Activity trace" meta="github · last 12 mo" />

        <Reveal className="panel tick p-5 md:p-7">
          <span className="tick-b" />

          {/* header */}
          <div className="mb-7 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-[var(--line)] pb-4 font-mono">
            <div className="flex items-baseline gap-2.5">
              <span className="text-[clamp(1.4rem,3vw,1.9rem)] font-medium tabular-nums leading-none text-ink">
                {total.toLocaleString()}
              </span>
              <span className="text-[11px] tracking-[0.04em] text-faint">
                contributions · last year
              </span>
            </div>
            <a
              href="https://github.com/mehuldadlani"
              target="_blank"
              rel="noreferrer"
              className="link-sweep text-[11.5px] text-muted transition-colors hover:text-accent"
            >
              @mehuldadlani
            </a>
          </div>

          {weeks.length === 0 ? (
            <div className="py-12 text-center font-mono text-[11px] text-faint">
              <span className="blink mr-1.5 text-accent">●</span>
              activity feed unavailable
            </div>
          ) : (
            <>
              <div className="overflow-x-auto pb-1">
                <div className="min-w-[680px]">
                  {/* month track */}
                  <div className="mb-2 flex gap-[3px] pl-[28px]">
                    {monthLabels.map((m, i) => (
                      <span
                        key={i}
                        className="w-[13px] whitespace-nowrap font-mono text-[9px] tracking-[0.06em] text-faint"
                      >
                        {m}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-[3px]">
                    {/* weekday rail */}
                    <div className="mr-1 flex w-[24px] flex-col gap-[3px] font-mono text-[8.5px] text-faint">
                      {["", "Mon", "", "Wed", "", "Fri", ""].map((d, i) => (
                        <span key={i} className="flex h-[13px] items-center leading-none">
                          {d}
                        </span>
                      ))}
                    </div>

                    {/* grid */}
                    {weeks.map((week, wi) => (
                      <div key={wi} className="flex flex-col gap-[3px]">
                        {week.map((day, di) => (
                          <span
                            key={di}
                            title={
                              day
                                ? `${day.count} contribution${day.count === 1 ? "" : "s"} · ${day.date}`
                                : ""
                            }
                            className="h-[13px] w-[13px] rounded-[2px] ring-0 ring-accent transition-[box-shadow] duration-150 hover:ring-1"
                            style={{
                              background: day ? LEVEL[day.level] : "transparent",
                            }}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* footer: telemetry + legend */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-[var(--line)] pt-4 font-mono text-[10px]">
                <dl className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-faint">
                  <Telem k="MAX/DAY" v={maxDay} />
                  <Telem k="ACTIVE" v={`${activeDays}d`} />
                  <Telem k="STREAK" v={`${current}d`} live={current > 0} />
                  <Telem k="LONGEST" v={`${longest}d`} />
                </dl>

                <div className="flex items-center gap-1.5 text-faint">
                  <span>less</span>
                  {[0, 1, 2, 3, 4].map((l) => (
                    <span
                      key={l}
                      className="h-[11px] w-[11px] rounded-[2px]"
                      style={{ background: LEVEL[l] }}
                    />
                  ))}
                  <span>more</span>
                </div>
              </div>
            </>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function Telem({
  k,
  v,
  live,
}: {
  k: string;
  v: string | number;
  live?: boolean;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <dt className="tracking-[0.12em] text-faint">{k}</dt>
      <dd
        className={`tabular-nums ${live ? "text-accent" : "text-ink/85"}`}
      >
        {live && <span className="blink mr-1">·</span>}
        {v}
      </dd>
    </div>
  );
}
