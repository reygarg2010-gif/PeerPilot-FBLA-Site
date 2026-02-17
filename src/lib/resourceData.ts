export type ResourceType = "Lesson" | "Video" | "Practice" | "Download";

export type ResourceTopic =
  | "Algebra"
  | "Geometry"
  | "Trig"
  | "Precalc"
  | "Statistics"
  | "SAT/PSAT";

export type Resource = {
  id: string;
  title: string;
  type: ResourceType;
  topic: ResourceTopic;
  grade: "9" | "10" | "11" | "12";
  description: string;
  url: string;
  tags: string[];
};

export const resources: Resource[] = [
  {
    id: "r1",
    title: "Linear Functions: Slope + Intercept",
    type: "Lesson",
    topic: "Algebra",
    grade: "9",
    description: "Understand slope, intercepts, and writing equations from graphs and tables.",
    url: "https://www.khanacademy.org/math/algebra",
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
    tags: ["factoring", "trinomial", "gcf"],
  },
  {
    id: "r3",
    title: "Triangle Similarity + Proofs",
    type: "Lesson",
    topic: "Geometry",
    grade: "10",
    description: "Use similarity criteria to solve problems and support geometric reasoning.",
    url: "https://www.khanacademy.org/math/geometry",
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
    tags: ["transformations", "functions", "composition"],
  },
  {
    id: "r6",
    title: "Statistics Basics: Mean, Median, Spread",
    type: "Lesson",
    topic: "Statistics",
    grade: "12",
    description: "Interpret data using center + variability (IQR, standard deviation).",
    url: "https://www.khanacademy.org/math/statistics-probability",
    tags: ["mean", "median", "standard deviation", "IQR"],
  },
  {
    id: "r7",
    title: "SAT/PSAT Math Strategy Sheet",
    type: "Download",
    topic: "SAT/PSAT",
    grade: "11",
    description: "High-yield strategies, common traps, and pacing tips.",
    url: "https://satsuite.collegeboard.org/",
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
    tags: ["circles", "tangent", "arcs"],
  },
];
