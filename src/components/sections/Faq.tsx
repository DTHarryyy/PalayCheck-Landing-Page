import { ChevronDown } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/content/landing";

/** Native <details> accordion: keyboard and screen-reader accessible with no JS. */
export function Faq() {
  return (
    <Section id="faq" labelledBy="faq-title">
      <SectionHeading id="faq-title" eyebrow="FAQ" title="Questions farmers ask us." />
      <Stagger className="mx-auto mt-12 max-w-3xl space-y-3">
        {faqs.map((faq) => (
          <StaggerItem key={faq.question}>
            <details className="group rounded-2xl border border-ink/10 bg-paper px-6 open:shadow-lg open:shadow-ink/5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-lg font-bold [&::-webkit-details-marker]:hidden">
                {faq.question}
                <ChevronDown
                  aria-hidden
                  className="size-5 shrink-0 text-clay-700 transition-transform duration-300 group-open:rotate-180"
                />
              </summary>
              <p className="pb-6 text-earth-700">{faq.answer}</p>
            </details>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
