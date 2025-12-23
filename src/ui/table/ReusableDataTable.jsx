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
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useEffect, useMemo, useState } from "react";
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
  console.log("Dragable row", row);

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
}) => {
  const { t } = useTranslation();

  // -----------------------------
  // FILTERS
  // -----------------------------
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState([]);
  const columnIds = useMemo(() => columns.map((c) => c.header), [columns]);

  const [columnVisibility, setColumnVisibility] = useState(
    Object.fromEntries(columnIds.map((id) => [id, true]))
  );

  const customGlobalFilterFn = (row, columnId, filterValue) => {
    return Object.values(row.original).some((val) =>
      String(val).toLowerCase().includes(filterValue.toLowerCase())
    );
  };

  // -----------------------------
  // DND DATA - KEY FIX HERE
  // -----------------------------
  const [dragData, setDragData] = useState(data);

  useEffect(() => {
    console.log("data :", data);
    setDragData(data);
  }, [data]);

  const handleDragEnd = ({ active, over }) => {
    console.log(" [DND] Drag End Triggered");
    console.log(" Active:", active?.id);
    console.log(" Over:", over?.id);

    if (!over) {
      console.warn(" [DND] No 'over' target — drag cancelled.");
      return;
    }
    if (active.id === over.id) {
      console.log(" [DND] Active and over IDs match — no movement.");
      return;
    }

    setDragData((items) => {
      console.log(" [DND] Current items:", JSON.parse(JSON.stringify(items)));

      const oldIndex = items.findIndex(
        (i) => String(i.id) === String(active.id)
      );
      const newIndex = items.findIndex((i) => String(i.id) === String(over.id));

      console.log(" oldIndex:", oldIndex, " newIndex:", newIndex);

      if (oldIndex === -1 || newIndex === -1) {
        console.warn(
          " [DND] Could not find active or over index. Aborting reorder."
        );
        return items;
      }

      const newOrder = arrayMove(items, oldIndex, newIndex);

      console.log(" [DND] New order:", JSON.parse(JSON.stringify(newOrder)));

      if (onRowsReordered) {
        console.log(" [DND] Calling onRowsReordered with new order.");
        onRowsReordered(newOrder);
      } else {
        console.log("ℹ [DND] No onRowsReordered function provided.");
      }

      console.log(" [DND] Reorder completed.");
      return newOrder;
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5, // Add slight distance to prevent accidental drags
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
      globalFilter,
      columnFilters,
      columnVisibility,
      pagination: { pageIndex: currentPage - 1, pageSize },
    },

    manualPagination: true,
    pageCount: lastPage,

    globalFilterFn: customGlobalFilterFn,

    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => String(row.id),
    getFilteredRowModel: getFilteredRowModel(),
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

  // KEY FIX: Generate dataIds from current dragData, not from table rows
  const dataIds = useMemo(() => {
    return dragData.map((item) => String(item?.row?.id));
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
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
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
