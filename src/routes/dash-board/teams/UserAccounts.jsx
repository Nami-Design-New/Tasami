import { useMemo, useState } from "react";
import { Badge } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import useGetCities from "../../../hooks/dashboard/regions/useGetCities";
import useGetCountries from "../../../hooks/dashboard/regions/useGetCountries";
import useGetRegions from "../../../hooks/dashboard/regions/useGetRegions";
import useGetUsersAccounts from "../../../hooks/dashboard/subscription/useGetUsersAccounts";
import useGetPackages from "../../../hooks/dashboard/website-managment/packages/useGetPackages";
import ColumnChart from "../../../ui/dash-board/charts/ColumnChart";
import { columnHelper } from "../../../ui/datatable/adapters/tanstackAdapter";
import { usePersistedTableState } from "../../../ui/datatable/hooks/usePersistedTableState";
import DataTable from "../../../ui/datatable/ui/DataTable";
import { PAGE_SIZE } from "../../../utils/constants";
import useGetNationalities from "../../../hooks/countries/useGetNationalities";

const getGenderTypes = (t) => [
  { id: 1, value: "male", label: t("male") },
  { id: 2, value: "female", label: t("female") },
];
const getUserAccountsStatus = (t) => [
  { id: 1, value: "active", label: t("userAccountsStatus.active") },
  { id: 2, value: "in_active", label: t("userAccountsStatus.in_active") },
  { id: 3, value: "stopped", label: t("userAccountsStatus.stopped") },
];
const UserAccounts = () => {
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
    key: "users-table",
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

  const { usersAccounts, currentPage, lastPage, isLoading } =
    useGetUsersAccounts(search, page, pageSize, sortConfig, filters);

  const series = [
    {
      name: t("dashboard.userAccounts.totalAccounts"),
      data: usersAccounts?.packages?.map((item) => item.total_users) || [],
    },
    {
      name: t("dashboard.userAccounts.activeAccounts"),
      data: usersAccounts?.packages?.map((item) => item.active_users) || [],
    },
    {
      name: t("dashboard.userAccounts.inactiveAccounts"),
      data: usersAccounts?.packages?.map((item) => item.inactive_users) || [],
    },
    {
      name: t("dashboard.userAccounts.suspendedAccounts"),
      data: usersAccounts?.packages?.map((item) => item.stopped_users) || [],
    },
  ];

  const UseresAccountsOptions = {
    chart: { type: "bar", height: 350, toolbar: { show: true } },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "12%",
        endingShape: "rounded",
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: usersAccounts?.packages?.map((item) => item.package) || [],
      labels: { style: { fontSize: "14px" } },
    },
    yaxis: { labels: { style: { fontSize: "12px" } } },
    colors: ["#8c137e", "#28A745", "#007BFF", "#DC3545"],
    tooltip: {
      y: {
        formatter: (val) => `${val} ${t("dashboard.userAccounts.programs")}`,
      },
    },
    legend: { position: "top", horizontalAlign: "center" },
  };

  // -----------------------------
  // Fetch cascading filter data
  // -----------------------------
  const { regions } = useGetRegions();
  const { countries } = useGetCountries(
    filters.region_id_title,
    "off",
    !!filters.region_id_title,
  );
  const { cities } = useGetCities(
    filters.country_id_title,
    "off",
    !!filters.country_id_title,
  );

  const { nationalities } = useGetNationalities("", "off");
  const { packages } = useGetPackages("", 1, 50);

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: t("dashboard.userAccounts.name"),
        cell: (info) =>
          `${
            info.row.original.first_name && info.row.original.last_name
              ? `${info.row.original.first_name} ${info.row.original.last_name}`
              : "-"
          }`,
        enableSorting: true,
      }),
      columnHelper.accessor("account_code", {
        header: t("dashboard.userAccounts.accountNumber"),
        cell: (info) => (
          <Link
            to={`/dashboard/user-details/${info?.row?.original.id}`}
            className="link-styles"
            style={{
              textDecoration: info.getValue() ? "underline" : "none",
            }}
          >
            {info.getValue() || "-"}
          </Link>
        ),
        enableSorting: true,
      }),
      columnHelper.accessor("account_type", {
        header: t("dashboard.userAccounts.accountType"),
        cell: (info) => info.getValue() || "-",
        enableSorting: true,
        enableFiltering: true,
      }),
      columnHelper.accessor("birthdate", {
        header: t("dashboard.userAccounts.birthDate"),
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("created_at", {
        header: t("dashboard.userAccounts.createDate"),
        cell: (info) => info.getValue() || "-",
        enableSorting: true,
        enableFiltering: true,
      }),
      columnHelper.accessor("gender", {
        header: t("dashboard.userAccounts.gender"),
        cell: (info) => t(`${info.getValue()}`) || "-",
        enableSorting: true,
        enableFiltering: true,
      }),
      columnHelper.accessor("beneficiary_points", {
        header: t("dashboard.userAccounts.beneficiaryPoints"),
        cell: (info) => info.getValue() || "-",
        enableSorting: true,
      }),
      columnHelper.accessor("helper_points", {
        header: t("dashboard.userAccounts.assistanceProviderPoints"),
        cell: (info) => info.getValue() || "-",
        enableSorting: true,
      }),
      columnHelper.accessor("nationality.title", {
        header: t("dashboard.userAccounts.nationality"),
        cell: (info) => info.getValue() || "-",
        enableSorting: true,
        enableFiltering: true,
      }),
      columnHelper.accessor("region_id.title", {
        header: t("dashboard.userAccounts.region"),
        cell: (info) => info.getValue() || "-",
        enableSorting: true,
        enableFiltering: true,
      }),
      columnHelper.accessor("country_id.title", {
        header: t("dashboard.userAccounts.sector"),
        cell: (info) => info.getValue() || "-",
        enableSorting: true,
        enableFiltering: true,
      }),
      columnHelper.accessor("city_id.title", {
        header: t("dashboard.userAccounts.city"),
        cell: (info) => info.getValue() || "-",
        enableSorting: true,
        enableFiltering: true,
      }),
      columnHelper.accessor("subscription_start_date", {
        header: t("dashboard.userAccounts.subscriptionStart"),
        cell: (info) => info.getValue() || "-",
        enableSorting: true,
      }),
      columnHelper.accessor("subscription_end_date", {
        header: t("dashboard.userAccounts.subscriptionEnd"),
        cell: (info) => info.getValue() || "-",
        enableSorting: true,
      }),
      columnHelper.accessor("status", {
        header: t("dashboard.userAccounts.status"),
        cell: (info) => {
          let badgeColor;
          const value = info.getValue();
          switch (info.getValue()) {
            case "active":
              badgeColor = "#28a745";
              break;
            case "inactive":
              badgeColor = "#007bff";
              break;
            case "suspended":
              badgeColor = "#dc3545";
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
                fontWeight: "400",
              }}
            >
              {t(`userAccountsStatus.${value}`)}
            </Badge>
          );
        },
        enableSorting: true,
        enableFiltering: true,
      }),
      columnHelper.accessor("account_status_date", {
        header: t("dashboard.userAccounts.statusDate"),
        cell: (info) => info.getValue() || "-",
        enableSorting: true,
      }),
      columnHelper.accessor("account_status_time", {
        header: t("dashboard.userAccounts.statusTime"),
        cell: (info) => (
          <div>
            {info.getValue() === null
              ? t("dashboard.userAccounts.noEvaluation")
              : info.getValue() || "-"}
          </div>
        ),
        enableSorting: true,
      }),
    ],
    [t],
  );

  // ----------------------------------
  // HANDLERS
  // ----------------------------------
  const handleSortChange = (sortBy, sortOrder) => {
    setSortConfig(sortBy && sortOrder ? { sortBy, sortOrder } : null);
  };
  const usersFilterConfig = {
    gender: {
      id: "gender",
      type: "select",
      label: { en: "gender" },
      options: getGenderTypes(t),
    },
    status: {
      id: "status",
      type: "select",
      label: { en: "status" },
      options: getUserAccountsStatus(t),
    },
    account_type: {
      id: "account_type",
      type: "select",
      label: { en: "Package" },
      options: packages?.map((pack) => ({
        value: pack?.id,
        label: pack?.title,
      })),
    },
    nationality_title: {
      id: "nationality_title",
      type: "select",
      label: { en: "Nationality" },
      options: nationalities?.data?.map((nat) => ({
        value: nat?.id,
        label: nat?.title,
      })),
    },
    region_id_title: {
      id: "region_id_title",
      type: "select",
      label: { en: "Region" },
      options: regions.map((reg) => ({
        value: reg?.id,
        label: reg?.title,
      })),
    },
    country_id_title: {
      id: "country_id_title",
      type: "select",
      label: { en: "Country" },
      options: countries.map((reg) => ({
        value: reg?.id,
        label: reg?.title,
      })),
    },
    city_id_title: {
      id: "city_id_title",
      type: "select",
      label: { en: "City" },
      options: cities.map((reg) => ({
        value: reg?.id,
        label: reg?.title,
      })),
    },
    created_at: {
      type: "date",
      mode: "range",
    },
  };

  return (
    <section className="mt-5">
      <div className="row">
        <div className="col-12 p-2">
          <ColumnChart
            series={series}
            options={UseresAccountsOptions}
            title={t("dashboard.userAccounts.usersAnalytics")}
            height={285}
          />
        </div>
        <div className="col-12 p-2">
          <DataTable
            title={t("dashboard.userAccounts.accounts")}
            data={usersAccounts?.data || []}
            columns={columns}
            loading={isLoading}
            filterConfig={usersFilterConfig}
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
export default UserAccounts;
