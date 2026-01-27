import { useMemo, useState } from "react";
import { Badge } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import ReassignTaskModal from "./ReassignTaskModal";

import useGetSubjects from "../../../hooks/dashboard/administrativeSystems/useGetSubjects";
import useGetCities from "../../../hooks/dashboard/regions/useGetCities";
import useGetCountries from "../../../hooks/dashboard/regions/useGetCountries";
import useGetRegions from "../../../hooks/dashboard/regions/useGetRegions";
import useGetRoles from "../../../hooks/dashboard/shared/useGetRoles";
import useGetPackages from "../../../hooks/dashboard/website-managment/packages/useGetPackages";
import { getSystemTypes } from "../../../ui/dash-board/notifications/NotificationTable";
import { columnHelper } from "../../../ui/datatable/adapters/tanstackAdapter";
import { usePersistedTableState } from "../../../ui/datatable/hooks/usePersistedTableState";
import DataTable from "../../../ui/datatable/ui/DataTable";

export const getTasksStatus = (t) => [
  { id: 1, value: "not_assigned", label: t("tasksStatus.not_assigned") },
  { id: 2, value: "progress", label: t("tasksStatus.progress") },
  { id: 3, value: "completed", label: t("tasksStatus.completed") },
];

const TasksTable = ({
  page,
  setPage,
  pageSize,
  setPageSize,
  tasks,
  currentPage,
  lastPage,
  isLoading,
  onSearch,
  searchQuery,
  sortConfig,
  setSortConfig,
  filters,
  setFilters,
}) => {
  const { t } = useTranslation();

  const [showReassignModal, setShowReassignModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState();

  usePersistedTableState({
    key: "tasks-table",
    state: {
      searchQuery,
      page,
      sortConfig,
      filters,
    },
    setState: (saved) => {
      onSearch(saved.search ?? "");
      setPage(saved.page ?? 1);
      setSortConfig(saved.sortConfig ?? null);
      setFilters(saved.filters ?? {});
    },
  });

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

  const { packages } = useGetPackages("", 1, 50);
  const { roles = [] } = useGetRoles();

  // ----------------------------------
  // HANDLERS
  // ----------------------------------
  const handleSortChange = (sortBy, sortOrder) => {
    setSortConfig(sortBy && sortOrder ? { sortBy, sortOrder } : null);
  };

  const tableData = useMemo(
    () =>
      tasks?.map((task) => ({
        id: task?.id,
        system_type: t(`${task.system_type.type}`) || "-",
        system_type_id: task.system_type.title || "-",
        model: task.reference_number || "-",
        date: task.date || "-",
        time: task.time || "-",
        userAccount: task?.account,
        package_id: task.account_type || "-",
        idNumber: task.id_number || "-",
        group: task.account_group || "-",
        region: task.region.title || "-",
        location: task.country.title || "-",
        city: task.city.title || "-",
        createrId: task?.creater_id,
        completionDate: task.finish_date || "-",
        status: task.status || "-",
        actionLevel: task.procedure_level || "-",
        rate: task.rate || "-",
        assign: false,
      })),
    [tasks, t],
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("system_type", {
        header: t("dashboard.tasks.table.system"),
        cell: (info) => info.getValue(),
        enableSorting: true,
        enableFiltering: true,
      }),
      columnHelper.accessor("system_type_id", {
        header: t("dashboard.tasks.table.subject"),
        cell: (info) => info.getValue(),
        enableSorting: true,
        enableFiltering: true,
      }),
      columnHelper.accessor("model", {
        header: t("dashboard.tasks.table.model"),
        cell: (info) => (
          <Link
            className="link-styles"
            to={`/dashboard/model/${info.row.original.id}`}
          >
            {info.getValue()}
          </Link>
        ),
        enableSorting: true,
      }),
      columnHelper.accessor("date", {
        header: t("dashboard.tasks.table.date"),
        cell: (info) => info.getValue(),
        enableSorting: true,
      }),
      columnHelper.accessor("time", {
        header: t("dashboard.tasks.table.time"),
        cell: (info) => info.getValue(),
        enableSorting: true,
      }),

      columnHelper.accessor("userAccount", {
        header: t("dashboard.tasks.table.userAccount"),
        cell: (info) => {
          const isAppUser = info?.getValue()?.toLowerCase()?.startsWith("u");
          const userId = info?.row?.original?.createrId;
          return (
            <>
              {info.getValue() ? (
                <Link
                  className="link-styles"
                  to={
                    isAppUser
                      ? `/dashboard/user-details/${userId}`
                      : `/dashboard/employee-details/${userId}`
                  }
                >
                  {info.getValue()}
                </Link>
              ) : (
                <p>-</p>
              )}
            </>
          );
        },
        enableSorting: true,
      }),
      columnHelper.accessor("package_id", {
        header: t("dashboard.tasks.table.accountType"),
        cell: (info) => info.getValue(),
        enableSorting: true,
        enableFiltering: true,
      }),
      columnHelper.accessor("idNumber", {
        header: t("dashboard.tasks.table.idNumber"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("group", {
        header: t("dashboard.tasks.table.group"),
        cell: (info) => (
          <Link
            className="link-styles"
            to={`/dashboard/working-group/${info.row.original.id}`}
          >
            {info.getValue()}
          </Link>
        ),
        enableSorting: true,
      }),
      columnHelper.accessor("region_id", {
        header: t("dashboard.tasks.table.region"),
        cell: (info) => info.getValue(),
        enableSorting: true,
        enableFiltering: true,
      }),
      columnHelper.accessor("country_id", {
        header: t("dashboard.tasks.table.location"),
        cell: (info) => info.getValue(),
        enableSorting: true,
        enableFiltering: true,
      }),
      columnHelper.accessor("city_id", {
        header: t("dashboard.tasks.table.city"),
        cell: (info) => info.getValue(),
        enableSorting: true,
        enableFiltering: true,
      }),
      columnHelper.accessor("status", {
        header: t("dashboard.tasks.table.status"),
        cell: (info) => {
          let badgeColor;
          switch (info.getValue()) {
            case "completed":
              badgeColor = "#28a745";
              break;
            case "progress":
              badgeColor = "#dc3545";
              break;
            default:
              badgeColor = "#bababbff";
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
              {t(`tasksStatus.${info.getValue()}`)}
            </Badge>
          );
        },
        enableSorting: true,
        enableFiltering: true,
      }),
      columnHelper.accessor("actionLevel", {
        header: t("dashboard.tasks.table.actionLevel"),
        cell: (info) => info.getValue(),
        enableSorting: true,
        enableFiltering: true,
      }),
      columnHelper.accessor("completionDate", {
        header: t("dashboard.tasks.table.completionDate"),
        cell: (info) => info.getValue(),
        enableSorting: true,
      }),
      columnHelper.accessor("rate", {
        header: t("dashboard.tasks.table.rate"),
        cell: (info) =>
          info.getValue() ?? t("dashboard.tasks.statusLabels.noRate"),
        enableSorting: true,
      }),
      columnHelper.accessor("assign", {
        header: t("dashboard.tasks.table.assign"),
        cell: (info) =>
          info.getValue() ? null : (
            <button
              onClick={() => {
                setSelectedRow(info.row.original.id);
                setShowReassignModal(true);
              }}
            >
              <i className="fa-solid fa-repeat"></i>
            </button>
          ),
        enableSorting: true,
      }),
    ],
    [t],
  );

  const tasksFilterConfig = {
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
    status: {
      id: "status",
      type: "select",
      label: { en: "Status" },
      options: getTasksStatus(t),
    },
    actionLevel: {
      id: "actionLevel",
      type: "select",
      label: { en: "Action Level" },
      options: roles?.data?.map((role) => ({
        value: role?.id,
        label: role?.title,
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
        title={t("dashboard.tasks.table.subject")}
        data={tableData}
        columns={columns}
        loading={isLoading}
        filterConfig={tasksFilterConfig}
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
          value: searchQuery,
          onChange: onSearch,
          searchPlaceholder: t("search"),
          debounceMs: 500,
        }}
      />
      <ReassignTaskModal
        showModal={showReassignModal}
        setShowModal={setShowReassignModal}
        selectedRow={selectedRow}
      />
    </>
  );
};

export default TasksTable;
