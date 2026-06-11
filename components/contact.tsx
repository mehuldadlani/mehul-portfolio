import { profile, currentYear } from "@/lib/content";
import { Reveal, Magnetic } from "@/components/motion";
import { Scramble, Clock } from "@/components/telemetry";
import { ArrowUpRight, GitHub, LinkedIn, Mail } from "@/components/icons";

export function Contact() {
  return (
    <footer
      id="contact"
      className="border-t border-[var(--line)] px-4 pt-20 pb-8 sm:px-6 md:pt-28"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="flex items-end gap-4">
          <span className="label mb-1.5 text-accent">06</span>
          <Scramble
            as="h2"
            text="CONTACT"
            className="font-display text-[clamp(2.4rem,9vw,6rem)] font-medium leading-[0.9] tracking-[-0.02em] text-ink"
          />
          <span className="dash mb-3 hidden flex-1 sm:block" />
          <span className="label mb-1.5 hidden sm:block">transmission open</span>
        </div>

        <Reveal className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="max-w-md font-mono text-[13px] leading-relaxed text-muted">
              <span className="text-accent">{">"}</span> Hiring, collaborating,
              or just want to talk shop about Flutter or crypto? My inbox is
              open.
            </p>
            <Magnetic className="mt-7 inline-flex">
              <a
                href={`mailto:${profile.email}`}
                className="group inline-flex items-center gap-3 border border-[var(--line-strong)] bg-[var(--surface)] px-6 py-4 font-mono text-[14px] text-ink transition-colors hover:border-accent hover:text-accent"
              >
                <Mail className="h-5 w-5" />
                {profile.email}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Magnetic>
            <div className="mt-7 flex items-center gap-6 font-mono text-[12px]">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="link-sweep inline-flex items-center gap-2 text-muted transition-colors hover:text-accent"
              >
                <GitHub className="h-4 w-4" /> GitHub
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="link-sweep inline-flex items-center gap-2 text-muted transition-colors hover:text-accent"
              >
                <LinkedIn className="h-4 w-4" /> LinkedIn
              </a>
              <a
                href="https://cv.mehuldadlani.dev"
                target="_blank"
                rel="noreferrer"
                className="link-sweep inline-flex items-center gap-2 text-muted transition-colors hover:text-accent"
              >
                <ArrowUpRight className="h-4 w-4" /> CV
              </a>
            </div>
          </div>

          {/* colophon */}
          <div className="md:col-span-5 md:border-l md:border-[var(--line)] md:pl-8">
            <div className="label mb-4">Colophon</div>
            <dl className="flex flex-col gap-2.5 font-mono text-[11.5px]">
              <Row k="BUILD" v="Next.js · React" />
              <Row k="SHADER" v="WebGL · FBM dither" />
              <Row k="MOTION" v="Motion" />
              <Row k="TYPE" v="Nippo · JetBrains Mono" />
              <Row k="LOCATION" v="Bangalore, IN" />
            </dl>
          </div>
        </Reveal>

        <div className="mt-16 flex flex-col gap-2 border-t border-[var(--line)] pt-5 font-mono text-[10.5px] text-faint sm:flex-row sm:items-center sm:justify-between">
          <span>© {currentYear} MEHUL DADLANI · END OF MANIFEST</span>
          <span className="flex items-center gap-2 text-muted">
            <span className="blink h-1.5 w-1.5 rounded-full bg-accent" />
            <Clock />
          </span>
        </div>
      </div>
    </footer>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-6">
      <dt className="text-faint">{k}</dt>
      <dd className="text-right text-ink">{v}</dd>
    </div>
  );
}
