// export default Teams;
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Badge } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

import useGetNationalities from "../../../hooks/countries/useGetNationalities";
import useGetCities from "../../../hooks/dashboard/regions/useGetCities";
import useGetCountries from "../../../hooks/dashboard/regions/useGetCountries";
import useGetRegions from "../../../hooks/dashboard/regions/useGetRegions";
import useGetRoles from "../../../hooks/dashboard/shared/useGetRoles";
import useGetTeam from "../../../hooks/dashboard/teams/useGetTeam";
import ColumnChart from "../../../ui/dash-board/charts/ColumnChart";
import { usePersistedTableState } from "../../../ui/datatable/hooks/usePersistedTableState";
import DataTable from "../../../ui/datatable/ui/DataTable";
import { PAGE_SIZE } from "../../../utils/constants";

const columnHelper = createColumnHelper();

const getTeamsStatus = (t) => [
  { id: 1, value: "pending", label: t("userAccountsStatus.pending") },
  { id: 2, value: "active", label: t("userAccountsStatus.active") },
  { id: 2, value: "in_active", label: t("userAccountsStatus.in_active") },
  { id: 3, value: "stopped", label: t("userAccountsStatus.stopped") },
];

const Teams = () => {
  const { t } = useTranslation();

  // ----------------------------------
  // TABLE STATE (controlled)
  // ----------------------------------
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState(null);
  const [filters, setFilters] = useState({});

  usePersistedTableState({
    key: "teams-table",
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

  // -----------------------------------
  // Fetch data
  // -----------------------------------
  const { currentPage, lastPage, team, isLoading } = useGetTeam(
    search,
    page,
    pageSize,
    sortConfig,
    filters,
  );

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
  const { roles = [] } = useGetRoles();
  const { nationalities } = useGetNationalities("", "off");
  // -----------------------------------
  // Chart mapping (same logic)
  // -----------------------------------
  const usersCategories = [
    t("dashboard.team.charts.categories.total"),
    t("dashboard.team.charts.categories.active"),
    t("dashboard.team.charts.categories.inactive"),
    t("dashboard.team.charts.categories.stopped"),
    t("dashboard.team.charts.categories.canceled"),
  ];

  const activeAccountsoptions = {
    chart: {
      type: "bar",
      height: 250,
      toolbar: { show: true },
      distributed: true,
    },
    grid: { show: false },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "20%",
        borderRadius: 5,
        distributed: true,
      },
    },
    dataLabels: { enabled: false },
    xaxis: { categories: usersCategories },
    yaxis: { labels: { style: { fontSize: "12px" } } },
    colors: ["#8c137e", "#007BFF", "#FFC107", "#28A745", "#DC3545"],
  };

  const mapChart = (obj, name) => [
    {
      name,
      data: [
        obj?.total ?? 0,
        obj?.active ?? 0,
        obj?.inactive ?? 0,
        obj?.stopped ?? 0,
        0,
      ],
    },
  ];

  const executives = mapChart(
    team?.executive_count,
    t("dashboard.team.charts.executives"),
  );
  const leaders = mapChart(
    team?.leader_count,
    t("dashboard.team.charts.leaders"),
  );
  const managers = mapChart(
    team?.manager_count,
    t("dashboard.team.charts.managers"),
  );
  const supervisors = mapChart(
    team?.supervisor_count,
    t("dashboard.team.charts.supervisors"),
  );
  const customerService = mapChart(
    team?.customer_service_count,
    t("dashboard.team.charts.customer_service"),
  );

  // ----------------------------------
  // HANDLERS
  // ----------------------------------
  const handleSortChange = (sortBy, sortOrder) => {
    setSortConfig(sortBy && sortOrder ? { sortBy, sortOrder } : null);
  };
  // -----------------------------------
  // Table Data Mapping
  // -----------------------------------
  const data = useMemo(() => {
    return (team?.data ?? []).map((item) => ({
      id: item?.id,
      first_name: item?.first_name,
      last_name: item?.last_name,
      employee_code: item?.code,
      role_id: item?.role?.title,
      nationality: item.nationality?.title,
      city_id: item?.group?.city?.title,
      region_id: item?.group?.region?.title,
      country_id: item?.group?.country?.title,
      status: item?.status,
      status_date: item?.status_date,
      status_time: item?.status_time,
    }));
  }, [team]);

  // -----------------------------------
  // Table Columns (fully localized)
  // -----------------------------------
  const columns = useMemo(
    () => [
      columnHelper.accessor("first_name", {
        header: t("dashboard.team.columns.first_name"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("last_name", {
        header: t("dashboard.team.columns.last_name"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("employee_code", {
        header: t("dashboard.team.columns.employee_code"),
        cell: (info) => (
          <Link
            to={`/dashboard/employee-details/${info?.row?.original?.id}`}
            className="link-styles"
          >
            {info.getValue()}
          </Link>
        ),
      }),
      columnHelper.accessor("role_id", {
        header: t("dashboard.team.columns.job_level"),
        cell: (info) => info.getValue(),
        enableSorting: true,
        enableFiltering: true,
      }),
      columnHelper.accessor("nationality", {
        header: t("dashboard.team.columns.nationality"),
        cell: (info) => info.getValue(),
        enableSorting: true,
        enableFiltering: true,
      }),
      columnHelper.accessor("region_id", {
        header: t("dashboard.team.columns.region"),
        cell: (info) => info.getValue(),
        enableSorting: true,
        enableFiltering: true,
      }),
      columnHelper.accessor("country_id", {
        header: t("dashboard.team.columns.location"),
        cell: (info) => info.getValue(),
        enableSorting: true,
        enableFiltering: true,
      }),
      columnHelper.accessor("city_id", {
        header: t("dashboard.team.columns.city"),
        cell: (info) => info.getValue(),
        enableSorting: true,
        enableFiltering: true,
      }),
      columnHelper.accessor("status", {
        header: t("dashboard.team.columns.status"),
        cell: (info) => {
          let badgeColor;
          const value = info.row.original.status;
          switch (info.row.original.status) {
            case "active":
              badgeColor = "#28a745";
              break;
            case "inactive":
              badgeColor = "#007bff";
              break;
            case "suspended":
              badgeColor = "#dc3545";
              break;
            case "pending":
              badgeColor = "#FACC15";
              break;
            default:
              badgeColor = "#6c757d";
              break;
          }
          return (
            <Badge
              pill
              className="custom-badge"
              style={{
                "--badge-color": badgeColor,
                "--text-color": "#fff",
              }}
            >
              {t(`userAccountsStatus.${value}`)}
            </Badge>
          );
        },
        enableSorting: true,
        enableFiltering: true,
      }),
      columnHelper.accessor("status_date", {
        header: t("dashboard.team.columns.status_date"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("status_time", {
        header: t("dashboard.team.columns.status_time"),
        cell: (info) => info.getValue() || "-",
      }),
    ],
    [t],
  );

  const tasksFilterConfig = {
    nationality: {
      id: "nationality",
      type: "select",
      label: { en: "Nationality" },
      options: nationalities?.data?.map((nat) => ({
        value: nat?.id,
        label: nat?.title,
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
      options: getTeamsStatus(t),
    },
    role_id: {
      id: "role_id",
      type: "select",
      label: { en: "Action Level" },
      options: roles?.data?.map((role) => ({
        value: role?.id,
        label: role?.title,
      })),
    },
  };

  // -----------------------------------
  // Render
  // -----------------------------------
  return (
    <section>
      <div className="row">
        <div className="col-12 col-lg-6 col-xxl-4 p-2">
          <ColumnChart
            title={t("dashboard.team.charts.executives")}
            series={executives}
            options={activeAccountsoptions}
            height={250}
          />
        </div>
        <div className="col-12 col-lg-6 col-xxl-4 p-2">
          <ColumnChart
            title={t("dashboard.team.charts.leaders")}
            series={leaders}
            options={activeAccountsoptions}
            height={250}
          />
        </div>
        <div className="col-12 col-lg-6 col-xxl-4 p-2">
          <ColumnChart
            title={t("dashboard.team.charts.managers")}
            series={managers}
            options={activeAccountsoptions}
            height={250}
          />
        </div>
        <div className="col-12 col-lg-6 p-2">
          <ColumnChart
            title={t("dashboard.team.charts.supervisors")}
            series={supervisors}
            options={activeAccountsoptions}
            height={250}
          />
        </div>

        <div className="col-12 col-xxl-6 p-2">
          <ColumnChart
            title={t("dashboard.team.charts.customer_service")}
            series={customerService}
            options={activeAccountsoptions}
            height={250}
          />
        </div>

        <div className="col-12 p-2">
          <DataTable
            title={t("dashboard.team.title")}
            data={data}
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
              value: search,
              onChange: setSearch,
              searchPlaceholder: t("search"),
              debounceMs: 500,
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Teams;
