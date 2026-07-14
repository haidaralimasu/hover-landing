import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name}: ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The "H" mark as an inline SVG data URI (silver gradient on transparent),
// so satori renders it crisply as an <img>. Matches brand/hover-logo.svg.
const markSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="320" viewBox="0 0 320 320">
  <defs>
    <linearGradient id="g" gradientUnits="userSpaceOnUse" x1="0" y1="40" x2="0" y2="280">
      <stop offset="0%" stop-color="#E3E3E3"/>
      <stop offset="100%" stop-color="#A3A3A3"/>
    </linearGradient>
  </defs>
  <g fill="url(#g)">
    <path d="M 60 40 L 116 40 L 116 280 L 60 280 Z"/>
    <path d="M 204 40 L 260 40 L 260 280 L 204 280 Z"/>
    <path d="M 60 128 L 260 192 L 260 234 L 60 170 Z"/>
  </g>
</svg>`;
const markUri = `data:image/svg+xml;base64,${Buffer.from(markSvg).toString("base64")}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 64,
          padding: "0 96px",
          background:
            "radial-gradient(120% 120% at 22% 38%, #1b1b1b 0%, #0a0a0a 60%)",
          color: "#f5f5f5",
        }}
      >
        <img src={markUri} alt="" width={210} height={210} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 104,
              fontWeight: 700,
              letterSpacing: -4,
              lineHeight: 1,
            }}
          >
            {siteConfig.name}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 28,
              fontSize: 34,
              color: "#a3a3a3",
              lineHeight: 1.35,
            }}
          >
            <span>Send money across borders.</span>
            <span>Sign in, send, done.</span>
          </div>
          <div
            style={{
              marginTop: 44,
              fontSize: 22,
              letterSpacing: 6,
              color: "#5c5c5c",
            }}
          >
            HOVER.MONEY
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
