// import { useState, useCallback } from "react";

// export const useTableFilters = ({ enabled, server, onChange, setPage }) => {
//   const [columnFilters, setColumnFilters] = useState([]);
//   console.log("columnFilters:",columnFilters);

//   const handleFilterChange = useCallback(
//     (updater) => {
//       console.log(updater);

//       setColumnFilters((prev) => {
//         const next = typeof updater === "function" ? updater(prev) : updater;

//         if (enabled && server && onChange) {
//           const apiFilters = next.reduce((acc, f) => {
//             acc[f.id] = f.value;
//             return acc;
//           }, {});

//           console.log("apiFilters:", apiFilters);

//           onChange(apiFilters);
//           setPage?.(1);
//         }

//         return next;
//       });
//     },
//     [enabled, server, onChange, setPage],
//   );

//   const resetFilters = useCallback(() => {
//     setColumnFilters([]);
//     server && onChange?.({});
//     setPage?.(1);
//   }, [server, onChange, setPage]);

//   return {
//     columnFilters,
//     handleFilterChange,
//     resetFilters,
//   };
// };

import { useState, useCallback } from "react";
export const useTableFilters = ({ server, onChange, setPage }) => {
  const [columnFilters, setColumnFilters] = useState([]);
  console.log("columnFilters: ", columnFilters);

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
