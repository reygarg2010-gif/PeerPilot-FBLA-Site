"use client";

import { useEffect, useMemo, useState } from "react";
import PageShell from "@/components/PageShell";
import {
  resources,
  type Resource,
  type ResourceTopic,
  type ResourceType,
} from "@/lib/resourceData";
import { getSavedResourceIds, toggleSavedResource } from "@/lib/savedResourcesStore";
import { quizzes } from "@/lib/quizData";

type TopicFilter = "All" | ResourceTopic;
type TypeFilter = "All" | ResourceType;
type GradeFilter = "All" | "9" | "10" | "11" | "12";

export default function ResourcesPage() {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState<TopicFilter>("All");
  const [type, setType] = useState<TypeFilter>("All");
  const [grade, setGrade] = useState<GradeFilter>("All");
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    setSavedIds(getSavedResourceIds());
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return resources.filter((r) => {
      const topicOk = topic === "All" ? true : r.topic === topic;
      const typeOk = type === "All" ? true : r.type === type;
      const gradeOk = grade === "All" ? true : r.grade === grade;

      const queryOk =
        q.length === 0
          ? true
          : (r.title + " " + r.description + " " + r.tags.join(" "))
              .toLowerCase()
              .includes(q);

      return topicOk && typeOk && gradeOk && queryOk;
    });
  }, [query, topic, type, grade]);

  const savedResources = useMemo(() => {
    const set = new Set(savedIds);
    return resources.filter((r) => set.has(r.id));
  }, [savedIds]);

  function onToggleSave(id: string) {
    const next = toggleSavedResource(id);
    setSavedIds(next);
  }

  return (
    <PageShell
      title="Resources"
      subtitle="Search, filter, and save math resources. This is interactive in demo mode and will connect to accounts later."
    >
      {/* Controls */}
      <div className="grid gap-3 md:grid-cols-4">
        <div className="md:col-span-2 space-y-1">
          <label className="text-sm font-medium text-slate-700">Search</label>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try: slope, factoring, unit circle..."
            className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Topic</label>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value as TopicFilter)}
            className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900"
          >
            <option value="All">All</option>
            <option value="Algebra">Algebra</option>
            <option value="Geometry">Geometry</option>
            <option value="Trig">Trig</option>
            <option value="Precalc">Precalc</option>
            <option value="Statistics">Statistics</option>
            <option value="SAT/PSAT">SAT/PSAT</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as TypeFilter)}
            className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900"
          >
            <option value="All">All</option>
            <option value="Lesson">Lesson</option>
            <option value="Video">Video</option>
            <option value="Practice">Practice</option>
            <option value="Download">Download</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Grade</label>
          <select
            value={grade}
            onChange={(e) => setGrade(e.target.value as GradeFilter)}
            className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900"
          >
            <option value="All">All</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
        </div>
      </div>

      {/* Quiz Library (shows all quizzes, including Geometry) */}
      <QuizLibrary />

      {/* Saved section */}
      <div className="mt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Saved</h2>
          <div className="text-sm text-slate-600">{savedResources.length} saved</div>
        </div>

        {savedResources.length === 0 ? (
          <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
            No saved resources yet. Click “Save” on any resource below.
          </div>
        ) : (
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {savedResources.map((r) => (
              <ResourceCard
                key={r.id}
                r={r}
                saved
                onToggleSave={() => onToggleSave(r.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Results */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">All Resources</h2>
          <div className="text-sm text-slate-600">{filtered.length} results</div>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {filtered.map((r) => (
            <ResourceCard
              key={r.id}
              r={r}
              saved={savedIds.includes(r.id)}
              onToggleSave={() => onToggleSave(r.id)}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
            No matches. Try a different search or reset filters to “All.”
          </div>
        )}
      </div>
    </PageShell>
  );
}

function QuizLibrary() {
  return (
    <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-lg font-semibold text-slate-900">Quizzes</div>
          <div className="mt-1 text-sm text-slate-600">
            Quick checks with instant feedback. Scores appear in your Dashboard.
          </div>
        </div>
        <div className="text-xs text-slate-500">Demo mode • local score tracking</div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {quizzes.map((q) => (
          <div
            key={q.slug}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm font-semibold text-slate-900">{q.title}</div>
                <div className="mt-1 text-sm text-slate-600">
                  Topic: {q.topic} • {q.questions.length} questions
                </div>
              </div>

              <a
                href={`/quiz/${q.slug}`}
                className="inline-flex h-10 items-center rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                Start
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResourceCard({
  r,
  saved,
  onToggleSave,
}: {
  r: Resource;
  saved: boolean;
  onToggleSave: () => void;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">
              {r.type}
            </span>
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
              {r.topic}
            </span>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600">
              Grade {r.grade}
            </span>
          </div>

          <h3 className="text-base font-semibold text-slate-900">{r.title}</h3>
          <p className="text-sm text-slate-600">{r.description}</p>

          <div className="flex flex-wrap gap-2">
            {r.tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-700"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <a
            href={r.url}
            target="_blank"
            className="h-10 rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white hover:bg-indigo-700 grid place-items-center"
          >
            Open
          </a>

          <button
            onClick={onToggleSave}
            className={[
              "h-10 rounded-xl px-4 text-sm font-semibold transition",
              saved
                ? "border border-indigo-200 bg-indigo-50 text-indigo-900 hover:bg-indigo-100"
                : "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50",
            ].join(" ")}
          >
            {saved ? "Saved" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
