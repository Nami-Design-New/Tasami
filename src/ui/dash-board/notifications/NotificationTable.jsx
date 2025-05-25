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
import TableFilter from "../home/TableFilter";
const columnHelper = createColumnHelper();

const customGlobalFilterFn = (row, columnId, filterValue) => {
  const { ...rest } = row.original;
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
const NotificationTable = () => {
  const lang = useSelector((state) => state.language.lang);
  const isRTL = lang === "ar";
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const data = useMemo(
    () => [
      {
        id: 1,
        operation: "إرسال",
        subject: "طلب خدمة",
        model: "نموذج A",
        program: "برنامج الدعم",
        account: "123456",
        date: "2025-05-25",
        time: "10:30",
        action: "عرض",
      },
      {
        id: 2,
        operation: "استلام",
        subject: "شكوى",
        model: "نموذج B",
        program: "خدمة العملاء",
        account: "654321",
        date: "2025-05-24",
        time: "09:15",
        action: "تحقق",
      },
      {
        id: 3,
        operation: "إرسال",
        subject: "تحديث بيانات",
        model: "نموذج C",
        program: "الخدمات المصرفية",
        account: "112233",
        date: "2025-05-23",
        time: "11:00",
        action: "تعديل",
      },
      {
        id: 4,
        operation: "استلام",
        subject: "فتح حساب",
        model: "نموذج D",
        program: "التمويل الشخصي",
        account: "998877",
        date: "2025-05-22",
        time: "13:45",
        action: "مراجعة",
      },
      {
        id: 5,
        operation: "إرسال",
        subject: "إغلاق حساب",
        model: "نموذج E",
        program: "الخدمات العامة",
        account: "445566",
        date: "2025-05-21",
        time: "14:30",
        action: "إغلاق",
      },
      {
        id: 6,
        operation: "استلام",
        subject: "تحديث كلمة مرور",
        model: "نموذج F",
        program: "الخدمة الذاتية",
        account: "223344",
        date: "2025-05-20",
        time: "16:00",
        action: "تحديث",
      },
      {
        id: 7,
        operation: "إرسال",
        subject: "طلب بطاقة جديدة",
        model: "نموذج G",
        program: "بطاقات الائتمان",
        account: "556677",
        date: "2025-05-19",
        time: "08:30",
        action: "إصدار",
      },
      {
        id: 8,
        operation: "استلام",
        subject: "بلاغ عن فقدان",
        model: "نموذج H",
        program: "خدمة الطوارئ",
        account: "778899",
        date: "2025-05-18",
        time: "10:00",
        action: "تسجيل",
      },
      {
        id: 9,
        operation: "إرسال",
        subject: "استفسار عام",
        model: "نموذج I",
        program: "الدعم الفني",
        account: "334455",
        date: "2025-05-17",
        time: "15:20",
        action: "رد",
      },
      {
        id: 10,
        operation: "استلام",
        subject: "طلب معلومات",
        model: "نموذج J",
        program: "التواصل المؤسسي",
        account: "667788",
        date: "2025-05-16",
        time: "11:45",
        action: "تزويد",
      },
      {
        id: 11,
        operation: "إرسال",
        subject: "اعتراض",
        model: "نموذج K",
        program: "حل النزاعات",
        account: "889900",
        date: "2025-05-15",
        time: "12:10",
        action: "فحص",
      },
      {
        id: 12,
        operation: "استلام",
        subject: "طلب إلغاء",
        model: "نموذج L",
        program: "إدارة العقود",
        account: "111222",
        date: "2025-05-14",
        time: "17:25",
        action: "إلغاء",
      },
      {
        id: 13,
        operation: "إرسال",
        subject: "طلب تصريح",
        model: "نموذج M",
        program: "خدمة المشاريع",
        account: "333444",
        date: "2025-05-13",
        time: "09:40",
        action: "مراجعة",
      },
      {
        id: 14,
        operation: "استلام",
        subject: "اقتراح تحسين",
        model: "نموذج N",
        program: "تحسين الجودة",
        account: "555666",
        date: "2025-05-12",
        time: "10:50",
        action: "تحليل",
      },
      {
        id: 15,
        operation: "إرسال",
        subject: "طلب قرض",
        model: "نموذج O",
        program: "الخدمات التمويلية",
        account: "777888",
        date: "2025-05-11",
        time: "13:00",
        action: "دراسة",
      },
      {
        id: 16,
        operation: "استلام",
        subject: "طلب تمديد",
        model: "نموذج P",
        program: "إدارة العقود",
        account: "999000",
        date: "2025-05-10",
        time: "14:10",
        action: "موافقة",
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("operation", {
        header: isRTL ? "العملية" : "Operation",
        cell: (info) => info.getValue(),
        enableSorting: false,
      }),
      columnHelper.accessor("subject", {
        header: isRTL ? "الموضوع" : "Subject",
        cell: (info) => info.getValue(),
        enableSorting: false,
      }),
      columnHelper.accessor("model", {
        header: isRTL ? "النموذج" : "Model",
        cell: (info) => info.getValue(),
        enableSorting: false,
      }),
      columnHelper.accessor("program", {
        header: isRTL ? " البرامج " : "Programs",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("account", {
        header: isRTL ? " الحساب " : "Account",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("date", {
        header: isRTL ? " التاريخ " : "Date",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("time", {
        header: isRTL ? " الوقت " : "Time",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("action", {
        header: isRTL ? " الإجراء " : "Action",
        cell: (info) => (
          <div>
            <button className="btn btn--primary">{info.getValue()}</button>
          </div>
        ),
      }),
    ],
    [isRTL]
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      columnFilters,
    },
    globalFilterF: customGlobalFilterFn,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    //onColumnFiltersChange: setColumnFilters,
    columnResizeMode: "onChange",
    initialState: {
      pagination: {
        pageSize: 8,
      },
    },
  });
  return (
    <div className="card__custom">
      <div className="header d-flex justify-content-between">
        <h3 className="header__title">
          {isRTL ? " التنبيهات " : "  Notifications "}
        </h3>
        <TableFilter
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
          activeFilters={["operation", "action"]} // Customize which filters to show
          filterOptions={{
            operation: {
              id: "operation",
              label: { ar: "فرز بواسطه العملية:", en: "Filter by Operation:" },
              options: ["إرسال", "استلام"],
            },
            action: {
              id: "action",
              label: { ar: "فرز بواسطه الإجراء:", en: "Filter by Action:" },
              options: ["عرض", "تحقق", "تعديل", "مراجعة", "إغلاق"],
            },
          }}
          filterButtonText={isRTL ? "فرز" : "Filter"}
          searchPlaceholder={
            isRTL ? "بحث في التنبيهات" : "Search notifications"
          }
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

export default NotificationTable;
