import { ArrowDown, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PlayStoreButton } from "@/components/cta/PlayStoreButton";
import { hero } from "@/content/landing";
import { PhoneMockup } from "./PhoneMockup";

/** Staggered CSS entrance: runs on first paint, so the LCP headline never waits for hydration. */
const FADE_UP = "motion-safe:animate-fade-up";
const fadeUpDelay = (order: number) => ({ animationDelay: `${order * 90}ms` });

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pt-28 pb-20 sm:pt-36 lg:pb-28"
    >
      <HeroBackdrop />
      <Container className="relative grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <div className="text-center lg:text-left">
          <p
            style={fadeUpDelay(0)}
            className={`${FADE_UP} inline-flex items-center gap-2 rounded-full border border-olive/30 bg-olive-100/70 px-3.5 py-1.5 text-sm font-bold text-olive-800`}
          >
            <Sparkles aria-hidden className="size-4" />
            {hero.eyebrow}
          </p>
          <h1
            id="hero-title"
            style={fadeUpDelay(1)}
            className={`${FADE_UP} mt-6 text-4xl leading-[1.05] font-extrabold tracking-tight text-balance text-ink sm:text-5xl lg:text-6xl`}
          >
            {hero.title}
          </h1>
          <p
            style={fadeUpDelay(2)}
            className={`${FADE_UP} mx-auto mt-6 max-w-xl text-lg text-pretty text-earth-700 sm:text-xl lg:mx-0`}
          >
            {hero.description}
          </p>
          <div
            style={fadeUpDelay(3)}
            className={`${FADE_UP} mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start`}
          >
            <PlayStoreButton location="hero" />
            <a
              href={hero.secondaryCta.href}
              className="group inline-flex h-14 items-center gap-2 rounded-2xl px-5 font-bold text-ink transition-colors hover:bg-ink/5"
            >
              {hero.secondaryCta.label}
              <ArrowDown
                aria-hidden
                className="size-4 transition-transform group-hover:translate-y-0.5"
              />
            </a>
          </div>
          <ul
            style={fadeUpDelay(4)}
            className={`${FADE_UP} mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm font-semibold text-earth-700 lg:justify-start`}
          >
            {hero.facts.map((fact) => (
              <li key={fact} className="flex items-center gap-2">
                <span aria-hidden className="size-1.5 rounded-full bg-olive" />
                {fact}
              </li>
            ))}
          </ul>
        </div>
        <PhoneMockup />
      </Container>
    </section>
  );
}

function HeroBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute -top-40 -right-32 size-[34rem] rounded-full bg-clay-300/40 blur-3xl motion-safe:animate-drift" />
      <div className="absolute top-1/3 -left-40 size-[30rem] rounded-full bg-olive-300/50 blur-3xl [animation-delay:-6s] motion-safe:animate-drift" />
      <div className="absolute right-1/4 bottom-0 size-[22rem] rounded-full bg-leaf/25 blur-3xl [animation-delay:-12s] motion-safe:animate-drift" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(32,30,29,0.07)_1px,transparent_0)] [mask-image:linear-gradient(to_bottom,black,transparent_75%)] [background-size:24px_24px]" />
    </div>
  );
}
