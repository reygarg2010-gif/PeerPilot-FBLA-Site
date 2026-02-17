import PageShell from "@/components/PageShell";

export const metadata = {
  title: "About | PeerPilot",
  description:
    "Project overview, planning, development process, and implementation details for the PeerPilot FBLA Website Design entry.",
};

export default function AboutPage() {
  return (
    <PageShell
      title="About PeerPilot"
      subtitle="A math learning platform built for FBLA Website Design — with planning, development, and implementation documented clearly."
    >
      {/* Overview */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Project Overview</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          PeerPilot is a student-first math learning platform designed to help students
          find resources quickly, practice with short quizzes, RSVP to support sessions,
          and track progress with dashboard metrics. The website is built to demonstrate
          real product thinking: clear navigation, interactive tools, and measurable outcomes.
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <InfoChip label="Core Focus" value="Math support + progress tracking" />
          <InfoChip label="Target Users" value="High school students + tutors" />
          <InfoChip label="Mode" value="Demo mode (local data) + scalable later" />
        </div>
      </section>

      {/* Goals + Requirements */}
      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Goals</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-600">
          <li>• Make math resources easy to discover with search + filters.</li>
          <li>• Provide interactive practice via quizzes with instant feedback.</li>
          <li>• Support students with a schedule and RSVP workflow.</li>
          <li>• Track learning and engagement using dashboard + metrics.</li>
          <li>• Maintain a clean, consistent, accessible design across devices.</li>
        </ul>

        <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="text-sm font-semibold text-slate-900">Key Site Areas</div>
          <div className="mt-2 grid gap-2 sm:grid-cols-2 text-sm text-slate-600">
            <div>• Home (overview + CTAs + snapshot)</div>
            <div>• Resources (search, filters, save)</div>
            <div>• Quiz Engine (interactive assessment)</div>
            <div>• Schedule (RSVP workflow)</div>
            <div>• Dashboard (personal progress)</div>
            <div>• Metrics (engagement analytics)</div>
            <div>• Citations (sources + attribution)</div>
          </div>
        </div>
      </section>

      {/* Planning */}
      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Planning</h2>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="text-sm font-semibold text-slate-900">User Personas</div>
            <ul className="mt-2 space-y-2 text-sm text-slate-600">
              <li>
                <span className="font-semibold text-slate-900">Student:</span> needs quick
                help for a topic, wants practice and feedback, and wants to track progress.
              </li>
              <li>
                <span className="font-semibold text-slate-900">Tutor/Teacher:</span> wants
                to offer sessions, guide practice, and see engagement at a glance.
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="text-sm font-semibold text-slate-900">Information Architecture</div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Navigation is kept consistent across pages. The main flow is:
              <span className="font-semibold text-slate-900">
                {" "}
                Resources → Quiz → Dashboard → Metrics
              </span>
              . Schedule supports tutoring with RSVP actions that also appear in Dashboard.
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5">
          <div className="text-sm font-semibold text-slate-900">Design System</div>
          <ul className="mt-2 space-y-2 text-sm text-slate-600">
            <li>• Color palette: white + indigo accents (academic / College Board vibe).</li>
            <li>• Components: consistent cards, buttons, spacing, and typography.</li>
            <li>• Accessibility: readable contrast, clear labels, responsive layout.</li>
          </ul>
        </div>
      </section>

      {/* Development */}
      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Development</h2>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="text-sm font-semibold text-slate-900">Tech Stack</div>
            <ul className="mt-2 space-y-2 text-sm text-slate-600">
              <li>• Next.js + React (component-based UI)</li>
              <li>• TypeScript (safer, clearer code)</li>
              <li>• Tailwind CSS (fast, consistent styling)</li>
              <li>• LocalStorage demo stores (RSVPs, saved resources, quiz attempts)</li>
              <li>• Deployable to Vercel</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="text-sm font-semibold text-slate-900">Interactive Features</div>
            <ul className="mt-2 space-y-2 text-sm text-slate-600">
              <li>• Resource saving (Saved section updates live)</li>
              <li>• RSVP scheduling (RSVPs appear in Dashboard)</li>
              <li>• Quiz engine (scores saved + shown in Dashboard/Metrics)</li>
              <li>• Metrics chart (visual progress over last attempts)</li>
              <li>• Demo reset controls (for clean judging demos)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Testing + Quality */}
      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Testing & Quality</h2>

        <div className="mt-3 grid gap-4 lg:grid-cols-2">
          <Checklist
            title="Functionality Checks"
            items={[
              "All navigation links work (no 404s)",
              "RSVP toggles update Schedule + Dashboard",
              "Quiz submissions save attempts and update Dashboard + Metrics",
              "Resources filters + saved items work",
              "Demo reset clears stored data correctly",
            ]}
          />
          <Checklist
            title="UX + Compatibility Checks"
            items={[
              "Responsive on desktop, tablet, and mobile",
              "Readable contrast and consistent typography",
              "Clear calls-to-action and simple user flow",
              "Fast page loads and clean layout spacing",
              "Consistent UI components across pages",
            ]}
          />
        </div>
      </section>

      {/* Future Improvements */}
      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Future Improvements</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-600">
          <li>• Accounts + authentication (student profiles)</li>
          <li>• Real database (store quiz history, saved resources, and schedules)</li>
          <li>• Tutor/admin dashboard for managing sessions and assignments</li>
          <li>• Personalized recommendations based on quiz results</li>
        </ul>
      </section>
    </PageShell>
  );
}

function InfoChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="text-xs font-medium text-slate-600">{label}</div>
      <div className="mt-1 text-sm font-semibold text-slate-900">{value}</div>
    </div>
  );
}

function Checklist({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="text-sm font-semibold text-slate-900">{title}</div>
      <ul className="mt-3 space-y-2 text-sm text-slate-600">
        {items.map((x) => (
          <li key={x} className="flex gap-2">
            <span className="mt-0.5 inline-block h-4 w-4 rounded bg-indigo-600/15 text-center text-[10px] font-bold text-indigo-700">
              ✓
            </span>
            <span>{x}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
