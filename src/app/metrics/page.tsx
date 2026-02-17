"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

import PageShell from "@/components/PageShell";
import { getAttempts, clearAttempts } from "@/lib/quizScoreStore";
import { getRsvps, clearRsvps } from "@/lib/rsvpStore";
import {
  getSavedResourceIds,
  clearSavedResources,
} from "@/lib/savedResourcesStore";

export default function MetricsPage() {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();

  const [attempts, setAttempts] = useState<any[]>([]);
  const [rsvps, setRsvps] = useState<Record<string, boolean>>({});
  const [savedIds, setSavedIds] = useState<string[]>([]);

  function refreshAll() {
    setAttempts(getAttempts());
    setRsvps(getRsvps());
    setSavedIds(getSavedResourceIds());
  }

  // Redirect if not signed in
  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) router.replace("/sign-in");
  }, [isLoaded, isSignedIn, router]);

  // Load data after sign-in confirmed
  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    refreshAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, isSignedIn]);

  const firstName = user?.firstName ?? "Student";

  const totalAttempts = attempts.length;

  const average = useMemo(() => {
    if (attempts.length === 0) return null;
    const sum = attempts.reduce((acc, a) => acc + a.scorePercent, 0);
    return Math.round(sum / attempts.length);
  }, [attempts]);

  const bestScore = useMemo(() => {
    if (attempts.length === 0) return null;
    return Math.max(...attempts.map((a) => a.scorePercent));
  }, [attempts]);

  const totalRsvps = Object.keys(rsvps).length;
  const totalSaved = savedIds.length;

  const lastSix = useMemo(() => {
    // attempts are stored newest-first; chart reads left→right as oldest→newest
    return attempts.slice(0, 6).reverse();
  }, [attempts]);

  if (!isLoaded) {
    return (
      <PageShell title="Platform Metrics" subtitle="Loading your account...">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
          Checking sign-in…
        </div>
      </PageShell>
    );
  }

  if (!isSignedIn) {
    return (
      <PageShell title="Platform Metrics" subtitle="Redirecting to sign in…">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
          You must be signed in to view metrics.
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell
      title="Platform Metrics"
      subtitle={`Welcome back, ${firstName}. Live engagement and performance analytics (demo mode).`}
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <MetricCard label="Quiz Attempts" value={String(totalAttempts)} />
        <MetricCard
          label="Average Score"
          value={average === null ? "—" : `${average}%`}
        />
        <MetricCard
          label="Best Score"
          value={bestScore === null ? "—" : `${bestScore}%`}
        />
        <MetricCard label="RSVP Sessions" value={String(totalRsvps)} />
        <MetricCard label="Saved Resources" value={String(totalSaved)} />
      </div>

      {/* Progress Chart */}
      <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Quiz Progress</h2>
            <p className="mt-1 text-sm text-slate-600">
              Last 6 quiz scores (demo mode).
            </p>
          </div>
          <div className="text-xs text-slate-500">Higher bars = higher scores</div>
        </div>

        {lastSix.length === 0 ? (
          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
            No quiz attempts yet. Take a quiz from{" "}
            <a
              className="font-medium text-indigo-700 hover:underline"
              href="/resources"
            >
              Resources
            </a>{" "}
            to see your chart.
          </div>
        ) : (
          <div className="mt-5">
            <div className="grid grid-cols-6 items-end gap-3">
              {lastSix.map((a) => (
                <Bar
                  key={a.id}
                  value={a.scorePercent}
                  label={shortLabel(a.title)}
                />
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
              <span>Older</span>
              <span>Newer</span>
            </div>
          </div>
        )}
      </div>

      {/* Demo Controls */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Demo Controls</h2>
            <p className="mt-1 text-sm text-slate-600">
              Reset stored demo data so you can present from a clean state.
            </p>
          </div>
          <div className="text-xs text-slate-500">
            Local only • affects this browser
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            onClick={() => {
              clearAttempts();
              setAttempts(getAttempts());
            }}
            className="pp-button h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 hover:bg-slate-50"
          >
            Clear Quiz Attempts
          </button>

          <button
            onClick={() => {
              clearRsvps();
              setRsvps(getRsvps());
            }}
            className="pp-button h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 hover:bg-slate-50"
          >
            Clear RSVPs
          </button>

          <button
            onClick={() => {
              clearSavedResources();
              setSavedIds(getSavedResourceIds());
            }}
            className="pp-button h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 hover:bg-slate-50"
          >
            Clear Saved Resources
          </button>

          <button
            onClick={() => {
              clearAttempts();
              clearRsvps();
              clearSavedResources();
              refreshAll();
            }}
            className="pp-button h-10 rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Reset All Demo Data
          </button>
        </div>
      </div>

      {/* Explanation */}
      <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">
          What This Demonstrates
        </h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-600">
          <li>• Dynamic client-side state storage</li>
          <li>• Cross-page data flow (Quiz → Dashboard → Metrics)</li>
          <li>• Engagement + performance tracking</li>
          <li>• Visual analytics for progress</li>
        </ul>
      </div>
    </PageShell>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="text-sm font-medium text-slate-600">{label}</div>
      <div className="mt-2 text-3xl font-semibold text-indigo-900">{value}</div>
    </div>
  );
}

function Bar({ value, label }: { value: number; label: string }) {
  const height = Math.max(6, Math.min(100, value)); // clamp 6–100
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative h-32 w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
        <div
          className="absolute bottom-0 left-0 right-0 rounded-t-xl bg-indigo-600"
          style={{ height: `${height}%` }}
          title={`${value}%`}
        />
      </div>
      <div className="text-center">
        <div className="text-xs font-semibold text-slate-900">{value}%</div>
        <div className="mt-0.5 text-[10px] text-slate-500">{label}</div>
      </div>
    </div>
  );
}

function shortLabel(title: string) {
  const t = title.toLowerCase();
  if (t.includes("algebra")) return "Algebra";
  if (t.includes("geometry")) return "Geometry";
  if (t.includes("trig")) return "Trig";
  if (t.includes("precalc")) return "Precalc";
  if (t.includes("stat")) return "Stats";
  if (t.includes("sat")) return "SAT";
  return title.length > 10 ? title.slice(0, 10) + "…" : title;
}
