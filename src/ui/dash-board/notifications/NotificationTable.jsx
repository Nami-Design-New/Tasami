import { useMemo, useState } from "react";
import useGetNotificationsDashboard from "../../../hooks/dashboard/notificatoins/useGetNotificationsDashboard";
import DataTable from "../../datatable/ui/DataTable";

import { useTranslation } from "react-i18next";
import { PAGE_SIZE } from "../../../utils/constants";
import { columnHelper } from "../../datatable/adapters/tanstackAdapter";
import useGetRegions from "../../../hooks/dashboard/regions/useGetRegions";
import useGetCountries from "../../../hooks/dashboard/regions/useGetCountries";
import useGetCities from "../../../hooks/dashboard/regions/useGetCities";
import useGetSubjects from "../../../hooks/dashboard/administrativeSystems/useGetSubjects";
import usePostAddToTask from "../../../hooks/dashboard/notificatoins/usePostAddToTask";
import RateModal from "./RateModal";
import AlertModal from "../../website/platform/my-community/AlertModal";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { usePersistedTableState } from "../../datatable/hooks/usePersistedTableState";
import useGetPackages from "../../../hooks/dashboard/website-managment/packages/useGetPackages";

export const getSystemTypes = (t) => [
  { id: 1, value: "internal", label: t("internal") },
  { id: 2, value: "outside", label: t("outside") },
];

const NotificationsTable = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const [showRateModal, setShowRateModal] = useState(false);
  const [notificationId, setNotificationId] = useState(null);

  // ----------------------------------
  // TABLE STATE (controlled)
  // ----------------------------------
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState(null);
  const [filters, setFilters] = useState({});

  usePersistedTableState({
    key: "notifications-table",
    state: {
      search,
      page,
      sortConfig,
      filters,
    },
    setState: (saved) => {
      setSearch(saved.search ?? "");
      setPage(saved.page ?? 1);
      setSortConfig(saved.sortConfig ?? null);
      setFilters(saved.filters ?? {});
    },
  });

  // ----------------------------------
  // DATA FETCH
  // ----------------------------------
  const { notifications, currentPage, lastPage, isLoading } =
    useGetNotificationsDashboard(search, page, pageSize, sortConfig, filters);

  // -----------------------------
  // Fetch cascading filter data
  // -----------------------------
  const { regions } = useGetRegions();
  const { countries } = useGetCountries(
    filters.region_id,
    "on",
    !!filters.region_id,
  );
  const { cities } = useGetCities(
    filters.country_id,
    "on",
    !!filters.country_id,
  );
  const { subjects } = useGetSubjects("", 1, 50);
  const { addToTask, isAddingToTask } = usePostAddToTask();

  const { packages } = useGetPackages("", 1, 50);
  // -----------------------------
  // Modals
  // -----------------------------
  const [showModal, setShowModal] = useState(false);
  const handleAddToTask = () => {
    addToTask(
      { task_id: notificationId },
      {
        onSuccess: (res) => {
          toast.success(res.message);
          queryClient.invalidateQueries({
            queryKey: ["dashboard-notifications"],
          });
          setShowModal(false);
        },
        onError: (err) => toast.error(err.message),
      },
    );
  };
  // ----------------------------------
  // HANDLERS
  // ----------------------------------
  const handleSortChange = (sortBy, sortOrder) => {
    setSortConfig(sortBy && sortOrder ? { sortBy, sortOrder } : null);
  };

  // -----------------------------
  // Table Data
  // -----------------------------
  const tableData = useMemo(
    () =>
      notifications.map((notify) => ({
        id: notify?.id,
        system_type: t(`${notify.system_type.type}`) || "-",
        system_type_id: notify.system_type.title || "-",
        model: notify.reference_number || "-",
        date: notify.date || "-",
        time: notify.time || "-",
        service: notify.service || "-",
        userAccount: notify.account || "-",
        package_id: notify.account_type || "-",
        idNumber: notify.id_number || "-",
        group: notify.account_group || "-",
        region_id: notify.region.title || "-",
        country_id: notify.country.title || "-",
        city_id: notify.city.title || "-",
        is_added: notify.is_added,
      })),
    [notifications, t],
  );

  // -----------------------------
  // Columns
  // -----------------------------
  const columns = useMemo(
    () => [
      columnHelper.accessor("system_type", {
        header: t("dashboard.notifications.system"),
        cell: (info) => info.getValue(),
        enableSorting: true,
        enableFiltering: true,
      }),
      columnHelper.accessor("system_type_id", {
        header: t("dashboard.notifications.subject"),
        cell: (info) => info.getValue(),
        enableSorting: true,
        enableFiltering: true,
      }),
      columnHelper.accessor("model", {
        header: t("dashboard.notifications.model"),
        cell: (info) => info.getValue(),
        enableSorting: true,
      }),
      columnHelper.accessor("date", {
        header: t("dashboard.notifications.date"),
        cell: (info) => info.getValue(),
        enableSorting: true,
        enableFiltering: true,
      }),
      columnHelper.accessor("time", {
        header: t("dashboard.notifications.time"),
        cell: (info) => info.getValue(),
        enableSorting: true,
      }),
      columnHelper.accessor("service", {
        header: t("dashboard.notifications.service"),
        cell: (info) => info.getValue(),
        enableSorting: true,
      }),
      columnHelper.accessor("userAccount", {
        header: t("dashboard.notifications.userAccount"),
        cell: (info) => info.getValue(),
        enableSorting: true,
      }),
      columnHelper.accessor("package_id", {
        header: t("dashboard.notifications.accountType"),
        cell: (info) => info.getValue(),
        enableSorting: true,
        enableFiltering: true,
      }),
      columnHelper.accessor("idNumber", {
        header: t("dashboard.notifications.idNumber"),
        cell: (info) => info.getValue(),
        enableSorting: true,
      }),
      columnHelper.accessor("group", {
        header: t("dashboard.notifications.group"),
        cell: (info) => info.getValue(),
        enableSorting: true,
      }),
      columnHelper.accessor("region_id", {
        header: t("dashboard.notifications.region"),
        cell: (info) => info.getValue(),
        enableSorting: true,
        enableFiltering: true,
      }),
      columnHelper.accessor("country_id", {
        header: t("dashboard.notifications.location"),
        cell: (info) => info.getValue(),
        enableSorting: true,
        enableFiltering: true,
      }),
      columnHelper.accessor("city_id", {
        header: t("dashboard.notifications.city"),
        cell: (info) => info.getValue(),
        enableSorting: true,
        enableFiltering: true,
      }),
      columnHelper.accessor("actions", {
        header: t("dashboard.workGroup.table.actions"),
        cell: (info) => (
          <div className="table__actions">
            {info?.row?.original?.is_added ? (
              t("dashboard.notifications.added")
            ) : (
              <i
                onClick={() => {
                  setShowModal(true);
                  setNotificationId(info?.row?.original?.id);
                }}
                style={{ cursor: "pointer" }}
                className="fa-solid fa-plus"
              />
            )}
          </div>
        ),
      }),
    ],
    [t],
  );

  const notificationsFilterConfig = {
    system_type: {
      id: "system_type",
      type: "select",
      label: { en: "System Type" },
      options: getSystemTypes(t),
    },
    system_type_id: {
      id: "system_type_id",
      type: "select",
      label: { en: "System Type ID" },
      options: subjects.map((sub) => ({
        value: sub?.id,
        label: sub?.title,
      })),
    },
    package_id: {
      id: "package_id",
      type: "select",
      label: { en: "Package" },
      options: packages?.map((pack) => ({
        value: pack?.id,
        label: pack?.title,
      })),
    },
    region_id: {
      id: "region_id",
      type: "select",
      label: { en: "Region" },
      options: regions.map((reg) => ({
        value: reg?.id,
        label: reg?.title,
      })),
    },
    country_id: {
      id: "country_id",
      type: "select",
      label: { en: "Country" },
      options: countries.map((reg) => ({
        value: reg?.id,
        label: reg?.title,
      })),
    },
    city_id: {
      id: "city_id",
      type: "select",
      label: { en: "City" },
      options: cities.map((reg) => ({
        value: reg?.id,
        label: reg?.title,
      })),
    },
    date: {
      type: "date",
      mode: "range",
    },
  };
  return (
    <>
      <DataTable
        title={t("dashboard.notifications.title")}
        data={tableData}
        columns={columns}
        loading={isLoading}
        filterConfig={notificationsFilterConfig}
        pagination={{
          currentPage,
          lastPage,
          pageSize,
          onPageSizeChange: setPageSize,
          page,
          onPageChange: setPage,
        }}
        sorting={{
          enabled: true,
          server: true,
          sortBy: sortConfig?.sortBy,
          sortOrder: sortConfig?.sortOrder,
          onChange: handleSortChange,
        }}
        filtering={{
          enabled: false,
          server: true,
          onChange: setFilters,
        }}
        search={{
          enabled: true,
          value: search,
          onChange: setSearch,
          searchPlaceholder: t("search"),
          debounceMs: 500,
        }}
      />
      <RateModal showModal={showRateModal} setShowModal={setShowRateModal} />

      <AlertModal
        showModal={showModal}
        setShowModal={setShowModal}
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

export default NotificationsTable;
