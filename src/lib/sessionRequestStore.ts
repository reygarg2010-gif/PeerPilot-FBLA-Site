export type SessionRequest = {
  id: string;
  createdAtISO: string;

  tutorId: string;
  tutorName: string;

  topic: string;
  goal: string;
  duration: string;

  day: string;
  time: string;

  note?: string;
};

const KEY = "pp_session_requests_v1";

function safeParse(json: string | null): SessionRequest[] {
  if (!json) return [];
  try {
    const parsed = JSON.parse(json);
    if (!Array.isArray(parsed)) return [];
    return parsed as SessionRequest[];
  } catch {
    return [];
  }
}

export function getSessionRequests(): SessionRequest[] {
  if (typeof window === "undefined") return [];
  return safeParse(window.localStorage.getItem(KEY));
}

export function addSessionRequest(req: Omit<SessionRequest, "id" | "createdAtISO">) {
  if (typeof window === "undefined") return getSessionRequests();

  const next: SessionRequest = {
    id: `sr_${Math.random().toString(36).slice(2, 10)}`,
    createdAtISO: new Date().toISOString(),
    ...req,
  };

  const all = getSessionRequests();
  const updated = [next, ...all]; // newest first
  window.localStorage.setItem(KEY, JSON.stringify(updated));
  return updated;
}

export function removeSessionRequest(id: string) {
  if (typeof window === "undefined") return getSessionRequests();
  const all = getSessionRequests();
  const updated = all.filter((r) => r.id !== id);
  window.localStorage.setItem(KEY, JSON.stringify(updated));
  return updated;
}

export function clearSessionRequests() {
  if (typeof window === "undefined") return [];
  window.localStorage.removeItem(KEY);
  return [];
}