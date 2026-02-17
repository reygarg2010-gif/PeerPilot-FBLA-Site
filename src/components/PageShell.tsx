export default function PageShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="min-h-[calc(100vh-120px)] bg-slate-50">
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-3xl font-semibold tracking-tight text-indigo-900">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-2 text-base leading-relaxed text-slate-600">
              {subtitle}
            </p>
          ) : null}

          <div className="mt-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
