import { useMemo, useState } from "react";
import { Badge } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router";
import useGetNationalities from "../../../hooks/countries/useGetNationalities";
import useGetCities from "../../../hooks/dashboard/regions/useGetCities";
import useGetCountries from "../../../hooks/dashboard/regions/useGetCountries";
import useGetRegions from "../../../hooks/dashboard/regions/useGetRegions";
import useGetSubscriptionResume from "../../../hooks/dashboard/subscription/resume/useGetSubscriptionResume";
import useGetPackages from "../../../hooks/dashboard/website-managment/packages/useGetPackages";
import CustomButton from "../../../ui/CustomButton";
import ColumnChart from "../../../ui/dash-board/charts/ColumnChart";
import { columnHelper } from "../../../ui/datatable/adapters/tanstackAdapter";
import { usePersistedTableState } from "../../../ui/datatable/hooks/usePersistedTableState";
import DataTable from "../../../ui/datatable/ui/DataTable";
import { PAGE_SIZE } from "../../../utils/constants";

const getGenderTypes = (t) => [
  { id: 1, value: "male", label: t("male") },
  { id: 2, value: "female", label: t("female") },
];

const getResumeStatus = (t) => [
  { id: 1, value: "active", label: t("userAccountsStatus.active") },
  { id: 2, value: "inactive", label: t("userAccountsStatus.in_active") },
  { id: 3, value: "blocked", label: t("userAccountsStatus.stopped") },
];

const Resuems = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState(null);
  const [filters, setFilters] = useState({});

  usePersistedTableState({
    key: "resumes-table",
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

  const { subscriptionResume, currentPage, lastPage, isLoading } =
    useGetSubscriptionResume(search, page, pageSize, sortConfig, filters);

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
  const { packages } = useGetPackages("", 1, 50);
  const { nationalities } = useGetNationalities("", "off");

  const data = useMemo(
    () =>
      subscriptionResume?.data?.map((resume) => ({
        id: resume?.id,
        first_name: resume?.first_name,
        last_name: resume?.last_name,
        gender: resume?.gender,
        gender_text: resume?.gender_text,
        account_code: resume?.account_code,
        account_type: resume?.account_type,
        created_at: resume?.created_at,
        helper_points: resume?.helper_points,
        status: resume?.status,
        status_text: resume?.status_text,
        nationality: resume?.nationality?.title,
        region_id: resume?.region_id?.title,
        country_id: resume?.country_id?.title,
        city_id: resume?.city_id?.title,
        members: resume?.members,
        followers: resume?.followers,
        user_experiences: resume?.user_experiences,
        user_documents: resume?.user_documents,
      })) || [],
    [subscriptionResume?.data],
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("first_name", {
        header: t("dashboard.resume.firstName"),
        cell: (info) => info.getValue() || "-",
        enableSorting: true,
      }),
      columnHelper.accessor("last_name", {
        header: t("dashboard.resume.lastName"),
        cell: (info) => info.getValue() || "-",
        enableSorting: true,
      }),
      columnHelper.accessor("gender", {
        header: t("dashboard.resume.gender"),
        cell: (info) => info.row.original.gender_text || "-",
        enableSorting: true,
        enableFiltering: true,
      }),
      columnHelper.accessor("account_code", {
        header: t("dashboard.resume.accountNumber"),
        cell: (info) => (
          <Link
            to={`/dashboard/user-details/${info?.row.original.id}`}
            className={info.getValue() ? "link-styles" : ""}
          >
            {info.getValue() || "-"}
          </Link>
        ),
        enableSorting: true,
      }),
      columnHelper.accessor("account_type", {
        header: t("dashboard.resume.accountType"),
        cell: (info) => info.getValue() || "-",
        enableSorting: true,
        enableFiltering: true,
      }),
      columnHelper.accessor("created_at", {
        header: t("dashboard.resume.date"),
        cell: (info) => info.getValue() || "-",
        enableSorting: true,
        enableFiltering: true,
      }),
      columnHelper.accessor("helper_points", {
        header: t("dashboard.resume.helperPoints"),
        cell: (info) => info.getValue() ?? "-",
        enableSorting: true,
      }),
      columnHelper.accessor("status", {
        header: t("dashboard.resume.status"),
        cell: (info) => {
          let badgeColor;
          switch (info.getValue()) {
            case "active":
              badgeColor = "#28a745";
              break;
            case "inactive":
              badgeColor = "#ffc107";
              break;
            case "blocked":
              badgeColor = "#007bff";
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
      columnHelper.accessor("nationality", {
        header: t("dashboard.resume.nationality"),
        cell: (info) => info.getValue() || "-",
        enableSorting: true,
        enableFiltering: true,
      }),
      columnHelper.accessor("region_id", {
        header: t("dashboard.resume.region"),
        cell: (info) => info.getValue() || "-",
        enableSorting: true,
        enableFiltering: true,
      }),
      columnHelper.accessor("country_id", {
        header: t("dashboard.resume.sector"),
        cell: (info) => info.getValue() || "-",
        enableSorting: true,
        enableFiltering: true,
      }),
      columnHelper.accessor("city_id", {
        header: t("dashboard.resume.city"),
        cell: (info) => info.getValue() || "-",
        enableSorting: true,
        enableFiltering: true,
      }),
      columnHelper.accessor("members", {
        header: t("dashboard.resume.members"),
        cell: (info) => info.getValue() ?? "-",
        enableSorting: true,
      }),
      columnHelper.accessor("followers", {
        header: t("dashboard.resume.followers"),
        cell: (info) => info.getValue() ?? "-",
        enableSorting: true,
      }),
      columnHelper.accessor("user_experiences", {
        header: t("dashboard.resume.experiences"),
        cell: (info) => info.getValue() ?? "-",
        enableSorting: true,
      }),
      columnHelper.accessor("user_documents", {
        header: t("dashboard.resume.documents"),
        cell: (info) => info.getValue() ?? "-",
        enableSorting: true,
      }),
      columnHelper.accessor("preview", {
        header: t("dashboard.resume.preview"),
        cell: (info) => (
          <Link
            to={`/dashboard/resuems/${info?.row.original.id}`}
            className="log px-2 py-1"
          >
            {t("dashboard.resume.preview")}
          </Link>
        ),
      }),
    ],
    [t],
  );

  const usersSeries = [
    {
      name: t("dashboard.resume.accountsCount"),
      data: subscriptionResume?.packages?.map((item) => item.total_users) || [],
    },
    {
      name: t("dashboard.resume.experiences"),
      data: subscriptionResume?.packages?.map((item) => item.experiences) || [],
    },
    {
      name: t("dashboard.resume.documents"),
      data: subscriptionResume?.packages?.map((item) => item.documents) || [],
    },
    {
      name: t("dashboard.resume.members"),
      data:
        subscriptionResume?.packages?.map(
          (item) => item.active_community_members,
        ) || [],
    },
    {
      name: t("dashboard.resume.followers"),
      data: subscriptionResume?.packages?.map((item) => item.follows) || [],
    },
  ];

  const usersOptions = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: { show: true },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "20%",
        barHeight: "100%",
        endingShape: "rounded",
        borderRadius: 5,
        borderRadiusApplication: "end",
        distributed: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories:
        subscriptionResume?.packages?.map((item) => item.package) || [],
      labels: {
        style: {
          fontSize: "14px",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
        },
      },
    },
    colors: ["#214b92", "#22C55E", "#F97316", "#EF4444", "#3B82F6"],
    legend: {
      position: "top",
      horizontalAlign: "center",
    },
  };

  const handleSortChange = (sortBy, sortOrder) => {
    setSortConfig(sortBy && sortOrder ? { sortBy, sortOrder } : null);
  };

  const resumesFilterConfig = {
    gender: {
      id: "gender",
      type: "select",
      label: { en: "Gender" },
      options: getGenderTypes(t),
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
    created_at: {
      type: "date",
      mode: "range",
    },
    status: {
      id: "status",
      type: "select",
      label: { en: "Status" },
      options: getResumeStatus(t),
    },
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
  };

  return (
    <section className="mt-5">
      <div className="row">
        <div className="col-12 p-2">
          <ColumnChart
            title={t("dashboard.resume.title")}
            options={usersOptions}
            series={usersSeries}
          />
        </div>
        <div className="col-12 p-2">
          <DataTable
            title={t("dashboard.resume.title")}
            data={data}
            columns={columns}
            loading={isLoading}
            filterConfig={resumesFilterConfig}
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
        <div className="d-flex align-items-center gap-3 p-2 ">
          <CustomButton onClick={() => navigate("experiences")} size="large">
            {t("dashboard.resume.experience")}
          </CustomButton>
          <CustomButton onClick={() => navigate("documents")} size="large">
            {t("dashboard.resume.documents")}
          </CustomButton>
        </div>
      </div>
    </section>
  );
};

export default Resuems;
