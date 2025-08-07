import { useMemo } from "react";
import ColumnChart from "../../../ui/dash-board/charts/ColumnChart";
import ReusableDataTable from "../../../ui/table/ReusableDataTable";
import { createColumnHelper } from "@tanstack/react-table";
import { Link } from "react-router";
import { Badge } from "react-bootstrap";

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
  const data = useMemo(
    () => [
      {
        programNumber: "SO-210425-000001",
        date: "21-04-2025",
        status: "مكتمل",
        accountNumber: "U-020522-000215",
        accountType: "متميز",
        IdNumber: "01-014-003",
        field: "الهندسة",
        Specialization: "مدني",
        activeContracts: 3,
        completeContracts: 5,
        canceledContracts: 122,
        numbrOfUseres: 120,
        rate: 4.5,
      },
      {
        programNumber: "SO-210425-000002",
        date: "21-04-2025",
        status: "محذوف",
        accountNumber: "U-020522-000216",
        accountType: "رواد",
        IdNumber: "01-014-003",
        field: "المالية",
        Specialization: "محاسبة",
        activeContracts: 1,
        completeContracts: 2,
        canceledContracts: 220,
        numbrOfUseres: 45,
        rate: "-",
      },
      {
        programNumber: "SO-210425-000003",
        date: "21-04-2025",
        status: "قيد التنفيذ",
        accountNumber: "U-020522-000217",
        accountType: "رواد",
        IdNumber: "01-014-003",
        field: "المالية",
        Specialization: "محاسبة",
        activeContracts: 1,
        completeContracts: 2,
        canceledContracts: 220,
        numbrOfUseres: 45,
        rate: "-",
      },
      {
        programNumber: "SO-210425-000004",
        date: "21-04-2025",
        status: "بانتظار التنفيذ",
        accountNumber: "U-020522-000218",
        accountType: "رواد",
        IdNumber: "01-014-003",
        field: "المالية",
        Specialization: "محاسبة",
        activeContracts: 1,
        completeContracts: 2,
        canceledContracts: 220,
        numbrOfUseres: 45,
        rate: "-",
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("programNumber", {
        header: "الخدمه",
        cell: (info) => (
          <Link to={`/model/${info.getValue()}`} className="link-styles">
            {info.getValue()}
          </Link>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("date", {
        header: " التاريخ ",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("status", {
        header: " الحاله ",
        cell: (info) => {
          let badgeColor;
          switch (info.getValue()) {
            case "مكتمل":
              badgeColor = "#28a745";
              break;
            case "بانتظار التنفيذ":
              badgeColor = "#ffc107  ";
              break;
            case "قيد التنفيذ":
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
      columnHelper.accessor("accountNumber", {
        header: "رقم الحساب",
        cell: (info) => (
          <Link
            to={`/dashboard/user-details/${info.getValue()}`}
            className="link-styles"
          >
            {info.getValue()}
          </Link>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("accountType", {
        header: "نوع الحساب",
        cell: (info) => info.getValue(),
        enableSorting: false,
      }),

      columnHelper.accessor("IdNumber", {
        header: "رقم التعريف",
        // cell: (info) => (
        //   <Link to={`/model/${info.getValue()}`} className="link-styles">
        //     {info.getValue()}
        //   </Link>
        // ),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("field", {
        header: "المجال",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("Specialization", {
        header: " التخصص ",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("activeContracts", {
        header: " العقود النشطه ",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("completeContracts", {
        header: " العقود المكتمله ",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("canceledContracts", {
        header: " القيمه ",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("numbrOfUseres", {
        header: "عدد المستفيدين",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("rate", {
        header: "التقييم",
        cell: (info) => info.getValue(),
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
            data={data}
            columns={columns}
            lang="ar"
            initialPageSize={10}
            searchPlaceholder="البحث في عروض المساعده"
          />
        </div>
      </div>
    </section>
  );
};

export default Programs;
