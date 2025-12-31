import { useMemo, useState } from "react";
import ColumnChart from "../../../ui/dash-board/charts/ColumnChart";
import ReusableDataTable from "../../../ui/table/ReusableDataTable";
import { createColumnHelper } from "@tanstack/react-table";
import { Link } from "react-router";
import { Badge } from "react-bootstrap";
import { PAGE_SIZE } from "../../../utils/constants";
import useGetAssistantOffers from "../../../hooks/dashboard/subscription/assistantOffers/useGetAssistantOffers";
import TablePagination from "../../../ui/table/TablePagentaion";
import { useTranslation } from "react-i18next";

const columnHelper = createColumnHelper();

const Programs = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const { assistantOffersData, currentPage, lastPage, isLoading } =
    useGetAssistantOffers("", page, PAGE_SIZE);

  const usersSeries = [
    {
      name: t("dashboard.programs.assistantOffers"),
      data: ["450", "211", "150"],
    },
    { name: t("dashboard.programs.pending"), data: ["100", "30", "30"] },
    { name: t("dashboard.programs.inProgress"), data: ["110", "20", "60"] },
    { name: t("dashboard.programs.completed"), data: ["200", "100", "40"] },
    { name: t("dashboard.programs.deleted"), data: ["40", "30", "20"] },
  ];

  const usersCategories = [
    t("dashboard.programs.basicHelper"),
    t("dashboard.programs.premiumHelper"),
    t("dashboard.programs.leadersHelper"),
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
        columnWidth: "12%",
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
      categories: usersCategories,
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
    colors: ["#8c137e", "#007BFF", "#FFC107", "#28A745", "#DC3545"],
    tooltip: {
      y: {
        formatter: (val) =>
          `${val} ${t("dashboard.programs.assistantOffers")} `,
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "center",
    },
  };
  const columns = useMemo(
    () => [
      columnHelper.accessor("code", {
        header: t("dashboard.programs.service"),
        cell: (info) => (
          <Link
            to={`/dashboard/programs/${info?.row.original.id}`}
            className="link-styles"
          >
            {info.getValue()}
          </Link>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("created_at", {
        header: t("dashboard.programs.date"),
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("user.status", {
        header: t("dashboard.programs.status"),
        cell: (info) => {
          let badgeColor;
          switch (info.getValue()) {
            case "active":
              badgeColor = "#28a745";
              break;
            case "isPending":
              badgeColor = "#ffc107  ";
              break;
            case "قيد التنفيذ":
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
              {info.getValue() || "-"}
            </Badge>
          );
        },
      }),
      columnHelper.accessor("user.account_code", {
        header: t("dashboard.programs.accountNumber"),
        cell: (info) => (
          <Link
            to={`/dashboard/user-details/${info?.row?.original.user?.id}`}
            className={info.getValue() ? "link-styles" : ""}
          >
            {info.getValue() || "-"}
          </Link>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("user.account_type", {
        header: t("dashboard.programs.accountType"),
        cell: (info) => info.getValue() || "-",
        enableSorting: false,
      }),

      columnHelper.accessor("user.identify_code", {
        header: t("dashboard.programs.idNumber"),
        // cell: (info) => (
        //   <Link to={`/model/${info.getValue()}`} className="link-styles">
        //     {info.getValue()}
        //   </Link>
        // ),
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("category.title", {
        header: t("dashboard.programs.field"),
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("sub_category.title", {
        header: t("dashboard.programs.specialization"),
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("active_contracts", {
        header: t("dashboard.programs.activeContracts"),
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("completed_contracts", {
        header: t("dashboard.programs.completedContracts"),
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("price", {
        header: t("dashboard.programs.price"),
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("benefits", {
        header: t("dashboard.programs.beneficiaries"),
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("rate", {
        header: t("dashboard.programs.rate"),
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
            title={t("dashboard.programs.assistantOffers")}
          />
        </div>
        <div className="col-12">
          <ReusableDataTable
            title={t("dashboard.programs.assistantOffers")}
            filter={false}
            data={assistantOffersData?.data || []}
            columns={columns}
            lang="ar"
            initialPageSize={10}
            searchPlaceholder={t("dashboard.programs.searchInOffers")}
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

export default Programs;
