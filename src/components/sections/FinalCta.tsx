import { PlayStoreButton } from "@/components/cta/PlayStoreButton";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { finalCta } from "@/content/landing";

export function FinalCta() {
  return (
    <section aria-labelledby="final-cta-title" className="px-4 pb-20 sm:px-6 sm:pb-28 lg:px-8">
      <Reveal>
        <div className="relative isolate mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-night px-6 py-16 text-center sm:px-12 sm:py-24">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-24 left-1/4 size-80 rounded-full bg-clay/40 blur-3xl motion-safe:animate-drift" />
            <div className="absolute -right-10 -bottom-32 size-96 rounded-full bg-leaf/25 blur-3xl [animation-delay:-9s] motion-safe:animate-drift" />
          </div>
          <Container className="max-w-2xl">
            <h2
              id="final-cta-title"
              className="text-3xl font-extrabold tracking-tight text-balance text-cream sm:text-5xl"
            >
              {finalCta.title}
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-lg text-earth-300">{finalCta.description}</p>
            <div className="mt-10 flex justify-center">
              <PlayStoreButton location="final" tone="dark" />
            </div>
          </Container>
        </div>
      </Reveal>
    </section>
  );
}
