"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import PageShell from "@/components/PageShell";
import { getQuizBySlug } from "@/lib/quizData";
import { addAttempt } from "@/lib/quizScoreStore";

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();

  const slug = typeof params.slug === "string" ? params.slug : "";
  const quiz = useMemo(() => getQuizBySlug(slug), [slug]);

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const [showExplain, setShowExplain] = useState(false);
  const [finished, setFinished] = useState(false);

  if (!quiz) {
    return (
      <PageShell title="Quiz Not Found" subtitle="That quiz does not exist.">
        <button
          onClick={() => router.push("/resources")}
          className="h-10 rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Back to Resources
        </button>
      </PageShell>
    );
  }

  const question = quiz!.questions[index];

  function checkAnswer() {
    if (selected === null) return;
    setShowExplain(true);
  }

  function handleNext() {
    if (selected === null) return;

    const isCorrect = selected === question.correctIndex;
    const newCorrect = correct + (isCorrect ? 1 : 0);

    const nextIndex = index + 1;

    if (nextIndex >= quiz!.questions.length) {
      const total = quiz!.questions.length;
      const scorePercent = Math.round((newCorrect / total) * 100);

      addAttempt({
        id: crypto.randomUUID(),
        slug: quiz!.slug,
        title: quiz!.title,
        topic: quiz!.topic,
        scorePercent,
        correct: newCorrect,
        total,
        dateISO: new Date().toISOString(),
      });

      setFinished(true);
      return;
    }

    setCorrect(newCorrect);
    setIndex(nextIndex);
    setSelected(null);
    setShowExplain(false);
  }

  if (finished) {
    return (
      <PageShell
        title="Quiz Completed"
        subtitle="Your score has been saved to the Dashboard (demo mode)."
      >
        <div className="flex gap-3">
          <button
            onClick={() => router.push("/dashboard")}
            className="h-10 rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Go to Dashboard
          </button>

          <button
            onClick={() => router.push("/resources")}
            className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 hover:bg-slate-50"
          >
            Back to Resources
          </button>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell
      title={quiz!.title}
      subtitle={`Question ${index + 1} of ${quiz!.questions.length}`}
    >
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="text-base font-semibold text-slate-900">
          {question.prompt}
        </div>

        <div className="mt-4 grid gap-2">
          {question.choices.map((choice, i) => {
            const active = selected === i;
            return (
              <button
                key={choice}
                disabled={showExplain}
                onClick={() => setSelected(i)}
                className={[
                  "rounded-xl border px-4 py-3 text-left text-sm transition",
                  active
                    ? "border-indigo-600 bg-indigo-50 text-indigo-900"
                    : "border-slate-200 bg-white text-slate-900 hover:bg-slate-50",
                ].join(" ")}
              >
                {choice}
              </button>
            );
          })}
        </div>

        {!showExplain ? (
          <div className="mt-4">
            <button
              onClick={checkAnswer}
              disabled={selected === null}
              className={[
                "h-10 rounded-xl px-4 text-sm font-semibold",
                selected === null
                  ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700",
              ].join(" ")}
            >
              Check Answer
            </button>
          </div>
        ) : (
          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-sm font-semibold text-slate-900">
              {selected === question.correctIndex ? "Correct ✅" : "Not quite ❌"}
            </div>
            <div className="mt-1 text-sm text-slate-600">
              {question.explanation}
            </div>

            <div className="mt-4">
              <button
                onClick={handleNext}
                className="h-10 rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                {index + 1 === quiz!.questions.length
                  ? "Finish Quiz"
                  : "Next Question"}
              </button>
            </div>
          </div>
        )}
      </div>
    </PageShell>
  );
}
