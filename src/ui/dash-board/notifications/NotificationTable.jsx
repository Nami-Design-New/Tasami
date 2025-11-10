import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import ReusableDataTable from "../../table/ReusableDataTable";
import RateModal from "./RateModal";
const columnHelper = createColumnHelper();

const NotificationTable = () => {
  const { t } = useTranslation();
  const [showRateModal, setShowRateModal] = useState(false);
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
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("system", {
        header: t("dashboard.notifications.system"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("subject", {
        header: t("dashboard.notifications.subject"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("model", {
        header: t("dashboard.notifications.model"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("date", {
        header: t("dashboard.notifications.date"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("time", {
        header: t("dashboard.notifications.time"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("service", {
        header: t("dashboard.notifications.service"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("userAccount", {
        header: t("dashboard.notifications.userAccount"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("accountType", {
        header: t("dashboard.notifications.accountType"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("idNumber", {
        header: t("dashboard.notifications.idNumber"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("group", {
        header: t("dashboard.notifications.group"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("region", {
        header: t("dashboard.notifications.region"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("location", {
        header: t("dashboard.notifications.location"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("city", {
        header: t("dashboard.notifications.city"),
        cell: (info) => info.getValue(),
      }),
    ],
    [t]
  );
  return (
    <>
      <ReusableDataTable
        filter={false}
        title={t("dashboard.notifications.title")}
        columns={columns}
        data={data}
        searchPlaceholder={t("dashboard.notifications.searchPlaceholder")}
        initialPageSize={10}
      />
      <RateModal showModal={showRateModal} setShowModal={setShowRateModal} />
    </>
  );
};

export default NotificationTable;
