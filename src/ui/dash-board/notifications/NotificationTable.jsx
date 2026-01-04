import { useQueryClient } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import useGetNotificationsDashboard from "../../../hooks/dashboard/notificatoins/useGetNotificationsDashboard";
import usePostAddToTask from "../../../hooks/dashboard/notificatoins/usePostAddToTask";
import { PAGE_SIZE } from "../../../utils/constants";
import ReusableDataTable from "../../table/ReusableDataTable";
import TablePagination from "../../table/TablePagentaion";
import AlertModal from "../../website/platform/my-community/AlertModal";
import RateModal from "./RateModal";
const columnHelper = createColumnHelper();

const NotificationTable = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [showRateModal, setShowRateModal] = useState(false);
  const [notificationId, setNotificationId] = useState();
  const { addToTask, isAddingToTask } = usePostAddToTask();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };
  // -----------------------------
  // Modal state
  // -----------------------------
  const [showModal, setShowModal] = useState(false);

  // -----------------------------
  // Fetch working groups via hook
  // -----------------------------
  const { notifications, currentPage, lastPage, isLoading } =
    useGetNotificationsDashboard(searchQuery, page, pageSize);

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
        setShowModal(false);
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  };

  // -----------------------------
  // Pagination state
  // -----------------------------
  const tableData = useMemo(
    () =>
      notifications.map((notify) => ({
        id: notify?.id,
        system: t(`${notify.system_type.type}`) || "-",
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
                  style={{ cursor: "pointer" }}
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
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        searchDebounceMs={700}
        search={true}
        lang="ar"
        searchPlaceholder={t("search")}
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
        withoutMessage={false}
        loading={isAddingToTask}
      >
        {t("confirmAddToTask")}
      </AlertModal>
    </>
  );
};

export default NotificationTable;
