import Image from "next/image";
import logo from "@/assets/palaycheck-logo.png";
import { siteConfig } from "@/config/site";

type LogoProps = { tone?: "light" | "dark"; className?: string };

/** App icon + wordmark. The icon is the app's launcher icon (assets/logo/palay.png). */
export function Logo({ tone = "light", className = "" }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Image
        src={logo}
        alt=""
        width={36}
        height={36}
        className="size-9 rounded-xl shadow-sm ring-1 ring-ink/5"
      />
      <span
        className={`text-lg font-extrabold tracking-tight ${tone === "dark" ? "text-cream" : "text-ink"}`}
      >
        {siteConfig.name}
      </span>
    </span>
  );
}
