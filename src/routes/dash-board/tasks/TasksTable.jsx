import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Badge } from "react-bootstrap";
import { Link } from "react-router";
import ReusableDataTable from "../../../ui/table/ReusableDataTable";
import ReassignTaskModal from "./ReassignTaskModal";
import { useTranslation } from "react-i18next";

const columnHelper = createColumnHelper();

const TasksTable = () => {
  const { t } = useTranslation();
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
        header: t("dashboard.tasks.table.system"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("subject", {
        header: t("dashboard.tasks.table.subject"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("model", {
        header: t("dashboard.tasks.table.model"),
        cell: (info) => (
          <Link to={`/dashboard/model/${info.getValue()}`}>
            {info.getValue()}
          </Link>
        ),
      }),
      columnHelper.accessor("date", {
        header: t("dashboard.tasks.table.date"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("time", {
        header: t("dashboard.tasks.table.time"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("service", {
        header: t("dashboard.tasks.table.service"),
        cell: (info) => (
          <Link to={`/service-details/${info.getValue()}`}>
            {info.getValue()}
          </Link>
        ),
      }),
      columnHelper.accessor("userAccount", {
        header: t("dashboard.tasks.table.userAccount"),
        cell: (info) => (
          <Link to={`/dashboard/user-details/${info.getValue()}`}>
            {info.getValue()}
          </Link>
        ),
      }),
      columnHelper.accessor("accountType", {
        header: t("dashboard.tasks.table.accountType"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("idNumber", {
        header: t("dashboard.tasks.table.idNumber"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("group", {
        header: t("dashboard.tasks.table.group"),
        cell: (info) => (
          <Link to={`/dashboard/working-group/${info.getValue()}`}>
            {info.getValue()}
          </Link>
        ),
      }),
      columnHelper.accessor("region", {
        header: t("dashboard.tasks.table.region"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("location", {
        header: t("dashboard.tasks.table.location"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("city", {
        header: t("dashboard.tasks.table.city"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("status", {
        header: t("dashboard.tasks.table.status"),
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
              {" "}
              {info.getValue()}{" "}
            </Badge>
          );
        },
      }),
      ,
      columnHelper.accessor("actionLevel", {
        header: t("dashboard.tasks.table.actionLevel"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("completionDate", {
        header: t("dashboard.tasks.table.completionDate"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("rate", {
        header: t("dashboard.tasks.table.rate"),
        cell: (info) =>
          info.getValue() ?? t("dashboard.tasks.statusLabels.noRate"),
      }),
      columnHelper.accessor("assign", {
        header: t("dashboard.tasks.table.assign"),
        cell: (info) =>
          info.getValue() ? null : (
            <button onClick={() => setShowReassignModal(true)}>
              <i className="fa-solid fa-repeat"></i>
            </button>
          ),
      }),
    ],
    [t]
  );

  return (
    <>
      <ReusableDataTable
        columns={columns}
        data={data}
        filter={false}
        title={t("dashboard.tasks.table.subject")}
        searchPlaceholder={t("dashboard.tasks.searchPlaceholder")}
      />
      <ReassignTaskModal
        showModal={showReassignModal}
        setShowModal={setShowReassignModal}
      />
    </>
  );
};

export default TasksTable;
