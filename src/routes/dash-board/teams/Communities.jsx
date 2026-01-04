import { useMemo, useState } from "react";
import ColumnChart from "../../../ui/dash-board/charts/ColumnChart";
import ReusableDataTable from "../../../ui/table/ReusableDataTable";
import { createColumnHelper } from "@tanstack/react-table";
import { Link } from "react-router";
import { Badge } from "react-bootstrap";
import { PAGE_SIZE } from "../../../utils/constants";
import useGetSubscriptionCommunity from "../../../hooks/dashboard/subscription/community/useGetSubscriptionCommunity";
import TablePagination from "../../../ui/table/TablePagentaion";
import { useTranslation } from "react-i18next";

const columnHelper = createColumnHelper();

const Communities = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };
  const { subscriptionCommunity, currentPage, lastPage, isLoading } =
    useGetSubscriptionCommunity(searchQuery, page, PAGE_SIZE);

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
          (item) => item.communities_count
        ) || [],
    },
    {
      name: t("dashboard.communities.members"),
      data:
        subscriptionCommunity?.packages?.map(
          (item) => item.communities_members
        ) || [],
    },
    {
      name: t("dashboard.communities.views"),
      data:
        subscriptionCommunity?.packages?.map(
          (item) => item.communities_count
        ) || [],
    },
    {
      name: t("dashboard.communities.posts"),
      data:
        subscriptionCommunity?.packages?.map(
          (item) => item.communities_posts
        ) || [],
    },
    {
      name: t("dashboard.communities.consultations"),
      data:
        subscriptionCommunity?.packages?.map(
          (item) => item.communities_consultations
        ) || [],
    },
    {
      name: t("dashboard.communities.meetings"),
      data:
        subscriptionCommunity?.packages?.map(
          (item) => item.communities_meetings
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
      "#0070C0", // عدد الحسابات - dark blue
      "#00B0F0", // عدد المجتمعات - light blue
      "#92D050", // الإنشاء - green
      "#ED7D31", // المشاهدات - orange
      "#FFC000", // المحاورات - yellow
      "#D9D9D9", // المنشورات - light gray
      "#1F4E78", // الاستشارات - navy blue
      "#A05A2C", // اللقاءات - brown
    ],
    tooltip: {
      y: {
        formatter: (val) => `${val} ${t("dashboard.communities.programs")}`,
      },
    },
    legend: { position: "top", horizontalAlign: "center" },
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor("user.first_name", {
        header: t("dashboard.communities.firstName"),
        cell: (info) => info.getValue() || "-",
        enableSorting: false,
      }),
      columnHelper.accessor("user.last_name", {
        header: t("dashboard.communities.lastName"),
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("user.gender", {
        header: t("dashboard.communities.gender"),
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("user.account_code", {
        header: t("dashboard.communities.accountNumber"),
        cell: (info) => (
          <Link
            to={`/dashboard/user-details/${info?.row.original.user?.id}`}
            className="link-styles"
          >
            {info.getValue() || "-"}
          </Link>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("created_at", {
        header: t("dashboard.communities.date"),
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("user.account_type", {
        header: t("dashboard.communities.accountType"),
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("is_active", {
        header: t("dashboard.communities.accountStatus"),
        cell: (info) => {
          let badgeColor;
          const value = info?.row?.original?.user?.status;
          switch (value) {
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
      }),
      columnHelper.accessor("user.nationality.title", {
        header: t("dashboard.communities.nationality"),
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("user.region_id.title", {
        header: t("dashboard.communities.region"),
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("user.country_id.title", {
        header: t("dashboard.communities.sector"),
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("user.city_id.title", {
        header: t("dashboard.communities.city"),
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("communityTitle", {
        header: t("dashboard.communities.communityTitle"),
        cell: (info) => (
          <Link
            to={`/dashboard/communities-details/${info?.row.original.id}`}
            className="link-styles"
          >
            {info?.row.original.user?.first_name ||
            info?.row.original.user?.last_name
              ? `مجتمع ${info?.row.original.user?.first_name ?? ""} ${
                  info?.row.original.user?.last_name ?? ""
                }`
              : "-"}
          </Link>
        ),
      }),
      columnHelper.accessor("communityStatus", {
        header: t("dashboard.communities.communityStatus"),
        cell: (info) => {
          let badgeColor;
          let CommunityStatus;
          const value = info?.row?.original?.is_active;
          value ? (CommunityStatus = "active") : (CommunityStatus = "inactive");
          value ? (badgeColor = "#28a745") : (badgeColor = "#007bff");

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
              {t(`dashboard.communities.${CommunityStatus}`)}
            </Badge>
          );
        },
      }),
      columnHelper.accessor("user_count", {
        header: t("dashboard.communities.membersCount"),
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("views", {
        header: t("dashboard.communities.views"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("posts_count", {
        header: t("dashboard.communities.posts"),
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("consultations_count", {
        header: t("dashboard.communities.consultations"),
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("meets_count", {
        header: t("dashboard.communities.meetings"),
        cell: (info) => info.getValue() || "-",
      }),
    ],
    [t]
  );

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
          <ReusableDataTable
            title={t("dashboard.communities.title")}
            filter={false}
            data={subscriptionCommunity?.data || []}
            columns={columns}
            lang="ar"
            initialPageSize={10}
            searchPlaceholder={t("dashboard.communities.searchPlaceholder")}
            currentPage={currentPage}
            lastPage={lastPage}
            setPage={setPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
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
          </ReusableDataTable>
        </div>
      </div>
    </section>
  );
};

export default Communities;
