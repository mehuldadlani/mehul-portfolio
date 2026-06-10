import { projects, repos } from "@/lib/content";
import { Reveal } from "@/components/motion";
import { SectionHead } from "@/components/section-head";
import { SpotlightCard } from "@/components/spotlight-card";
import { ArrowUpRight, GitHub } from "@/components/icons";

type RepoMeta = {
  stars: number;
  description: string | null;
  lang: string | null;
};

/* live metadata per pinned repo — tokenless, cached for a day,
   falls back to the static entry in content.ts when rate-limited */
async function getRepoMeta(name: string): Promise<RepoMeta | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/mehuldadlani/${name}`, {
      next: { revalidate: 86400 },
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      stargazers_count?: number;
      description?: string | null;
      language?: string | null;
    };
    return {
      stars: data.stargazers_count ?? 0,
      description: data.description ?? null,
      lang: data.language ?? null,
    };
  } catch {
    return null;
  }
}

export async function Projects() {
  const meta = await Promise.all(repos.map((r) => getRepoMeta(r.name)));

  return (
    <section
      id="projects"
      className="border-t border-[var(--line)] px-4 py-20 sm:px-6 md:py-28"
    >
      <div className="mx-auto max-w-[1280px]">
        <SectionHead
          index="04"
          title="Artifacts"
          meta={`output_index · ${projects.length + repos.length}`}
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <SpotlightCard
                as="article"
                className="panel tick group flex h-full flex-col p-6"
              >
                <span className="tick-b" />
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[11px] text-accent">
                      A{String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-xl font-medium text-ink">
                      {p.name}
                    </h3>
                  </div>
                  <div className="flex gap-3">
                    {p.links.map((l) => (
                      <a
                        key={l.label}
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className="link-sweep inline-flex items-center gap-1 font-mono text-[11px] text-muted transition-colors hover:text-accent"
                      >
                        {l.label}
                        <ArrowUpRight className="h-3 w-3" />
                      </a>
                    ))}
                  </div>
                </div>
                <p className="mt-4 flex-1 font-mono text-[12.5px] leading-relaxed text-muted">
                  {p.blurb}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {p.stack.map((t) => (
                    <span
                      key={t}
                      className="border border-[var(--line)] px-2.5 py-1 font-mono text-[10.5px] text-faint"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <div className="flex items-center gap-3">
            <GitHub className="h-4 w-4 text-faint" />
            <span className="label">Source · pinned</span>
            <span className="dash flex-1" />
          </div>
          <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {repos.map((r, i) => {
              const m = meta[i];
              return (
                <li key={r.name}>
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex h-full flex-col gap-1.5 border-b border-[var(--line)] py-3.5 font-mono transition-colors hover:text-accent sm:[&:nth-child(odd)]:lg:border-r sm:[&:nth-child(odd)]:lg:border-[var(--line)] sm:[&:nth-child(odd)]:lg:pr-4 lg:pr-4"
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span className="flex items-center gap-2 text-[13px] text-ink transition-colors group-hover:text-accent">
                        <span className="text-[10px] text-faint">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {r.name}
                      </span>
                      <span className="flex items-center gap-2 text-[10.5px] text-faint">
                        {m && m.stars > 0 && (
                          <span className="text-accent">★ {m.stars}</span>
                        )}
                        {m?.lang ?? r.lang}
                      </span>
                    </span>
                    {m?.description && (
                      <span className="truncate pl-6 text-[10.5px] leading-relaxed text-faint">
                        {m.description}
                      </span>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
