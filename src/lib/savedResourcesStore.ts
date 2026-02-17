const KEY = "peerpilot_saved_resources_v1";

export function getSavedResourceIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function setSavedResourceIds(ids: string[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(ids));
}

export function toggleSavedResource(id: string): string[] {
  const current = getSavedResourceIds();
  const exists = current.includes(id);
  const next = exists
    ? current.filter((x) => x !== id)
    : [...current, id];

  setSavedResourceIds(next);
  return next;
}

/* ✅ ADD THIS */
export function clearSavedResources() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}
