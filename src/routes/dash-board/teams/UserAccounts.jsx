import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Badge } from "react-bootstrap";
import { Link } from "react-router";
import ColumnChart from "../../../ui/dash-board/charts/ColumnChart";
import ReusableDataTable from "../../../ui/table/ReusableDataTable";
import { useTranslation } from "react-i18next";
import useGetUsersAccounts from "../../../hooks/dashboard/subscription/useGetUsersAccounts";
import { PAGE_SIZE } from "../../../utils/constants";
import TablePagination from "../../../ui/table/TablePagentaion";
const columnHelper = createColumnHelper();
const UserAccounts = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const { usersAccounts, currentPage, lastPage, isLoading } =
    useGetUsersAccounts("", page, PAGE_SIZE);
  console.log("users accounts", usersAccounts);
  // localized chart data
  // const series = [
  //   {
  //     name: t("dashboard.userAccounts.totalAccounts"),
  //     data: ["5000", "1000", "800", "500"],
  //   },
  //   {
  //     name: t("dashboard.userAccounts.activeAccounts"),
  //     data: ["3000", "800", "700", "400"],
  //   },
  //   {
  //     name: t("dashboard.userAccounts.inactiveAccounts"),
  //     data: ["1200", "150", "80", "60"],
  //   },
  //   {
  //     name: t("dashboard.userAccounts.suspendedAccounts"),
  //     data: ["800", "50", "20", "40"],
  //   },
  // ];
  // const usersCategories = [
  //   t("dashboard.userAccounts.category.beneficiary"),
  //   t("dashboard.userAccounts.category.basic"),
  //   t("dashboard.userAccounts.category.premium"),
  //   t("dashboard.userAccounts.category.royal"),
  // ];
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
      }),
      columnHelper.accessor("account_code", {
        header: t("dashboard.userAccounts.accountNumber"),
        cell: (info) => (
          <Link
            to={`/dashboard/user-details/${info.getValue()}`}
            className="link-styles"
            style={{
              textDecoration: info.getValue() ? "underline" : "none",
            }}
          >
            {info.getValue() || "-"}
          </Link>
        ),
      }),
      columnHelper.accessor("account_type", {
        header: t("dashboard.userAccounts.accountType"),
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("birthdate", {
        header: t("dashboard.userAccounts.date"),
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("gender", {
        header: t("dashboard.userAccounts.gender"),
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("beneficiary_points", {
        header: t("dashboard.userAccounts.beneficiaryPoints"),
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("helper_points", {
        header: t("dashboard.userAccounts.assistanceProviderPoints"),
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("nationality.title", {
        header: t("dashboard.userAccounts.nationality"),
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("region_id.title", {
        header: t("dashboard.userAccounts.region"),
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("country_id.title", {
        header: t("dashboard.userAccounts.sector"),
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("city_id.title", {
        header: t("dashboard.userAccounts.city"),
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("subscription_start_date", {
        header: t("dashboard.userAccounts.subscriptionStart"),
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("subscription_end_date", {
        header: t("dashboard.userAccounts.subscriptionEnd"),
        cell: (info) => info.getValue() || "-",
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
              {value}
            </Badge>
          );
        },
      }),
      columnHelper.accessor("account_status_date", {
        header: t("dashboard.userAccounts.statusDate"),
        cell: (info) => info.getValue() || "-",
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
      }),
    ],
    [t]
  );
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
          <ReusableDataTable
            title={t("dashboard.userAccounts.accounts")}
            filter={false}
            data={usersAccounts?.data || []}
            columns={columns}
            lang="ar"
            initialPageSize={10}
            searchPlaceholder={t("dashboard.userAccounts.searchPlaceholder")}
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
export default UserAccounts;
