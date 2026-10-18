import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { offline } from "@/content/landing";

export function Offline() {
  return (
    <Section labelledBy="offline-title" className="bg-sand/60">
      <SectionHeading id="offline-title" eyebrow={offline.eyebrow} title={offline.title} />
      <Stagger as="ul" className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {offline.points.map(({ icon: Icon, title, description }) => (
          <StaggerItem as="li" key={title} className="rounded-3xl bg-paper p-6 ring-1 ring-ink/5">
            <Icon aria-hidden className="size-7 text-olive-700" />
            <h3 className="mt-4 text-lg font-extrabold tracking-tight">{title}</h3>
            <p className="mt-2 text-earth-700">{description}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
