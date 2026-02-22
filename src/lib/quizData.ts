export type QuizQuestion = {
  id: string;
  prompt: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
};

export type QuizTopic =
  | "Algebra"
  | "Geometry"
  | "Trig"
  | "Precalc"
  | "Statistics"
  | "SAT/PSAT"
  | "APPrecalculus Review: Sinusoidal Curves";

export type Quiz = {
  slug: string;
  title: string;
  topic: QuizTopic;
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

  // -------------------------
  // Trig Quiz
  // -------------------------
  {
    slug: "trig-unit-circle",
    title: "Trig Quick Check: Unit Circle Essentials",
    topic: "Trig",
    questions: [
      {
        id: "t1",
        prompt: "Convert 180° to radians.",
        choices: ["π/2", "π", "2π", "3π/2"],
        correctIndex: 1,
        explanation: "180° equals π radians.",
      },
      {
        id: "t2",
        prompt: "What is sin(π/2)?",
        choices: ["0", "1", "-1", "√3/2"],
        correctIndex: 1,
        explanation: "At π/2, the unit circle point is (0, 1), so sin = 1.",
      },
      {
        id: "t3",
        prompt: "What is cos(0)?",
        choices: ["0", "1", "-1", "√2/2"],
        correctIndex: 1,
        explanation: "At 0, the unit circle point is (1, 0), so cos = 1.",
      },
      {
        id: "t4",
        prompt: "In quadrant II, cosine is:",
        choices: ["Positive", "Negative", "Zero", "Always 1"],
        correctIndex: 1,
        explanation: "Quadrant II has x < 0 and y > 0, so cosine (x) is negative.",
      },
      {
        id: "t5",
        prompt: "Which equals sin(30°)?",
        choices: ["1/2", "√2/2", "√3/2", "0"],
        correctIndex: 0,
        explanation: "sin(30°) = 1/2 on the unit circle.",
      },
    ],
  },

  // -------------------------
  // SAT/PSAT Quiz
  // -------------------------
  {
    slug: "sat-psat-mini",
    title: "SAT/PSAT Mini: Algebra + Data",
    topic: "SAT/PSAT",
    questions: [
      {
        id: "s1",
        prompt: "If 5x − 3 = 22, what is x?",
        choices: ["3", "4", "5", "7"],
        correctIndex: 2,
        explanation: "Add 3: 5x = 25. Divide by 5: x = 5.",
      },
      {
        id: "s2",
        prompt: "A line has slope -2 and y-intercept 7. Which is the equation?",
        choices: ["y = 2x + 7", "y = -2x + 7", "y = -2x - 7", "y = 7x - 2"],
        correctIndex: 1,
        explanation: "Slope-intercept form is y = mx + b → y = -2x + 7.",
      },
      {
        id: "s3",
        prompt: "If (x + 4)(x - 4) = 0, then x can be:",
        choices: ["Only 4", "Only -4", "4 or -4", "0"],
        correctIndex: 2,
        explanation: "Zero product property: x+4=0 → x=-4 OR x-4=0 → x=4.",
      },
      {
        id: "s4",
        prompt: "If the mean of 4 numbers is 10, what is their sum?",
        choices: ["14", "40", "10", "4"],
        correctIndex: 1,
        explanation: "Mean = sum / count → sum = 10 × 4 = 40.",
      },
      {
        id: "s5",
        prompt: "Which is closest to 0.39 as a fraction?",
        choices: ["2/5", "3/8", "4/9", "7/20"],
        correctIndex: 0,
        explanation: "2/5 = 0.4, which is closest to 0.39.",
      },
    ],
  },

  // -------------------------
  // AP Precalc (Sinusoidal Curves) Quiz
  // -------------------------
  {
    slug: "ap-precalc-sinusoidal",
    title: "AP Precalculus: Sinusoidal Curves Basics",
    topic: "APPrecalculus Review: Sinusoidal Curves",
    questions: [
      {
        id: "p1",
        prompt: "In y = A sin(Bx) + D, what does |A| represent?",
        choices: ["Period", "Amplitude", "Phase shift", "Midline"],
        correctIndex: 1,
        explanation: "Amplitude is |A| (distance from midline to max/min).",
      },
      {
        id: "p2",
        prompt: "In y = A sin(Bx) + D, the period is:",
        choices: ["2πB", "B/2π", "2π/|B|", "|B|/2π"],
        correctIndex: 2,
        explanation: "Period for sine/cosine is 2π/|B|.",
      },
      {
        id: "p3",
        prompt: "For y = 2sin(x) - 3, the midline is:",
        choices: ["y = 2", "y = -3", "y = 0", "y = -1"],
        correctIndex: 1,
        explanation: "D = -3 shifts the graph down; midline is y = -3.",
      },
      {
        id: "p4",
        prompt: "For y = sin(3x), compared to y = sin(x), the period is:",
        choices: ["Tripled", "One-third", "Same", "Shifted right"],
        correctIndex: 1,
        explanation: "Period = 2π/3, which is one-third of 2π.",
      },
      {
        id: "p5",
        prompt: "A phase shift inside sin(B(x - C)) shifts the graph:",
        choices: ["Up/down", "Left/right", "Flips over x-axis", "Changes amplitude only"],
        correctIndex: 1,
        explanation: "C moves the graph horizontally (left/right).",
      },
    ],
  },
];

export function getQuizBySlug(slug: string) {
  return quizzes.find((q) => q.slug === slug);
}