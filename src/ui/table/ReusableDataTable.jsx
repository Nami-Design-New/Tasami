
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
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useEffect, useMemo, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import TableFilter from "./TableFilter";
import { Placeholder } from "react-bootstrap";

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
// MAIN COMPONENT
// ---------------------------------------------------------------------
const ReusableDataTable = ({
  title = "Table",
  filter = true,
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
  activeFilters = [],
  searchPlaceholder = "Search",
  lang = "en",
  rowDnD = false,
  children,
  isLoading = false,
  onRowsReordered,
  // New props for server-side search
  searchQuery = "",
  onSearchChange,
  searchDebounceMs = 500,
}) => {
  const { t } = useTranslation();

  // -----------------------------
  // SEARCH - Server Side
  // -----------------------------
  const [localSearchValue, setLocalSearchValue] = useState(searchQuery);
  const [debounceTimer, setDebounceTimer] = useState(null);

  // Sync local value when external searchQuery changes
  useEffect(() => {
    setLocalSearchValue(searchQuery);
  }, [searchQuery]);

  // Debounced search handler
  const handleSearchChange = useCallback(
    (value) => {
      setLocalSearchValue(value);

      // Clear existing timer
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }

      // Set new timer
      const timer = setTimeout(() => {
        if (onSearchChange) {
          onSearchChange(value);
          // Reset to page 1 when searching
          if (setPage) {
            setPage(1);
          }
        }
      }, searchDebounceMs);

      setDebounceTimer(timer);
    },
    [debounceTimer, onSearchChange, setPage, searchDebounceMs]
  );

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [debounceTimer]);

  // -----------------------------
  // FILTERS (kept for other filtering needs)
  // -----------------------------
  const [columnFilters, setColumnFilters] = useState([]);
  const columnIds = useMemo(() => columns.map((c) => c.header), [columns]);

  const [columnVisibility, setColumnVisibility] = useState(
    Object.fromEntries(columnIds.map((id) => [id, true]))
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
        (i) => String(i.id) === String(active.id)
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
    useSensor(KeyboardSensor)
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
      pagination: { pageIndex: currentPage - 1, pageSize },
    },

    manualPagination: true,
    manualFiltering: true, // Important: Tell TanStack this is server-side
    pageCount: lastPage,

    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => String(row.id),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    onColumnVisibilityChange: setColumnVisibility,

    onPaginationChange: ({ pageIndex, pageSize }) => {
      setPage(pageIndex + 1);
      setPageSize(pageSize);
    },
  });

  const sortLabels = {
    asc: t("dashboard.table.sortAsc"),
    desc: t("dashboard.table.sortDesc"),
  };

  const dataIds = useMemo(() => {
    return dragData.map((item) => String(item.id));
  }, [dragData]);

  const hasData = table.getRowModel().rows.length > 0;

  // -----------------------------
  // RENDER
  // -----------------------------
  return (
    <div className="card__custom">
      {header && (
        <div className="header d-flex justify-content-between">
          <h3 className="header__title">{t(title)}</h3>
          <TableFilter
            table={table}
            setColumnVisibility={setColumnVisibility}
            globalFilter={localSearchValue}
            setGlobalFilter={handleSearchChange}
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
            activeFilters={activeFilters}
            filterOptions={filterOptions}
            searchPlaceholder={t(searchPlaceholder)}
            filter={filter}
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
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} width={header.getSize()}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}

                        {header.column.getCanSort() && (
                          <i
                            className="fa-solid fa-arrow-up-short-wide"
                            onClick={header.column.getToggleSortingHandler()}
                          ></i>
                        )}

                        {sortLabels[header.column.getIsSorted()] || ""}
                      </th>
                    ))}
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
                            cell.getContext()
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
