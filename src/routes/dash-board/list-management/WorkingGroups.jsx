import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import useGetCities from "../../../hooks/dashboard/regions/useGetCities";
import useGetCountries from "../../../hooks/dashboard/regions/useGetCountries";
import useGetRegions from "../../../hooks/dashboard/regions/useGetRegions";
import useGetWorkingGroups from "../../../hooks/dashboard/workingGroups/useGetWorkingGroups";
import ChartCard from "../../../ui/dash-board/cards/ChartCard";
import StatisticsCard from "../../../ui/dash-board/cards/StatisticsCard";
import { columnHelper } from "../../../ui/datatable/adapters/tanstackAdapter";
import { usePersistedTableState } from "../../../ui/datatable/hooks/usePersistedTableState";
import DataTable from "../../../ui/datatable/ui/DataTable";
import EditWorkGroupModal from "../../../ui/modals/EditWorkGroupModal";
import { PAGE_SIZE } from "../../../utils/constants";
import { useQueryClient } from "@tanstack/react-query";
import useDeleteGroup from "../../../hooks/dashboard/workingGroups/useDeleteGroup";
import { toast } from "sonner";
import ConfirmDeleteModal from "../../../ui/modals/ConfirmationDeleteModal";

const getgroupTypes = (t) => [
  { id: 1, value: "managerial", label: t("managerial") },
  { id: 2, value: "operational", label: t("operational") },
];

const toCount = (value) => Number(value) || 0;

const WorkingGroups = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [workingGroupId, setWorkingGroupId] = useState();
  const [workingGroupName, setWorkingGroupName] = useState();
  const [workingGroupUsersCount, setWorkingGroupUsersCount] = useState(0);
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
  // -----------------------------
  // Modal state
  // -----------------------------
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // -----------------------------
  // Fetch working groups via hook
  // -----------------------------
  const { workingGroups, stats, currentPage, lastPage, isLoading } =
    useGetWorkingGroups(search, page, pageSize, sortConfig, filters);

  // -----------------------------
  // delete working group
  // -----------------------------
  const { deleteWorkingGroup, isDeleting } = useDeleteGroup();

  // ----------------------------------
  // HANDLERS
  // ----------------------------------
  const handleSortChange = (sortBy, sortOrder) => {
    setSortConfig(sortBy && sortOrder ? { sortBy, sortOrder } : null);
  };

  const handleOpenDeleteModal = useCallback(
    (workingGroup) => {
      if (workingGroup.usersCount > 0) {
        toast.info(t("dashboard.workGroup.deleteBlocked"));
        return;
      }

      setShowDeleteModal(true);
      setWorkingGroupId(workingGroup.id);
      setWorkingGroupUsersCount(workingGroup.usersCount);
    },
    [t],
  );

  const handleDeleteWorkingGroup = useCallback(() => {
    if (workingGroupUsersCount > 0) {
      toast.info(t("dashboard.workGroup.deleteBlocked"));
      setShowDeleteModal(false);
      return;
    }

    deleteWorkingGroup(workingGroupId, {
      onSuccess: (res) => {
        toast.success(res?.message);
        queryClient.invalidateQueries({
          queryKey: ["dashboard-working-group"],
        });
        setShowDeleteModal(false);
      },
      onError: (err) => {
        toast.error(err?.message);
      },
    });
  }, [deleteWorkingGroup, queryClient, t, workingGroupId, workingGroupUsersCount]);

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

  const statsData = [
    {
      label: t("dashboard.workGroup.stats.groups"),
      value: stats?.group_count,
      icon: "fa-users",
      color: "#fff",
      bgColor: "#007bff",
    },
    {
      label: t("dashboard.workGroup.stats.executives"),
      value: stats?.executive_count,
      icon: "fa-user-tie",
      color: "#fff",
      bgColor: "#28a745",
    },
    {
      label: t("dashboard.workGroup.stats.leaders"),
      value: stats?.leader_count,
      icon: "fa-chess-king",
      color: "#fff",
      bgColor: "#ffc107",
    },
    {
      label: t("dashboard.workGroup.stats.managers"),
      value: stats?.manager_count,
      icon: "fa-briefcase",
      color: "#fff",
      bgColor: "#17a2b8",
    },
    {
      label: t("dashboard.workGroup.stats.supervisors"),
      value: stats?.group_count,
      icon: "fa-user-check",
      color: "#fff",
      bgColor: "#6f42c1",
    },
    {
      label: t("dashboard.workGroup.stats.employees"),
      value: stats?.group_count,
      icon: "fa-id-badge",
      color: "#fff",
      bgColor: "#dc3545",
    },
  ];

  const tableData = useMemo(
    () =>
      workingGroups.map((wg) => {
        const excutives = toCount(wg?.executive_count);
        const leaders = toCount(wg?.leader_count);
        const managers = toCount(wg?.manager_count);
        const supervisorsCount = toCount(wg?.supervisor_count);
        const employeeCount = toCount(wg?.customer_service_count);
        const usersCount =
          excutives + leaders + managers + supervisorsCount + employeeCount;

        return {
          id: wg?.id,
          groupNumber: wg?.name,
          groupClassifications: wg?.type,
          region_id: wg?.region?.title || "-",
          country_id: wg?.country?.title || "-",
          city_id: wg?.city?.title || "-",
          createDate: wg?.created_at,
          excutives,
          leaders,
          managers,
          supervisorsCount,
          employeeCount,
          usersCount,
        };
      }),
    [workingGroups],
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("groupNumber", {
        header: t("dashboard.workGroup.table.groupNumber"),
        cell: (info) => (
          <Link
            to={`/dashboard/working-group/${info?.row?.original?.id}`}
            className="link-styles"
          >
            {info.getValue()}
          </Link>
        ),
        enableSorting: true,
      }),
      columnHelper.accessor("groupClassifications", {
        header: t("dashboard.workGroup.table.classification"),
        cell: (info) => {
          return t(`${info?.getValue()}`);
        },
        enableSorting: true,
        enableFiltering: true,
      }),
      columnHelper.accessor("region_id", {
        header: t("dashboard.workGroup.table.region"),
        enableSorting: true,
        enableFiltering: true,
      }),
      columnHelper.accessor("country_id", {
        header: t("dashboard.workGroup.table.location"),
        enableSorting: true,
        enableFiltering: true,
      }),
      columnHelper.accessor("city_id", {
        header: t("dashboard.workGroup.table.city"),
        enableSorting: true,
        enableFiltering: true,
      }),
      columnHelper.accessor("createDate", {
        header: t("dashboard.workGroup.table.createDate"),
        enableSorting: true,
        enableFiltering: true,
      }),
      columnHelper.accessor("excutives", {
        header: t("dashboard.workGroup.table.executives"),
        enableSorting: true,
      }),
      columnHelper.accessor("leaders", {
        header: t("dashboard.workGroup.table.leaders"),
        enableSorting: true,
      }),
      columnHelper.accessor("managers", {
        header: t("dashboard.workGroup.table.managers"),
        enableSorting: true,
      }),
      columnHelper.accessor("supervisorsCount", {
        header: t("dashboard.workGroup.table.supervisors"),
        enableSorting: true,
      }),
      columnHelper.accessor("employeeCount", {
        header: t("dashboard.workGroup.table.employees"),
        enableSorting: true,
      }),
      columnHelper.accessor("actions", {
        header: t("dashboard.workGroup.table.actions"),
        cell: (info) => {
          const workingGroup = info.row.original;
          const canDeleteWorkingGroup = workingGroup.usersCount === 0;

          return (
            <div className="table__actions">
              <Link to={`/dashboard/shared-groups/${workingGroup.id}`}>
                <i className="fa-solid fa-user-friends table__actions--details"></i>
              </Link>
              <i
                className="fa-solid fa-edit table__actions--edit"
                onClick={() => {
                  setShowModal(true);
                  setWorkingGroupId(workingGroup.id);
                  setWorkingGroupName(workingGroup.groupNumber);
                }}
              ></i>
              <i
                className="fa-solid fa-trash table__actions--delete"
                title={
                  !canDeleteWorkingGroup
                    ? t("dashboard.workGroup.deleteBlocked")
                    : undefined
                }
                style={{
                  cursor: canDeleteWorkingGroup ? "pointer" : "not-allowed",
                  opacity: canDeleteWorkingGroup ? 1 : 0.45,
                }}
                onClick={() => handleOpenDeleteModal(workingGroup)}
              ></i>
            </div>
          );
        },
        enableSorting: true,
      }),
    ],
    [handleOpenDeleteModal, t],
  );
  const workingGroupsFilterConfig = {
    groupClassifications: {
      id: "groupClassifications",
      type: "select",
      label: { en: "Group Classifications" },
      options: getgroupTypes(t),
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
    createDate: {
      type: "date",
      mode: "range",
    },
  };
  return (
    <section>
      <div className="row">
        <div className="col-12 p-2">
          <ChartCard title={t("dashboard.workGroup.stats.title")}>
            <div className="row">
              {statsData.map((item, index) => (
                <div
                  className="col-12 col-sm-6 col-md-4 col-lg-3 col-xxl-2 p-2"
                  key={index}
                >
                  <StatisticsCard item={item} />
                </div>
              ))}
            </div>
          </ChartCard>
        </div>

        <div className="col-12 p-2">
          {/* <ReusableDataTable
            title={t("dashboard.workGroup.table.title")}
            data={tableData}
            columns={columns}
            currentPage={currentPage}
            lastPage={lastPage}
            setPage={setPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            lang="ar"
            filter={false}
            searchPlaceholder={t("dashboard.workGroup.table.searchPlaceholder")}
            isLoading={isLoading}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            searchDebounceMs={700}
            search={true}
          >
            <TablePagination
              currentPage={page}
              lastPage={lastPage}
              onPageChange={setPage}
              isLoading={isLoading}
            />
          </ReusableDataTable> */}
          <DataTable
            title={t("dashboard.workGroup.table.title")}
            data={tableData}
            columns={columns}
            loading={isLoading}
            filterConfig={workingGroupsFilterConfig}
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
        </div>
      </div>

      <EditWorkGroupModal
        setShowModal={setShowModal}
        showModal={showModal}
        workingGroupId={workingGroupId}
        workingGroupName={workingGroupName}
      />
      <ConfirmDeleteModal
        setShowDeleteModal={setShowDeleteModal}
        showDeleteModal={showDeleteModal}
        onConfirm={handleDeleteWorkingGroup}
        loading={isDeleting}
      />
    </section>
  );
};

export default WorkingGroups;
