"use client";

import PageShell from "@/components/PageShell";

type Ref = {
  title: string;
  details: string;
  url: string;
};

const refs: { section: string; items: Ref[] }[] = [
  {
    section: "Educational Content & Practice References",
    items: [
      {
        title: "College Board — SAT Suite of Assessments",
        details:
          "Referenced for SAT/PSAT overview and general test framework (strategies reworded into PeerPilot’s own wording).",
        url: "https://satsuite.collegeboard.org/",
      },
      {
        title: "Khan Academy — Math (Algebra, Geometry, Trigonometry, Precalculus, Statistics)",
        details:
          "Used as a learning resource reference and for embedded instructional videos linked from PeerPilot Resources.",
        url: "https://www.khanacademy.org/math",
      },
    ],
  },
  {
    section: "Original PeerPilot Content",
    items: [
      {
        title: "PeerPilot Tutor Bios",
        details:
          "Written originally for PeerPilot by the team (unique bios per tutor).",
        url: "/tutors",
      },
      {
        title: "AP Precalculus Review Video — Sinusoidal Curves (55 min)",
        details:
          "Original PeerPilot video content created by Rey Garg and Brody Shnayder; hosted and embedded via Google Drive preview.",
        url: "/resources",
      },
      {
        title: "Tutor Headshots / Photos",
        details:
          "Photos provided by the PeerPilot team for demonstration and are not taken from third-party stock libraries.",
        url: "/tutors",
      },
    ],
  },
  {
    section: "Software / Frameworks / Platforms",
    items: [
      {
        title: "Next.js Documentation",
        details:
          "Framework used to build the PeerPilot web app (routing, app directory, API routes).",
        url: "https://nextjs.org/docs",
      },
      {
        title: "React Documentation",
        details: "UI library used for PeerPilot components and state management.",
        url: "https://react.dev/",
      },
      {
        title: "Tailwind CSS Documentation",
        details:
          "Utility-first CSS framework used for styling and responsive layout across the site.",
        url: "https://tailwindcss.com/docs",
      },
      {
        title: "Clerk Documentation",
        details:
          "Authentication and user management used for sign-in/sign-up and protected pages (Dashboard).",
        url: "https://clerk.com/docs",
      },
      {
        title: "Vercel Documentation",
        details:
          "Deployment platform used to host PeerPilot and deliver production builds.",
        url: "https://vercel.com/docs",
      },
    ],
  },
  {
    section: "Email Notification System",
    items: [
      {
        title: "Resend Documentation",
        details:
          "Email service used to send tutor notification emails when a student submits a session request (demo feature).",
        url: "https://resend.com/docs",
      },
    ],
  },
  {
    section: "Media Hosting / Embedding",
    items: [
      {
        title: "Google Drive — File Preview / Embed",
        details:
          "Used to host and embed PeerPilot’s AP Precalculus sinusoidal curves video via the /preview link.",
        url: "https://support.google.com/drive/",
      },
      {
        title: "YouTube Embedding (for linked educational videos)",
        details:
          "Some linked resources use YouTube embedded players through the official video host (Khan Academy content hosted on YouTube).",
        url: "https://support.google.com/youtube/answer/171780?hl=en",
      },
    ],
  },
];

export default function CitationsPage() {
  return (
    <PageShell
      title="Citations"
      subtitle="PeerPilot credits the sources, tools, and platforms used to build this FBLA Website Design project."
    >
      <div className="space-y-6">
        {refs.map((group) => (
          <div
            key={group.section}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="text-lg font-semibold text-slate-900">
              {group.section}
            </div>

            <div className="mt-4 grid gap-3">
              {group.items.map((r) => (
                <div
                  key={r.title}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="text-sm font-semibold text-slate-900">
                    {r.title}
                  </div>
                  <div className="mt-1 text-sm text-slate-600">{r.details}</div>
                  <a
                    href={r.url}
                    target={r.url.startsWith("http") ? "_blank" : undefined}
                    className="mt-2 inline-block text-sm font-semibold text-indigo-700 hover:underline"
                  >
                    {r.url.startsWith("http") ? "Open source" : "Open in site"} →
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm font-semibold text-slate-900">
            Copyright / Fair Use Note
          </div>
          <p className="mt-2 text-sm text-slate-600">
            PeerPilot links to or embeds educational resources from their official
            hosts (e.g., Khan Academy/YouTube). PeerPilot does not re-upload or
            claim ownership of third-party videos. Any strategy guidance is
            written in PeerPilot’s own words with references credited above.
          </p>
        </div>
      </div>
    </PageShell>
  );
}