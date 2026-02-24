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
                PEERPILOT • MATH LEARNING HUB
              </div>
            </div>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              Organized resources. Real tutors.{" "}
              <span className="text-indigo-700">Measurable progress.</span>
            </h1>

            <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
              PeerPilot brings trusted learning sites into one place, grouped by
              topic, with quick practice and a personalized dashboard.
            </p>

            <div className="pp-fade-up pp-fade-up-delay-1 mt-6 flex flex-wrap gap-3">
              <Link
                href="/resources"
                className="pp-button inline-flex h-11 items-center justify-center rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                Explore by Topic
              </Link>
              <Link
                href="/tutors"
                className="pp-button inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-900 hover:bg-slate-50"
              >
                Meet Our Tutors
              </Link>
              <Link
                href="/dashboard"
                className="pp-button inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-900 hover:bg-slate-50"
              >
                View Dashboard
              </Link>
            </div>

            <div className="pp-fade-up pp-fade-up-delay-2 mt-4 text-xs text-slate-500">
              
            </div>
          </div>

          {/* SNAPSHOT (lighter + clearer) */}
          <div className="pp-fade-up pp-fade-up-delay-1 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-slate-900">
                  Live Snapshot
                </div>
                <div className="mt-1 text-xs text-slate-500">
                 
                </div>
              </div>

              <Link
                href="/metrics"
                className="pp-button text-sm font-semibold text-indigo-700 hover:underline"
              >
                Open Metrics →
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
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-semibold text-slate-900">
                  Latest Activity
                </div>
                <Link
                  href="/quiz/algebra-basics"
                  className="pp-button text-xs font-semibold text-indigo-700 hover:underline"
                >
                  Generate demo data →
                </Link>
              </div>

              {lastAttempt ? (
                <div className="mt-2 text-sm text-slate-600">
                  <span className="text-slate-900 font-medium">
                    {lastAttempt.title}
                  </span>{" "}
                  • <span className="font-semibold">{lastAttempt.scorePercent}%</span>
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
                  No attempts yet. Take{" "}
                  <Link
                    href="/quiz/algebra-basics"
                    className="pp-button font-semibold text-indigo-700 hover:underline"
                  >
                    Algebra Basics
                  </Link>{" "}
                  to populate metrics.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* DIFFERENTIATORS (tight, not a text dump) */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="pp-fade-up grid gap-4 md:grid-cols-3">
            <MiniHighlight
              title="Curated by Topic"
              desc="We bundle high-quality learning sites under organized topics so students find the right resource faster."
              href="/resources"
              cta="Browse topics"
            />
            <MiniHighlight
              title="Original 50-Minute Lesson"
              desc="We produced a full-length instructional video for a specific math topic—beyond simple curation."
              href="/resources"
              cta="Watch on Resources"
            />
            <MiniHighlight
              title="Real Student Tutors"
              desc="PeerPilot features real tutors from our school to support students with live sessions and accountability."
              href="/tutors"
              cta="View tutors"
            />
          </div>
        </div>
      </section>

      {/* VALUE GRID (replaces “features + how it works” redundancy) */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="pp-fade-up flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              Built For Accesibility
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          
            </p>
          </div>

          <Link
            href="/citations"
            className="pp-button hidden text-sm font-semibold text-indigo-700 hover:underline sm:inline-flex"
          >
            View Citations →
          </Link>
        </div>

        <div className="pp-fade-up pp-fade-up-delay-1 mt-6 grid gap-4 md:grid-cols-3">
          <FeatureCard
            title="Resources Library"
            desc="Filter lessons, videos, practice sets, and downloads—then save what matters."
            cta="Explore resources"
            href="/resources"
          />
          <FeatureCard
            title="Schedule + RSVP"
            desc="Browse tutoring sessions and RSVP instantly (demo mode supported)."
            cta="Open schedule"
            href="/schedule"
          />
          <FeatureCard
            title="Dashboard + Metrics"
            desc="Track quiz averages, recent activity, and engagement analytics over time."
            cta="Open dashboard"
            href="/dashboard"
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
            href="/quiz/algebra-basics"
            className="pp-button inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-900 hover:bg-slate-50"
          >
            Take a Quick Quiz
          </Link>
          <Link
            href="/citations"
            className="pp-button inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-900 hover:bg-slate-50 sm:hidden"
          >
            View Citations
          </Link>
        </div>

        <div className="pp-fade-up pp-fade-up-delay-3 mt-4 text-xs text-slate-500">
          Accessibility: high-contrast text, clear navigation, keyboard-friendly
          interactions, and responsive layouts.
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

function MiniHighlight({
  title,
  desc,
  href,
  cta,
}: {
  title: string;
  desc: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="pp-card rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
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