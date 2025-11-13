import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
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
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import TableFilter from "./TableFilter";

// -----------------------------
// DnD Row Handle Component
// -----------------------------
const RowDragHandleCell = ({ rowId }) => {
  const { attributes, listeners } = useSortable({ id: String(rowId) });
  return (
    <button {...attributes} {...listeners}>
      <i className="fa-regular fa-bars"> </i>
    </button>
  );
};

// -----------------------------
// Draggable Row Component
// -----------------------------
function DraggableRow({ row }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: String(row.original.id),
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1 : 0,
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

// -----------------------------
// ReusableDataTable Component
// -----------------------------
const ReusableDataTable = ({
  title = "Table",
  filter = true,
  search = true,
  header = true,
  data = [],
  columns = [],
  currentPage = 1, // server page index (1-based)
  lastPage = 1, // total pages from server
  setPage, // function to update page in parent
  pageSize = 10, // current page size
  setPageSize, // function to update pageSize in parent
  filterOptions = {},
  activeFilters = [],
  searchPlaceholder = "Search",
  lang = "en",
  rowDnD = false,
  children,
}) => {
  const { t } = useTranslation();

  // -----------------------------
  // Table Filters
  // -----------------------------
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState([]);
  const columnIds = useMemo(() => columns.map((c) => c.header), [columns]);
  const columnInitialVisibility = useMemo(() => {
    return columnIds.reduce((acc, id) => {
      acc[id] = true;
      return acc;
    }, {});
  }, [columnIds]);
  const [columnVisibility, setColumnVisibility] = useState(
    columnInitialVisibility
  );

  const customGlobalFilterFn = (row, columnId, filterValue) => {
    const { ...rest } = row.original;
    return Object.values(rest).some((val) =>
      String(val).toLowerCase().includes(filterValue.toLowerCase())
    );
  };

  // -----------------------------
  // DnD setup
  // -----------------------------
  const [dragData, setDragData] = useState(data);
  const dataIds = useMemo(() => dragData?.map(({ id }) => id), [dragData]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setDragData((items) => {
      const oldIndex = items.findIndex(
        (item) => String(item.id) === String(active.id)
      );
      const newIndex = items.findIndex(
        (item) => String(item.id) === String(over.id)
      );
      if (oldIndex === -1 || newIndex === -1) return items;
      return arrayMove(items, oldIndex, newIndex);
    });
  };

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );

  // -----------------------------
  // Initialize TanStack Table
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
      pagination: {
        pageIndex: currentPage - 1, // 0-indexed
        pageSize: pageSize,
      },
    },
    manualPagination: true, //  server-side pagination
    pageCount: lastPage, //  total pages from API
    globalFilterFn: customGlobalFilterFn,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => String(row.id),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    columnResizeMode: "onChange",
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: ({ pageIndex, pageSize }) => {
      setPage(pageIndex + 1); // update parent state to trigger API fetch
      setPageSize(pageSize); // update pageSize if changed
    },
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: pageSize,
      },
    },
  });

  const sortLabels = {
    asc: t("dashboard.table.sortAsc"),
    desc: t("dashboard.table.sortDesc"),
  };

  // -----------------------------
  // Render Table
  // -----------------------------
  return (
    <div className="card__custom">
      {/* Header + Filter */}
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
            filterButtonText={t("dashboard.table.filter")}
            searchPlaceholder={t(searchPlaceholder)}
            filter={filter}
            search={search}
          />
        </div>
      )}

      {/* Table Body */}
      <div className="card__body">
        <div className="table-container table-responsive border">
          <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
          >
            <table
              width={table.getTotalSize()}
              className="custom-table table table-bordered text-center align-middle mb-0"
            >
              {/* Table Header */}
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

              {/* Table Body Rows */}
              <tbody>
                {rowDnD ? (
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
                        <td key={cell.id} width={cell.column.getSize()}>
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

      {/* Pagination */}
      <div className="card--footer">
        {children}
        {/* <TablePagentaion
          currentPage={currentPage}
          lastPage={lastPage}
          onPageChange={setPage}
        /> */}
      </div>
    </div>
  );
};

export default ReusableDataTable;
