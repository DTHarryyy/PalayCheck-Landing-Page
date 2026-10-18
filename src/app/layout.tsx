import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { siteConfig } from "@/config/site";
import "./globals.css";

// The app's own typeface (bundled in the Flutter app as assets/fonts/Manrope-*).
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const title = `${siteConfig.name}: ${siteConfig.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: title, template: `%s · ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "rice disease detection",
    "palay",
    "rice blast",
    "bacterial leaf blight",
    "tungro",
    "Philippines agriculture",
    "Municipal Agriculture Office",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: siteConfig.name,
    title,
    description: siteConfig.description,
    locale: "en_PH",
  },
  twitter: { card: "summary_large_image", title, description: siteConfig.description },
};

export const viewport: Viewport = {
  themeColor: "#f5ead8",
};

// Vercel serves the analytics script from /_vercel on the same origin; anywhere
// else it would 404, so only render it in Vercel builds.
const enableAnalytics = Boolean(process.env.VERCEL);

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>
        <MotionProvider>{children}</MotionProvider>
        {enableAnalytics && <Analytics />}
      </body>
    </html>
  );
}
