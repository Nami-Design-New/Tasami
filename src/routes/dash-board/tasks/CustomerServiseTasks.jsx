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
import TableFilter from "../../../ui/dash-board/home/TableFilter";
import { Link } from "react-router";
import { Badge } from "react-bootstrap";

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
const CustomerServiseTasks = () => {
  const lang = useSelector((state) => state.language.lang);
  const isRTL = lang === "ar";
  const [globalFilter, setGlobalFilter] = useState("");

  const data = useMemo(
    () => [
      {
        id: 1,
        operation: "البلاغات",
        subject: "طلب خدمة",
        model: "EVL-122201",
        program: "برنامج الدعم",
        userAccount: "U-010222-0000",
        date: "2025-05-25",
        time: "10:30",
        group: "GN-000002",
        employerName: "إياد محمد خالد",
        employerAccount: "E-010222-0000",
        completionDate: "2025-05-25",
        status: "قيد التنفيذ",
        actionLevel: "الموظف",
        action: null,
      },
      {
        id: 2,
        operation: "استلام",
        subject: "شكوى",
        model: "EVL-122201",
        program: "خدمة العملاء",
        userAccount: "U-010222-0000",
        date: "2025-05-25",
        time: "10:30",
        group: "GN-000002",
        employerName: "أحمد سعيد محمود",
        employerAccount: "E-010222-0000",
        completionDate: "2025-05-25",
        status: "مكتمل",
        actionLevel: "المشرف",
        action: null,
      },
      {
        id: 3,
        operation: "إرسال",
        subject: "تحديث بيانات",
        model: "PIN-122201",
        program: "الخدمات المصرفية",
        userAccount: "U-010222-0000",
        date: "2025-05-25",
        time: "10:30",
        group: "GN-000002",
        employerName: "سارة أحمد علي",
        employerAccount: "E-010222-0000",
        completionDate: "2025-05-25",
        status: "غير مضاف",
        actionLevel: "المشرف",
        action: null,
      },
      {
        id: 4,
        operation: "استلام",
        subject: "فتح حساب",
        model: "PIN-122201",
        program: "التمويل الشخصي",
        userAccount: "U-010222-0000",
        date: "2025-05-25",
        time: "10:30",
        group: "GN-000002",
        employerName: "محمد خالد عبدالله",
        employerAccount: "E-010222-0000",
        completionDate: "2025-05-25",
        status: "قيد التنفيذ",
        actionLevel: "التنفيذي",
        action: null,
      },
      {
        id: 5,
        operation: "إرسال",
        subject: "إغلاق حساب",
        model: "PIN-122201",
        program: "الخدمات العامة",
        userAccount: "U-010222-0000",
        date: "2025-05-25",
        time: "10:30",
        group: "GN-000002",
        employerName: "فاطمة محمد سعيد",
        employerAccount: "E-010222-0000",
        completionDate: "2025-05-25",
        status: "مكتمل",
        actionLevel: "التنفيذي",
        action: "3.2",
      },
      {
        id: 6,
        operation: "استلام",
        subject: "تحديث كلمة مرور",
        model: "PIN-122201",
        program: "الخدمة الذاتية",
        userAccount: "U-010222-0000",
        date: "2025-05-25",
        time: "10:30",
        group: "GN-000002",
        employerName: "عمر أحمد حسن",
        employerAccount: "E-010222-0000",
        completionDate: "2025-05-25",
        status: "غير مضاف",
        actionLevel: "الموظف",
        action: null,
      },
      {
        id: 7,
        operation: "إرسال",
        subject: "طلب بطاقة جديدة",
        model: "PIN-122201",
        program: "بطاقات الائتمان",
        userAccount: "U-010222-0000",
        date: "2025-05-25",
        time: "10:30",
        group: "GN-000002",
        employerName: "ليلى عبدالرحمن محمد",
        employerAccount: "E-010222-0000",
        completionDate: "2025-05-25",
        status: "مكتمل",
        actionLevel: "الموظف",
        action: "3.2",
      },
      {
        id: 8,
        operation: "استلام",
        subject: "بلاغ عن فقدان",
        model: "PIN-122201",
        program: "خدمة الطوارئ",
        userAccount: "U-010222-0000",
        date: "2025-05-25",
        time: "10:30",
        group: "GN-000002",
        employerName: "يوسف محمد علي",
        employerAccount: "E-010222-0000",
        completionDate: "2025-05-25",
        status: "مكتمل",
        actionLevel: "الموظف",
        action: "3.2",
      },
      {
        id: 9,
        operation: "إرسال",
        subject: "استفسار عام",
        model: "PIN-122201",
        program: "الدعم الفني",
        userAccount: "U-010222-0000",
        date: "2025-05-25",
        time: "10:30",
        group: "GN-000002",
        employerName: "نورة سعد محمد",
        employerAccount: "E-010222-0000",
        completionDate: "2025-05-25",
        status: "غير مضاف",
        actionLevel: "المشرف",
        action: null,
      },
      {
        id: 10,
        operation: "استلام",
        subject: "طلب معلومات",
        model: "PIN-122201",
        program: "التواصل المؤسسي",
        userAccount: "U-010222-0000",
        date: "2025-05-25",
        time: "10:30",
        group: "GN-000002",
        employerName: "خالد عبدالله أحمد",
        employerAccount: "E-010222-0000",
        completionDate: "2025-05-25",
        status: "قيد التنفيذ",
        actionLevel: "التنفيذي",
        action: "اضف الي المهام",
      },
      {
        id: 11,
        operation: "إرسال",
        subject: "اعتراض",
        model: "PIN-122201",
        program: "حل النزاعات",
        userAccount: "U-010222-0000",
        date: "2025-05-25",
        time: "10:30",
        group: "GN-000002",
        employerName: "هند محمد سالم",
        employerAccount: "E-010222-0000",
        completionDate: "2025-05-25",
        status: "مكتمل",
        actionLevel: "التنفيذي",
        action: null,
      },
      {
        id: 12,
        operation: "استلام",
        subject: "طلب إلغاء",
        model: "PIN-122201",
        program: "إدارة العقود",
        userAccount: "U-010222-0000",
        date: "2025-05-25",
        time: "10:30",
        group: "GN-000002",
        employerName: "سلطان فهد عبدالعزيز",
        employerAccount: "E-010222-0000",
        completionDate: "2025-05-25",
        status: "غير مضاف",
        actionLevel: "التنفيذي",
        action: null,
      },
      {
        id: 13,
        operation: "إرسال",
        subject: "طلب تصريح",
        model: "PIN-122201",
        program: "خدمة المشاريع",
        userAccount: "U-010222-0000",
        date: "2025-05-25",
        time: "10:30",
        group: "GN-000002",
        employerName: "منى سعيد أحمد",
        employerAccount: "E-010222-0000",
        completionDate: "2025-05-25",
        status: "مكتمل",
        actionLevel: "المشرف",
        action: "4.3",
      },
      {
        id: 14,
        operation: "استلام",
        subject: "اقتراح تحسين",
        model: "PIN-122201",
        program: "تحسين الجودة",
        userAccount: "U-010222-0000",
        date: "2025-05-25",
        time: "10:30",
        group: "GN-000002",
        employerName: "عبدالرحمن محمد خالد",
        completionDate: "2025-05-25",
        status: "مكتمل",
        actionLevel: "المشرف",
        employerAccount: "E-010222-0000",
        action: null,
      },
      {
        id: 15,
        operation: "إرسال",
        subject: "طلب قرض",
        model: "PIN-122201",
        program: "الخدمات التمويلية",
        userAccount: "U-010222-0000",
        date: "2025-05-25",
        time: "10:30",
        group: "GN-000002",
        employerName: "لمياء عبدالله محمد",
        employerAccount: "E-010222-0000",
        completionDate: "2025-05-25",
        status: "غير مضاف",
        actionLevel: "المشرف",
        action: null,
      },
      {
        id: 16,
        operation: "تقييم",
        subject: " تقييم الخدمه ",
        model: "PIN-122201",
        program: "إدارة العقود",
        userAccount: "U-010222-0000",
        date: "2025-05-25",
        time: "10:30",
        group: "GN-000002",
        employerName: "فيصل سعود عبدالعزيز",
        employerAccount: "E-010222-0000",
        completionDate: "2025-05-25",
        status: "قيد التنفيذ",
        actionLevel: "المشرف",
        action: null,
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("operation", {
        header: "العملية",
        cell: (info) => info.getValue(),
        enableSorting: false,
      }),

      columnHelper.accessor("subject", {
        header: "الموضوع",
        cell: (info) => info.getValue(),
        enableSorting: false,
      }),
      columnHelper.accessor("model", {
        header: "النموذج",
        cell: (info) => (
          <Link
            to={`/model/${info.getValue()}`}
            className="link-styls"
            style={{ textDecoration: "underline" }}
          >
            {info.getValue()}
          </Link>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("program", {
        header: " البرامج ",
        cell: (info) => (
          <Link
            to={`/program/${info.getValue()}`}
            className="link-styls"
            style={{ textDecoration: "underline" }}
          >
            {info.getValue()}
          </Link>
        ),
      }),
      columnHelper.accessor("userAccount", {
        header: "حساب المستخدم ",
        cell: (info) => (
          <Link
            to={`/userAccount/${info.getValue()}`}
            className="link-styls"
            style={{ textDecoration: "underline" }}
          >
            {info.getValue()}
          </Link>
        ),
      }),
      columnHelper.accessor("group", {
        header: "المجموعه",
        cell: (info) => (
          <Link
            to={`/group/${info.getValue()}`}
            className="link-styls"
            style={{ textDecoration: "underline" }}
          >
            {info.getValue()}
          </Link>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("date", {
        header: " التاريخ ",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("time", {
        header: " الوقت ",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("employerName", {
        header: " الموظف ",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("employerAccount", {
        header: "حساب الموظف ",
        cell: (info) => (
          <Link
            to={`/employerAccount/${info.getValue()}`}
            className="link-styls"
            style={{ textDecoration: "underline" }}
          >
            {info.getValue()}
          </Link>
        ),
      }),
      columnHelper.accessor("status", {
        header: " الحالة ",
        cell: (info) => {
          let badgeColor;
          switch (info.getValue()) {
            case "مكتمل":
              badgeColor = "#28a745";
              break;
            case "قيد التنفيذ":
              badgeColor = "#007bff";
              break;
            case "غير مضاف":
              badgeColor = "#ffc107";
              break;
            default:
              badgeColor = "#E5E7EB";
              break;
          }

          return (
            <Badge
              pill
              className="custom-badge"
              style={{
                "--badge-color": badgeColor,
                "--text-color": "#fff",
                fontWeight: "500",
              }}
            >
              {info.getValue()}
            </Badge>
          );
        },
      }),
      columnHelper.accessor("completionDate", {
        header: " تاريخ الاكمال ",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("actionLevel", {
        header: " مستوي الاجراء ",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("action", {
        header: " التقييم ",
        cell: (info) => {
          return (
            <div>
              {info.getValue() === null ? "لا يوجد تقييم" : info.getValue()}
            </div>
          );
        },
      }),
    ],
    []
  );
  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
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
    <div className="cutomer_service">
      <div className="card__custom">
        <div className="header d-flex justify-content-between">
          <h3 className="header__title">مهام خدمه العملاء</h3>
          <TableFilter
            filter={false}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            filterButtonText={isRTL ? "فرز" : "Filter"}
            searchPlaceholder={"بحث في المهام"}
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
                  cursor: !table.getCanPreviousPage()
                    ? "not-allowed"
                    : "pointer",
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
                      table.getState().pagination.pageIndex === i
                        ? "active"
                        : ""
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
    </div>
  );
};

export default CustomerServiseTasks;
