import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import TableFilter from "./TableFilter";

const columnHelper = createColumnHelper();

const PremiumClientsTable = () => {
  const lang = useSelector((state) => state.language.lang);
  const isRTL = lang === "ar";
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const data = useMemo(
    () => [
      {
        id: 1,
        name: "أحمد الجهني",
        avatar: "https://i.pravatar.cc/100?img=3",
        accountType: "ملهم",
        status: "نشط",
        expiredContracts: 3,
      },
      {
        id: 2,
        name: "Sarah Johnson",
        avatar: "https://i.pravatar.cc/100?img=4",
        accountType: "ماهر",
        status: "موقوف",
        expiredContracts: 1,
      },
      {
        id: 3,
        name: "خالد السبيعي",
        avatar: "https://i.pravatar.cc/100?img=5",
        accountType: "جدير",
        status: "نشط",
        expiredContracts: 0,
      },
      {
        id: 4,
        name: "فاطمة العتيبي",
        avatar: "https://i.pravatar.cc/100?img=6",
        accountType: "ملهم",
        status: "نشط",
        expiredContracts: 5,
      },
      {
        id: 5,
        name: "John Smith",
        avatar: "https://i.pravatar.cc/100?img=7",
        accountType: "جدير",
        status: "موقوف",
        expiredContracts: 2,
      },
      {
        id: 6,
        name: "نورة الشمري",
        avatar: "https://i.pravatar.cc/100?img=8",
        accountType: "ماهر",
        status: "نشط",
        expiredContracts: 4,
      },
      {
        id: 7,
        name: "محمد القحطاني",
        avatar: "https://i.pravatar.cc/100?img=9",
        accountType: "ملهم",
        status: "نشط",
        expiredContracts: 6,
      },
      {
        id: 8,
        name: "Emily Davis",
        avatar: "https://i.pravatar.cc/100?img=10",
        accountType: "جدير",
        status: "موقوف",
        expiredContracts: 1,
      },
      {
        id: 9,
        name: "سلطان العنزي",
        avatar: "https://i.pravatar.cc/100?img=11",
        accountType: "ماهر",
        status: "نشط",
        expiredContracts: 3,
      },
      {
        id: 10,
        name: "عبدالله المالكي",
        avatar: "https://i.pravatar.cc/100?img=12",
        accountType: "ملهم",
        status: "نشط",
        expiredContracts: 2,
      },
      {
        id: 11,
        name: "Lisa Wilson",
        avatar: "https://i.pravatar.cc/100?img=13",
        accountType: "جدير",
        status: "موقوف",
        expiredContracts: 0,
      },
      {
        id: 12,
        name: "هند الدوسري",
        avatar: "https://i.pravatar.cc/100?img=14",
        accountType: "ماهر",
        status: "نشط",
        expiredContracts: 4,
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: isRTL ? "المستخدم" : "User",
        cell: (info) => {
          return (
            <div className="d-flex align-items-center gap-2">
              <img
                src={info.row.original.avatar}
                alt={info.getValue()}
                className="rounded-circle"
                width="32"
                height="32"
              />
              <span>{info.getValue()}</span>
            </div>
          );
        },
        enableSorting: false,
      }),
      columnHelper.accessor("accountType", {
        header: isRTL ? "نوع الحساب" : "Account Type",
        cell: (info) => info.getValue(),
        enableSorting: false,
      }),
      columnHelper.accessor("status", {
        header: isRTL ? "حالة الحساب" : "Status",
        cell: (info) => (
          <span
            className={
              info.getValue() === "نشط"
                ? "text-success fw-bold"
                : "text-danger fw-bold"
            }
          >
            {info.getValue()}
          </span>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("expiredContracts", {
        header: isRTL ? "العقود المكتملة" : "Expired Contracts",
        cell: (info) => info.getValue(),
      }),
    ],
    [isRTL]
  );

  const customGlobalFilterFn = (row, columnId, filterValue) => {
    const { id, avatar, status, ...rest } = row.original;
    console.log(
      Object.values(rest).some((val) => {
        console.log(val);
        return String(val).toLowerCase().includes(filterValue.toLowerCase());
      })
    );

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
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    //onColumnFiltersChange: setColumnFilters,
    columnResizeMode: "onChange",
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  return (
    <div className="card__custom">
      <div className="header d-flex justify-content-between">
        <h3 className="header__title">
          {isRTL ? "عدد المستخدمين المميزين" : "Premium Clients"}
        </h3>
        <TableFilter
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
        />
      </div>
      <div className="card__body  ">
        <div
          className="table-container table-responsive border "
          dir={isRTL ? "rtl" : "ltr"}
        >
          <table
            width={table.getTotalSize()}
            className="custom-table table table-bordered  text-center align-middle mb-0"
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

                      <div
                        className={`resizer ${
                          header.column.getIsResizing() ? "isResizing" : ""
                        } ${isRTL ? "ar" : "en"} `}
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                      ></div>
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
        <div
          className="pagination-container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div className="pagination-buttons">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="prev"
              style={{
                cursor: !table.getCanPreviousPage() ? "not-allowed" : "pointer",
              }}
            >
              السابق
            </button>

            <div
              className="page-numbers"
              style={{ display: "flex", gap: "5px" }}
            >
              {Array.from({ length: table.getPageCount() }, (_, i) => (
                <button
                  key={i}
                  onClick={() => table.setPageIndex(i)}
                  className={`page-number ${
                    table.getState().pagination.pageIndex === i ? "active" : ""
                  }`}
                  style={{
                    backgroundColor:
                      table.getState().pagination.pageIndex === i
                        ? "#214b92"
                        : "transparent",
                    color:
                      table.getState().pagination.pageIndex === i
                        ? "#fff"
                        : "#214b92",

                
                    fontWeight:
                      table.getState().pagination.pageIndex === i
                        ? "bold"
                        : "normal",
                  }}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="next"
              style={{
                padding: "5px 12px",
                borderRadius: "4px",
                border: "1px solid var(--main-color)",
                backgroundColor: "transparent",
                cursor: !table.getCanNextPage() ? "not-allowed" : "pointer",
                opacity: !table.getCanNextPage() ? 0.5 : 1,
              }}
            >
              التالي
            </button>
          </div>

          <div className="pagination-info" style={{ fontWeight: "bold" }}>
            صفحة {table.getState().pagination.pageIndex + 1} من{" "}
            {table.getPageCount()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumClientsTable;
