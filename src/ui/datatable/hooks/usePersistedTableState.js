// import { useEffect, useRef } from "react";

// export function usePersistedTableState({ key, state, setState }) {
//   const hydratedRef = useRef(false);

//   // Restore once on mount
//   useEffect(() => {
//     if (hydratedRef.current) return;

//     const raw = localStorage.getItem(key);
//     if (raw) {
//       try {
//         const parsed = JSON.parse(raw);
//         setState(parsed);
//       } catch (e) {
//         console.error("Failed to parse table state", e);
//       }
//     }

//     hydratedRef.current = true;
//   }, [key, setState]);

//   // Persist on change (after hydration)
//   useEffect(() => {
//     if (!hydratedRef.current) return;

//     localStorage.setItem(key, JSON.stringify(state));
//   }, [key, state]);
// }
import { useEffect, useRef } from "react";
import { useLocation } from "react-router";

export function usePersistedTableState({ key, state, setState }) {
  const location = useLocation();
  const hydratedRef = useRef(false);

  // Route-scoped key
  const storageKey = `${key}:${location.pathname}`;

  // Restore once on mount (or refresh)
  useEffect(() => {
    if (hydratedRef.current) return;

    const raw = sessionStorage.getItem(storageKey);
    if (raw) {
      try {
        setState(JSON.parse(raw));
      } catch (e) {
        console.error("Failed to parse table state", e);
      }
    }

    hydratedRef.current = true;
  }, [storageKey, setState]);

  // Persist on change
  useEffect(() => {
    if (!hydratedRef.current) return;

    sessionStorage.setItem(storageKey, JSON.stringify(state));
  }, [storageKey, state]);

  //IMPORTANT: cleanup on route change
  useEffect(() => {
    return () => {
      sessionStorage.removeItem(storageKey);
    };
  }, [storageKey]);
}
