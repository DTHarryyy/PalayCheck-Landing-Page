import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { officers } from "@/content/landing";
import { DashboardMock } from "./DashboardMock";

export function ForOfficers() {
  return (
    <Section id="officers" labelledBy="officers-title" className="overflow-hidden">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionHeading
            id="officers-title"
            align="left"
            eyebrow={officers.eyebrow}
            title={officers.title}
            description={officers.description}
          />
          <Stagger as="ul" className="mt-8 grid gap-3 sm:grid-cols-2">
            {officers.points.map(({ icon: Icon, text }) => (
              <StaggerItem
                as="li"
                key={text}
                className="flex items-center gap-3 rounded-2xl border border-ink/10 bg-paper p-4 font-semibold"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-olive-100 text-olive-700">
                  <Icon aria-hidden className="size-5" />
                </span>
                {text}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
        <Reveal delay={0.15}>
          <DashboardMock />
        </Reveal>
      </div>
    </Section>
  );
}
