"use client";

import PageShell from "@/components/PageShell";

export default function HelpPage() {
  return (
    <PageShell
      title="Help & FAQ"
      subtitle="Learn how PeerPilot works and how to get the most out of it."
    >
      <div className="space-y-6">
        {/* How quizzes work */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            How do quizzes work?
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Quizzes provide instant feedback after each question. Once you
            finish, your score is automatically saved to your Dashboard.
          </p>
          <p className="mt-2 text-sm text-slate-600">
            You can track your quiz average and most recent attempts in the
            Dashboard section.
          </p>
        </div>

        {/* Booking sessions */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            How do I request a tutoring session?
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Go to the Schedule page, choose your topic, tutor, time slot, and
            session goal, then click “Request Session.”
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Your request is saved to your Dashboard and an email is sent to the
            selected tutor (demo version).
          </p>
        </div>

        {/* Tutor confirmation */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            How does tutor confirmation work?
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            After a session request is submitted, the tutor receives an email
            notification (demo system). The tutor then responds with a Zoom link
            and confirmation.
          </p>
        </div>

        {/* Demo notice (fixed styling) */}
        <div className="rounded-2xl border-2 border-amber-300 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Is this a demo version?
          </h2>
          <p className="mt-2 text-sm text-slate-700">
            Yes. PeerPilot currently runs in demo mode for FBLA judging. Quiz
            attempts and session requests are saved locally for demonstration
            purposes.
          </p>
          <p className="mt-2 text-sm text-slate-700">
            Session requests also trigger an email notification to the selected
            tutor (demo system).
          </p>
        </div>
      </div>
    </PageShell>
  );
}