import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Badge } from "react-bootstrap";
import { Link } from "react-router";
import ReusableDataTable from "../../../ui/table/ReusableDataTable";
import ReassignTaskModal from "./ReassignTaskModal";

const columnHelper = createColumnHelper();

const TasksTable = () => {
  const [showReassignModal, setShowReassignModal] = useState(false);
  const data = useMemo(
    () => [
      {
        id: 1,
        system: "دخلي ",
        subject: "طلب خدمة",
        model: "EVL-122201",
        date: "2025-05-25",
        time: "10:30",
        service: "os-123",
        userAccount: "U-010222-0000",
        accountType: "اساسي",
        idNumber: "01-014-0004",
        group: "GN-000002",
        region: "01-الشرق الاوسط",
        location: "014 - السعوديه",
        city: "0001 - الرياض",
        employerName: "إياد محمد خالد",

        completionDate: "2025-05-25",
        status: "غير مكتمل",
        actionLevel: "الموظف",
        rate: null,
        assign: true,
      },
      {
        id: 2,
        system: "دخلي ",
        subject: "شكوى",
        model: "EVL-122201",
        date: "2025-05-25",
        time: "10:30",
        service: "خدمة العملاء",
        userAccount: "U-010222-0000",
        accountType: "متميز",
        idNumber: "01-014-0004",
        group: "GN-000002",
        region: "01-الشرق الاوسط",
        location: "014 - السعوديه",
        city: "0001 - الرياض",
        employerName: "أحمد سعيد محمود",

        completionDate: "2025-05-25",
        status: "مكتمل",
        actionLevel: "المشرف",
        rate: null,
        assign: true,
      },
      {
        id: 3,
        system: "دخلي ",
        subject: "تحديث بيانات",
        model: "PIN-122201",
        date: "2025-05-25",
        time: "10:30",
        service: "الخدمات المصرفية",
        userAccount: "U-010222-0000",
        accountType: "رواد",
        idNumber: "01-014-0004",
        group: "GN-000002",
        region: "01-الشرق الاوسط",
        location: "014 - السعوديه",
        city: "0001 - الرياض",
        employerName: "سارة أحمد علي",
        completionDate: "2025-05-25",
        status: "غير مضاف",
        actionLevel: "المشرف",
        rate: null,
        assign: false,
      },
      {
        id: 4,
        system: "دخلي ",
        subject: "فتح حساب",
        model: "PIN-122201",
        date: "2025-05-25",
        time: "10:30",
        service: "التمويل الشخصي",
        userAccount: "U-010222-0000",
        accountType: "اساسي",
        idNumber: "01-014-0004",
        group: "GN-000002",
        region: "01-الشرق الاوسط",
        location: "014 - السعوديه",
        city: "0001 - الرياض",
        employerName: "محمد خالد عبدالله",
        completionDate: "2025-05-25",
        status: "غير مكتمل",
        actionLevel: "التنفيذي",
        rate: null,
        assign: true,
      },
      {
        id: 5,
        system: "دخلي ",
        subject: "إغلاق حساب",
        model: "PIN-122201",
        date: "2025-05-25",
        time: "10:30",
        service: "الخدمات العامة",
        userAccount: "U-010222-0000",
        accountType: "متميز",
        idNumber: "01-014-0004",
        group: "GN-000002",
        region: "01-الشرق الاوسط",
        location: "014 - السعوديه",
        city: "0001 - الرياض",
        employerName: "فاطمة محمد سعيد",
        completionDate: "2025-05-25",
        status: "مكتمل",
        actionLevel: "التنفيذي",
        rate: "3.2",
        assign: true,
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("system", {
        header: "النظام",
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
            to={`/dashboard/model/${info.getValue()}`}
            className="link-styles"
            style={{ textDecoration: "underline" }}
          >
            {info.getValue()}
          </Link>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("date", {
        header: "التاريخ",
        cell: (info) => info.getValue(),
        enableSorting: false,
      }),
      columnHelper.accessor("time", {
        header: " الوقت ",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("service", {
        header: " الخدمه ",
        cell: (info) => (
          <Link
            to={`/service-details/${info.getValue()}`}
            className="link-styles"
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
            to={`/dashboard/user-details/${info.getValue()}`}
            className="link-styles"
          >
            {info.getValue()}
          </Link>
        ),
      }),
      columnHelper.accessor("accountType", {
        header: "نوع الحساب",
        cell: (info) => info.getValue(),
        enableSorting: false,
      }),
      columnHelper.accessor("idNumber", {
        header: "رقم التعريف",
        cell: (info) => info.getValue(),
        enableSorting: false,
      }),
      columnHelper.accessor("group", {
        header: "المجموعه",
        cell: (info) => (
          <Link
            to={`/dashboard/working-group/${info.getValue()}`}
            className="link-styles"
          >
            {info.getValue()}
          </Link>
        ),
        enableSorting: false,
      }),

      columnHelper.accessor("region", {
        header: "  الاقليم ",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("location", {
        header: "  القطاع ",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("city", {
        header: "  المدينه ",
        cell: (info) => info.getValue(),
      }),

      columnHelper.accessor("status", {
        header: " الحالة ",
        cell: (info) => {
          let badgeColor;
          switch (info.getValue()) {
            case "مكتمل":
              badgeColor = "#28a745";
              break;
            case "غير مكتمل":
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

      columnHelper.accessor("actionLevel", {
        header: " مستوي الاجراء ",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("completionDate", {
        header: " تاريخ الاكمال ",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("rate", {
        header: " التقييم ",
        cell: (info) => {
          return (
            <div>
              {info.getValue() === null ? "لا يوجد تقييم" : info.getValue()}
            </div>
          );
        },
      }),
      columnHelper.accessor("assign", {
        header: "تعيين",
        cell: (info) => {
          return (
            <button onClick={() => setShowReassignModal(true)}>
              {info.getValue() === false ? (
                <i className="fa-solid fa-repeat"></i>
              ) : null}
            </button>
          );
        },
      }),
    ],
    []
  );

  return (
    <>
      <ReusableDataTable
        columns={columns}
        data={data}
        filter={false}
        title="المهام"
        searchPlaceholder="بحث في المهام ..."
      />
      <ReassignTaskModal
        showModal={showReassignModal}
        setShowModal={setShowReassignModal}
      />
    </>
  );
};

export default TasksTable;
