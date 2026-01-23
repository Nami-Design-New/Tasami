import { useCallback, useState } from "react";

export const useTableSorting = ({
  enabled,
  server,
  sortBy,
  sortOrder,
  onChange,
  setPage,
}) => {
  const [localSorting, setLocalSorting] = useState([]);

  const handleSort = useCallback(
    (columnId) => {
      if (!enabled) return;

      if (server) {
        let nextOrder = "asc";

        if (sortBy === columnId) {
          nextOrder =
            sortOrder === "asc" ? "desc" : sortOrder === "desc" ? null : "asc";
        }

        onChange?.(nextOrder ? columnId : null, nextOrder);
        setPage?.(1);
      } else {
        setLocalSorting((prev) => {
          const existing = prev.find((s) => s.id === columnId);
          if (!existing) return [{ id: columnId, desc: false }];
          if (!existing.desc) return [{ id: columnId, desc: true }];
          return [];
        });
      }
    },
    [enabled, server, sortBy, sortOrder, onChange, setPage],
  );

  return {
    sortingState: server
      ? sortBy && sortOrder
        ? [{ id: sortBy, desc: sortOrder === "desc" }]
        : []
      : localSorting,
    setLocalSorting,
    handleSort,
  };
};
