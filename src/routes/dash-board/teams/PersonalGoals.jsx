import { useMemo, useState } from "react";
import ReusableDataTable from "../../../ui/table/ReusableDataTable";
import { createColumnHelper } from "@tanstack/react-table";
import { Link } from "react-router";
import { Badge } from "react-bootstrap";
import ColumnChart from "../../../ui/dash-board/charts/ColumnChart";
import { useTranslation } from "react-i18next";
import { PAGE_SIZE } from "../../../utils/constants";
import useGetPersonalGoal from "../../../hooks/dashboard/subscription/personalGoal/useGetPersonalGoal";
import TablePagination from "../../../ui/table/TablePagentaion";

const columnHelper = createColumnHelper();
const PersonalGoals = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };
  const { personalGoal, currentPage, lastPage, isLoading } = useGetPersonalGoal(
    searchQuery,
    page,
    PAGE_SIZE
  );

  const userGrowthSeries = [
    {
      name: t("dashboard.personalGoals.chart.users"),
      data: [
        personalGoal?.goals_count,
        personalGoal?.pending_count,
        personalGoal?.completed_count,
        personalGoal?.execution_count,
        personalGoal?.deleted_count,
      ],
    },
  ];

  const userGrowthCategories = [
    t("dashboard.personalGoals.chart.categories.personalGoals"),
    t("dashboard.personalGoals.chart.categories.pending"),
    t("dashboard.personalGoals.chart.categories.inProgress"),
    t("dashboard.personalGoals.chart.categories.completed"),
    t("dashboard.personalGoals.chart.categories.deleted"),
  ];

  const userGrowthOptions = {
    chart: { type: "bar", height: 350, toolbar: { show: true } },
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
    colors: ["#8c137e", "#007BFF", "#FFC107", "#28A745", "#DC3545"],
    tooltip: {
      y: {
        formatter: (val) =>
          `${val} ${t("dashboard.personalGoals.chart.goalUnit")}`,
      },
    },
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor("goal_code", {
        header: t("dashboard.personalGoals.table.serviceNumber"),
        cell: (info) => (
          <Link
            to={`/dashboard/personal-goal/${info?.row?.original.id}`}
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
            to={`/dashboard/user-details/${info?.row?.original.user.id}`}
            className="link-styles"
          >
            {info.getValue()}
          </Link>
        ),
      }),
      columnHelper.accessor("user.account_type", {
        header: t("dashboard.personalGoals.table.accountType"),
      }),

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
    ],
    [t]
  );
  return (
    <section className="mt-5">
      <div className="row">
        <div className="col-12 p-2">
          <ColumnChart
            series={userGrowthSeries}
            options={userGrowthOptions}
            title={t("dashboard.personalGoals.title")}
          />
        </div>
        <div className="col-12 p-2">
          <ReusableDataTable
            title={t("dashboard.personalGoals.title")}
            filter={false}
            data={personalGoal?.data || []}
            columns={columns}
            lang="ar"
            initialPageSize={10}
            searchPlaceholder={t("search")}
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

export default PersonalGoals;
