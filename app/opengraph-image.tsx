import { ImageResponse } from "next/og";

export const alt = "Mehul Dadlani — Product Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* sRGB approximations of the OKLCH tokens in globals.css —
   satori (next/og) doesn't parse oklch() */
const BG = "#0c1019";
const INK = "#f1f4f9";
const MUTED = "#a8b2c3";
const FAINT = "#6d7789";
const ACCENT = "#86c6f4";
const LINE = "rgba(237, 240, 248, 0.12)";

async function loadFont(): Promise<ArrayBuffer | null> {
  try {
    // non-browser UAs (node fetch default) get TTF, which satori can embed
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500&display=swap"
    ).then((r) => r.text());
    const url = css.match(/url\((https:[^)]+\.ttf)\)/)?.[1];
    if (!url) return null;
    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const font = await loadFont();
  const tick = (pos: React.CSSProperties) => (
    <div
      style={{
        position: "absolute",
        width: 18,
        height: 18,
        borderColor: ACCENT,
        borderStyle: "solid",
        borderWidth: 0,
        ...pos,
      }}
    />
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundColor: BG,
          backgroundImage: `linear-gradient(${LINE} 1px, transparent 1px), linear-gradient(90deg, ${LINE} 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
          fontFamily: font ? "JetBrains Mono" : "monospace",
          position: "relative",
        }}
      >
        {tick({ top: 36, left: 36, borderTopWidth: 2, borderLeftWidth: 2 })}
        {tick({ top: 36, right: 36, borderTopWidth: 2, borderRightWidth: 2 })}
        {tick({ bottom: 36, left: 36, borderBottomWidth: 2, borderLeftWidth: 2 })}
        {tick({ bottom: 36, right: 36, borderBottomWidth: 2, borderRightWidth: 2 })}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            letterSpacing: 6,
            color: FAINT,
          }}
        >
          <span>OPERATIONAL MANIFEST</span>
          <span style={{ color: ACCENT }}>v3.0</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 110,
              fontWeight: 500,
              lineHeight: 1.02,
              letterSpacing: -2,
              color: INK,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>MEHUL</span>
            <span>DADLANI</span>
          </div>
          <div style={{ marginTop: 28, fontSize: 28, color: MUTED }}>
            {"> Product engineer — Flutter · Web3 · Security"}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: FAINT,
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: 12,
                backgroundColor: ACCENT,
                display: "flex",
              }}
            />
            <span style={{ color: ACCENT }}>OPEN TO WORK</span>
          </span>
          <span>mehuldadlani.dev</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: font
        ? [{ name: "JetBrains Mono", data: font, weight: 500, style: "normal" }]
        : undefined,
    }
  );
}
