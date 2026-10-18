"use client";

import { track } from "@vercel/analytics";
import type { ReactNode } from "react";

type TrackedLinkProps = {
  href: string;
  location: string;
  className?: string;
  ariaLabel?: string;
  children: ReactNode;
};

/** External link to the Play Store that records which CTA was clicked. */
export function TrackedLink({ href, location, className, ariaLabel, children }: TrackedLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={className}
      onClick={() => track("play_store_click", { location })}
    >
      {children}
    </a>
  );
}
