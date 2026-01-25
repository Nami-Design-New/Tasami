import { useState, useCallback } from "react";
export const useTableFilters = ({ server, onChange, setPage }) => {
  const [columnFilters, setColumnFilters] = useState([]);

  const applyFilters = useCallback(
    (updater) => {
      setColumnFilters((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater;

        if (server && onChange) {
          const apiFilters = next.reduce((acc, f) => {
            acc[f.id] = f.value;
            return acc;
          }, {});
          onChange(apiFilters);
          setPage?.(1);
        }

        return next;
      });
    },
    [server, onChange, setPage],
  );

  const setColumnFilter = useCallback(
    (id, value) => {
      applyFilters((prev) => {
        const without = prev.filter((f) => f.id !== id);
        return value ? [...without, { id, value }] : without;
      });
    },
    [applyFilters],
  );

  const resetFilters = useCallback(() => {
    applyFilters([]);
  }, [applyFilters]);

  return {
    columnFilters,
    setColumnFilter,
    resetFilters,
  };
};
