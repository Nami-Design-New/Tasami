import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useState } from "react";
import TableFilter from "./dash-board/home/TableFilter";
import TablePagentaion from "./TablePagentaion";

const ReusableDataTable = ({
  title = "Table",
  filter = true,
  search = true,
  header = true,
  data = [],
  columns = [],
  filterOptions = {},
  activeFilters = [],
  initialPageSize = 5,
  searchPlaceholder = "Search",
  lang = "en",
}) => {
  const isRTL = lang === "ar";

  const [globalFilter, setGlobalFilter] = useState("");
  
  const [columnFilters, setColumnFilters] = useState([]);

  const customGlobalFilterFn = (row, columnId, filterValue) => {
    const { ...rest } = row.original;
    return Object.values(rest).some((val) =>
      String(val).toLowerCase().includes(filterValue.toLowerCase())
    );
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      columnFilters,
    },
    globalFilterFn: customGlobalFilterFn,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    columnResizeMode: "onChange",
    initialState: {
      pagination: {
        pageSize: initialPageSize,
      },
    },
  });

  return (
    <div className="card__custom">
      {header && (
        <div className="header d-flex justify-content-between">
          <h3 className="header__title">{title}</h3>
          <TableFilter
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
            activeFilters={activeFilters}
            filterOptions={filterOptions}
            filterButtonText={isRTL ? "فرز" : "Filter"}
            searchPlaceholder={searchPlaceholder}
            filter={filter}
            search={search}
          />
        </div>
      )}
      <div className="card__body">
        <div className="table-container table-responsive border">
          <table
            width={table.getTotalSize()}
            className="custom-table table table-bordered text-center align-middle mb-0"
          >
            <thead className="table-light">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} width={header.getSize()}>
                      {header.column.columnDef.header}
                      {header.column.getCanSort() && (
                        <i
                          className="fa-solid fa-arrow-up-short-wide"
                          onClick={header.column.getToggleSortingHandler()}
                        ></i>
                      )}
                      {
                        {
                          asc: "تصاعديا",
                          desc: "تنازليا",
                        }[header.column.getIsSorted()]
                      }
                      {/* <div
                        className={`resizer ${
                          header.column.getIsResizing() ? "isResizing" : ""
                        } ${isRTL ? "ar" : "en"}`}
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                      ></div> */}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="card--footer">
        <TablePagentaion table={table} />
      </div>
    </div>
  );
};

export default ReusableDataTable;
