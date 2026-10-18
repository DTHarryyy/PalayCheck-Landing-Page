import { Reveal } from "@/components/motion/Reveal";

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
}: SectionHeadingProps) {
  const centered = align === "center";
  const dark = tone === "dark";
  return (
    <Reveal className={centered ? "mx-auto max-w-2xl text-center" : "max-w-xl"}>
      <p
        className={`text-sm font-bold tracking-wider uppercase ${dark ? "text-leaf" : "text-clay-700"}`}
      >
        {eyebrow}
      </p>
      <h2
        id={id}
        className={`mt-3 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl ${dark ? "text-cream" : "text-ink"}`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-lg text-pretty ${dark ? "text-earth-300" : "text-earth-700"}`}>
          {description}
        </p>
      )}
    </Reveal>
  );
}
