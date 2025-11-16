import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Badge } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router";
import ColumnChart from "../../ui/dash-board/charts/ColumnChart";
import Header from "../../ui/ModelComponent/Header";
import ReusableDataTable from "../../ui/table/ReusableDataTable";
import TablePagination from "../../ui/table/TablePagentaion";
import useGetWorkingGroupdetails from "../../hooks/dashboard/workingGroups/useGetWorkingGroupDetails";
import Loading from "../../ui/loading/Loading";
import { PAGE_SIZE } from "../../utils/constants";

const columnHelper = createColumnHelper();

const WokingGroupDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams();

  // -----------------------------
  // Chart categories
  // -----------------------------
  const usersCategories = [
    t("dashboard.workGroupDetails.charts.total"),
    t("dashboard.workGroupDetails.charts.active"),
    t("dashboard.workGroupDetails.charts.inactive"),
    t("dashboard.workGroupDetails.charts.stopped"),
  ];

  const activeAccountsoptions = {
    chart: { type: "bar", height: 250, toolbar: { show: true } },
    grid: { show: false },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "20%",
        borderRadius: 5,
        borderRadiusApplication: "around",
        distributed: true,
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: usersCategories,
      labels: { style: { fontSize: "14px" } },
    },
    yaxis: { labels: { style: { fontSize: "12px" } } },
    colors: ["#8c137e", "#007BFF", "#FFC107", "#28A745"],
    tooltip: {
      y: {
        formatter: (val) =>
          `${val} ${t("dashboard.workGroupDetails.charts.total")}`,
      },
    },
    legend: { position: "top", horizontalAlign: "center" },
  };
  // -----------------------------
  // Pagination State
  // -----------------------------
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);

  // -----------------------------
  // Data Fetch
  // -----------------------------
  const {
    workinGroupData,
    workingGoupDetails,
    workingMembers,
    currentPage,
    lastPage,
    isLoading,
  } = useGetWorkingGroupdetails(id, "", page, pageSize);

  // -----------------------------
  // Table Columns
  // -----------------------------
  const columns = useMemo(
    () => [
      columnHelper.accessor("first_name", {
        header: t("dashboard.workGroupDetails.columns.firstName"),
      }),
      columnHelper.accessor("family_name", {
        header: t("dashboard.workGroupDetails.columns.familyName"),
      }),
      columnHelper.accessor("code", {
        header: t("dashboard.workGroupDetails.columns.code"),
        cell: (info) => (
          <Link
            to={`/dashboard/employee-details/${info.getValue()}`}
            className="link-styles"
          >
            {info.getValue()}
          </Link>
        ),
      }),
      columnHelper.accessor("job_title", {
        header: t("dashboard.workGroupDetails.columns.jobTitle"),
      }),
      columnHelper.accessor("nationality.title", {
        header: t("dashboard.workGroupDetails.columns.nationality"),
      }),
      columnHelper.accessor("region_id.title", {
        header: t("dashboard.workGroupDetails.columns.region"),
      }),
      columnHelper.accessor("country_id.title", {
        header: t("dashboard.workGroupDetails.columns.country"),
      }),
      columnHelper.accessor("city_id.title", {
        header: t("dashboard.workGroupDetails.columns.city"),
      }),
      columnHelper.accessor("status", {
        header: t("dashboard.workGroupDetails.columns.status"),
        cell: (info) => {
          const value = info.getValue();
          const colorMap = {
            active: "#28a745",
            inactive: "#007bff",
            stopped: "#dc3545",
            pending: "#ffc107",
          };
          return (
            <Badge
              pill
              className="custom-badge"
              style={{
                backgroundColor: colorMap[value] || "#6c757d",
                color: "#fff",
              }}
            >
              {t(`dashboard.workGroupDetails.status.${value}`)}
            </Badge>
          );
        },
      }),
      columnHelper.accessor("status_date", {
        header: t("dashboard.workGroupDetails.columns.statusDate"),
      }),
      columnHelper.accessor("status_time", {
        header: t("dashboard.workGroupDetails.columns.statusTime"),
      }),
    ],
    [t]
  );

  if (isLoading) return <Loading />;

  // -----------------------------
  // Chart Data Mappings
  // -----------------------------
  let chartData;
  if (workingGoupDetails.length > 0) {
    const [customer_services, executives, leaders, managers, supervisors] =
      workingGoupDetails;

    chartData = [
      {
        title: t("dashboard.workGroupDetails.charts.executives"),
        series: [
          {
            name: t("dashboard.workGroupDetails.charts.executives"),
            data: [
              executives.total,
              executives.active,
              executives.inactive,
              executives.stopped,
            ],
          },
        ],
      },
      {
        title: t("dashboard.workGroupDetails.charts.leaders"),
        series: [
          {
            name: t("dashboard.workGroupDetails.charts.leaders"),
            data: [
              leaders.total,
              leaders.active,
              leaders.inactive,
              leaders.stopped,
            ],
          },
        ],
      },
      {
        title: t("dashboard.workGroupDetails.charts.managers"),
        series: [
          {
            name: t("dashboard.workGroupDetails.charts.managers"),
            data: [
              managers.total,
              managers.active,
              managers.inactive,
              managers.stopped,
            ],
          },
        ],
      },
      {
        title: t("dashboard.workGroupDetails.charts.supervisors"),
        series: [
          {
            name: t("dashboard.workGroupDetails.charts.supervisors"),
            data: [
              supervisors.total,
              supervisors.active,
              supervisors.inactive,
              supervisors.stopped,
            ],
          },
        ],
      },
      {
        title: t("dashboard.workGroupDetails.charts.customerService"),
        series: [
          {
            name: t("dashboard.workGroupDetails.charts.customerService"),
            data: [
              customer_services.total,
              customer_services.active,
              customer_services.inactive,
              customer_services.stopped,
            ],
          },
        ],
      },
    ];
  }

  console.log(workingMembers);
  console.log(workingGoupDetails);
  console.log(workinGroupData);
  const { name } = workinGroupData;

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <section>
      <div className="d-flex align-items-center w-100 px-2 justify-content-between">
        <Header title={t("dashboard.workGroupDetails.title", { name })} />{" "}
      </div>

      <div className="row">
        {/* Charts Section */}
        {chartData?.map((chart, i) => (
          <div key={i} className="col-12 col-lg-6 col-xxl-4 p-2">
            <ColumnChart
              title={chart.title}
              series={chart.series}
              options={activeAccountsoptions}
              height={250}
            />
          </div>
        ))}

        {/* Table Section */}
        <div className="col-12 p-2">
          <ReusableDataTable
            data={workingMembers || []}
            columns={columns}
            currentPage={currentPage}
            lastPage={lastPage}
            setPage={setPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            title={t("dashboard.workGroupDetails.tableTitle", { name })}
            searchPlaceholder={t(
              "dashboard.workGroupDetails.searchPlaceholder"
            )}
            filter={false}
            isLoading={isLoading}
          >
            {/*  Pagination for Server Data */}
            <TablePagination
              currentPage={currentPage}
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

export default WokingGroupDetails;
