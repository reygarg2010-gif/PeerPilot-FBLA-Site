"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import PeerPilotLogo from "@/components/PeerPilotLogo";
import { clearAttempts } from "@/lib/quizScoreStore";
import { clearRsvps } from "@/lib/rsvpStore";
import { clearSavedResources } from "@/lib/savedResourcesStore";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const primaryNav = [
  { href: "/resources", label: "Resources" },
  { href: "/tutors", label: "Tutors" },
  { href: "/schedule", label: "Schedule" },
  { href: "/dashboard", label: "Dashboard" },
];

const moreNav = [
  { href: "/about", label: "About" },
  { href: "/help", label: "Help" },
  { href: "/metrics", label: "Metrics" },
  { href: "/citations", label: "Citations" },
];

function isActive(pathname: string, href: string) {
  return pathname === href || (href !== "/" && pathname.startsWith(href));
}

export default function SiteNav() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  function resetDemo() {
    clearAttempts();
    clearRsvps();
    clearSavedResources();
    window.location.href = "/";
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!menuRef.current) return;
      const target = e.target as Node;
      if (!menuRef.current.contains(target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo + Brand */}
        <Link href="/" className="flex items-center gap-3">
          <PeerPilotLogo className="h-8 w-8 text-indigo-600" />
          <div className="leading-tight">
            <div className="text-base font-semibold text-indigo-900">
              PeerPilot
            </div>
            <div className="text-[11px] font-medium text-slate-500">
              Math • FBLA
            </div>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-2 md:flex">
          {primaryNav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "rounded-xl px-3 py-2 text-sm font-semibold transition",
                  active
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}

          {/* More dropdown */}
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className={[
                "rounded-xl px-3 py-2 text-sm font-semibold transition",
                open
                  ? "bg-slate-50 text-slate-900"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
              ].join(" ")}
              aria-haspopup="menu"
              aria-expanded={open}
            >
              More
            </button>

            {open ? (
              <div
                role="menu"
                className="absolute right-0 mt-2 w-52 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg"
              >
                <div className="p-2">
                  {moreNav.map((item) => {
                    const active = isActive(pathname, item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        role="menuitem"
                        className={[
                          "block rounded-xl px-3 py-2 text-sm font-semibold transition",
                          active
                            ? "bg-indigo-50 text-indigo-700"
                            : "text-slate-700 hover:bg-slate-50",
                        ].join(" ")}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-2">
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

         {/* Reset Demo (quieter utility) */}
<button
  onClick={resetDemo}
  className="pp-button hidden md:inline-flex h-9 items-center justify-center rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
  title="Clears demo data on this browser"
>
  Reset Demo
</button>
        </div>
      </div>

      {/* Mobile nav: keep it simple */}
      <div className="border-t border-slate-200 bg-white md:hidden">
        <div className="mx-auto flex max-w-6xl items-center gap-2 overflow-x-auto px-4 py-2">
          {[...primaryNav, ...moreNav].map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "whitespace-nowrap rounded-xl px-3 py-2 text-sm font-semibold transition",
                  active
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}

          <button
            onClick={resetDemo}
            className="pp-button ml-auto whitespace-nowrap rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            title="Clears demo data on this browser"
          >
            Reset
          </button>
        </div>
      </div>
    </header>
  );
}