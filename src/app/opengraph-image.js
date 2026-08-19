import { ImageResponse } from "next/og";

import { defaultDescription, siteName } from "@/lib/seo";

// Applies to every route that doesn't declare its own OG image.
export const alt = `${siteName} — Premium Technology Solutions`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #04102B 0%, #0B2A6B 55%, #005BFF 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#7FD0FF",
          }}
        >
          {siteName}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 74,
            fontWeight: 700,
            lineHeight: 1.1,
          }}
        >
          Premium Technology Solutions
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 32,
            fontSize: 30,
            lineHeight: 1.4,
            color: "#C9DDFF",
            maxWidth: 900,
          }}
        >
          {defaultDescription.split(".")[0]}.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "auto",
            fontSize: 26,
            color: "#7FD0FF",
          }}
        >
          peaceitech.com
        </div>
      </div>
    ),
    size,
  );
}
