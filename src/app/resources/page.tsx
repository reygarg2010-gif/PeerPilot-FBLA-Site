"use client";

import { useEffect, useMemo, useState } from "react";
import PageShell from "@/components/PageShell";
import {
  resources,
  type Resource,
  type ResourceTopic,
  type ResourceType,
} from "@/lib/resourceData";
import {
  getSavedResourceIds,
  toggleSavedResource,
} from "@/lib/savedResourcesStore";
import { quizzes } from "@/lib/quizData";
import { topicTutors, getTutorById } from "@/lib/tutorsData";

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

  function clearFilters() {
    setQuery("");
    setTopic("All");
    setType("All");
    setGrade("All");
  }

  const filtersActive =
    query.trim().length > 0 ||
    topic !== "All" ||
    type !== "All" ||
    grade !== "All";

  return (
    <PageShell
      title="Resources"
      subtitle="Browse by topic, filter fast, and save what you’ll use again."
      actions={
        <button
          onClick={clearFilters}
          className={[
            "pp-button inline-flex h-10 items-center justify-center rounded-xl px-4 text-sm font-semibold transition-all duration-200 ease-out",
            filtersActive
              ? "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50 hover:shadow-sm"
              : "border border-slate-200 bg-white text-slate-400 cursor-not-allowed",
          ].join(" ")}
          disabled={!filtersActive}
          title="Reset search + filters"
        >
          Clear filters
        </button>
      }
    >
      {/* Filters Card */}
      <div className="pp-card rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg">
        <div className="grid gap-3 md:grid-cols-12">
          <div className="md:col-span-5 space-y-1">
            <label className="text-sm font-medium text-slate-700">Search</label>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try: slope, factoring, unit circle..."
              className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
            />
          </div>

          <div className="md:col-span-3 space-y-1">
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
              <option value="APPrecalculus Review: Sinusoidal Curves">
                APPrecalculus Review: Sinusoidal Curves
              </option>
            </select>
          </div>

          <div className="md:col-span-2 space-y-1">
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

          <div className="md:col-span-2 space-y-1">
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

        <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
          <div />
          <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
            {filtered.length} results
          </div>
        </div>
      </div>

      {/* Highlights row */}
      <div className="grid gap-3">
        <QuizHighlight />
      </div>

      {/* Saved */}
      <div>
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Saved</h2>
            <div className="mt-1 text-sm text-slate-600">
              Your saved items (stored locally for demo).
            </div>
          </div>
          <div className="text-sm text-slate-600">
            {savedResources.length} saved
          </div>
        </div>

        {savedResources.length === 0 ? (
          <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
            No saved resources yet. Click{" "}
            <span className="font-semibold">Save</span> on any resource below.
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
      <div>
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Results</h2>
            <div className="mt-1 text-sm text-slate-600">
              Browse resources and open them in a new tab.
            </div>
          </div>

          {filtersActive ? (
            <button
              onClick={clearFilters}
              className="pp-button inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 transition-all duration-200 ease-out hover:bg-slate-50 hover:shadow-sm"
            >
              Reset
            </button>
          ) : (
            <div className="text-sm text-slate-600">{filtered.length} items</div>
          )}
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

function QuizHighlight() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg">
      {/* Accent bar */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500" />

      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-lg font-semibold text-slate-900">Quizzes</div>
          <div className="mt-1 text-sm text-slate-600">
            Quick checks with instant feedback. Scores show in Dashboard.
          </div>
        </div>

        <span className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-900">
          {Math.min(5, quizzes.length)} Available
        </span>
      </div>

      {/* 5 quiz cards - full width on large screens */}
      <div className="mt-5 grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {quizzes.slice(0, 5).map((q) => (
          <div
            key={q.slug}
            className="group rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex flex-col gap-3">
              <div>
                <div className="text-sm font-semibold text-slate-900 transition-colors group-hover:text-indigo-700">
                  {q.title}
                </div>
                <div className="mt-1 text-sm text-slate-600">
                  {q.topic} • {q.questions.length} Qs
                </div>
              </div>

              <a
                href={`/quiz/${q.slug}`}
                className="pp-button inline-flex h-9 items-center justify-center rounded-xl bg-indigo-600 px-3 text-sm font-semibold text-white transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-md active:translate-y-0"
              >
                Start Quiz
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 text-xs text-slate-500">
        Tip: Try one quiz, then check your score in Dashboard.
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
  const assigned = (topicTutors as any)[r.topic] as string[] | undefined;
  const tutorObjects =
    assigned?.map((id) => getTutorById(id as any)).filter(Boolean) ?? [];

  const tagsToShow = r.tags.slice(0, 4);
  const extra = Math.max(0, r.tags.length - tagsToShow.length);

  return (
    <div
      className={[
        "pp-card rounded-2xl border border-slate-200 bg-white p-5",
        "transition-all duration-200 ease-out",
        "hover:-translate-y-0.5 hover:shadow-lg",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-4">
        {/* Left content */}
        <div className="min-w-0 space-y-2">
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

            {tutorObjects.length > 0 ? (
              <span className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-900">
                Online help
              </span>
            ) : null}
          </div>

          <h3 className="text-base font-semibold text-slate-900">{r.title}</h3>
          <p className="text-sm text-slate-600">{r.description}</p>

          <div className="flex flex-wrap gap-2">
            {tagsToShow.map((t) => (
              <span
                key={t}
                className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-700"
              >
                {t}
              </span>
            ))}
            {extra > 0 ? (
              <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-700">
                +{extra}
              </span>
            ) : null}
          </div>

          {tutorObjects.length > 0 ? (
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-700">
                Tutors:
              </span>
              {tutorObjects.slice(0, 3).map((t) => (
                <a
                  key={t!.id}
                  href="/tutors"
                  className="rounded-full border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                  title="View tutor profiles"
                >
                  {t!.name}
                </a>
              ))}
              {tutorObjects.length > 3 ? (
                <span className="text-xs text-slate-500">
                  +{tutorObjects.length - 3} more
                </span>
              ) : null}
            </div>
          ) : null}
        </div>

        {/* Right actions: smaller + premium hover */}
        <div className="flex shrink-0 flex-col items-end gap-2">
          <a
            href={r.url}
            target="_blank"
            rel="noreferrer"
            className="pp-button inline-flex items-center justify-center whitespace-nowrap rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-md active:translate-y-0"
          >
            Open
          </a>

          <button
            onClick={onToggleSave}
            className={[
              "pp-button inline-flex items-center justify-center whitespace-nowrap rounded-full",
              "px-4 py-2 text-sm font-semibold transition-all duration-200 ease-out",
              "hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0",
              saved
                ? "border border-indigo-200 bg-indigo-50 text-indigo-900 hover:bg-indigo-100"
                : "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50",
            ].join(" ")}
          >
            {saved ? "Saved" : "Save"}
          </button>

          <a
            href="/schedule"
            className="pp-button inline-flex items-center justify-center whitespace-nowrap rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-sm active:translate-y-0"
          >
            Request Session
          </a>
        </div>
      </div>
    </div>
  );
}

function LinkButton({
  href,
  label,
  variant,
}: {
  href: string;
  label: string;
  variant: "primary" | "outline";
}) {
  if (variant === "primary") {
    return (
      <a
        href={href}
        className="pp-button inline-flex h-10 items-center justify-center rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-md active:translate-y-0"
      >
        {label}
      </a>
    );
  }

  return (
    <a
      href={href}
      className="pp-button inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-sm active:translate-y-0"
    >
      {label}
    </a>
  );
}