import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState, useEffect } from "react";
import ReusableDataTable from "../../ui/table/ReusableDataTable";
import { Badge } from "react-bootstrap";
import { Link, useParams } from "react-router";
import ColumnChart from "../../ui/dash-board/charts/ColumnChart";
import Header from "../../ui/ModelComponent/Header";
import useGetWorkingGroupdetails from "../../hooks/dashboard/workingGroups/useGetWorkingGroupdetails";
import TablePagination from "../../ui/table/TablePagentaion";

const usersCategories = ["الإجمالي", "نشط", "غير نشط", "موقوف"];
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
  tooltip: { y: { formatter: (val) => `${val} حساب` } },
  legend: { position: "top", horizontalAlign: "center" },
};

const columnHelper = createColumnHelper();

const WokingGroupDetails = () => {
  const { id } = useParams();

  // -----------------------------
  // Pagination State
  // -----------------------------
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // -----------------------------
  // Data Fetch
  // -----------------------------
  const {
    workingGoupDetails,
    workingMembers,
    currentPage,
    lastPage,
    isLoading,
  } = useGetWorkingGroupdetails("", page, pageSize);

  // -----------------------------
  // Chart Data Mappings
  // -----------------------------
  let chartData;
  if (workingGoupDetails.length > 0) {
    const [customer_services, executives, leaders, managers, supervisors] =
      workingGoupDetails;

    chartData = [
      {
        title: "التنفيذيين",
        series: [
          {
            name: "التنفيذيين",
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
        title: "القادة",
        series: [
          {
            name: "القادة",
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
        title: "المدراء",
        series: [
          {
            name: "المدراء",
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
        title: "المشرفين",
        series: [
          {
            name: "المشرفين",
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
        title: "خدمة العملاء",
        series: [
          {
            name: "خدمة العملاء",
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

  // -----------------------------
  // Table Columns
  // -----------------------------
  const columns = useMemo(
    () => [
      columnHelper.accessor("first_name", {
        header: "الاسم",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("family_name", {
        header: "اسم العائلة",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("code", {
        header: "رقم الحساب",
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
        header: "المستوى الوظيفي",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("nationality.title", {
        header: "الجنسية",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("region_id.title", {
        header: "الإقليم",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("country_id.title", {
        header: "الدولة",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("city_id.title", {
        header: "المدينة",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("status", {
        header: "الحالة",
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
              {value}
            </Badge>
          );
        },
      }),
      columnHelper.accessor("status_date", {
        header: "تاريخ الحالة",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("status_time", {
        header: "وقت الحالة",
        cell: (info) => info.getValue(),
      }),
    ],
    []
  );

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <section>
      <div className="d-flex align-items-center w-100 px-2 justify-content-between">
        <Header title={`تفاصيل فريق العمل رقم ${id}`} />
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
            initialPageSize={pageSize}
            title={`حسابات فريق العمل رقم ${id}`}
            searchPlaceholder="بحث في المجموعة"
            filter={false}
            isLoading={isLoading}
          />

          {/*  Pagination for Server Data */}
          <TablePagination
            currentPage={currentPage}
            lastPage={lastPage}
            onPageChange={setPage}
            isLoading={isLoading}
          />
        </div>
      </div>
    </section>
  );
};

export default WokingGroupDetails;
