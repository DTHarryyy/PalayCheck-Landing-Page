import { LeafIllustration } from "@/components/illustrations/LeafIllustration";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { features } from "@/content/landing";

export function Features() {
  const [highlight, ...rest] = features;
  const HighlightIcon = highlight.icon;
  return (
    <Section id="features" labelledBy="features-title">
      <SectionHeading
        id="features-title"
        eyebrow="Features"
        title="Everything a farmer needs, in one scan."
        description="PalayCheck is built around how rice farmers actually work: outdoors, on the move, and often without signal."
      />
      <Stagger as="ul" className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StaggerItem
          as="li"
          className="relative flex flex-col overflow-hidden rounded-3xl bg-night p-8 text-cream sm:col-span-2 lg:row-span-2 lg:p-10"
        >
          <div
            aria-hidden
            className="absolute -right-16 -bottom-16 size-64 rounded-full bg-leaf/20 blur-3xl"
          />
          <span className="relative inline-flex size-12 items-center justify-center rounded-2xl bg-leaf text-night">
            <HighlightIcon aria-hidden className="size-6" />
          </span>
          <h3 className="relative mt-6 text-2xl font-extrabold tracking-tight">
            {highlight.title}
          </h3>
          <p className="relative mt-3 text-lg text-earth-300">{highlight.description}</p>
          <p className="relative mt-8 w-fit rounded-full border border-cream/15 px-3 py-1 text-sm font-semibold text-leaf">
            No data · No Wi-Fi · No problem
          </p>
          <LeafIllustration
            pattern="healthy"
            idPrefix="feature-leaf"
            className="relative mt-auto -mr-10 -mb-6 w-72 max-w-full self-end pt-8 opacity-90 lg:w-96"
          />
        </StaggerItem>
        {rest.map(({ icon: Icon, title, description }) => (
          <StaggerItem
            as="li"
            key={title}
            className="group rounded-3xl border border-ink/10 bg-paper p-7 transition-[translate,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/10 sm:last:col-span-2 lg:last:col-span-1"
          >
            <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-clay-100 text-clay-700 transition-colors group-hover:bg-clay-700 group-hover:text-cream">
              <Icon aria-hidden className="size-5" />
            </span>
            <h3 className="mt-5 text-lg font-extrabold tracking-tight">{title}</h3>
            <p className="mt-2 text-earth-700">{description}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
