import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import ReusableDataTable from "../../table/ReusableDataTable";
import RateModal from "./RateModal";
import useGetNotificationsDashboard from "../../../hooks/dashboard/notificatoins/useGetNotificationsDashboard";
import { PAGE_SIZE } from "../../../utils/constants";
import TablePagination from "../../table/TablePagentaion";
import AlertModal from "../../website/platform/my-community/AlertModal";
import usePostAddToTask from "../../../hooks/dashboard/notificatoins/usePostAddToTask";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
const columnHelper = createColumnHelper();

const NotificationTable = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [showRateModal, setShowRateModal] = useState(false);
  const [notificationId, setNotificationId] = useState();
  const { addToTask, isAddingToTask } = usePostAddToTask();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);

  // -----------------------------
  // Modal state
  // -----------------------------
  const [showModal, setShowModal] = useState(false);

  // -----------------------------
  // Fetch working groups via hook
  // -----------------------------
  const { notifications, currentPage, lastPage, isLoading } =
    useGetNotificationsDashboard("", page, pageSize);

  const handleAddToTask = () => {
    const payload = {
      task_id: notificationId,
    };
    addToTask(payload, {
      onSuccess: (res) => {
        toast.success(res.message);
        queryClient.invalidateQueries({
          queryKey: ["dashboard-notifications"],
        });
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  };
  // const data = useMemo(
  //   () => [
  //     {
  //       id: 1,
  //       system: "دخلي ",
  //       subject: "طلب خدمة",
  //       model: "EVL-122201",
  //       date: "2025-05-25",
  //       time: "10:30",
  //       service: "os-123",
  //       userAccount: "U-010222-0000",
  //       accountType: "اساسي",
  //       idNumber: "01-014-0004",
  //       group: "GN-000002",
  //       region: "01-الشرق الاوسط",
  //       location: "014 - السعوديه",
  //       city: "0001 - الرياض",
  //       employerName: "إياد محمد خالد",
  //     },
  //     {
  //       id: 2,
  //       system: "دخلي ",
  //       subject: "شكوى",
  //       model: "EVL-122201",
  //       date: "2025-05-25",
  //       time: "10:30",
  //       service: "خدمة العملاء",
  //       userAccount: "U-010222-0000",
  //       accountType: "متميز",
  //       idNumber: "01-014-0004",
  //       group: "GN-000002",
  //       region: "01-الشرق الاوسط",
  //       location: "014 - السعوديه",
  //       city: "0001 - الرياض",
  //       employerName: "أحمد سعيد محمود",
  //     },
  //     {
  //       id: 3,
  //       system: "دخلي ",
  //       subject: "تحديث بيانات",
  //       model: "PIN-122201",
  //       date: "2025-05-25",
  //       time: "10:30",
  //       service: "الخدمات المصرفية",
  //       userAccount: "U-010222-0000",
  //       accountType: "رواد",
  //       idNumber: "01-014-0004",
  //       group: "GN-000002",
  //       region: "01-الشرق الاوسط",
  //       location: "014 - السعوديه",
  //       city: "0001 - الرياض",
  //       employerName: "سارة أحمد علي",
  //     },
  //     {
  //       id: 4,
  //       system: "دخلي ",
  //       subject: "فتح حساب",
  //       model: "PIN-122201",
  //       date: "2025-05-25",
  //       time: "10:30",
  //       service: "التمويل الشخصي",
  //       userAccount: "U-010222-0000",
  //       accountType: "اساسي",
  //       idNumber: "01-014-0004",
  //       group: "GN-000002",
  //       region: "01-الشرق الاوسط",
  //       location: "014 - السعوديه",
  //       city: "0001 - الرياض",
  //       employerName: "محمد خالد عبدالله",
  //     },
  //     {
  //       id: 5,
  //       system: "دخلي ",
  //       subject: "إغلاق حساب",
  //       model: "PIN-122201",
  //       date: "2025-05-25",
  //       time: "10:30",
  //       service: "الخدمات العامة",
  //       userAccount: "U-010222-0000",
  //       accountType: "متميز",
  //       idNumber: "01-014-0004",
  //       group: "GN-000002",
  //       region: "01-الشرق الاوسط",
  //       location: "014 - السعوديه",
  //       city: "0001 - الرياض",
  //       employerName: "فاطمة محمد سعيد",
  //     },
  //   ],
  //   []
  // );
  // -----------------------------
  // Pagination state
  // -----------------------------

  const tableData = useMemo(
    () =>
      notifications.map((notify) => ({
        id: notify?.id,
        system: notify.system_type.type || "-",
        subject: notify.system_type.title || "-",
        model: notify.reference_number || "-",
        date: notify.date || "-",
        time: notify.time || "-",
        service: notify.service || "-",
        userAccount: notify.account || "-",
        accountType: notify.account_type || "-",
        idNumber: notify.id_number || "-",
        group: notify.account_group || "-",
        region: notify.region.title || "-",
        location: notify.country.title || "-",
        city: notify.city.title || "-",
        is_added: notify.is_added,
        // employerName: "فاطمة محمد سعيد",
      })),
    [notifications, t]
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
      columnHelper.accessor("actions", {
        header: t("dashboard.workGroup.table.actions"),
        cell: (info) => {
          // console.log("info notify aciton", info?.row?.original  );
          return (
            <div className="table__actions">
              {info?.row?.original?.is_added ? (
                t("dashboard.notifications.added")
              ) : (
                <i
                  onClick={() => {
                    setShowModal(true);
                    setNotificationId(info?.row?.original?.id);
                    // setWorkingGroupName(info?.row?.original?.groupNumber);
                  }}
                  className="fa-solid fa-plus"
                ></i>
              )}
            </div>
          );
        },
      }),
    ],
    [t]
  );
  return (
    <>
      <ReusableDataTable
        filter={false}
        title={t("dashboard.notifications.title")}
        data={tableData}
        columns={columns}
        currentPage={currentPage}
        lastPage={lastPage}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        lang="ar"
        searchPlaceholder={t("dashboard.workGroup.table.searchPlaceholder")}
        isLoading={isLoading}
      >
        <TablePagination
          currentPage={page}
          lastPage={lastPage}
          onPageChange={setPage}
          isLoading={isLoading}
        />
      </ReusableDataTable>
      <RateModal showModal={showRateModal} setShowModal={setShowRateModal} />
      <AlertModal
        setShowModal={setShowModal}
        showModal={showModal}
        onConfirm={handleAddToTask}
        notificationId={notificationId}
        confirmButtonText={t("confirm")}
      />
    </>
  );
};

export default NotificationTable;
