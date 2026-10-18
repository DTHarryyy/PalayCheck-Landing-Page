import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name}: ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const assets = join(process.cwd(), "src/assets");

// Read at module scope (not per request) so the image is prerendered at build time.
const [logo, extraBold, semiBold] = await Promise.all([
  readFile(join(assets, "palaycheck-logo.png")),
  readFile(join(assets, "fonts/Manrope-ExtraBold.ttf")),
  readFile(join(assets, "fonts/Manrope-SemiBold.ttf")),
]);
const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

export default async function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 96px",
        background: "linear-gradient(135deg, #f5ead8 0%, #ebddc5 60%, #e1eecc 100%)",
        color: "#201e1d",
        fontFamily: "Manrope",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
        <img src={logoSrc} width={120} height={120} style={{ borderRadius: 28 }} alt="" />
        <span style={{ fontSize: 72, fontWeight: 800 }}>{siteConfig.name}</span>
      </div>
      <div style={{ marginTop: 40, fontSize: 64, fontWeight: 800, lineHeight: 1.1, maxWidth: 940 }}>
        Spot rice disease in seconds, right in the field.
      </div>
      <div style={{ marginTop: 28, fontSize: 32, fontWeight: 600, color: "#645c50" }}>
        {`${siteConfig.tagline} · Works offline · English & Tagalog`}
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Manrope", data: extraBold, weight: 800, style: "normal" },
        { name: "Manrope", data: semiBold, weight: 600, style: "normal" },
      ],
    },
  );
}
