import LineAnalyticsChart from "../../../ui/dash-board/charts/LineAnalyticsChart";
import ColumnChart from "../../../ui/dash-board/charts/ColumnChart";
import DounutCharts from "../../../ui/dash-board/charts/DounutCharts";
import RadarChart from "../../../ui/dash-board/charts/RadarChart";
import ReusableDataTable from "../../../ui/ReusableDataTable";
import { createColumnHelper } from "@tanstack/react-table";
import { Link } from "react-router";
import { useMemo } from "react";
import { Badge } from "react-bootstrap";

// Dounut Charts
const usersCountSeries = [50, 30, 22];
const usersCountoptions = {
  labels: ["التنفيذيين", "المشرفين", " موظفين خدمه العملاء"],
  chart: {
    type: "donut",
  },
  colors: ["#214b92", "#5fcafa", "#ff4a5f"],
  legend: {
    position: "bottom",
    fontSize: "14px",
  },
  dataLabels: {
    style: {
      fontSize: "14px",
      fontWeight: "400",
      colors: ["#000"],
    },
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: { width: 200 },
        legend: { position: "bottom" },
      },
    },
  ],
  plotOptions: {
    pie: {
      donut: {
        size: "80%",
        labels: {
          show: true,
          name: { show: true, fontSize: "16px", offsetY: -10 },
          value: {
            show: true,
            fontSize: "20px",
            fontWeight: 600,
            offsetY: 10,
          },
          total: {
            show: true,
            label: "الكلي",
            fontSize: "16px",
            fontWeight: 500,
            formatter: (w) => w.globals.seriesTotals.reduce((a, b) => a + b, 0),
          },
        },
      },
    },
  },
};

// Column Chart
const activeAccountsSeries = [
  {
    name: "الحسابات النشطه",
    data: [10, 20, 30],
  },
];
const usersCategories = ["التنفيذيين", "المشرفين", " موظفين خدمه العملاء"];
const activeAccountsoptions = {
  chart: {
    type: "bar",
    height: 250,
    toolbar: { show: true },
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
  colors: ["#214b92", "#5fcafa", "#ff4a5f"],
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

// Radar Chart
const SuspendedUsersOptions = {
  chart: {
    type: "radar",
  },

  xaxis: {
    categories: usersCategories,
  },
  yaxis: {
    show: false,
  },
  stroke: {
    width: 3,
  },
  fill: {
    opacity: 0.3,
    color: "#D9534F",
  },
  markers: {
    size: 4,
  },
};
const SuspendedUsersSeries = [
  {
    name: "الحسابات الموقوفه",
    data: [80, 90, 70],
  },
];

// Line Analytics Chart
const deactiveUsersSeries = [
  {
    name: " غير نشط",
    type: "area",
    data: [350, 70, 28, 20],
  },
];
const revnueAnalyticsOptions = {
  chart: {
    type: "area",
    toolbar: { show: false },
  },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.4,
      gradientToColors: ["#ff4a5f"],
      opacityTo: 0,
      stops: [0, 90, 100],
    },
    colors: ["#ff4a5f"],
  },
  xaxis: {
    categories: usersCategories,
  },
  grid: {
    show: true,
    borderColor: "#e0e0e0",
  },
  tooltip: {
    enabled: true,
  },
  colors: ["#ff4a5f"],
};

const columnHelper = createColumnHelper();

const Teams = () => {
  const data = useMemo(
    () => [
      {
        name: "صالح",
        accountNumber: "U-020522-00215a",
        accountType: "خبير",
        date: "25-Apr-2020",
        gender: "ذكر",
        nationality: "السعودية",
        city: "الرياض-001",
        region: "014-المنطقة الوسطى",
        location: "المملكة العربية السعودية",
        subscriptionEntity: "الاشتراك",
        subscriptionEnd: "25-Apr-2020",
        status: "موقوفة",
        accountStatusDate: "20-Apr-2020",
        time: "08:55 am",
        workGroup: "GIN-1211321",
      },
      {
        name: "محمد",
        accountNumber: "U-020522-00215b",
        accountType: "جدير",
        date: "25-Apr-2020",
        gender: "ذكر",
        nationality: "السعودية",
        city: "الرياض-002",
        region: "014-المنطقة الوسطى",
        location: "المملكة العربية السعودية",
        subscriptionEntity: "الاشتراك",
        subscriptionEnd: "25-Apr-2020",
        status: "غير نشطة",
        accountStatusDate: "20-Apr-2020",
        time: "08:55 am",
        workGroup: "GIN-1211321",
      },
      {
        name: "علي",
        accountNumber: "U-020522-00215c",
        accountType: "ملهم",
        date: "25-Apr-2020",
        gender: "ذكر",
        nationality: "السعودية",
        city: "الرياض-003",
        region: "014-المنطقة الوسطى",
        location: "المملكة العربية السعودية",
        subscriptionEntity: "الاشتراك",
        subscriptionEnd: "25-Apr-2020",
        status: "نشط",
        accountStatusDate: "20-Apr-2020",
        time: "08:55 am",
        workGroup: "GIN-1211321",
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

      columnHelper.accessor("accountNumber", {
        header: "رقم الحساب",

        cell: (info) => (
          <Link
            to={`/dashboard/user-details/${info.getValue()}`}
            className="link-styls"
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
      columnHelper.accessor("date", {
        header: " التاريخ ",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("gender", {
        header: "الجنس",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("nationality", {
        header: "الجنسيه",
        cell: (info) => info.getValue(),
        enableSorting: false,
      }),
      columnHelper.accessor("workGroup", {
        header: "مجموعه العمل",
        cell: (info) => (
          <Link
            to={`/dashboard/woking-group/${info.getValue()}`}
            className="link-styls"
          >
            {info.getValue()}
          </Link>
        ),
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
      columnHelper.accessor("subscriptionEntity", {
        header: "   بدء الاشتراك ",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("subscriptionEnd", {
        header: " انتهاء الاشتراك ",
        cell: (info) => info.getValue(),
      }),

      columnHelper.accessor("status", {
        header: " الحاله ",
        cell: (info) => {
          let badgeColor;
          console.log(info.getValue());

          switch (info.getValue()) {
            case "نشط":
              badgeColor = "#28a745";
              break;
            case "غير نشطة":
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
    <section className="mt-5">
      <div className="row">
        <div className="col-12 col-md-3 ">
          <DounutCharts
            title={"عدد الموظفين"}
            series={usersCountSeries}
            options={usersCountoptions}
            width={250}
            height={250}
          />
        </div>
        <div className="col-12 col-md-6">
          <ColumnChart
            title={" عدد الحسابات النشطه "}
            series={activeAccountsSeries}
            options={activeAccountsoptions}
            height={235}
          />
        </div>
        <div className="col-12 col-md-3">
          <RadarChart
            title={"الحسابات الموقوفه"}
            series={SuspendedUsersSeries}
            options={SuspendedUsersOptions}
            height={235}
          />
        </div>
        <div className="col-12">
          <LineAnalyticsChart
            title={"الحسابات غير النشطه"}
            series={deactiveUsersSeries}
            options={revnueAnalyticsOptions}
            height={"250px"}
          />
        </div>
        <div className="col-12">
          <ReusableDataTable
            data={data}
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
