import { useMemo, useState } from "react";
import ReusableDataTable from "../../../ui/table/ReusableDataTable";
import { createColumnHelper } from "@tanstack/react-table";
import { Link } from "react-router";
import { Badge } from "react-bootstrap";
import ColumnChart from "../../../ui/dash-board/charts/ColumnChart";
import { PAGE_SIZE } from "../../../utils/constants";
import useGetHelpRequest from "../../../hooks/dashboard/subscription/helpRequest/useGetHelpRequest";
import { useTranslation } from "react-i18next";
import TablePagination from "../../../ui/table/TablePagentaion";

const columnHelper = createColumnHelper();
const Services = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const { helpRequests, currentPage, lastPage, isLoading } = useGetHelpRequest(
    "",
    page,
    PAGE_SIZE
  );
  // console.log("helpRequests ::", helpRequests , typeof(helpRequests.deleted_count));

  const userGrowthSeries = [
    {
      name: "المستخدمين",
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
    "طلبات المساعده",
    "بانتظار التنفيذ",
    "قيد التنفيذ",
    "مكتمله",
    "محذوفه",
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
        formatter: (val) => `${val} مستخدم`,
      },
    },
  };
  const columns = useMemo(
    () => [
      columnHelper.accessor("goal_code", {
        header: t("dashboard.personalGoals.table.serviceNumber"),
        cell: (info) => (
          <Link
            to={`/dashboard/services/${info?.row?.original.id}`}
            className="link-styles"
          >
            {info.getValue()}
          </Link>
        ),
      }),
      columnHelper.accessor("created_at", {
        header: t("dashboard.personalGoals.table.date"),
      }),
      columnHelper.accessor("user.account_code", {
        header: t("dashboard.personalGoals.table.accountNumber"),
        cell: (info) => (
          <Link
            to={`/dashboard/user-details/${info?.row?.original.user?.id}`}
            className="link-styles"
          >
            {info.getValue()}
          </Link>
        ),
      }),
      columnHelper.accessor("user.account_type", {
        header: t("dashboard.personalGoals.table.accountType"),
      }),
      // columnHelper.accessor("offers", {
      //   header: t("dashboard.personalGoals.table.offers"),
      // }),
      columnHelper.accessor("status", {
        header: " المرحله ",
        cell: (info) => {
          let badgeColor;
          switch (info.getValue()) {
            case "active":
              badgeColor = "#28a745";
              break;
            case "بانتظار التنفيذ":
              badgeColor = "#ffc107  ";
              break;
            case "قيد التنفيذ":
              badgeColor = "#007bff";
              break;
            case "paused":
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
              {info.getValue()}
            </Badge>
          );
        },
      }),

      columnHelper.accessor("user.identify_code", {
        header: t("dashboard.personalGoals.table.idNumber"),
      }),
      columnHelper.accessor("user.region_id.title", {
        header: t("dashboard.personalGoals.table.region"),
      }),
      columnHelper.accessor("user.country_id.title", {
        header: t("dashboard.personalGoals.table.location"),
      }),
      columnHelper.accessor("user.city_id.title", {
        header: t("dashboard.personalGoals.table.city"),
      }),
      columnHelper.accessor("category.title", {
        header: t("dashboard.personalGoals.table.field"),
      }),
      columnHelper.accessor("sub_category.title", {
        header: t("dashboard.personalGoals.table.specialization"),
      }),
      // columnHelper.accessor("numberOfUsers", {
      //   header: t("dashboard.personalGoals.table.numberOfUsers"),
      // }),
      // columnHelper.accessor("rate", {
      //   header: t("dashboard.personalGoals.table.rate"),
      // }),
    ],
    []
  );
  return (
    <section className="mt-5">
      <div className="row">
        <div className="col-12">
          <ColumnChart
            series={userGrowthSeries}
            options={userGrowthOptions}
            title={"طلبات المساعده"}
          />
        </div>
        <div className="col-12">
          <ReusableDataTable
            title="الخدمات"
            filter={false}
            data={helpRequests?.data || []}
            columns={columns}
            lang="ar"
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

export default Services;
