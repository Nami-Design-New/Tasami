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
const columnHelper = createColumnHelper();

const Resuems = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const { subscriptionResume, currentPage, lastPage, isLoading } =
    useGetSubscriptionResume("", page, PAGE_SIZE);

  const columns = useMemo(
    () => [
      columnHelper.accessor("first_name", {
        header: "الاسم الأول",
        cell: (info) => info.getValue() || "-",
        enableSorting: false,
      }),
      columnHelper.accessor("last_name", {
        header: "اسم العائلة",
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("gender", {
        header: "الجنس",
        cell: (info) => info.getValue() || "-",
      }),

      columnHelper.accessor("account_code", {
        header: "رقم الحساب",
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
        header: "نوع الحساب",
        cell: (info) => info.getValue(),
        enableSorting: false,
      }),
      columnHelper.accessor("created_at", {
        header: "التاريخ",
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("helper_points", {
        header: " نقاط المساعده ",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("status", {
        header: " حاله الحساب ",
        cell: (info) => {
          let badgeColor;
          switch (info.getValue()) {
            case "active":
              badgeColor = "#28a745";
              break;
            case "stopped":
              badgeColor = "#ffc107  ";
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
        header: "الجنسيه",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("region_id.title", {
        header: " الاقليم ",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("country_id.title", {
        header: " القطاع ",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("city_id.title", {
        header: " المدينه ",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("members", {
        header: " الاعضاء ",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("followers", {
        header: " المتابعون ",
        cell: (info) => info.getValue(),
      }),

      columnHelper.accessor("user_experiences", {
        header: " الخبرات ",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("user_documents", {
        header: " الوثائق ",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("id", {
        header: " معاينه ",
        cell: (info) => (
          <Link
            to={`/dashboard/resuems/${info?.row.original.id}`}
            className="log px-2  py-1"
          >
            {"معاينه"}
          </Link>
        ),
      }),
    ],
    []
  );

  const usersSeries = [
    {
      name: "عدد الحسابات",
      data: subscriptionResume?.packages?.map((item) => item.total_users) || [],
    },
    {
      name: "الخبرات",
      data: subscriptionResume?.packages?.map((item) => item.experiences) || [],
    },
    {
      name: "الوثائق",
      data: subscriptionResume?.packages?.map((item) => item.documents) || [],
    },
    {
      name: "الاعضاء",
      data:
        subscriptionResume?.packages?.map(
          (item) => item.active_community_members
        ) || [],
    },
    {
      name: "المتابعون",
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
            title={"السير الذاتيه"}
            options={usersOptions}
            series={usersSeries}
          />
        </div>
        <div className="col-12 p-2">
          <ReusableDataTable
            filter={false}
            data={subscriptionResume?.data || []}
            columns={columns}
            title={"السير الذاتيه"}
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
            الخبرات
          </CustomButton>
          <CustomButton onClick={() => navigate("documents")} size="large">
            الوثائق
          </CustomButton>
        </div>
      </div>
    </section>
  );
};

export default Resuems;
