"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

import PageShell from "@/components/PageShell";
import {
  getAttempts,
  getAverageScore,
  type QuizAttempt,
} from "@/lib/quizScoreStore";

import {
  getSessionRequests,
  removeSessionRequest,
  type SessionRequest,
} from "@/lib/sessionRequestStore";

export default function DashboardPage() {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();

  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [requests, setRequests] = useState<SessionRequest[]>([]);

  // Redirect if not signed in
  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) router.replace("/sign-in");
  }, [isLoaded, isSignedIn, router]);

  // Load demo data after sign-in confirmed
  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    setAttempts(getAttempts());
    setRequests(getSessionRequests());
  }, [isLoaded, isSignedIn]);

  const avg = useMemo(() => getAverageScore(), [attempts]);
  const lastAttempt = attempts[0] ?? null;

  const firstName = user?.firstName ?? "Student";

  function onCancelRequest(id: string) {
    const next = removeSessionRequest(id);
    setRequests(next);
  }

  if (!isLoaded) {
    return (
      <PageShell title="Student Dashboard" subtitle="Loading your account...">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
          Checking sign-in…
        </div>
      </PageShell>
    );
  }

  if (!isSignedIn) {
    return (
      <PageShell title="Student Dashboard" subtitle="Redirecting to sign in…">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
          You must be signed in to view the dashboard.
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell
      title="Student Dashboard"
      subtitle={`Welcome back, ${firstName}. Track your tutoring requests and performance below.`}
    >
      {/* Top stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Requested Sessions" value={String(requests.length)} />
        <StatCard label="Quiz Average" value={avg === null ? "—" : `${avg}%`} />
        <StatCard
          label="Last Quiz"
          value={lastAttempt ? `${lastAttempt.scorePercent}%` : "—"}
          sub={lastAttempt ? lastAttempt.title : "No attempts yet"}
        />
      </div>

      {/* My Session Requests */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-slate-900">My Session Requests</h2>
        <p className="mt-1 text-sm text-slate-600">
          Requests you submitted from the Schedule page (demo mode).
        </p>

        <div className="mt-4 grid gap-3">
          {requests.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              No session requests yet. Go to{" "}
              <a
                className="font-medium text-indigo-700 hover:underline"
                href="/schedule"
              >
                Schedule
              </a>{" "}
              and request a session.
            </div>
          ) : (
            requests.slice(0, 8).map((r) => (
              <RequestCard key={r.id} r={r} onCancel={() => onCancelRequest(r.id)} />
            ))
          )}
        </div>
      </div>

      {/* Quiz Attempts */}
      <div className="mt-10">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Quiz Attempts</h2>
            <p className="mt-1 text-sm text-slate-600">
              Your most recent quiz results (saved locally in demo mode).
            </p>
          </div>

          <a
            href="/resources"
            className="text-sm font-semibold text-indigo-700 hover:underline"
          >
            Take a quiz →
          </a>
        </div>

        <div className="mt-4 grid gap-3">
          {attempts.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              No quiz attempts yet. Go to{" "}
              <a
                className="font-medium text-indigo-700 hover:underline"
                href="/resources"
              >
                Resources
              </a>{" "}
              and start a quiz.
            </div>
          ) : (
            attempts.slice(0, 6).map((a) => <AttemptRow key={a.id} a={a} />)
          )}
        </div>
      </div>
    </PageShell>
  );
}

function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="text-sm font-medium text-slate-600">{label}</div>
      <div className="mt-1 text-3xl font-semibold text-indigo-900">{value}</div>
      {sub ? <div className="mt-1 text-sm text-slate-600">{sub}</div> : null}
    </div>
  );
}

function RequestCard({
  r,
  onCancel,
}: {
  r: SessionRequest;
  onCancel: () => void;
}) {
  const created = new Date(r.createdAtISO);
  const createdLabel = isNaN(created.getTime())
    ? ""
    : created.toLocaleString(undefined, { month: "short", day: "numeric" });

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="text-sm font-semibold text-slate-900">
            {r.topic}
          </div>
          <div className="mt-1 text-sm text-slate-600">
            Tutor: {r.tutorName} • {r.day} @ {r.time} • {r.duration}
            {createdLabel ? ` • Requested ${createdLabel}` : ""}
          </div>

          <div className="mt-2 flex flex-wrap gap-2">
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
              {r.goal}
            </span>
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
              Online
            </span>
          </div>

          {r.note ? (
            <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
              <span className="font-semibold">Note:</span> {r.note}
            </div>
          ) : null}
        </div>

        <button
          onClick={onCancel}
          className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 hover:bg-slate-50"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function AttemptRow({ a }: { a: QuizAttempt }) {
  const date = new Date(a.dateISO);
  const dateLabel = isNaN(date.getTime())
    ? ""
    : date.toLocaleString(undefined, { month: "short", day: "numeric" });

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-sm font-semibold text-slate-900">{a.title}</div>
          <div className="mt-1 text-sm text-slate-600">
            {a.topic} • {a.correct}/{a.total} correct
            {dateLabel ? ` • ${dateLabel}` : ""}
          </div>
        </div>

        <div className="inline-flex w-fit items-center rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-900">
          {a.scorePercent}%
        </div>
      </div>
    </div>
  );
}