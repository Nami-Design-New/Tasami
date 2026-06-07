import { useMemo, useState } from "react";
import { Badge } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import useGetNationalities from "../../../hooks/countries/useGetNationalities";
import useGetCities from "../../../hooks/dashboard/regions/useGetCities";
import useGetCountries from "../../../hooks/dashboard/regions/useGetCountries";
import useGetRegions from "../../../hooks/dashboard/regions/useGetRegions";
import useGetSubscriptionCommunity from "../../../hooks/dashboard/subscription/community/useGetSubscriptionCommunity";
import useGetPackages from "../../../hooks/dashboard/website-managment/packages/useGetPackages";
import ColumnChart from "../../../ui/dash-board/charts/ColumnChart";
import { columnHelper } from "../../../ui/datatable/adapters/tanstackAdapter";
import { usePersistedTableState } from "../../../ui/datatable/hooks/usePersistedTableState";
import DataTable from "../../../ui/datatable/ui/DataTable";
import { PAGE_SIZE } from "../../../utils/constants";

const getGenderTypes = (t) => [
  { id: 1, value: "male", label: t("male") },
  { id: 2, value: "female", label: t("female") },
];

const getAccountStatus = (t) => [
  { id: 1, value: "active", label: t("userAccountsStatus.active") },
  { id: 2, value: "inactive", label: t("userAccountsStatus.in_active") },
  { id: 3, value: "blocked", label: t("userAccountsStatus.stopped") },
];

const getCommunityStatus = (t) => [
  { id: 1, value: "1", label: t("dashboard.communities.active") },
  { id: 2, value: "0", label: t("dashboard.communities.inactive") },
];

const Communities = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState(null);
  const [filters, setFilters] = useState({});

  usePersistedTableState({
    key: "communities-table",
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

  const { subscriptionCommunity, currentPage, lastPage, isLoading } =
    useGetSubscriptionCommunity(search, page, pageSize, sortConfig, filters);

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

  const usersSeries = [
    {
      name: t("dashboard.communities.accountsCount"),
      data:
        subscriptionCommunity?.packages?.map((item) => item.total_users) || [],
    },
    {
      name: t("dashboard.communities.communitiesCount"),
      data:
        subscriptionCommunity?.packages?.map(
          (item) => item.communities_count,
        ) || [],
    },
    {
      name: t("dashboard.communities.members"),
      data:
        subscriptionCommunity?.packages?.map(
          (item) => item.communities_members,
        ) || [],
    },
    {
      name: t("dashboard.communities.views"),
      data:
        subscriptionCommunity?.packages?.map(
          (item) => item.communities_count,
        ) || [],
    },
    {
      name: t("dashboard.communities.posts"),
      data:
        subscriptionCommunity?.packages?.map(
          (item) => item.communities_posts,
        ) || [],
    },
    {
      name: t("dashboard.communities.consultations"),
      data:
        subscriptionCommunity?.packages?.map(
          (item) => item.communities_consultations,
        ) || [],
    },
    {
      name: t("dashboard.communities.meetings"),
      data:
        subscriptionCommunity?.packages?.map(
          (item) => item.communities_meetings,
        ) || [],
    },
  ];

  const usersOptions = {
    chart: { type: "bar", height: 350, toolbar: { show: true } },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "12%",
        endingShape: "rounded",
        borderRadius: 5,
        borderRadiusApplication: "end",
        distributed: false,
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories:
        subscriptionCommunity?.packages?.map((item) => item.package) || [],
      labels: { style: { fontSize: "14px" } },
    },
    yaxis: { labels: { style: { fontSize: "12px" } } },
    colors: [
      "#0070C0",
      "#00B0F0",
      "#92D050",
      "#ED7D31",
      "#FFC000",
      "#D9D9D9",
      "#1F4E78",
      "#A05A2C",
    ],
    tooltip: {
      y: {
        formatter: (val) => `${val} ${t("dashboard.communities.programs")}`,
      },
    },
    legend: { position: "top", horizontalAlign: "center" },
  };

  const data = useMemo(
    () =>
      subscriptionCommunity?.data?.map((community) => {
        const firstName = community?.user?.first_name ?? "";
        const lastName = community?.user?.last_name ?? "";
        const fallbackTitle = [firstName, lastName].filter(Boolean).join(" ");

        return {
          id: community?.id,
          user_id: community?.user?.id,
          first_name: firstName,
          last_name: lastName,
          gender: community?.user?.gender,
          gender_text: community?.user?.gender_text,
          account_code: community?.user?.account_code,
          created_at: community?.created_at,
          account_type: community?.user?.account_type,
          accountStatus: community?.user?.status,
          accountStatusText: community?.user?.status_text,
          nationality: community?.user?.nationality?.title,
          region_id: community?.user?.region_id?.title,
          country_id: community?.user?.country_id?.title,
          city_id: community?.user?.city_id?.title,
          communityTitle: community?.title || fallbackTitle || "-",
          communityStatus: community?.is_active ? "1" : "0",
          user_count: community?.user_count,
          views: community?.views,
          posts_count: community?.posts_count,
          consultations_count: community?.consultations_count,
          meets_count: community?.meets_count,
        };
      }) || [],
    [subscriptionCommunity?.data],
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("first_name", {
        header: t("dashboard.communities.firstName"),
        cell: (info) => info.getValue() || "-",
        enableSorting: true,
      }),
      columnHelper.accessor("last_name", {
        header: t("dashboard.communities.lastName"),
        cell: (info) => info.getValue() || "-",
        enableSorting: true,
      }),
      columnHelper.accessor("gender", {
        header: t("dashboard.communities.gender"),
        cell: (info) => info.row.original.gender_text || "-",
        enableSorting: true,
        enableFiltering: true,
      }),
      columnHelper.accessor("account_code", {
        header: t("dashboard.communities.accountNumber"),
        cell: (info) => (
          <Link
            to={`/dashboard/user-details/${info?.row.original.user_id}`}
            className={info.getValue() ? "link-styles" : ""}
          >
            {info.getValue() || "-"}
          </Link>
        ),
        enableSorting: true,
      }),
      columnHelper.accessor("created_at", {
        header: t("dashboard.communities.date"),
        cell: (info) => info.getValue() || "-",
        enableSorting: true,
        enableFiltering: true,
      }),
      columnHelper.accessor("account_type", {
        header: t("dashboard.communities.accountType"),
        cell: (info) => info.getValue() || "-",
        enableSorting: true,
        enableFiltering: true,
      }),
      columnHelper.accessor("accountStatus", {
        header: t("dashboard.communities.accountStatus"),
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
              {info.row.original.accountStatusText || "-"}
            </Badge>
          );
        },
        enableSorting: true,
        enableFiltering: true,
      }),
      columnHelper.accessor("nationality", {
        header: t("dashboard.communities.nationality"),
        cell: (info) => info.getValue() || "-",
        enableSorting: true,
        enableFiltering: true,
      }),
      columnHelper.accessor("region_id", {
        header: t("dashboard.communities.region"),
        cell: (info) => info.getValue() || "-",
        enableSorting: true,
        enableFiltering: true,
      }),
      columnHelper.accessor("country_id", {
        header: t("dashboard.communities.sector"),
        cell: (info) => info.getValue() || "-",
        enableSorting: true,
        enableFiltering: true,
      }),
      columnHelper.accessor("city_id", {
        header: t("dashboard.communities.city"),
        cell: (info) => info.getValue() || "-",
        enableSorting: true,
        enableFiltering: true,
      }),
      columnHelper.accessor("communityTitle", {
        header: t("dashboard.communities.communityTitle"),
        cell: (info) => (
          <Link
            to={`/dashboard/communities-details/${info?.row.original.id}`}
            className="link-styles"
          >
            {info.getValue() || "-"}
          </Link>
        ),
        enableSorting: true,
      }),
      columnHelper.accessor("communityStatus", {
        header: t("dashboard.communities.communityStatus"),
        cell: (info) => {
          const isActive = info.getValue() === "1";
          const communityStatus = isActive ? "active" : "inactive";
          const badgeColor = isActive ? "#28a745" : "#007bff";

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
              {t(`dashboard.communities.${communityStatus}`)}
            </Badge>
          );
        },
        enableSorting: true,
        enableFiltering: true,
      }),
      columnHelper.accessor("user_count", {
        header: t("dashboard.communities.membersCount"),
        cell: (info) => info.getValue() ?? "-",
        enableSorting: true,
      }),
      columnHelper.accessor("views", {
        header: t("dashboard.communities.views"),
        cell: (info) => info.getValue() ?? "-",
        enableSorting: true,
      }),
      columnHelper.accessor("posts_count", {
        header: t("dashboard.communities.posts"),
        cell: (info) => info.getValue() ?? "-",
        enableSorting: true,
      }),
      columnHelper.accessor("consultations_count", {
        header: t("dashboard.communities.consultations"),
        cell: (info) => info.getValue() ?? "-",
        enableSorting: true,
      }),
      columnHelper.accessor("meets_count", {
        header: t("dashboard.communities.meetings"),
        cell: (info) => info.getValue() ?? "-",
        enableSorting: true,
      }),
    ],
    [t],
  );

  const handleSortChange = (sortBy, sortOrder) => {
    setSortConfig(sortBy && sortOrder ? { sortBy, sortOrder } : null);
  };

  const communitiesFilterConfig = {
    gender: {
      id: "gender",
      type: "select",
      label: { en: "Gender" },
      options: getGenderTypes(t),
    },
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
    accountStatus: {
      id: "accountStatus",
      type: "select",
      label: { en: "Account Status" },
      options: getAccountStatus(t),
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
    communityStatus: {
      id: "communityStatus",
      type: "select",
      label: { en: "Community Status" },
      options: getCommunityStatus(t),
    },
  };

  return (
    <section className="mt-5">
      <div className="row">
        <div className="col-12">
          <ColumnChart
            series={usersSeries}
            options={usersOptions}
            title={t("dashboard.communities.title")}
          />
        </div>
        <div className="col-12">
          <DataTable
            title={t("dashboard.communities.title")}
            data={data}
            columns={columns}
            loading={isLoading}
            filterConfig={communitiesFilterConfig}
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
              searchPlaceholder: t("dashboard.communities.searchPlaceholder"),
              debounceMs: 500,
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Communities;
