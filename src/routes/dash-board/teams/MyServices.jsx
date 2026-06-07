import { useMemo, useState } from "react";
import { Link } from "react-router";
import { Badge } from "react-bootstrap";
import ColumnChart from "../../../ui/dash-board/charts/ColumnChart";
import { PAGE_SIZE } from "../../../utils/constants";
import useGetHelpRequest from "../../../hooks/dashboard/subscription/helpRequest/useGetHelpRequest";
import { useTranslation } from "react-i18next";
import useGetCities from "../../../hooks/dashboard/regions/useGetCities";
import useGetCountries from "../../../hooks/dashboard/regions/useGetCountries";
import useGetRegions from "../../../hooks/dashboard/regions/useGetRegions";
import useGetMainCategories from "../../../hooks/dashboard/FiledsAndSpecialations/useGetMainCategories";
import useGetSubCategories from "../../../hooks/dashboard/FiledsAndSpecialations/useGetSubCategories";
import useGetPackages from "../../../hooks/dashboard/website-managment/packages/useGetPackages";
import { columnHelper } from "../../../ui/datatable/adapters/tanstackAdapter";
import { usePersistedTableState } from "../../../ui/datatable/hooks/usePersistedTableState";
import DataTable from "../../../ui/datatable/ui/DataTable";

const getServicesStatus = (t) => [
  { id: 1, value: "pending", label: t("dashboard.services.pending") },
  { id: 2, value: "active", label: t("dashboard.services.inProgress") },
  { id: 3, value: "paused", label: t("works.myTasks.statuses.paused") },
  { id: 4, value: "completed", label: t("dashboard.services.completed") },
  { id: 5, value: "deleted", label: t("dashboard.services.deleted") },
];

const Services = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState(null);
  const [filters, setFilters] = useState({});

  usePersistedTableState({
    key: "my-services-table",
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

  const { helpRequests, currentPage, lastPage, isLoading } = useGetHelpRequest(
    search,
    page,
    pageSize,
    sortConfig,
    filters,
  );

  const { regions } = useGetRegions();
  const { countries } = useGetCountries(
    filters.region_id,
    "off",
    !!filters.region_id,
  );
  const { cities } = useGetCities(
    filters.country_id,
    "off",
    !!filters.country_id,
  );
  const { mainCategories } = useGetMainCategories();
  const { subCategories } = useGetSubCategories("", 1, 50, filters.category);
  const { packages } = useGetPackages("", 1, 50);

  const userGrowthSeries = [
    {
      name: t("dashboard.services.users"),
      data: [
        helpRequests?.requests_count,
        helpRequests?.pending_count,
        helpRequests?.completed_count,
        helpRequests?.execution_count,
        helpRequests?.deleted_count,
      ],
      // data:[300,5000, 500 , 500,400]
    },
  ];
  const userGrowthCategories = [
    t("dashboard.services.helpRequests"),
    t("dashboard.services.pending"),
    t("dashboard.services.inProgress"),
    t("dashboard.services.completed"),
    t("dashboard.services.deleted"),
  ];
  const userGrowthOptions = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: { show: true },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: "10%",
        endingShape: "rounded",
        distributed: true,
      },
    },
    dataLabels: { enabled: false },
    xaxis: { categories: userGrowthCategories },
    yaxis: {},
    colors: ["#8c137e", "#007BFF", "#FFC107", "#28A745", "#DC3545"],
    tooltip: {
      y: {
        formatter: (val) => `${val} ${t("dashboard.services.users")}`,
      },
    },
  };

  const data = useMemo(
    () =>
      helpRequests?.data?.map((request) => ({
        id: request?.id,
        user_id: request?.user?.id,
        goal_code: request?.goal_code,
        created_at: request?.created_at,
        account_code: request?.user?.account_code,
        account_type: request?.user?.account_type,
        status: request?.status,
        status_text: request?.status_text,
        identify_code: request?.user?.identify_code,
        region_id: request?.user?.region_id?.title,
        country_id: request?.user?.country_id?.title,
        city_id: request?.user?.city_id?.title,
        category: request?.category?.title,
        sub_category: request?.sub_category?.title,
      })) || [],
    [helpRequests?.data],
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("goal_code", {
        header: t("dashboard.personalGoals.table.serviceNumber"),
        cell: (info) => (
          <Link
            to={`/dashboard/services/${info?.row?.original.id}`}
            className="link-styles"
          >
            {info.getValue() || "-"}
          </Link>
        ),
        enableSorting: true,
      }),
      columnHelper.accessor("created_at", {
        header: t("dashboard.personalGoals.table.date"),
        cell: (info) => info.getValue() || "-",
        enableSorting: true,
        enableFiltering: true,
      }),
      columnHelper.accessor("account_code", {
        header: t("dashboard.personalGoals.table.accountNumber"),
        cell: (info) => (
          <Link
            to={`/dashboard/user-details/${info?.row?.original?.user_id}`}
            className={info.getValue() ? "link-styles" : ""}
          >
            {info.getValue() || "-"}
          </Link>
        ),
      }),
      columnHelper.accessor("account_type", {
        header: t("dashboard.personalGoals.table.accountType"),
        cell: (info) => info.getValue() || "-",
        enableSorting: true,
        enableFiltering: true,
      }),
      columnHelper.accessor("status", {
        header: t("dashboard.services.status"),
        cell: (info) => {
          let badgeColor;
          switch (info.getValue()) {
            case "active":
              badgeColor = "#28a745";
              break;
            case "paused":
              badgeColor = "#ffc107  ";
              break;
            case "completed":
              badgeColor = "#007bff";
              break;
            case "deleted":
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
              {info.row.original.status_text || "-"}
            </Badge>
          );
        },
        enableSorting: true,
        enableFiltering: true,
      }),
      columnHelper.accessor("identify_code", {
        header: t("dashboard.personalGoals.table.idNumber"),
        cell: (info) => info.getValue() || "-",
        enableSorting: true,
      }),
      columnHelper.accessor("region_id", {
        header: t("dashboard.personalGoals.table.region"),
        cell: (info) => info.getValue() || "-",
        enableSorting: true,
        enableFiltering: true,
      }),
      columnHelper.accessor("country_id", {
        header: t("dashboard.personalGoals.table.location"),
        cell: (info) => info.getValue() || "-",
        enableSorting: true,
        enableFiltering: true,
      }),
      columnHelper.accessor("city_id", {
        header: t("dashboard.personalGoals.table.city"),
        cell: (info) => info.getValue() || "-",
        enableSorting: true,
        enableFiltering: true,
      }),
      columnHelper.accessor("category", {
        header: t("dashboard.personalGoals.table.field"),
        cell: (info) => info.getValue() || "-",
        enableSorting: true,
        enableFiltering: true,
      }),
      columnHelper.accessor("sub_category", {
        header: t("dashboard.personalGoals.table.specialization"),
        cell: (info) => info.getValue() || "-",
        enableSorting: true,
        enableFiltering: true,
      }),
    ],
    [t],
  );

  const servicesFilterConfig = {
    created_at: {
      type: "date",
      mode: "range",
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
    status: {
      id: "status",
      type: "select",
      label: { en: "Status" },
      options: getServicesStatus(t),
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
      options: countries.map((country) => ({
        value: country?.id,
        label: country?.title,
      })),
    },
    city_id: {
      id: "city_id",
      type: "select",
      label: { en: "City" },
      options: cities.map((city) => ({
        value: city?.id,
        label: city?.title,
      })),
    },
    category: {
      id: "category",
      type: "select",
      label: { en: "Field" },
      options: mainCategories?.data?.map((category) => ({
        value: category?.id,
        label: category?.title,
      })),
    },
    sub_category: {
      id: "sub_category",
      type: "select",
      label: { en: "Specialization" },
      options: subCategories?.map((subCategory) => ({
        value: subCategory?.id,
        label: subCategory?.title,
      })),
    },
  };

  const handleSortChange = (sortBy, sortOrder) => {
    setSortConfig(sortBy && sortOrder ? { sortBy, sortOrder } : null);
  };

  return (
    <section className="mt-5">
      <div className="row">
        <div className="col-12">
          <ColumnChart
            series={userGrowthSeries}
            options={userGrowthOptions}
            title={t("dashboard.services.helpRequests")}
          />
        </div>
        <div className="col-12">
          <DataTable
            title={t("dashboard.services.services")}
            data={data}
            columns={columns}
            loading={isLoading}
            filterConfig={servicesFilterConfig}
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

export default Services;
