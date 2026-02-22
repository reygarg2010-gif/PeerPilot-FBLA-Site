"use client";

import { useMemo, useState } from "react";
import PageShell from "@/components/PageShell";
import {
  tutors,
  topicTutors,
  getTutorById,
  type TutorId,
} from "@/lib/tutorsData";
import { addSessionRequest } from "@/lib/sessionRequestStore";
import { useUser } from "@clerk/nextjs";

type QuickTopic =
  | "Algebra"
  | "Geometry"
  | "Trig"
  | "Precalc"
  | "Statistics"
  | "SAT/PSAT"
  | "APPrecalculus Review: Sinusoidal Curves";

type Duration = "30 min" | "60 min";
type SessionGoal = "Homework Help" | "Test Prep" | "Concept Review";

const TIME_SLOTS = ["4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM"] as const;
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

export default function SchedulePage() {
  const { user } = useUser();

  const [selectedTutorId, setSelectedTutorId] = useState<TutorId>("rey-garg");
  const [quickTopic, setQuickTopic] = useState<QuickTopic>(
    "APPrecalculus Review: Sinusoidal Curves"
  );
  const [goal, setGoal] = useState<SessionGoal>("Test Prep");
  const [duration, setDuration] = useState<Duration>("60 min");
  const [day, setDay] = useState<(typeof DAYS)[number]>("Wed");
  const [time, setTime] = useState<(typeof TIME_SLOTS)[number]>("5:00 PM");
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [isSending, setIsSending] = useState(false);
  const [emailStatus, setEmailStatus] = useState<"idle" | "sent" | "failed">(
    "idle"
  );

  const selectedTutor = getTutorById(selectedTutorId);

  const recommendedTutors = useMemo(() => {
    const ids = (topicTutors as Record<string, TutorId[]>)[quickTopic] ?? [];
    return ids.map((id) => getTutorById(id)).filter(Boolean);
  }, [quickTopic]);

  async function submit() {
    // 1) Save request (Dashboard uses this)
    addSessionRequest({
      tutorId: selectedTutorId,
      tutorName: selectedTutor?.name ?? "Tutor",
      topic: quickTopic,
      goal,
      duration,
      day,
      time,
      note: note.trim() ? note.trim() : undefined,
    });

    // 2) Email tutor (demo)
    setIsSending(true);
    setEmailStatus("idle");

    try {
      const res = await fetch("/api/send-session-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentName: user?.fullName ?? "Student",
          studentEmail: user?.primaryEmailAddress?.emailAddress ?? "Not provided",
          tutorName: selectedTutor?.name ?? "Tutor",
          topic: quickTopic,
          goal,
          duration,
          day,
          time,
          note: note.trim() ? note.trim() : undefined,
        }),
      });

      if (!res.ok) {
        setEmailStatus("failed");
      } else {
        setEmailStatus("sent");
      }
    } catch (e) {
      setEmailStatus("failed");
    } finally {
      setIsSending(false);
    }

    // 3) Show confirmation
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function reset() {
    setSubmitted(false);
    setNote("");
    setEmailStatus("idle");
  }

  return (
    <PageShell
      title="Schedule"
      subtitle="Request an online tutoring session. Choose a tutor, topic, and time slot. (Demo request form—future version connects to accounts.)"
    >
      {/* Confirmation */}
      {submitted && (
        <div className="mb-5 rounded-2xl border-2 border-emerald-300 bg-white p-5 shadow-sm">
          <div className="text-sm font-semibold text-slate-900">
            Request submitted ✅
          </div>

          <div className="mt-2 text-sm text-slate-700">
            <span className="font-semibold">Tutor:</span> {selectedTutor?.name} •{" "}
            <span className="font-semibold">Topic:</span> {quickTopic} •{" "}
            <span className="font-semibold">Goal:</span> {goal} •{" "}
            <span className="font-semibold">Time:</span> {day} @ {time} •{" "}
            <span className="font-semibold">Duration:</span> {duration}
          </div>

          {note.trim().length > 0 && (
            <div className="mt-2 text-sm text-slate-700">
              <span className="font-semibold">Note:</span> {note}
            </div>
          )}

       <div className="mt-4 text-sm text-slate-700">
  The selected tutor has been notified. You will receive a Zoom link confirmation by email.
</div>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <button
              onClick={reset}
              className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 hover:bg-slate-50"
            >
              Make another request
            </button>
            <a
              href="/dashboard"
              className="h-10 rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white hover:bg-indigo-700 grid place-items-center"
            >
              View on Dashboard
            </a>
            <a
              href="/tutors"
              className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 hover:bg-slate-50 grid place-items-center"
            >
              View Tutors
            </a>
          </div>
        </div>
      )}

      {/* Booking Portal */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Form */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-lg font-semibold text-slate-900">
                Book an Online Session
              </div>
              <div className="mt-1 text-sm text-slate-600">
                Pick a topic first to see recommended tutors, then choose a time
                slot.
              </div>
            </div>
            <div className="text-xs text-slate-500">Online only • Demo form</div>
          </div>

          {/* Recommended tutors */}
          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs font-semibold text-slate-700">
              Recommended tutors for:{" "}
              <span className="text-slate-900">{quickTopic}</span>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {recommendedTutors.length === 0 ? (
                <span className="text-sm text-slate-600">
                  No recommendations yet for this topic.
                </span>
              ) : (
                recommendedTutors.map((t) => (
                  <button
                    key={t!.id}
                    onClick={() => setSelectedTutorId(t!.id)}
                    className={[
                      "flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold transition",
                      selectedTutorId === t!.id
                        ? "border-indigo-200 bg-indigo-50 text-indigo-900"
                        : "border-slate-200 bg-white text-slate-900 hover:bg-slate-50",
                    ].join(" ")}
                    title="Select tutor"
                  >
                    <div className="h-7 w-7 overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                      <img
                        src={t!.photo}
                        alt={`${t!.name} photo`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    {t!.name.split(" ")[0]}
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Fields */}
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">Topic</label>
              <select
                value={quickTopic}
                onChange={(e) => {
                  setQuickTopic(e.target.value as QuickTopic);
                  setSubmitted(false);
                  setEmailStatus("idle");
                }}
                className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900"
              >
                <option value="APPrecalculus Review: Sinusoidal Curves">
                  APPrecalculus Review: Sinusoidal Curves
                </option>
                <option value="SAT/PSAT">SAT/PSAT</option>
                <option value="Algebra">Algebra</option>
                <option value="Geometry">Geometry</option>
                <option value="Trig">Trig</option>
                <option value="Precalc">Precalc</option>
                <option value="Statistics">Statistics</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">Tutor</label>
              <select
                value={selectedTutorId}
                onChange={(e) => setSelectedTutorId(e.target.value as TutorId)}
                className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900"
              >
                {tutors.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">
                Session goal
              </label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value as SessionGoal)}
                className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900"
              >
                <option value="Homework Help">Homework Help</option>
                <option value="Test Prep">Test Prep</option>
                <option value="Concept Review">Concept Review</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">
                Duration
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value as Duration)}
                className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900"
              >
                <option value="30 min">30 min</option>
                <option value="60 min">60 min</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">Day</label>
              <select
                value={day}
                onChange={(e) => setDay(e.target.value as any)}
                className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900"
              >
                {DAYS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Time slots */}
          <div className="mt-4">
            <div className="text-sm font-medium text-slate-700">Time slot</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setTime(slot)}
                  className={[
                    "h-10 rounded-xl px-4 text-sm font-semibold transition border",
                    time === slot
                      ? "border-indigo-200 bg-indigo-50 text-indigo-900"
                      : "border-slate-200 bg-white text-slate-900 hover:bg-slate-50",
                  ].join(" ")}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Note */}
          <div className="mt-4 space-y-1">
            <label className="text-sm font-medium text-slate-700">
              What do you need help with? (optional)
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Example: Help graph y = 2sin(3x - π) + 1 and identify amplitude/period/phase shift."
              className="min-h-[90px] w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <button
              onClick={submit}
              disabled={isSending}
              className={[
                "h-10 rounded-xl px-4 text-sm font-semibold text-white transition",
                isSending ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700",
              ].join(" ")}
            >
              {isSending ? "Sending…" : "Request Session"}
            </button>
            <a
              href="/resources"
              className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 hover:bg-slate-50 grid place-items-center"
            >
              Go to Resources
            </a>
            <a
              href="/tutors"
              className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 hover:bg-slate-50 grid place-items-center"
            >
              View Tutors
            </a>
          </div>
        </div>

        {/* Side card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-lg font-semibold text-slate-900">How it works</div>
          <div className="mt-2 text-sm text-slate-600">
            PeerPilot focuses on online tutoring. Students request a time slot,
            and the tutor confirms it with a Zoom link.
          </div>

          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-sm font-semibold text-slate-900">
              Selected tutor
            </div>

            <div className="mt-3 flex items-center gap-3">
              <div className="h-8 w-8 overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <img
                  src={selectedTutor?.photo ?? "/tutors/rey.jpg"}
                  alt="Tutor photo"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="min-w-0">
                <div className="text-sm font-semibold text-slate-900">
                  {selectedTutor?.name}
                </div>
                <div className="text-sm text-slate-600">
                  {selectedTutor?.headline}
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                {quickTopic}
              </span>

              {/* ✅ FIX: not faded anymore */}
              <span className="rounded-full border border-emerald-300 bg-white px-3 py-1 text-xs font-semibold text-emerald-800">
                Online
              </span>

              <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                {duration}
              </span>
            </div>

            <a
              href="/tutors"
              className="mt-4 h-10 rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white hover:bg-indigo-700 grid place-items-center"
            >
              View tutor bio
            </a>
          </div>

          <div className="mt-4 text-xs text-slate-500">
            Demo note: request is saved to Dashboard and sends an email to the
            tutor.
          </div>
        </div>
      </div>
    </PageShell>
  );
}