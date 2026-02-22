export type TutorId =
  | "rey-garg"
  | "brody-shnayder"
  | "britton-bloch"
  | "darius-asadi"
  | "aarav-patel"
  | "eric-lybman";

export type TutorTopic =
  | "Algebra"
  | "Geometry"
  | "Trig"
  | "Precalc"
  | "Statistics"
  | "SAT/PSAT"
  | "APPrecalculus Review: Sinusoidal Curves";

export type Tutor = {
  id: TutorId;
  name: string;
  role: string;
  headline: string;
  bio: string;
  topics: TutorTopic[];
  strengths: string[];
  availability: string;
  photo: string;
};

export const tutors: Tutor[] = [
  {
    id: "rey-garg",
    name: "Rey Garg",
    role: "PeerPilot Tutor • High School",
    headline: "Strategy-first SAT/PSAT + step-by-step clarity",
    bio:
      "I focus on turning confusing problems into a repeatable process. We’ll build speed without skipping understanding—especially for SAT/PSAT-style questions where small mistakes cost big points.",
    topics: [
      "SAT/PSAT",
      "Algebra",
      "Trig",
      "Precalc",
      "APPrecalculus Review: Sinusoidal Curves",
    ],
    strengths: [
      "SAT/PSAT math",
      "Algebra foundations",
      "Fast checking methods",
      "Test strategy",
    ],
    availability: "Online only • After school + weekends",
    photo: "/tutors/rey.jpg",
  },
  {
    id: "brody-shnayder",
    name: "Brody Shnayder",
    role: "PeerPilot Tutor • High School",
    headline: "Patient, structured help for homework + quizzes",
    bio:
      "If you understand it in class but get stuck at home, I’m here for that. I explain slowly, reinforce the basics, then help you practice until it feels automatic.",
    topics: [
      "Algebra",
      "Geometry",
      "Precalc",
      "APPrecalculus Review: Sinusoidal Curves",
    ],
    strengths: [
      "Homework support",
      "Confidence building",
      "Clean notebook-style steps",
      "Concept review",
    ],
    availability: "Online only • Flexible scheduling",
    photo: "/tutors/brody.jpg",
  },
  {
    id: "britton-bloch",
    name: "Britton Bloch",
    role: "PeerPilot Tutor • High School",
    headline: "Visual explanations (diagrams, patterns, shortcuts)",
    bio:
      "I teach math in a super visual way—diagrams, patterns, and simple rules you can remember under pressure. Great if geometry or word problems feel confusing.",
    topics: ["Geometry", "Algebra", "SAT/PSAT"],
    strengths: [
      "Geometry visuals",
      "Pattern recognition",
      "Smart shortcuts",
      "Clear explanations",
    ],
    availability: "Online only • Evenings",
    photo: "/tutors/britton.jpg",
  },
  {
    id: "darius-asadi",
    name: "Darius Asadi",
    role: "PeerPilot Tutor • High School",
    headline: "Efficient solving + pro-level error checking",
    bio:
      "My style is all about efficiency: set up the problem correctly, solve cleanly, and verify fast. I’ll show you how to catch mistakes before they cost points.",
    topics: ["Algebra", "Trig", "SAT/PSAT"],
    strengths: [
      "Error-checking systems",
      "Algebra techniques",
      "Pacing",
      "Multiple solution paths",
    ],
    availability: "Online only • Weeknights",
    photo: "/tutors/darius.jpg",
  },
  {
    id: "aarav-patel",
    name: "Aarav Patel",
    role: "PeerPilot Tutor • High School",
    headline: "Functions + precalc (graphs, transformations, intuition)",
    bio:
      "Functions are the key to so much math. I’m great at graphs, transformations, and ‘why it works’ thinking so you aren’t just memorizing steps.",
    topics: ["Precalc", "Algebra", "Statistics"],
    strengths: [
      "Functions & graphs",
      "Precalc foundations",
      "Explaining the “why”",
      "Practice planning",
    ],
    availability: "Online only • Weekends preferred",
    photo: "/tutors/aarav.jpg",
  },
  {
    id: "eric-lybman",
    name: "Eric Lybman",
    role: "PeerPilot Tutor • High School",
    headline: "Calm coaching for stats + data + word problems",
    bio:
      "I keep things calm and organized—especially for word problems and data questions. We’ll translate the question into math and build a consistent method.",
    topics: ["Statistics", "SAT/PSAT", "Algebra"],
    strengths: [
      "Data analysis",
      "Statistics concepts",
      "Word problems",
      "Organizing steps",
    ],
    availability: "Online only • After school",
    photo: "/tutors/eric.jpg",
  },
];

export const topicTutors: Record<TutorTopic, TutorId[]> = {
  Algebra: ["rey-garg", "darius-asadi", "brody-shnayder"],
  Geometry: ["britton-bloch", "brody-shnayder"],
  Trig: ["rey-garg", "darius-asadi"],
  Precalc: ["aarav-patel", "brody-shnayder"],
  Statistics: ["eric-lybman", "aarav-patel"],
  "SAT/PSAT": [
    "rey-garg",
    "darius-asadi",
    "britton-bloch",
    "eric-lybman",
  ],
  "APPrecalculus Review: Sinusoidal Curves": [
    "rey-garg",
    "brody-shnayder",
  ],
};

export function getTutorById(id: TutorId) {
  return tutors.find((t) => t.id === id);
}