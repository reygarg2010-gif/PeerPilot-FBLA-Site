"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import PeerPilotLogo from "@/components/PeerPilotLogo";
import { clearAttempts } from "@/lib/quizScoreStore";
import { clearRsvps } from "@/lib/rsvpStore";
import { clearSavedResources } from "@/lib/savedResourcesStore";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const nav = [
  { href: "/about", label: "About" },
  { href: "/resources", label: "Resources" },
  { href: "/tutors", label: "Tutors" },
  { href: "/schedule", label: "Schedule" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/help", label: "Help" }, // ✅ NEW
  { href: "/metrics", label: "Metrics" },
  { href: "/citations", label: "Citations" },
];

export default function SiteNav() {
  const pathname = usePathname();

  function resetDemo() {
    clearAttempts();
    clearRsvps();
    clearSavedResources();
    window.location.href = "/";
  }

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo + Brand */}
        <Link href="/" className="flex items-center gap-3 font-semibold">
          <PeerPilotLogo className="h-8 w-8 text-indigo-600" />
          <span className="text-lg font-semibold text-indigo-900">
            PeerPilot
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "text-sm font-medium transition",
                  active
                    ? "text-indigo-700"
                    : "text-slate-600 hover:text-slate-900",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <div className="hidden text-xs text-slate-500 sm:block">
            Math • FBLA
          </div>

          {/* Auth */}
          <SignedOut>
            <Link
              href="/sign-in"
              className="pp-button inline-flex h-9 items-center justify-center rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
            >
              Log in
            </Link>
            <Link
              href="/sign-up"
              className="pp-button inline-flex h-9 items-center justify-center rounded-xl bg-indigo-600 px-3 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Sign up
            </Link>
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <button
            onClick={resetDemo}
            className="pp-button h-9 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
            title="Clears demo data on this browser"
          >
            Reset Demo
          </button>
        </div>
      </div>
    </header>
  );
}