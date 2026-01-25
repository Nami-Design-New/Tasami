import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useEffect, useMemo, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import TableOptions from "./TableOptions";
import { Placeholder } from "react-bootstrap";
import TableColumnFilterPopover from "./TableColumnFilterPopover";

// ---------------------------------------------------------------------
// DRAG HANDLE
// ---------------------------------------------------------------------
const RowDragHandleCell = ({ rowId }) => {
  const { attributes, listeners } = useSortable({ id: rowId });

  return (
    <button {...attributes} {...listeners}>
      <i className="fa-regular fa-bars"></i>
    </button>
  );
};

// ---------------------------------------------------------------------
// DRAGGABLE ROW
// ---------------------------------------------------------------------
function DraggableRow({ row }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
    zIndex: isDragging ? 2 : 1,
    position: "relative",
  };

  return (
    <tr ref={setNodeRef} style={style}>
      {row.getVisibleCells().map((cell) => (
        <td key={cell.id} width={cell.column.getSize()}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  );
}

// ---------------------------------------------------------------------
// MAIN COMPONENT WITH SERVER-SIDE SORTING
// ---------------------------------------------------------------------
const ReusableDataTable = ({
  title = "Table",
  search = true,
  header = true,
  data = [],
  columns = [],
  currentPage = 1,
  lastPage = 1,
  setPage,
  pageSize = 10,
  setPageSize,
  filterOptions = {},
  searchPlaceholder = "Search",
  lang = "en",
  rowDnD = false,
  children,
  isLoading = false,
  onRowsReordered,
  // Server-side search
  searchQuery = "",
  onSearchChange,
  searchDebounceMs = 500,
  // NEW: Server-side sorting
  sortBy = null,
  sortOrder = null, // 'asc' | 'desc' | null
  onSortChange,
  enableServerSideSorting = false,
  // NEW: Server-side filtering
  onFilterChange,
  enableServerSideFiltering = false,
}) => {
  const { t } = useTranslation();

  // -----------------------------
  // SEARCH - Server Side
  // -----------------------------
  const [localSearchValue, setLocalSearchValue] = useState(searchQuery);
  const [debounceTimer, setDebounceTimer] = useState(null);

  useEffect(() => {
    setLocalSearchValue(searchQuery);
  }, [searchQuery]);

  const handleSearchChange = useCallback(
    (value) => {
      setLocalSearchValue(value);

      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }

      const timer = setTimeout(() => {
        if (onSearchChange) {
          onSearchChange(value);
          if (setPage) {
            setPage(1);
          }
        }
      }, searchDebounceMs);

      setDebounceTimer(timer);
    },
    [debounceTimer, onSearchChange, setPage, searchDebounceMs],
  );

  useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [debounceTimer]);

  // -----------------------------
  // FILTERS - Server Side or Client Side
  // -----------------------------
  const [columnFilters, setColumnFilters] = useState([]);

  const handleFilterChange = useCallback(
    (updater) => {
      console.log(updater);

      setColumnFilters((prev) => {
        const nextFilters =
          typeof updater === "function" ? updater(prev) : updater;
        console.log(nextFilters);

        if (enableServerSideFiltering && onFilterChange) {
          const filtersObj = nextFilters.reduce((acc, f) => {
            acc[f.id] = f.value;
            return acc;
          }, {});

          console.log("🔵 SERVER FILTER OBJECT:", filtersObj);

          onFilterChange(filtersObj);
          setPage(1);
        }

        return nextFilters;
      });
    },
    [enableServerSideFiltering, onFilterChange, setPage],
  );

  const columnIds = useMemo(() => columns.map((c) => c.header), [columns]);

  const [columnVisibility, setColumnVisibility] = useState(
    Object.fromEntries(columnIds.map((id) => [id, true])),
  );
  const handleResetFilters = useCallback(() => {
    console.log("RESET FILTERS CLICKED");

    setColumnFilters([]);
    console.log(enableServerSideFiltering);

    if (enableServerSideFiltering) {
      onFilterChange({});
    }

    if (setPage) {
      setPage(1);
    }
  }, [enableServerSideFiltering, onFilterChange, setPage]);

  // -----------------------------
  // SORTING - Server Side or Client Side
  // -----------------------------
  const [localSorting, setLocalSorting] = useState([]);

  const handleSortingChange = useCallback(
    (columnId) => {
      if (enableServerSideSorting && onSortChange) {
        // Server-side sorting
        let newSortOrder = null;

        if (sortBy === columnId) {
          if (sortOrder === "asc") {
            newSortOrder = "desc";
          } else if (sortOrder === "desc") {
            newSortOrder = null;
          }
        } else {
          newSortOrder = "asc";
        }

        onSortChange(newSortOrder ? columnId : null, newSortOrder);

        if (setPage) {
          setPage(1);
        }
      } else {
        // Client-side sorting (TanStack default)
        setLocalSorting((prev) => {
          const existing = prev.find((s) => s.id === columnId);

          if (!existing) {
            return [{ id: columnId, desc: false }];
          }

          if (!existing.desc) {
            return [{ id: columnId, desc: true }];
          }

          return [];
        });
      }
    },
    [enableServerSideSorting, onSortChange, sortBy, sortOrder, setPage],
  );

  // -----------------------------
  // DND DATA
  // -----------------------------
  const [dragData, setDragData] = useState(data);

  useEffect(() => {
    setDragData(data);
  }, [data]);

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) {
      return;
    }

    setDragData((items) => {
      const oldIndex = items.findIndex(
        (i) => String(i.id) === String(active.id),
      );
      const newIndex = items.findIndex((i) => String(i.id) === String(over.id));

      if (oldIndex === -1 || newIndex === -1) {
        return items;
      }

      const newOrder = arrayMove(items, oldIndex, newIndex);

      if (onRowsReordered) {
        onRowsReordered(newOrder);
      }

      return newOrder;
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor),
  );

  // -----------------------------
  // TABLE INIT
  // -----------------------------
  const table = useReactTable({
    data: rowDnD ? dragData : data,
    columns: rowDnD
      ? [
          {
            id: "drag-handle",
            header: t("dashboard.table.drag"),
            cell: ({ row }) => <RowDragHandleCell rowId={row.id} />,
            size: 20,
          },
          ...columns,
        ]
      : columns,

    state: {
      columnFilters,
      columnVisibility,
      sorting: enableServerSideSorting
        ? sortBy && sortOrder
          ? [{ id: sortBy, desc: sortOrder === "desc" }]
          : []
        : localSorting,
      pagination: { pageIndex: currentPage - 1, pageSize },
    },

    manualPagination: true,
    manualFiltering: enableServerSideFiltering,
    manualSorting: enableServerSideSorting,
    pageCount: lastPage,

    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => String(row.id),
    getPaginationRowModel: getPaginationRowModel(),

    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setLocalSorting,

    onPaginationChange: ({ pageIndex, pageSize }) => {
      setPage(pageIndex + 1);
      setPageSize(pageSize);
    },
  });

  const dataIds = useMemo(() => {
    return dragData.map((item) => String(item.id));
  }, [dragData]);

  const hasData = table.getRowModel().rows.length > 0;

  // Get sort indicator for column
  const getSortIndicator = (column) => {
    if (enableServerSideSorting) {
      if (sortBy === column.id) {
        return sortOrder === "asc" ? "↑" : "↓";
      }
      return null;
    } else {
      const sortState = localSorting.find((s) => s.id === column.id);
      if (sortState) {
        return sortState.desc ? "↓" : "↑";
      }
      return null;
    }
  };

  // -----------------------------
  // RENDER
  // -----------------------------

  return (
    <div className="card__custom">
      {header && (
        <div className="header d-flex justify-content-between">
          <h3 className="header__title">{t(title)}</h3>
          <TableOptions
            table={table}
            setColumnVisibility={setColumnVisibility}
            globalFilter={localSearchValue}
            setGlobalFilter={handleSearchChange}
            searchPlaceholder={t(searchPlaceholder)}
            search={search}
          />
        </div>
      )}

      <div className="card__body">
        <div className="table-container table-responsive border">
          <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            sensors={sensors}
            onDragEnd={handleDragEnd}
          >
            <table className="custom-table table table-bordered text-center align-middle mb-0">
              <thead className="table-light">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <th key={header.id} width={header.getSize()}>
                          <div className="d-flex align-items-center justify-content-center gap-2">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}

                            {header.column.columnDef.enableSorting && (
                              <button
                                className="btn btn-sm btn-link p-0"
                                onClick={() =>
                                  handleSortingChange(header.column.id)
                                }
                                disabled={isLoading}
                              >
                                <i className="fa-solid fa-sort"></i>
                                {getSortIndicator(header.column)}
                              </button>
                            )}
                            {header.column.columnDef.enableFiltering && (
                              <TableColumnFilterPopover
                                columnId={header.column.id}
                                value={
                                  columnFilters.find(
                                    (f) => f.id === header.column.id,
                                  )?.value
                                }
                                onChange={handleFilterChange}
                                filterConfig={filterOptions[header.column.id]}
                              />
                            )}
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                ))}
              </thead>

              <tbody>
                {isLoading ? (
                  Array.from({ length: pageSize }).map((_, idx) => (
                    <tr key={idx}>
                      {rowDnD && (
                        <td>
                          <Placeholder animation="glow">
                            <Placeholder xs={2} />
                          </Placeholder>
                        </td>
                      )}
                      {columns.map((_, c) => (
                        <td key={c}>
                          <Placeholder animation="glow">
                            <Placeholder xs={12} />
                          </Placeholder>
                        </td>
                      ))}
                    </tr>
                  ))
                ) : !hasData ? (
                  <tr>
                    <td
                      colSpan={rowDnD ? columns.length + 1 : columns.length}
                      className="text-center py-5 text-muted"
                    >
                      <i className="fa-regular fa-folder-open fs-2 mb-2 d-block"></i>
                      {t("noData")}
                    </td>
                  </tr>
                ) : rowDnD ? (
                  <SortableContext
                    items={dataIds}
                    strategy={verticalListSortingStrategy}
                  >
                    {table.getRowModel().rows.map((row) => (
                      <DraggableRow key={row.id} row={row} />
                    ))}
                  </SortableContext>
                ) : (
                  table.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </DndContext>
        </div>
      </div>

      <div className="card--footer">{children}</div>
    </div>
  );
};

export default ReusableDataTable;
