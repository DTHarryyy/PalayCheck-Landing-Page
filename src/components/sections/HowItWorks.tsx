import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { steps } from "@/content/landing";
import { ScrollProgressLine } from "./ScrollProgressLine";

export function HowItWorks() {
  return (
    <Section id="how-it-works" labelledBy="how-title" className="bg-sand/60">
      <SectionHeading
        id="how-title"
        eyebrow="How it works"
        title="From leaf to answer in three steps."
      />
      <div className="relative mt-16">
        <ScrollProgressLine />
        <Stagger as="ol" stagger={0.15} className="relative grid gap-12 md:grid-cols-3 md:gap-8">
          {steps.map((step, index) => (
            <StaggerItem
              as="li"
              key={step.title}
              className="flex gap-5 md:flex-col md:items-center md:text-center"
            >
              <span className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-full border-4 border-cream bg-clay-700 text-xl font-extrabold text-cream shadow-lg shadow-clay-700/30">
                {index + 1}
              </span>
              <div>
                <h3 className="text-xl font-extrabold tracking-tight md:mt-4">{step.title}</h3>
                <p className="mt-2 max-w-xs text-earth-700">{step.description}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
