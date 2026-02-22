import type { TutorId } from "@/lib/tutorsData";

export type ResourceType = "Lesson" | "Video" | "Practice" | "Download";

export type ResourceTopic =
  | "Algebra"
  | "Geometry"
  | "Trig"
  | "Precalc"
  | "Statistics"
  | "SAT/PSAT"
  | "APPrecalculus Review: Sinusoidal Curves";

export type ResourceSource = {
  label: string; // e.g., "Khan Academy", "College Board", "PeerPilot Original"
  url: string;
};

export type Resource = {
  id: string;
  title: string;
  type: ResourceType;
  topic: ResourceTopic;
  grade: "9" | "10" | "11" | "12";
  description: string;

  // For "Open" button (external page, pdf, etc.)
  url: string;

  // Optional embed (Drive /preview or YouTube embed link)
  // If present, UI will show "Watch" (embedded) and "Open" (new tab).
  embedUrl?: string;

  // Optional tutor override for THIS resource (if omitted, UI can fall back to topic tutors)
  tutors?: TutorId[];

  // Citation / attribution
  source?: ResourceSource;

  tags: string[];
};

export const resources: Resource[] = [
  {
    id: "r1",
    title: "Linear Functions: Slope + Intercept",
    type: "Lesson",
    topic: "Algebra",
    grade: "9",
    description:
      "Understand slope, intercepts, and writing equations from graphs and tables.",
    url: "https://www.khanacademy.org/math/algebra",
    source: { label: "Khan Academy", url: "https://www.khanacademy.org/math/algebra" },
    tags: ["slope", "y-intercept", "graphing"],
  },
  {
    id: "r2",
    title: "Factoring Essentials",
    type: "Practice",
    topic: "Algebra",
    grade: "9",
    description: "Factor GCF, trinomials, and special products with quick checks.",
    url: "https://www.khanacademy.org/math/algebra",
    source: { label: "Khan Academy", url: "https://www.khanacademy.org/math/algebra" },
    tags: ["factoring", "trinomial", "gcf"],
  },
  {
    id: "r3",
    title: "Triangle Similarity + Proofs",
    type: "Lesson",
    topic: "Geometry",
    grade: "10",
    description:
      "Use similarity criteria to solve problems and support geometric reasoning.",
    url: "https://www.khanacademy.org/math/geometry",
    source: { label: "Khan Academy", url: "https://www.khanacademy.org/math/geometry" },
    tags: ["similarity", "proof", "triangles"],
  },
  {
    id: "r4",
    title: "Unit Circle Quick Review",
    type: "Video",
    topic: "Trig",
    grade: "11",
    description: "Key angles, sine/cosine values, and converting degrees ↔ radians.",
    url: "https://www.khanacademy.org/math/trigonometry",
    source: { label: "Khan Academy", url: "https://www.khanacademy.org/math/trigonometry" },
    tags: ["unit circle", "radians", "special angles"],
  },
  {
    id: "r5",
    title: "Precalc: Functions & Transformations",
    type: "Lesson",
    topic: "Precalc",
    grade: "11",
    description: "Shifts, stretches, reflections, and composing functions.",
    url: "https://www.khanacademy.org/math/precalculus",
    source: { label: "Khan Academy", url: "https://www.khanacademy.org/math/precalculus" },
    tags: ["transformations", "functions", "composition"],
  },
  {
    id: "r6",
    title: "Statistics Basics: Mean, Median, Spread",
    type: "Lesson",
    topic: "Statistics",
    grade: "12",
    description:
      "Interpret data using center + variability (IQR, standard deviation).",
    url: "https://www.khanacademy.org/math/statistics-probability",
    source: {
      label: "Khan Academy",
      url: "https://www.khanacademy.org/math/statistics-probability",
    },
    tags: ["mean", "median", "standard deviation", "IQR"],
  },
  {
    id: "r7",
    title: "SAT/PSAT Math Strategy Sheet",
    type: "Download",
    topic: "SAT/PSAT",
    grade: "11",
    description:
      "High-yield strategies, common traps, and pacing tips. (PeerPilot notes inspired by College Board guidance.)",
    url: "https://satsuite.collegeboard.org/",
    source: { label: "College Board SAT Suite", url: "https://satsuite.collegeboard.org/" },
    tags: ["strategy", "pacing", "traps"],
  },
  {
    id: "r8",
    title: "Geometry Circles Practice Set",
    type: "Practice",
    topic: "Geometry",
    grade: "10",
    description: "Arcs, angles, tangents, and chord relationships.",
    url: "https://www.khanacademy.org/math/geometry",
    source: { label: "Khan Academy", url: "https://www.khanacademy.org/math/geometry" },
    tags: ["circles", "tangent", "arcs"],
  },

  // ✅ NEW: PeerPilot original AP Precalc video (Drive embed)
  {
    id: "r9",
    title: "AP Precalculus Review: Sinusoidal Curves (55 min)",
    type: "Video",
    topic: "APPrecalculus Review: Sinusoidal Curves",
    grade: "11",
    description:
      "A detailed 55-minute AP Precalculus review covering sinusoidal curves: amplitude, period, frequency, midline, phase shift, and full graph walkthrough examples.",
    // Open in a new tab
    url: "https://drive.google.com/file/d/1Yhqq1xpAnxK5__UnzWHoiN_V-2QXM9F1/view?usp=sharing",
    // Embed on-site
    embedUrl:
      "https://drive.google.com/file/d/1Yhqq1xpAnxK5__UnzWHoiN_V-2QXM9F1/preview",
    tutors: ["rey-garg", "brody-shnayder"],
    source: { label: "PeerPilot Original", url: "https://peers learn" }, // optional placeholder
    tags: [
      "sinusoidal",
      "amplitude",
      "period",
      "frequency",
      "midline",
      "phase shift",
      "graphing",
      "AP Precalculus",
    ],
  },
];