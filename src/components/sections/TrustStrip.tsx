import { Leaf } from "lucide-react";
import { trustItems } from "@/content/landing";

/** Endless marquee of key facts. The duplicate track is hidden from screen readers. */
export function TrustStrip() {
  return (
    <section aria-label="Highlights" className="border-y border-ink/10 bg-sand/70 py-5">
      <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max shrink-0 motion-safe:animate-marquee">
          <TrustList />
          <TrustList hidden />
        </div>
      </div>
    </section>
  );
}

function TrustList({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {trustItems.map((item) => (
        <li
          key={item}
          className="flex items-center gap-3 px-6 text-base font-bold whitespace-nowrap text-earth-800"
        >
          <Leaf aria-hidden className="size-4 text-olive-600" />
          {item}
        </li>
      ))}
    </ul>
  );
}
