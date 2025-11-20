// export default Teams;
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Badge } from "react-bootstrap";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

import ColumnChart from "../../../ui/dash-board/charts/ColumnChart";
import ReusableDataTable from "../../../ui/table/ReusableDataTable";
import useGetTeam from "../../../hooks/dashboard/teams/useGetTeam";
import { PAGE_SIZE } from "../../../utils/constants";

const columnHelper = createColumnHelper();

const Teams = () => {
  const { t, i18n } = useTranslation();

  const lang = i18n.language; // "ar" or "en"

  // -----------------------------------
  // Pagination
  // -----------------------------------
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);

  // -----------------------------------
  // Fetch data
  // -----------------------------------
  const { currentPage, lastPage, team, isLoading } = useGetTeam(
    "",
    page,
    pageSize
  );

  // -----------------------------------
  // Chart mapping (same logic)
  // -----------------------------------
  const usersCategories = [
    t("dashboard.team.charts.categories.total"),
    t("dashboard.team.charts.categories.active"),
    t("dashboard.team.charts.categories.inactive"),
    t("dashboard.team.charts.categories.stopped"),
    t("dashboard.team.charts.categories.canceled"),
  ];

  const activeAccountsoptions = {
    chart: {
      type: "bar",
      height: 250,
      toolbar: { show: true },
      distributed: true,
    },
    grid: { show: false },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "20%",
        borderRadius: 5,
        distributed: true,
      },
    },
    dataLabels: { enabled: false },
    xaxis: { categories: usersCategories },
    yaxis: { labels: { style: { fontSize: "12px" } } },
    colors: ["#8c137e", "#007BFF", "#FFC107", "#28A745", "#DC3545"],
  };

  const mapChart = (obj, name) => [
    {
      name,
      data: [
        obj?.total ?? 0,
        obj?.active ?? 0,
        obj?.inactive ?? 0,
        obj?.stopped ?? 0,
        0, // canceled not supported by backend
      ],
    },
  ];

  const executives = mapChart(
    team?.executive_count,
    t("dashboard.team.charts.executives")
  );
  const leaders = mapChart(
    team?.leader_count,
    t("dashboard.team.charts.leaders")
  );
  const managers = mapChart(
    team?.manager_count,
    t("dashboard.team.charts.managers")
  );
  const supervisors = mapChart(
    team?.supervisor_count,
    t("dashboard.team.charts.supervisors")
  );
  const customerService = mapChart(
    team?.customer_service_count,
    t("dashboard.team.charts.customer_service")
  );
  console.log(team);

  // -----------------------------------
  // Table Data Mapping
  // -----------------------------------
  const data = useMemo(() => {
    return (team?.data ?? []).map((item) => ({
      id: item?.id,
      first_name: item?.first_name,
      last_name: item?.last_name,
      employee_code: item?.code,
      job_level: item?.role?.title,
      nationality: item.nationality.title,
      city: item.group.city.title,
      region: item.group.region.title,
      location: item.group.country.title,
      status: item.status,
      status_date: item.status_date,
      status_time: item.status_time,
    }));
  }, [team]);

  // -----------------------------------
  // Localized Status Colors
  // -----------------------------------
  const statusColor = (status) => {
    switch (status) {
      case t("dashboard.team.statuses.active"):
        return "#28a745";
      case t("dashboard.team.statuses.inactive"):
        return "#007bff";
      case t("dashboard.team.statuses.stopped"):
        return "#dc3545";
      default:
        return "#6c757d";
    }
  };

  // -----------------------------------
  // Table Columns (fully localized)
  // -----------------------------------
  const columns = useMemo(
    () => [
      columnHelper.accessor("first_name", {
        header: t("dashboard.team.columns.first_name"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("last_name", {
        header: t("dashboard.team.columns.last_name"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("employee_code", {
        header: t("dashboard.team.columns.employee_code"),
        cell: (info) => (
          <Link
            to={`/dashboard/employee-details/${info?.row?.original?.id}`}
            className="link-styles"
          >
            {info.getValue()}
          </Link>
        ),
      }),
      columnHelper.accessor("job_level", {
        header: t("dashboard.team.columns.job_level"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("nationality", {
        header: t("dashboard.team.columns.nationality"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("region", {
        header: t("dashboard.team.columns.region"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("location", {
        header: t("dashboard.team.columns.location"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("city", {
        header: t("dashboard.team.columns.city"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("status", {
        header: t("dashboard.team.columns.status"),
        cell: (info) => {
          return (
            <Badge
              pill
              className="custom-badge"
              style={{
                "--badge-color": statusColor(info.row.original.status),
                "--text-color": "#fff",
              }}
            >
              {info.row.original.status}
            </Badge>
          );
        },
      }),
      columnHelper.accessor("status_date", {
        header: t("dashboard.team.columns.status_date"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("status_time", {
        header: t("dashboard.team.columns.status_time"),
        cell: (info) => info.getValue() || "-",
      }),
    ],
    [lang]
  );

  // -----------------------------------
  // Render
  // -----------------------------------
  return (
    <section>
      <div className="row">
        <div className="col-12 col-lg-6 col-xxl-4 p-2">
          <ColumnChart
            title={t("dashboard.team.charts.executives")}
            series={executives}
            options={activeAccountsoptions}
            height={250}
          />
        </div>

        <div className="col-12 col-lg-6 col-xxl-4 p-2">
          <ColumnChart
            title={t("dashboard.team.charts.leaders")}
            series={leaders}
            options={activeAccountsoptions}
            height={250}
          />
        </div>

        <div className="col-12 col-lg-6 col-xxl-4 p-2">
          <ColumnChart
            title={t("dashboard.team.charts.managers")}
            series={managers}
            options={activeAccountsoptions}
            height={250}
          />
        </div>

        <div className="col-12 col-lg-6 p-2">
          <ColumnChart
            title={t("dashboard.team.charts.supervisors")}
            series={supervisors}
            options={activeAccountsoptions}
            height={250}
          />
        </div>

        <div className="col-12 col-xxl-6 p-2">
          <ColumnChart
            title={t("dashboard.team.charts.customer_service")}
            series={customerService}
            options={activeAccountsoptions}
            height={250}
          />
        </div>

        <div className="col-12 p-2">
          <ReusableDataTable
            data={data}
            columns={columns}
            currentPage={currentPage}
            lastPage={lastPage}
            setPage={setPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            initialPageSize={8}
            isLoading={isLoading}
            searchPlaceholder={t("dashboard.team.searchPlaceholder")}
            lang={lang}
            title={t("dashboard.team.title")}
          />
        </div>
      </div>
    </section>
  );
};

export default Teams;
