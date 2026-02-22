"use client";

import PageShell from "@/components/PageShell";
import { tutors } from "@/lib/tutorsData";

export default function TutorsPage() {
  return (
    <PageShell
      title="Tutors"
      subtitle="Meet our PeerPilot tutors. All sessions are online and focused on clarity + confidence."
    >
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-sm font-semibold text-slate-900">
              Online tutoring
            </div>
            <div className="mt-1 text-sm text-slate-600">
              Request a session from the Resources page or Schedule page.
            </div>
          </div>
          <a
            href="/schedule"
            className="inline-flex h-10 items-center justify-center rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Go to Schedule
          </a>
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tutors.map((t) => (
          <div
            key={t.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start gap-4">
              {/* Photo (use <img> so it ALWAYS shows) */}
              <div className="h-14 w-14 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                <img
                  src={t.photo}
                  alt={`${t.name} tutor photo`}
                  className="h-full w-full object-cover"
                  loading={t.id === "rey-garg" ? "eager" : "lazy"}
                />
              </div>

              <div className="min-w-0">
                <div className="text-base font-semibold text-slate-900">
                  {t.name}
                </div>
                <div className="text-sm text-slate-600">{t.role}</div>
                <div className="mt-1 text-sm font-medium text-indigo-700">
                  {t.headline}
                </div>
              </div>
            </div>

            <p className="mt-3 text-sm text-slate-600">{t.bio}</p>

            <div className="mt-4">
              <div className="text-xs font-semibold text-slate-700">Topics</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {t.topics.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <div className="text-xs font-semibold text-slate-700">
                Strengths
              </div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
                {t.strengths.slice(0, 3).map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>

            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
              <span className="font-semibold">Availability:</span>{" "}
              {t.availability}
            </div>

            <div className="mt-4 flex gap-2">
              <a
                href="/schedule"
                className="flex-1 h-10 rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white hover:bg-indigo-700 grid place-items-center"
              >
                Request session
              </a>
              <a
                href="/resources"
                className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 hover:bg-slate-50 grid place-items-center"
              >
                Resources
              </a>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}