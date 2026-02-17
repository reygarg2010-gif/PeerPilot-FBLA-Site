"use client";

import { useEffect, useMemo, useState } from "react";
import PageShell from "@/components/PageShell";
import {
  demoSessions,
  type Session,
  type SessionType,
  type Level,
} from "@/lib/demoData";
import { getRsvps, toggleRsvp as toggleRsvpStore } from "@/lib/rsvpStore";

type TypeFilter = "All" | SessionType;
type LevelFilter = "All" | Level;

export default function SchedulePage() {
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("All");
  const [levelFilter, setLevelFilter] = useState<LevelFilter>("All");
  const [rsvps, setRsvps] = useState<Record<string, boolean>>({});

  // Load saved RSVPs on first render (demo mode persistence)
  useEffect(() => {
    setRsvps(getRsvps());
  }, []);

  const sessions = useMemo(() => {
    return demoSessions.filter((s) => {
      const typeOk = typeFilter === "All" ? true : s.type === typeFilter;
      const levelOk = levelFilter === "All" ? true : s.level === levelFilter;
      return typeOk && levelOk;
    });
  }, [typeFilter, levelFilter]);

  function toggleRsvp(sessionId: string) {
    const next = toggleRsvpStore(sessionId);
    setRsvps(next);
  }

  return (
    <PageShell
      title="Schedule"
      subtitle="Browse tutoring and group study sessions. Filter by type/level and RSVP to reserve a spot (demo mode)."
    >
      {/* Filters */}
      <div className="mb-5 grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">
            Session Type
          </label>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as TypeFilter)}
            className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900"
          >
            <option value="All">All</option>
            <option value="Tutoring">Tutoring</option>
            <option value="Group Study">Group Study</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Focus</label>
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value as LevelFilter)}
            className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900"
          >
            <option value="All">All</option>
            <option value="Algebra">Algebra</option>
            <option value="Geometry">Geometry</option>
            <option value="Trig">Trig</option>
            <option value="Precalc">Precalc</option>
            <option value="SAT/PSAT">SAT/PSAT</option>
          </select>
        </div>
      </div>

      {/* Sessions list */}
      <div className="grid gap-4">
        {sessions.map((s) => (
          <SessionCard
            key={s.id}
            s={s}
            isRsvped={!!rsvps[s.id]}
            onToggle={() => toggleRsvp(s.id)}
          />
        ))}

        {sessions.length === 0 && (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
            No sessions match those filters. Try “All.”
          </div>
        )}
      </div>
    </PageShell>
  );
}

function SessionCard({
  s,
  isRsvped,
  onToggle,
}: {
  s: Session;
  isRsvped: boolean;
  onToggle: () => void;
}) {
  const badge =
    s.type === "Tutoring" ? "bg-indigo-600 text-white" : "bg-slate-900 text-white";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badge}`}>
              {s.type}
            </span>
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
              {s.level}
            </span>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600">
              Spots left:{" "}
              {isRsvped
                ? Math.min(s.spotsLeft + 1, s.spotsTotal)
                : s.spotsLeft}
              /{s.spotsTotal}
            </span>
          </div>

          <h2 className="text-lg font-semibold text-slate-900">{s.title}</h2>

          <div className="text-sm text-slate-600">
            {s.day} • {s.time} • {s.location}
          </div>
        </div>

        <button
          onClick={onToggle}
          className={[
            "h-10 rounded-xl px-4 text-sm font-semibold transition",
            isRsvped
              ? "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50"
              : "bg-indigo-600 text-white hover:bg-indigo-700",
          ].join(" ")}
        >
          {isRsvped ? "Cancel RSVP" : "RSVP"}
        </button>
      </div>

      {isRsvped && (
        <div className="mt-4 rounded-xl border border-indigo-200 bg-indigo-50 p-3 text-sm text-indigo-900">
          You’re RSVP’d! This will appear in your Dashboard in the next step.
        </div>
      )}
    </div>
  );
}
