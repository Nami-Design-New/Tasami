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
const countries = [
  { id: 1, region_id: 1, title: "Saudi Arabia" },
  { id: 2, region_id: 1, title: "UAE" },
  { id: 3, region_id: 2, title: "Germany" },
  { id: 4, region_id: 2, title: "France" },
  { id: 5, region_id: 3, title: "Japan" },
];
const regions = [
  { id: 1, title: "Middle East" },
  { id: 2, title: "Europe" },
  { id: 3, title: "Asia" },
];
const cities = [
  { id: 1, value: 1, title: "Riyadh" },
  { id: 2, value: 2, title: "Jeddah" },
  { id: 3, value: 3, title: "Dubai" },
  { id: 4, value: 4, title: "Berlin" },
  { id: 5, value: 5, title: "Tokyo" },
];

const systemTypes = [
  { id: 1, value: "internal", name: "internal" },
  { id: 2, value: "outside", name: "outside" },
];
const packages = [
  { id: 1, value: "", title: "Basic Package" },
  { id: 2, value: "", title: "Standard Package" },
  { id: 3, value: "", title: "Premium Package" },
];

const NotificationTable = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [showRateModal, setShowRateModal] = useState(false);
  const [notificationId, setNotificationId] = useState();
  const { addToTask, isAddingToTask } = usePostAddToTask();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({
    sortBy: null,
    sortOrder: null, // 'asc' or 'desc'
  });
  const [filters, setFilters] = useState({
    status: null,
    role: null,
  });
  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };
  const handleSort = (columnId) => {
    console.log(columnId);

    setSortConfig((prev) => {
      // If clicking the same column, toggle order
      if (prev.sortBy === columnId) {
        if (prev.sortOrder === "asc") {
          return { sortBy: columnId, sortOrder: "desc" };
        } else if (prev.sortOrder === "desc") {
          return { sortBy: null, sortOrder: null }; // Clear sorting
        }
      }

      return { sortBy: columnId, sortOrder: "asc" };
    });
    setPage(1);
  }; // Handle filter changes
  const handleFilterChange = (filtersObj) => {
    console.log("🟣 FILTERS IN PAGE:", filtersObj);

    setFilters(filtersObj);
    setPage(1);
  };
  // -----------------------------
  // Modal state
  // -----------------------------
  const [showModal, setShowModal] = useState(false);

  // -----------------------------
  // Fetch working groups via hook
  // -----------------------------
  const { notifications, currentPage, lastPage, isLoading } =
    useGetNotificationsDashboard(
      searchQuery,
      page,
      pageSize,
      sortConfig,
      filters,
    );

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
    [notifications, t],
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("system", {
        header: t("dashboard.notifications.system"),
        cell: (info) => info.getValue(),
        enableSorting: true,
      }),
      columnHelper.accessor("subject", {
        header: t("dashboard.notifications.subject"),
        cell: (info) => info.getValue(),
        enableSorting: true,
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
      columnHelper.accessor("accountType", {
        header: t("dashboard.notifications.accountType"),
        cell: (info) => info.getValue(),
        enableSorting: true,
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
      columnHelper.accessor("region", {
        header: t("dashboard.notifications.region"),
        cell: (info) => info.getValue(),
        enableSorting: true,
      }),
      columnHelper.accessor("location", {
        header: t("dashboard.notifications.location"),
        cell: (info) => info.getValue(),
        enableSorting: true,
      }),
      columnHelper.accessor("city", {
        header: t("dashboard.notifications.city"),
        cell: (info) => info.getValue(),
        enableSorting: true,
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
    [t],
  );
  // Filter options configuration
  const filterOptions = {
    system_type: {
      id: "system_type",
      type: "select",
      label: { en: "System Type", ar: "نوع النظام" },
      options: systemTypes, // [{ id, name }]
      getLabel: (o) => o.name,
      getValue: (o) => o.value,
    },

    system_type_id: {
      id: "system_type_id",
      type: "select",
      label: { en: "System Type ID", ar: "رقم النظام" },
      options: systemTypes,
      getLabel: (o) => o.name,
      getValue: (o) => o.value,
    },

    package_id: {
      id: "package_id",
      type: "select",
      label: { en: "Package", ar: "الباقة" },
      options: packages,
      getLabel: (o) => o.title,
      getValue: (o) => o.id,
    },

    region_id: {
      id: "region_id",
      type: "select",
      label: { en: "Region", ar: "المنطقة" },
      options: regions,
      getLabel: (o) => o.title,
      getValue: (o) => o.id,
    },

    country_id: {
      id: "country_id",
      type: "select",
      label: { en: "Country", ar: "الدولة" },
      options: countries,
      getLabel: (o) => o.title,
      getValue: (o) => o.id,
    },

    city_id: {
      id: "city_id",
      type: "select",
      label: { en: "City", ar: "المدينة" },
      options: cities,
      getLabel: (o) => o.title,
      getValue: (o) => o.id,
    },

    from_date: {
      id: "from_date",
      type: "date",
      label: { en: "From Date", ar: "من تاريخ" },
    },

    to_date: {
      id: "to_date",
      type: "date",
      label: { en: "To Date", ar: "إلى تاريخ" },
    },
  };

  return (
    <>
      <ReusableDataTable
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
        // filter
        filter={true}
        activeFilters={[
          "system_type",
          "system_type_id",
          "package_id",
          "region_id",
          "country_id",
          "city_id",
          "from_date",
          "to_date",
        ]}
        filterOptions={filterOptions}
        enableServerSideFiltering={true}
        onFilterChange={handleFilterChange}
        //sort
        onSortChange={handleSort}
        enableServerSideSorting={true}
        sortBy={sortConfig.sortBy}
        sortOrder={sortConfig.sortOrder}
        header={true}
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
