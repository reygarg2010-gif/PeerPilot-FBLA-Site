const KEY = "peerpilot_rsvps_v1";

export function getRsvps(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Record<string, boolean>) : {};
  } catch {
    return {};
  }
}

export function setRsvps(next: Record<string, boolean>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(next));
}

export function toggleRsvp(sessionId: string): Record<string, boolean> {
  const current = getRsvps();
  const next = { ...current, [sessionId]: !current[sessionId] };

  // if false, remove key to keep it clean
  if (!next[sessionId]) delete next[sessionId];

  setRsvps(next);
  return next;
}

/* ✅ ADD THIS */
export function clearRsvps() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}
