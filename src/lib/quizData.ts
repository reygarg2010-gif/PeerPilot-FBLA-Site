export type QuizQuestion = {
  id: string;
  prompt: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
};

export type Quiz = {
  slug: string;
  title: string;
  topic:
    | "Algebra"
    | "Geometry"
    | "Trig"
    | "Precalc"
    | "Statistics"
    | "SAT/PSAT";
  questions: QuizQuestion[];
};

export const quizzes: Quiz[] = [
  // -------------------------
  // Algebra Quiz
  // -------------------------
  {
    slug: "algebra-basics",
    title: "Algebra Basics: Linear Equations",
    topic: "Algebra",
    questions: [
      {
        id: "q1",
        prompt: "Solve: 2x + 5 = 17",
        choices: ["x = 6", "x = 5", "x = 7", "x = 11"],
        correctIndex: 0,
        explanation: "Subtract 5: 2x = 12. Divide by 2: x = 6.",
      },
      {
        id: "q2",
        prompt: "What is the slope of y = 3x - 4?",
        choices: ["-4", "3", "4", "1/3"],
        correctIndex: 1,
        explanation:
          "In slope-intercept form y = mx + b, m is the slope. Here m = 3.",
      },
      {
        id: "q3",
        prompt: "Which equation is equivalent to y - 2 = 5(x + 1)?",
        choices: ["y = 5x + 7", "y = 5x - 3", "y = x + 7", "y = 7x + 5"],
        correctIndex: 0,
        explanation:
          "Distribute: y - 2 = 5x + 5. Add 2 to both sides → y = 5x + 7.",
      },
      {
        id: "q4",
        prompt: "Solve: 3(x - 2) = 12",
        choices: ["x = 2", "x = 6", "x = 8", "x = 10"],
        correctIndex: 1,
        explanation:
          "Divide both sides by 3: x - 2 = 4. Add 2 → x = 6.",
      },
      {
        id: "q5",
        prompt: "If f(x) = 2x + 1, what is f(4)?",
        choices: ["7", "8", "9", "10"],
        correctIndex: 2,
        explanation:
          "Plug in 4: f(4) = 2(4) + 1 = 8 + 1 = 9.",
      },
    ],
  },

  // -------------------------
  // Geometry Quiz
  // -------------------------
  {
    slug: "geometry-angles",
    title: "Geometry Basics: Angles & Triangles",
    topic: "Geometry",
    questions: [
      {
        id: "g1",
        prompt: "Complementary angles add up to:",
        choices: ["90°", "180°", "360°", "45°"],
        correctIndex: 0,
        explanation: "Complementary angles sum to 90°.",
      },
      {
        id: "g2",
        prompt: "Supplementary angles add up to:",
        choices: ["90°", "180°", "360°", "270°"],
        correctIndex: 1,
        explanation: "Supplementary angles sum to 180°.",
      },
      {
        id: "g3",
        prompt: "The sum of interior angles in a triangle is:",
        choices: ["90°", "180°", "270°", "360°"],
        correctIndex: 1,
        explanation: "The interior angles of any triangle add to 180°.",
      },
      {
        id: "g4",
        prompt:
          "If two angles of a triangle are 50° and 60°, the third angle is:",
        choices: ["60°", "70°", "80°", "90°"],
        correctIndex: 1,
        explanation:
          "50 + 60 = 110. 180 - 110 = 70°, so the third angle is 70°.",
      },
      {
        id: "g5",
        prompt: "Vertical angles are:",
        choices: [
          "Always equal",
          "Always supplementary",
          "Always complementary",
          "Never equal",
        ],
        correctIndex: 0,
        explanation:
          "Vertical angles are opposite angles formed by intersecting lines and are always equal.",
      },
    ],
  },
];

export function getQuizBySlug(slug: string) {
  return quizzes.find((q) => q.slug === slug);
}
