import type { ReactNode } from "react";

export default function PageShell({
  title,
  subtitle,
  children,
  actions,
}: {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div className="min-h-[calc(100vh-120px)] bg-slate-50">
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        {/* Header (keeps pages from feeling like a giant text box) */}
        <div className="mb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-indigo-900">
                {title}
              </h1>

              {subtitle ? (
                <p className="mt-2 max-w-3xl text-base leading-relaxed text-slate-600">
                  {subtitle}
                </p>
              ) : null}
            </div>

            {actions ? <div className="shrink-0">{actions}</div> : null}
          </div>
        </div>

        {/* Content */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="p-6 sm:p-8">
            {/* Consistent content spacing */}
            <div className="space-y-8">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}