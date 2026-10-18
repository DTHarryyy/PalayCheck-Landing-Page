import { LeafIllustration } from "@/components/illustrations/LeafIllustration";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { diseases, type Severity } from "@/content/landing";

const SEVERITY_STYLES: Record<Severity, { label: string; className: string }> = {
  High: { label: "High risk", className: "bg-alert/10 text-alert" },
  Medium: { label: "Medium risk", className: "bg-clay-100 text-clay-800" },
  None: { label: "No disease", className: "bg-verified/15 text-olive-800" },
};

export function Diseases() {
  return (
    <Section id="diseases" labelledBy="diseases-title">
      <SectionHeading
        id="diseases-title"
        eyebrow="What it detects"
        title="Six leaf conditions, recognised on the spot."
        description="PalayCheck is trained on the rice diseases that hit Philippine fields hardest, and it tells you when your rice is healthy too."
      />
      <Stagger as="ul" className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {diseases.map((disease) => {
          const severity = SEVERITY_STYLES[disease.severity];
          return (
            <StaggerItem
              as="li"
              key={disease.id}
              className="group overflow-hidden rounded-3xl border border-ink/10 bg-paper transition-shadow duration-300 hover:shadow-xl hover:shadow-ink/10"
            >
              <div className="relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br from-olive-100 to-sand">
                <LeafIllustration
                  pattern={disease.id}
                  idPrefix={`disease-${disease.id}`}
                  className="w-[85%] transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-rotate-3"
                />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-extrabold tracking-tight">{disease.name}</h3>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${severity.className}`}
                  >
                    {severity.label}
                  </span>
                </div>
                {disease.scientificName && (
                  <p className="mt-0.5 text-sm text-earth-700 italic">{disease.scientificName}</p>
                )}
                <p className="mt-3 text-earth-700">{disease.description}</p>
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>
      <p className="mt-8 text-center text-sm text-earth-700">
        Illustrations show typical symptoms and are not photographs.
      </p>
    </Section>
  );
}
