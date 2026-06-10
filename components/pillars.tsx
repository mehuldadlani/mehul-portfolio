import { pillars } from "@/lib/content";
import { StaggerGroup, StaggerItem } from "@/components/motion";
import { SectionHead } from "@/components/section-head";

export function Pillars() {
  return (
    <section
      id="stack"
      className="border-t border-[var(--line)] px-4 py-20 sm:px-6 md:py-28"
    >
      <div className="mx-auto max-w-[1280px]">
        <SectionHead
          index="03"
          title="Three disciplines, one engineer"
          meta="the intersection"
        />

        <StaggerGroup className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {pillars.map((p, i) => (
            <StaggerItem key={p.title}>
              <div className="panel tick h-full p-6">
                <span className="tick-b" />
                <div className="flex items-center justify-between font-mono text-[10.5px] text-faint">
                  <span>MOD_0{i + 1}</span>
                  <span className="text-accent">{p.tag}</span>
                </div>
                <h3 className="font-display mt-5 text-2xl font-medium text-ink">
                  {p.title}
                </h3>
                <p className="mt-4 font-mono text-[12.5px] leading-relaxed text-muted">
                  {p.body}
                </p>
                <div className="dash my-5" />
                <ul className="flex flex-col gap-2.5">
                  {p.proof.map((pr) => (
                    <li
                      key={pr}
                      className="flex items-center gap-2.5 font-mono text-[12px] text-ink/85"
                    >
                      <span className="text-accent">+</span>
                      {pr}
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
