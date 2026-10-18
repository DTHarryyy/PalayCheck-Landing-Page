import { Clock } from "lucide-react";
import Image from "next/image";
import playBadge from "@/assets/google-play-badge.png";
import { siteConfig } from "@/config/site";
import { TrackedLink } from "./TrackedLink";

export type CtaLocation = "navbar" | "mobile-menu" | "hero" | "final" | "footer";

type PlayStoreButtonProps = {
  location: CtaLocation;
  /** `badge`: the official Google Play badge. `compact`: a small pill for tight spaces. */
  variant?: "badge" | "compact";
  tone?: "light" | "dark";
  className?: string;
};

/**
 * The only place the Play Store link is rendered. Until the listing is public
 * (NEXT_PUBLIC_APP_STATUS !== "live") it shows a non-interactive "Coming soon"
 * state instead of linking to a listing that would 404.
 */
export function PlayStoreButton({
  location,
  variant = "badge",
  tone = "light",
  className = "",
}: PlayStoreButtonProps) {
  const { url, status } = siteConfig.playStore;
  const dark = tone === "dark";

  if (status === "coming_soon") {
    const size = variant === "badge" ? "h-14 px-5 text-base" : "h-10 px-4 text-sm";
    const colors = dark
      ? "border-cream/25 bg-cream/10 text-cream"
      : "border-ink/15 bg-paper text-ink";
    return (
      <span
        data-cta="play-store"
        data-cta-state="coming_soon"
        className={`inline-flex items-center gap-2 rounded-2xl border font-semibold ${size} ${colors} ${className}`}
      >
        <Clock aria-hidden className="size-4 shrink-0" />
        {variant === "badge" ? "Coming soon on Google Play" : "Coming soon"}
      </span>
    );
  }

  if (variant === "compact") {
    const colors = dark ? "bg-cream text-ink hover:bg-white" : "bg-ink text-cream hover:bg-night";
    return (
      <TrackedLink
        href={url}
        location={location}
        ariaLabel="Get PalayCheck on Google Play (opens in a new tab)"
        className={`inline-flex h-10 items-center rounded-full px-5 text-sm font-bold transition-colors ${colors} ${className}`}
      >
        Get the app
      </TrackedLink>
    );
  }

  return (
    <TrackedLink
      href={url}
      location={location}
      ariaLabel="Get PalayCheck on Google Play (opens in a new tab)"
      className={`inline-block rounded-xl transition-transform hover:-translate-y-0.5 active:translate-y-0 ${className}`}
    >
      <Image src={playBadge} alt="Get it on Google Play" height={56} className="h-14 w-auto" />
    </TrackedLink>
  );
}
