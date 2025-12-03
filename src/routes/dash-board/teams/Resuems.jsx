import { useMemo, useState } from "react";
import ReusableDataTable from "../../../ui/table/ReusableDataTable";
import { createColumnHelper } from "@tanstack/react-table";
import { Link, useNavigate } from "react-router";
import ColumnChart from "../../../ui/dash-board/charts/ColumnChart";
import { Badge } from "react-bootstrap";
import CustomButton from "../../../ui/CustomButton";
import { PAGE_SIZE } from "../../../utils/constants";
import TablePagination from "../../../ui/table/TablePagentaion";
import useGetSubscriptionResume from "../../../hooks/dashboard/subscription/resume/useGetSubscriptionResume";
import { useTranslation } from "react-i18next";
const columnHelper = createColumnHelper();

const Resuems = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const { subscriptionResume, currentPage, lastPage, isLoading } =
    useGetSubscriptionResume("", page, PAGE_SIZE);

  const columns = useMemo(
    () => [
      columnHelper.accessor("first_name", {
        header: t("dashboard.resume.firstName"),
        cell: (info) => info.getValue() || "-",
        enableSorting: false,
      }),
      columnHelper.accessor("last_name", {
        header: t("dashboard.resume.lastName"),
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("gender", {
        header: t("dashboard.resume.gender"),
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("account_code", {
        header: t("dashboard.resume.accountNumber"),
        cell: (info) => (
          <Link
            to={`/dashboard/user-details/${info?.row.original.id}`}
            className="link-styles"
          >
            {info.getValue() || "-"}
          </Link>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("account_type", {
        header: t("dashboard.resume.accountType"),
        cell: (info) => info.getValue(),
        enableSorting: false,
      }),
      columnHelper.accessor("created_at", {
        header: t("dashboard.resume.date"),
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("helper_points", {
        header: t("dashboard.resume.helperPoints"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("status", {
        header: t("dashboard.resume.status"),
        cell: (info) => {
          let badgeColor;
          switch (info.getValue()) {
            case "active":
              badgeColor = "#28a745";
              break;
            case "stopped":
              badgeColor = "#ffc107";
              break;
            case "غير نشط":
              badgeColor = "#007bff";
              break;
            case "محذوف":
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
      columnHelper.accessor("nationality.title", {
        header: t("dashboard.resume.nationality"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("region_id.title", {
        header: t("dashboard.resume.region"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("country_id.title", {
        header: t("dashboard.resume.sector"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("city_id.title", {
        header: t("dashboard.resume.city"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("members", {
        header: t("dashboard.resume.members"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("followers", {
        header: t("dashboard.resume.followers"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("user_experiences", {
        header: t("dashboard.resume.experiences"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("user_documents", {
        header: t("dashboard.resume.documents"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("id", {
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
    [t]
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
          (item) => item.active_community_members
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
    colors: ["#214b92", "#22C55E", "#F97316", "#EF4444", " #3B82F6"],

    legend: {
      position: "top",
      horizontalAlign: "center",
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
          <ReusableDataTable
            filter={false}
            data={subscriptionResume?.data || []}
            columns={columns}
            title={t("dashboard.resume.title")}
            initialPageSize={10}
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
