import { PlayStoreButton } from "@/components/cta/PlayStoreButton";
import { Diseases } from "@/components/sections/Diseases";
import { Faq } from "@/components/sections/Faq";
import { Features } from "@/components/sections/Features";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { ForOfficers } from "@/components/sections/ForOfficers";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Navbar } from "@/components/sections/Navbar";
import { Offline } from "@/components/sections/Offline";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Logo } from "@/components/ui/Logo";
import { siteConfig } from "@/config/site";
import { navLinks } from "@/content/landing";

function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: siteConfig.name,
    description: siteConfig.description,
    operatingSystem: "Android 7.0+",
    applicationCategory: "UtilitiesApplication",
    inLanguage: ["en", "fil"],
    url: siteConfig.url,
    ...(siteConfig.playStore.status === "live" && { installUrl: siteConfig.playStore.url }),
  };
  return (
    <script
      type="application/ld+json"
      // Escape "<" so no string in the payload can close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export default function Home() {
  return (
    <>
      <JsonLd />
      <a
        href="#main"
        className="sr-only z-[60] rounded-xl bg-ink px-4 py-3 font-bold text-cream focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <Navbar
        logo={<Logo />}
        links={navLinks}
        cta={<PlayStoreButton location="navbar" variant="compact" />}
        mobileCta={<PlayStoreButton location="mobile-menu" variant="compact" />}
      />
      <main id="main">
        <Hero />
        <TrustStrip />
        <Features />
        <HowItWorks />
        <Diseases />
        <ForOfficers />
        <Offline />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
