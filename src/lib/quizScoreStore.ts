const KEY = "peerpilot_quiz_scores_v1";

export type QuizAttempt = {
  id: string; // unique
  slug: string;
  title: string;
  topic: string;
  scorePercent: number;
  correct: number;
  total: number;
  dateISO: string;
};

/**
 * Get all stored quiz attempts (newest first)
 */
export function getAttempts(): QuizAttempt[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as QuizAttempt[]) : [];
  } catch {
    return [];
  }
}

/**
 * Add a new quiz attempt (keeps last 20)
 */
export function addAttempt(attempt: QuizAttempt) {
  if (typeof window === "undefined") return;

  const current = getAttempts();
  const next = [attempt, ...current].slice(0, 20);
  localStorage.setItem(KEY, JSON.stringify(next));
}

/**
 * Average score across all attempts
 */
export function getAverageScore(): number | null {
  const attempts = getAttempts();
  if (attempts.length === 0) return null;

  const sum = attempts.reduce((acc, x) => acc + x.scorePercent, 0);
  return Math.round(sum / attempts.length);
}

/**
 * Best score achieved
 */
export function getBestScore(): number | null {
  const attempts = getAttempts();
  if (attempts.length === 0) return null;

  return Math.max(...attempts.map((a) => a.scorePercent));
}

/**
 * Clear all quiz attempts (for demo reset)
 */
export function clearAttempts() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}
