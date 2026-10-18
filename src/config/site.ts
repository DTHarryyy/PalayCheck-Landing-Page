/**
 * Site-wide configuration. Everything that differs between environments is
 * read here, once, so components never touch `process.env` directly.
 */

export type AppStatus = "live" | "coming_soon";

/** Android applicationId of the PalayCheck app (android/app/build.gradle.kts). */
const ANDROID_PACKAGE_ID = "app.palaycheck.com";

const DEFAULT_PLAY_STORE_URL = `https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE_ID}`;

function parseAppStatus(value: string | undefined): AppStatus {
  return value === "live" ? "live" : "coming_soon";
}

/** Only https links to Google Play are accepted, so a typo can't ship a bad or unsafe CTA. */
function parsePlayStoreUrl(value: string | undefined): string {
  if (!value) return DEFAULT_PLAY_STORE_URL;
  const url = new URL(value);
  if (url.protocol !== "https:" || url.hostname !== "play.google.com") {
    throw new Error(
      `NEXT_PUBLIC_PLAY_STORE_URL must be an https://play.google.com link, got "${value}"`,
    );
  }
  return url.toString();
}

function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  // Set by Vercel at build time.
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
}

export const siteConfig = {
  name: "PalayCheck",
  tagline: "AI-Powered Rice Disease Detection",
  description:
    "PalayCheck checks a photo of a rice leaf right on your phone, names the disease, tells you what to do, and sends the case to your Municipal Agriculture Office. No signal needed.",
  url: resolveSiteUrl(),
  androidPackageId: ANDROID_PACKAGE_ID,
  playStore: {
    url: parsePlayStoreUrl(process.env.NEXT_PUBLIC_PLAY_STORE_URL),
    status: parseAppStatus(process.env.NEXT_PUBLIC_APP_STATUS),
  },
} as const;
