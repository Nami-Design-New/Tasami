import { useMemo, useState } from "react";
import ColumnChart from "../../../ui/dash-board/charts/ColumnChart";
import ReusableDataTable from "../../../ui/table/ReusableDataTable";
import { createColumnHelper } from "@tanstack/react-table";
import { Link } from "react-router";
import { Badge } from "react-bootstrap";
import { PAGE_SIZE } from "../../../utils/constants";
import useGetSubscriptionCommunity from "../../../hooks/dashboard/subscription/community/useGetSubscriptionCommunity";
import TablePagination from "../../../ui/table/TablePagentaion";

const columnHelper = createColumnHelper();

const Communities = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const { subscriptionCommunity, currentPage, lastPage, isLoading } =
    useGetSubscriptionCommunity("", page, PAGE_SIZE);

  const usersSeries = [
    {
      name: "عدد الحسابات",
      data:
        subscriptionCommunity?.packages?.map((item) => item.total_users) || [],
    },
    {
      name: "عدد المجتمعات",
      data:
        subscriptionCommunity?.packages?.map(
          (item) => item.communities_count
        ) || [],
    },
    {
      name: "الاعضاء",
      data:
        subscriptionCommunity?.packages?.map(
          (item) => item.communities_members
        ) || [],
    },
    {
      name: "المشاهدات",
      data: subscriptionCommunity?.packages?.map((item) => item.communities_count) || [],
    },
    // {
    //   name: "المحاورات",
    //   data: subscriptionCommunity?.packages?.map((item) => item.count) || [],
    // },
    {
      name: "المنشورات",
      data:
        subscriptionCommunity?.packages?.map(
          (item) => item.communities_posts
        ) || [],
    },
    {
      name: "الاستشارات",
      data:
        subscriptionCommunity?.packages?.map(
          (item) => item.communities_consultations
        ) || [],
    },
    {
      name: "اللقاءات",
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
        formatter: (val) => `${val} برامج`,
      },
    },
    legend: { position: "top", horizontalAlign: "center" },
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor("user.first_name", {
        header: "الاسم الأول",
        cell: (info) => info.getValue() || "-",
        enableSorting: false,
      }),
      columnHelper.accessor("user.last_name", {
        header: "اسم العائلة",
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("user.gender", {
        header: "الجنس",
        cell: (info) => info.getValue() || "-",
      }),

      columnHelper.accessor("user.account_code", {
        header: "رقم الحساب",
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
        header: "التاريخ",
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("user.account_type", {
        header: "نوع الحساب",
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("is_active", {
        header: "حالة الحساب",
        cell: (info) => {
          let badgeColor;
          switch (info.getValue()) {
            case true:
              badgeColor = "#28a745";
              break;
            case false:
              badgeColor = "#6c757d";
              break;
            // case "محذوف":
            //   badgeColor = "#dc3545"; // red
            //   break;
            default:
              badgeColor = "#c5cacfff"; // gray
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
              {info.getValue() ? "نشط " : "غير نشط"}
            </Badge>
          );
        },
      }),
      columnHelper.accessor("user.nationality.title", {
        header: "الجنسية",
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("user.region_id.title", {
        header: "الإقليم",
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("user.country_id.title", {
        header: "القطاع",
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("user.city_id.title", {
        header: "المدينة",
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("communityTitle", {
        header: "عنوان المجتمع",
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
      columnHelper.accessor("user_count", {
        header: "عدد الأعضاء",
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("views", {
        header: "المشاهدات",
        cell: (info) => info.getValue(),
      }),
      // columnHelper.accessor("111", {
      //   header: "المحاورات",
      //   cell: (info) => info.getValue(),
      // }),
      columnHelper.accessor("posts_count", {
        header: "المنشورات",
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("consultations_count", {
        header: "الاستشارات",
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("meets_count", {
        header: "اللقاءات",
        cell: (info) => info.getValue() || "-",
      }),
    ],
    []
  );

  return (
    <section className="mt-5">
      <div className="row">
        <div className="col-12">
          <ColumnChart
            series={usersSeries}
            options={usersOptions}
            title={"المجتمعات"}
          />
        </div>
        <div className="col-12">
          <ReusableDataTable
            title=" المجتمعات "
            filter={false}
            data={subscriptionCommunity?.data || []}
            columns={columns}
            lang="ar"
            initialPageSize={10}
            searchPlaceholder="البحث في عروض المساعده"
            currentPage={currentPage}
            lastPage={lastPage}
            setPage={setPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            isLoading={isLoading}
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
