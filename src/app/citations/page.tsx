import PageShell from "@/components/PageShell";

type Citation = {
  id: string;
  title: string;
  publisher: string;
  url: string;
  purpose: string;
  accessed: string; // e.g., "2026-02-16"
};

const citations: Citation[] = [
  {
    id: "C1",
    title: "Khan Academy — Math",
    publisher: "Khan Academy",
    url: "https://www.khanacademy.org/math",
    purpose: "External learning resources linked from the Resources page (topic-aligned practice).",
    accessed: "2026-02-16",
  },
  {
    id: "C2",
    title: "Desmos Graphing Calculator",
    publisher: "Desmos Studio",
    url: "https://www.desmos.com/calculator",
    purpose: "Optional external tool linked for graphing/visual understanding.",
    accessed: "2026-02-16",
  },
  {
    id: "C3",
    title: "Next.js Documentation",
    publisher: "Vercel",
    url: "https://nextjs.org/docs",
    purpose: "Framework reference for routing, layouts, and deployment best practices.",
    accessed: "2026-02-16",
  },
  {
    id: "C4",
    title: "Tailwind CSS Documentation",
    publisher: "Tailwind Labs",
    url: "https://tailwindcss.com/docs",
    purpose: "Design system + styling reference for consistent UI components.",
    accessed: "2026-02-16",
  },
];

export const metadata = {
  title: "Citations | PeerPilot",
  description:
    "Sources used in the PeerPilot website and linked educational resources.",
};

export default function CitationsPage() {
  return (
    <PageShell
      title="Citations"
      subtitle="Sources and external tools referenced by PeerPilot. All links are educational and topic-aligned."
    >
      {/* Academic statement */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">
          Academic Integrity Statement
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          PeerPilot uses external resources strictly for educational support. When the
          platform links to third-party learning tools (ex: videos, lessons, calculators),
          links are chosen to match the topic and intended skill. This page documents those
          sources and the purpose of each.
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <InfoChip label="Citation Style" value="Structured web citations" />
          <InfoChip label="Scope" value="External links + technical references" />
          <InfoChip label="Note" value="Demo data is locally generated" />
        </div>
      </section>

      {/* Citations table */}
      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Source List</h2>
            <p className="mt-1 text-sm text-slate-600">
              Click any link to open the source in a new tab.
            </p>
          </div>
          <div className="text-xs text-slate-500">{citations.length} sources</div>
        </div>

        <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
          <div className="grid grid-cols-12 bg-slate-50 px-4 py-3 text-xs font-semibold text-slate-700">
            <div className="col-span-2">ID</div>
            <div className="col-span-4">Title</div>
            <div className="col-span-2">Publisher</div>
            <div className="col-span-3">Purpose</div>
            <div className="col-span-1 text-right">Accessed</div>
          </div>

          {citations.map((c, idx) => (
            <div
              key={c.id}
              className={[
                "grid grid-cols-12 gap-2 px-4 py-4 text-sm",
                idx !== citations.length - 1 ? "border-b border-slate-200" : "",
              ].join(" ")}
            >
              <div className="col-span-2 font-semibold text-slate-900">{c.id}</div>

              <div className="col-span-4">
                <a
                  href={c.url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-indigo-700 hover:underline"
                >
                  {c.title}
                </a>
                <div className="mt-1 text-xs text-slate-500 break-all">{c.url}</div>
              </div>

              <div className="col-span-2 text-slate-700">{c.publisher}</div>

              <div className="col-span-3 text-slate-600">{c.purpose}</div>

              <div className="col-span-1 text-right text-slate-600">
                {c.accessed}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
          Tip: If judges click links, make sure they match the topic label shown in the
          Resources page (Algebra/Geometry/Trig/etc.).
        </div>
      </section>

      {/* Attribution / assets */}
      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Assets & Branding</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-600">
          <li>• PeerPilot logo is original (custom SVG component).</li>
          <li>• No copyrighted images are embedded in the demo interface.</li>
          <li>• UI components are coded in-house using Tailwind CSS utilities.</li>
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
