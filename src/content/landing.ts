/**
 * All landing-page copy and data. Facts mirror the PalayCheck app repo
 * (lib/data/disease.dart, lib/l10n/app_en.arb, docs/DEVICE_COMPATIBILITY.md);
 * keep them in sync rather than inventing new claims here.
 */
import {
  Camera,
  ClipboardCheck,
  CloudOff,
  Cpu,
  FileSpreadsheet,
  Inbox,
  Languages,
  MapPinned,
  Megaphone,
  ScanLine,
  Send,
  ShieldCheck,
  Smartphone,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";

export type NavLink = { label: string; href: `#${string}` };

export const navLinks: NavLink[] = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Diseases", href: "#diseases" },
  { label: "For officers", href: "#officers" },
  { label: "FAQ", href: "#faq" },
];

export const hero = {
  eyebrow: "On-device AI · Works offline",
  title: "Spot rice disease in seconds, right in the field.",
  description:
    "Point your phone at a rice leaf. PalayCheck names the disease, tells you what to do next, and sends the case to your Municipal Agriculture Office. No signal needed.",
  secondaryCta: { label: "See how it works", href: "#how-it-works" },
  facts: ["Android 7.0+", "English & Tagalog", "6 leaf conditions"],
};

export const trustItems: string[] = [
  "Works without signal",
  "6 leaf conditions",
  "English & Tagalog",
  "Photo quality checks",
  "Reports go to your MAO",
  "Runs on budget phones",
];

export type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const features: Feature[] = [
  {
    icon: CloudOff,
    title: "Diagnose without signal",
    description:
      "The AI model lives on your phone, so a scan works in the middle of the paddy with no data or Wi-Fi.",
  },
  {
    icon: ScanLine,
    title: "Results in seconds",
    description: "Point at one leaf, tap, and get an answer before you move to the next plant.",
  },
  {
    icon: Stethoscope,
    title: "Know what to do next",
    description:
      "Every result comes with practical cultural and chemical treatment steps for that disease.",
  },
  {
    icon: Send,
    title: "Report to your MAO",
    description:
      "Send a case to your Municipal Agriculture Office in one tap, with the photo and location attached.",
  },
  {
    icon: Camera,
    title: "Photo quality checks",
    description:
      "PalayCheck checks light, focus and distance first, so a bad photo never becomes a wrong diagnosis.",
  },
  {
    icon: Languages,
    title: "English & Tagalog",
    description: "Use the app in the language you're most comfortable with and switch any time.",
  },
];

export type Step = { title: string; description: string };

export const steps: Step[] = [
  {
    title: "Scan a leaf",
    description:
      "Hold your phone a hand-span from one rice leaf. PalayCheck guides you until the photo is sharp and well lit.",
  },
  {
    title: "Get a diagnosis",
    description:
      "The AI on your phone names the condition in seconds, and tells you honestly when it isn't sure.",
  },
  {
    title: "Treat & report",
    description:
      "Follow step-by-step treatment advice, then send the case to your MAO so they can act early.",
  },
];

export type Severity = "High" | "Medium" | "None";

/** Which symptom pattern the leaf illustration draws. */
export type LeafPattern = "blast" | "blb" | "brown" | "sheath" | "tungro" | "healthy";

export type Disease = {
  id: LeafPattern;
  name: string;
  scientificName?: string;
  description: string;
  severity: Severity;
};

export const diseases: Disease[] = [
  {
    id: "blast",
    name: "Rice Blast",
    scientificName: "Magnaporthe oryzae",
    description:
      "Diamond-shaped lesions with grey centres. A fast-moving fungus that thrives in cool, wet weather.",
    severity: "High",
  },
  {
    id: "blb",
    name: "Bacterial Leaf Blight",
    scientificName: "Xanthomonas oryzae",
    description: "Leaves yellow and wilt from the tip, worst after storms and flooding.",
    severity: "High",
  },
  {
    id: "brown",
    name: "Brown Spot",
    scientificName: "Bipolaris oryzae",
    description:
      "Small round brown spots on stressed crops, often a sign the soil is short on potassium.",
    severity: "Medium",
  },
  {
    id: "sheath",
    name: "Sheath Blight",
    scientificName: "Rhizoctonia solani",
    description: "Oval grey-green lesions near the water line that climb dense, lush canopies.",
    severity: "Medium",
  },
  {
    id: "tungro",
    name: "Tungro",
    scientificName: "Rice tungro virus",
    description: "Spread by green leafhoppers. The whole plant yellows from the tip and stunts.",
    severity: "High",
  },
  {
    id: "healthy",
    name: "Healthy",
    description: "Even colour, firm texture and no lesions. PalayCheck tells you that too.",
    severity: "None",
  },
];

export const officers = {
  eyebrow: "For Municipal Agriculture Offices",
  title: "See outbreaks forming before they spread.",
  description:
    "Every farmer report lands on the MAO dashboard with its photo, diagnosis and location, so officers can verify cases and respond where it matters.",
  points: [
    { icon: ClipboardCheck, text: "Verify or reject farmer reports" },
    { icon: MapPinned, text: "See cases and hotspots on a map" },
    { icon: Megaphone, text: "Send advisories straight to farmers" },
    { icon: FileSpreadsheet, text: "Export analytics as CSV" },
  ] satisfies { icon: LucideIcon; text: string }[],
};

export const offline = {
  eyebrow: "Built for the field",
  title: "Made for the paddy, not the office.",
  points: [
    {
      icon: Cpu,
      title: "Runs on your phone",
      description:
        "Scans are analysed on the device. Your photo doesn't need to be uploaded to get a result.",
    },
    {
      icon: Inbox,
      title: "Sends when you're back online",
      description: "Reports wait safely in an outbox and sync automatically once you have signal.",
    },
    {
      icon: ShieldCheck,
      title: "Same photo, same answer",
      description: "The diagnosis doesn't change from phone to phone. Only the speed adapts.",
    },
    {
      icon: Smartphone,
      title: "Works on budget phones",
      description: "Designed for the phones farmers actually use, on Android 7.0 and up.",
    },
  ] satisfies { icon: LucideIcon; title: string; description: string }[],
};

export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  {
    question: "Do I need internet to use PalayCheck?",
    answer:
      "No. Scanning and diagnosis run entirely on your phone. You only need a connection to send reports to your MAO, and PalayCheck queues them and sends them automatically when you're back online.",
  },
  {
    question: "Which rice diseases can it detect?",
    answer:
      "Rice Blast, Bacterial Leaf Blight, Brown Spot, Sheath Blight and Tungro. It can also tell you when a leaf looks healthy.",
  },
  {
    question: "Does it replace my agricultural technician?",
    answer:
      "No. PalayCheck gives a fast first opinion in the field. When it isn't confident it says so, and serious or spreading cases should always go to your Municipal Agriculture Office, which you can do from the app.",
  },
  {
    question: "Which phones does it work on?",
    answer:
      "Android phones running Android 7.0 or newer, including budget phones. Newer phones scan faster, but every phone gives the same result for the same photo.",
  },
  {
    question: "Is the app available in Tagalog?",
    answer:
      "Yes. The whole app is available in English and Tagalog, and you can switch at any time in Settings.",
  },
  {
    question: "Who sees the reports I send?",
    answer:
      "Officers at your Municipal Agriculture Office. They verify each report and can send advisories back to farmers in the area.",
  },
];

export const finalCta = {
  title: "Check your rice before it spreads.",
  description: "Get PalayCheck on your Android phone and scan your first leaf in under a minute.",
};

export const footer = {
  blurb:
    "AI-powered rice disease detection for Filipino farmers and Municipal Agriculture Offices.",
  disclaimer:
    "PalayCheck gives a first opinion, not a laboratory diagnosis. For serious or spreading cases, contact your Municipal Agriculture Office.",
};
