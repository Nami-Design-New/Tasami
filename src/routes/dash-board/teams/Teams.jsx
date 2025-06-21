import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import { Badge } from "react-bootstrap";
import { Link } from "react-router";
import ColumnChart from "../../../ui/dash-board/charts/ColumnChart";
import ReusableDataTable from "../../../ui/ReusableDataTable";

// Column Chart
const excutives = [
  {
    name: "التنفيذيين",
    data: [112, 40, 20, 30, 12],
  },
];

const leaders = [
  {
    name: "القاده",
    data: [112, 40, 20, 30, 12],
  },
];
const manager = [
  {
    name: "المدراء",
    data: [112, 40, 20, 30, 12],
  },
];
const supervisors = [
  {
    name: "المشرفين",
    data: [112, 40, 20, 30, 12],
  },
];
const customerService = [
  {
    name: "خدمه العملاء",
    data: [112, 40, 20, 30, 12],
  },
];
const usersCategories = ["الاجمالي", "نشط", "غير نشط", "موقوف", "ملغي"];
const activeAccountsoptions = {
  chart: {
    type: "bar",
    height: 250,
    toolbar: { show: true },
    distributed: true,
  },
  grid: {
    show: false,
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "20%",
      barHeight: "100%",
      borderRadius: 5,
      borderRadiusApplication: "around",
      distributed: true,
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
      formatter: (val) => `${val} حساب`,
    },
  },
  legend: {
    position: "top",
    horizontalAlign: "center",
  },
};

const columnHelper = createColumnHelper();

const Teams = () => {
  const data = useMemo(
    () => [
      {
        name: "صالح",
        lastname: "محمود",
        accountNumber: "S-020522-00215a",
        accountType: "مشرف",
        gender: "ذكر",
        nationality: "السعودية",
        city: "الرياض-001",
        region: "014-المنطقة الوسطى",
        location: "المملكة العربية السعودية",
        status: "موقوفة",
        accountStatusDate: "20-Apr-2020",
        time: "08:55 am",
      },
      {
        name: "محمد",
        lastname: "محمود",

        accountNumber: "E-020522-00215b",
        accountType: "موظف",

        gender: "ذكر",
        nationality: "السعودية",
        city: "الرياض-002",
        region: "014-المنطقة الوسطى",
        location: "المملكة العربية السعودية",

        status: "غير نشط",
        accountStatusDate: "20-Apr-2020",
        time: "08:55 am",
      },
      {
        name: "علي",
        lastname: "محمود",

        accountNumber: "E-020522-00215c",
        accountType: "موظف",

        gender: "ذكر",
        nationality: "السعودية",
        city: "الرياض-003",
        region: "014-المنطقة الوسطى",
        location: "المملكة العربية السعودية",

        status: "نشط",
        accountStatusDate: "20-Apr-2020",
        time: "08:55 am",
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "الاسم",
        cell: (info) => info.getValue(),
        enableSorting: false,
      }),
      columnHelper.accessor("lastname", {
        header: "اسم العائله",
        cell: (info) => info.getValue(),
        enableSorting: false,
      }),

      columnHelper.accessor("accountNumber", {
        header: "الحساب",

        cell: (info) => (
          <Link
            to={`/dashboard/employee-details/${info.getValue()}`}
            className="link-styles"
          >
            {info.getValue()}
          </Link>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("accountType", {
        header: "المستوي الوظيفي",
        cell: (info) => info.getValue(),
        enableSorting: false,
      }),

      columnHelper.accessor("nationality", {
        header: "الجنسيه",
        cell: (info) => info.getValue(),
        enableSorting: false,
      }),

      columnHelper.accessor("region", {
        header: " الاقليم ",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("location", {
        header: " القطاع ",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("city", {
        header: " المدينه ",
        cell: (info) => info.getValue(),
      }),

      columnHelper.accessor("status", {
        header: " الحاله ",
        cell: (info) => {
          let badgeColor;

          switch (info.getValue()) {
            case "نشط":
              badgeColor = "#28a745";
              break;
            case "غير نشط":
              badgeColor = "#007bff";
              break;
            case "موقوفة":
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

      columnHelper.accessor("accountStatusDate", {
        header: " تاريخ حاله الحساب  ",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("time", {
        header: " وقت حاله الحساب ",
        cell: (info) => {
          return (
            <div>
              {info.getValue() === null ? "لا يوجد تقييم" : info.getValue()}
            </div>
          );
        },
      }),
    ],
    []
  );

  return (
    <section>
      <div className="row">
        <div className="col-12 col-lg-6 col-xxl-4 ">
          <ColumnChart
            title={"التنفيذين"}
            series={excutives}
            options={activeAccountsoptions}
            height={250}
          />
        </div>
        <div className=" col-12 col-lg-6  col-xxl-4">
          <ColumnChart
            title={"القاده"}
            series={leaders}
            options={activeAccountsoptions}
            height={"250px"}
          />
        </div>
        <div className="col-12 col-lg-6 col-xxl-4 ">
          <ColumnChart
            title={" المدراء "}
            series={manager}
            options={activeAccountsoptions}
            height={"250px"}
          />
        </div>
        <div className="col-12 col-lg-6">
          <ColumnChart
            title={"المشرفين"}
            series={supervisors}
            options={activeAccountsoptions}
            height={"250px"}
          />
        </div>
        <div className="col-12 col-xxl-6">
          <ColumnChart
            title={"خدمه العملاء"}
            series={customerService}
            options={activeAccountsoptions}
            height={"250px"}
          />
        </div>
        <div className="col-12 ">
          <ReusableDataTable
            data={data}
            filter={false}
            columns={columns}
            initialPageSize={8}
            title="حسابات فريق العمل"
          />
        </div>
      </div>
    </section>
  );
};

export default Teams;
