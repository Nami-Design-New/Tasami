import { useMemo, useState } from "react";
import ColumnChart from "../../../ui/dash-board/charts/ColumnChart";
import ReusableDataTable from "../../../ui/table/ReusableDataTable";
import { createColumnHelper } from "@tanstack/react-table";
import { Link } from "react-router";
import { Badge } from "react-bootstrap";
import { PAGE_SIZE } from "../../../utils/constants";
import useGetAssistantOffers from "../../../hooks/dashboard/subscription/assistantOffers/useGetAssistantOffers";
import TablePagination from "../../../ui/table/TablePagentaion";

const usersSeries = [
  { name: "عروض المساعده ", data: ["450", "211", "150"] },
  { name: "بإنتظار التنفيذ", data: ["100", "30", "30"] },
  { name: "قيد التنفيذ", data: ["110", "20", "60"] },
  { name: "مكتملة", data: ["200", "100", "40"] },
  { name: "  المحذوفة", data: ["40", "30", "20"] },
];

const usersCategories = [
  "(اساسي) مقدم مساعده",
  "(متميز) مقدم مساعده",
  "(رواد) مقدم مساعده",
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
  //   xaxis: {
  //   categories:
  //     assistantOffersData?.packages?.map((item) => item.package) || [],
  //   labels: { style: { fontSize: "14px" } },
  // },
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
      formatter: (val) => `${val} عروض مساعده`,
    },
  },
  legend: {
    position: "top",
    horizontalAlign: "center",
  },
};

const columnHelper = createColumnHelper();

const Programs = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const { assistantOffersData, currentPage, lastPage, isLoading } =
    useGetAssistantOffers("", page, PAGE_SIZE);

  // const usersSeries = [
  //   {
  //     name: "عروض المساعده ",
  //     data:
  //       assistantOffersData?.packages?.map((item) => item.total_users) || [],
  //   },
  //   {
  //     name: "بإنتظار التنفيذ",
  //     data:
  //       assistantOffersData?.packages?.map((item) => item.communities_count) ||
  //       [],
  //   },
  //   {
  //     name: "قيد التنفيذ",
  //     data:
  //       assistantOffersData?.packages?.map(
  //         (item) => item.communities_members
  //       ) || [],
  //   },
  //   {
  //     name: "مكتملة",
  //     data:
  //       assistantOffersData?.packages?.map((item) => item.communities_count) ||
  //       [],
  //   },
  //   {
  //     name: "المحذوفة",
  //     data:
  //       assistantOffersData?.packages?.map((item) => item.communities_posts) ||
  //       [],
  //   },
  // ];

  const columns = useMemo(
    () => [
      columnHelper.accessor("code", {
        header: "الخدمه",
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
        header: " التاريخ ",
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("user.status", {
        header: " الحاله ",
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
        header: "رقم الحساب",
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
        header: "نوع الحساب",
        cell: (info) => info.getValue() || "-",
        enableSorting: false,
      }),

      columnHelper.accessor("user.identify_code", {
        header: "رقم التعريف",
        // cell: (info) => (
        //   <Link to={`/model/${info.getValue()}`} className="link-styles">
        //     {info.getValue()}
        //   </Link>
        // ),
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("category.title", {
        header: "المجال",
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("sub_category.title", {
        header: " التخصص ",
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("active_contracts", {
        header: " العقود النشطه ",
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("completed_contracts", {
        header: " العقود المكتمله ",
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("price", {
        header: " القيمه ",
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("benefits", {
        header: "عدد المستفيدين",
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("rate", {
        header: "التقييم",
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
            title={"عروض المساعده"}
          />
        </div>
        <div className="col-12">
          <ReusableDataTable
            title="عروض المساعده"
            filter={false}
            data={assistantOffersData?.data || []}
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

export default Programs;
