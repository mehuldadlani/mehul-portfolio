import { Reveal } from "@/components/motion";
import { Scramble } from "@/components/telemetry";

export function SectionHead({
  index,
  title,
  meta,
}: {
  index: string;
  title: string;
  meta?: string;
}) {
  return (
    <Reveal className="mb-12 flex items-end gap-4">
      <span className="label mb-1.5 text-accent">{index}</span>
      <Scramble
        as="h2"
        text={title}
        className="font-display text-[clamp(1.7rem,4vw,2.8rem)] font-medium leading-[1] tracking-[-0.02em] text-ink"
      />
      <span className="dash mb-2.5 hidden flex-1 sm:block" />
      {meta && <span className="label mb-1.5 hidden sm:block">{meta}</span>}
    </Reveal>
  );
}
