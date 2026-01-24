import { useEffect, useRef } from "react";

export function usePersistedTableState({ key, state, setState }) {
  const hydratedRef = useRef(false);

  // Restore once on mount
  useEffect(() => {
    if (hydratedRef.current) return;

    const raw = localStorage.getItem(key);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setState(parsed);
      } catch (e) {
        console.error("Failed to parse table state", e);
      }
    }

    hydratedRef.current = true;
  }, [key, setState]);

  // Persist on change (after hydration)
  useEffect(() => {
    if (!hydratedRef.current) return;

    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
}
