"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import PeerPilotLogo from "@/components/PeerPilotLogo";
import { getAttempts } from "@/lib/quizScoreStore";
import { getRsvps } from "@/lib/rsvpStore";
import { getSavedResourceIds } from "@/lib/savedResourcesStore";

export default function HomePage() {
  const [attempts, setAttempts] = useState<any[]>([]);
  const [rsvps, setRsvps] = useState<Record<string, boolean>>({});
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    setAttempts(getAttempts());
    setRsvps(getRsvps());
    setSavedIds(getSavedResourceIds());
  }, []);

  const totalAttempts = attempts.length;
  const avgScore = useMemo(() => {
    if (attempts.length === 0) return null;
    const sum = attempts.reduce((acc, a) => acc + a.scorePercent, 0);
    return Math.round(sum / attempts.length);
  }, [attempts]);

  const rsvpCount = Object.keys(rsvps).length;
  const savedCount = savedIds.length;
  const lastAttempt = attempts[0] ?? null;

  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="mx-auto max-w-6xl px-4 pt-12 pb-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          {/* LEFT */}
          <div className="pp-fade-up">
            <div className="flex items-center gap-3">
              <PeerPilotLogo className="h-11 w-11 text-indigo-600" />
              <div className="text-sm font-semibold tracking-wide text-indigo-700">
                PEERPILOT • MATH
              </div>
            </div>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              Study smarter. Track progress.{" "}
              <span className="text-indigo-700">Get results.</span>
            </h1>

            <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
              PeerPilot is a student-first math learning platform built for FBLA
              Website Design. Explore resources, take quick quizzes, RSVP to help
              sessions, and view performance metrics — all in one place.
            </p>

            <div className="pp-fade-up pp-fade-up-delay-1 mt-6 flex flex-wrap gap-3">
              <Link
                href="/resources"
                className="pp-button inline-flex h-11 items-center justify-center rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                Explore Resources
              </Link>
              <Link
                href="/quiz/algebra-basics"
                className="pp-button inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-900 hover:bg-slate-50"
              >
                Start a Quick Quiz
              </Link>
              <Link
                href="/dashboard"
                className="pp-button inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-900 hover:bg-slate-50"
              >
                View Dashboard
              </Link>
            </div>

            <div className="pp-fade-up pp-fade-up-delay-2 mt-4 text-xs text-slate-500">
              Demo mode stores data locally in your browser (perfect for judging).
            </div>
          </div>

          {/* LIVE SNAPSHOT */}
          <div className="pp-fade-up pp-fade-up-delay-1 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-slate-900">
                Live Snapshot
              </div>
              <Link
                href="/metrics"
                className="pp-button text-sm font-semibold text-indigo-700 hover:underline"
              >
                View Metrics
              </Link>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <StatCard label="Quiz Attempts" value={String(totalAttempts)} />
              <StatCard
                label="Average Score"
                value={avgScore === null ? "—" : `${avgScore}%`}
              />
              <StatCard label="RSVP Sessions" value={String(rsvpCount)} />
              <StatCard label="Saved Resources" value={String(savedCount)} />
            </div>

            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm font-semibold text-slate-900">
                Latest Activity
              </div>

              {lastAttempt ? (
                <div className="mt-2 text-sm text-slate-600">
                  Last quiz:{" "}
                  <span className="font-medium text-slate-900">
                    {lastAttempt.title}
                  </span>{" "}
                  •{" "}
                  <span className="font-semibold">
                    {lastAttempt.scorePercent}%
                  </span>
                  <div className="mt-2">
                    <Link
                      href={`/quiz/${lastAttempt.slug}`}
                      className="pp-button text-sm font-semibold text-indigo-700 hover:underline"
                    >
                      Retake quiz →
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="mt-2 text-sm text-slate-600">
                  No quiz attempts yet. Try{" "}
                  <Link
                    href="/quiz/algebra-basics"
                    className="pp-button font-semibold text-indigo-700 hover:underline"
                  >
                    Algebra Basics
                  </Link>{" "}
                  to generate metrics.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-6xl px-4 pb-12">
        <div className="pp-fade-up pp-fade-up-delay-2 grid gap-4 md:grid-cols-3">
          <FeatureCard
            title="Resources Library"
            desc="Filter lessons, videos, practice sets, and downloads — then save what matters."
            cta="Browse Resources"
            href="/resources"
          />
          <FeatureCard
            title="Schedule + RSVP"
            desc="Browse tutoring and group sessions and RSVP instantly (demo mode)."
            cta="Open Schedule"
            href="/schedule"
          />
          <FeatureCard
            title="Dashboard + Metrics"
            desc="See quiz averages, recent attempts, and platform engagement metrics."
            cta="View Dashboard"
            href="/dashboard"
          />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="pp-fade-up">
            <h2 className="text-2xl font-semibold text-slate-900">
              How PeerPilot helps students
            </h2>
          </div>

          <div className="pp-fade-up pp-fade-up-delay-1 mt-6 grid gap-4 md:grid-cols-3">
            <StepCard
              num="1"
              title="Find what you need fast"
              desc="Search + filter by topic, type, and grade level."
            />
            <StepCard
              num="2"
              title="Practice with quick quizzes"
              desc="Instant scoring, explanations, and saved performance history."
            />
            <StepCard
              num="3"
              title="Track progress over time"
              desc="Dashboard + Metrics show trends and engagement — great for goal-setting."
            />
          </div>

          <div className="pp-fade-up pp-fade-up-delay-2 mt-8 flex flex-wrap gap-3">
            <Link
              href="/resources"
              className="pp-button inline-flex h-11 items-center justify-center rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Start Learning
            </Link>
            <Link
              href="/citations"
              className="pp-button inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-900 hover:bg-slate-50"
            >
              View Citations
            </Link>
          </div>

          <div className="pp-fade-up pp-fade-up-delay-3 mt-4 text-xs text-slate-500">
            Accessibility note: high-contrast text, clear navigation, and responsive
            layouts.
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="pp-card rounded-2xl border border-slate-200 bg-white p-4">
      <div className="text-xs font-medium text-slate-600">{label}</div>
      <div className="mt-2 text-2xl font-semibold text-indigo-900">{value}</div>
    </div>
  );
}

function FeatureCard({
  title,
  desc,
  cta,
  href,
}: {
  title: string;
  desc: string;
  cta: string;
  href: string;
}) {
  return (
    <div className="pp-card rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{desc}</p>
      <Link
        href={href}
        className="pp-button mt-4 inline-flex text-sm font-semibold text-indigo-700 hover:underline"
      >
        {cta} →
      </Link>
    </div>
  );
}

function StepCard({
  num,
  title,
  desc,
}: {
  num: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="pp-card rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-indigo-600 text-sm font-semibold text-white">
          {num}
        </div>
        <div className="text-base font-semibold text-slate-900">{title}</div>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-600">{desc}</p>
    </div>
  );
}
