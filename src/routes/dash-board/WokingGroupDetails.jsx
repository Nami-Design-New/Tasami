import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import ReusableDataTable from "../../ui/table/ReusableDataTable";

import { Badge } from "react-bootstrap";
import { Link, useParams } from "react-router";
import ColumnChart from "../../ui/dash-board/charts/ColumnChart";
import DounutCharts from "../../ui/dash-board/charts/DounutCharts";
import LineAnalyticsChart from "../../ui/dash-board/charts/LineAnalyticsChart";
import RadarChart from "../../ui/dash-board/charts/RadarChart";
import Header from "../../ui/ModelComponent/Header";

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
const WokingGroupDetails = () => {
  const { id } = useParams();
  const data = useMemo(
    () => [
      {
        name: "صالح",
        accountNumber: "U-020522-00215a",
        accountType: "متميز",
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
      },
      {
        name: "محمد",
        accountNumber: "U-020522-00215b",
        accountType: "رواد",
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
      },
      {
        name: "علي",
        accountNumber: "U-020522-00215c",
        accountType: "اساسي",
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
      },
      {
        name: "سلمان",
        accountNumber: "U-020522-00215d",
        accountType: "مستفيد",
        date: "25-Apr-2020",
        gender: "ذكر",
        nationality: "السعودية",
        city: "الرياض-004",
        region: "014-المنطقة الوسطى",
        location: "المملكة العربية السعودية",
        subscriptionEntity: "الاشتراك",
        subscriptionEnd: "25-Apr-2020",
        status: "موقوفة",
        accountStatusDate: "20-Apr-2020",
        time: "08:55 am",
      },
      {
        name: "أحمد",
        accountNumber: "U-020522-00215e",
        accountType: "اساسي",
        date: "25-Apr-2020",
        gender: "ذكر",
        nationality: "السعودية",
        city: "الرياض-005",
        region: "014-المنطقة الوسطى",
        location: "المملكة العربية السعودية",
        subscriptionEntity: "الاشتراك",
        subscriptionEnd: "25-Apr-2020",
        status: "غير نشطة",
        accountStatusDate: "20-Apr-2020",
        time: "08:55 am",
      },
      {
        name: "فهد",
        accountNumber: "U-020522-00215f",
        accountType: "متميز",
        date: "25-Apr-2020",
        gender: "ذكر",
        nationality: "السعودية",
        city: "الرياض-006",
        region: "014-المنطقة الوسطى",
        location: "المملكة العربية السعودية",
        subscriptionEntity: "الاشتراك",
        subscriptionEnd: "25-Apr-2020",
        status: "نشط",
        accountStatusDate: "20-Apr-2020",
        time: "08:55 am",
      },
      {
        name: "ماجد",
        accountNumber: "U-020522-00215g",
        accountType: "مستفيد",
        date: "25-Apr-2020",
        gender: "ذكر",
        nationality: "السعودية",
        city: "الرياض-007",
        region: "014-المنطقة الوسطى",
        location: "المملكة العربية السعودية",
        subscriptionEntity: "الاشتراك",
        subscriptionEnd: "25-Apr-2020",
        status: "موقوفة",
        accountStatusDate: "20-Apr-2020",
        time: "08:55 am",
      },
      {
        name: "ياسر",
        accountNumber: "U-020522-00215h",
        accountType: "رواد",
        date: "25-Apr-2020",
        gender: "ذكر",
        nationality: "السعودية",
        city: "الرياض-008",
        region: "014-المنطقة الوسطى",
        location: "المملكة العربية السعودية",
        subscriptionEntity: "الاشتراك",
        subscriptionEnd: "25-Apr-2020",
        status: "غير نشطة",
        accountStatusDate: "20-Apr-2020",
        time: "08:55 am",
      },
      {
        name: "سعد",
        accountNumber: "U-020522-00215i",
        accountType: "اساسي",
        date: "25-Apr-2020",
        gender: "ذكر",
        nationality: "السعودية",
        city: "الرياض-009",
        region: "014-المنطقة الوسطى",
        location: "المملكة العربية السعودية",
        subscriptionEntity: "الاشتراك",
        subscriptionEnd: "25-Apr-2020",
        status: "نشط",
        accountStatusDate: "20-Apr-2020",
        time: "08:55 am",
      },
      {
        name: "بدر",
        accountNumber: "U-020522-00215j",
        accountType: "متميز",
        date: "25-Apr-2020",
        gender: "ذكر",
        nationality: "السعودية",
        city: "الرياض-010",
        region: "014-المنطقة الوسطى",
        location: "المملكة العربية السعودية",
        subscriptionEntity: "الاشتراك",
        subscriptionEnd: "25-Apr-2020",
        status: "موقوفة",
        accountStatusDate: "20-Apr-2020",
        time: "08:55 am",
      },
      {
        name: "راشد",
        accountNumber: "U-020522-00215k",
        accountType: "مستفيد",
        date: "25-Apr-2020",
        gender: "ذكر",
        nationality: "السعودية",
        city: "الرياض-011",
        region: "014-المنطقة الوسطى",
        location: "المملكة العربية السعودية",
        subscriptionEntity: "الاشتراك",
        subscriptionEnd: "25-Apr-2020",
        status: "غير نشطة",
        accountStatusDate: "20-Apr-2020",
        time: "08:55 am",
      },
      {
        name: "جاسم",
        accountNumber: "U-020522-00215l",
        accountType: "رواد",
        date: "25-Apr-2020",
        gender: "ذكر",
        nationality: "السعودية",
        city: "الرياض-012",
        region: "014-المنطقة الوسطى",
        location: "المملكة العربية السعودية",
        subscriptionEntity: "الاشتراك",
        subscriptionEnd: "25-Apr-2020",
        status: "نشط",
        accountStatusDate: "20-Apr-2020",
        time: "08:55 am",
      },
      {
        name: "تركي",
        accountNumber: "U-020522-00215m",
        accountType: "متميز",
        date: "25-Apr-2020",
        gender: "ذكر",
        nationality: "السعودية",
        city: "الرياض-013",
        region: "014-المنطقة الوسطى",
        location: "المملكة العربية السعودية",
        subscriptionEntity: "الاشتراك",
        subscriptionEnd: "25-Apr-2020",
        status: "موقوفة",
        accountStatusDate: "20-Apr-2020",
        time: "08:55 am",
      },
      {
        name: "أنس",
        accountNumber: "U-020522-00215n",
        accountType: "اساسي",
        date: "25-Apr-2020",
        gender: "ذكر",
        nationality: "السعودية",
        city: "الرياض-014",
        region: "014-المنطقة الوسطى",
        location: "المملكة العربية السعودية",
        subscriptionEntity: "الاشتراك",
        subscriptionEnd: "25-Apr-2020",
        status: "نشط",
        accountStatusDate: "20-Apr-2020",
        time: "08:55 am",
      },
      {
        name: "مازن",
        accountNumber: "U-020522-00215o",
        accountType: "مستفيد",
        date: "25-Apr-2020",
        gender: "ذكر",
        nationality: "السعودية",
        city: "الرياض-015",
        region: "014-المنطقة الوسطى",
        location: "المملكة العربية السعودية",
        subscriptionEntity: "الاشتراك",
        subscriptionEnd: "25-Apr-2020",
        status: "غير نشطة",
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

      columnHelper.accessor("accountNumber", {
        header: "رقم الحساب",

        cell: (info) => (
          <Link to={`/model/${info.getValue()}`} className="link-styles">
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
    <>
      <section className="">
        <div className="d-flex align-items-center w-100 px-2 justify-content-between">
          <Header title={`تفاصيل فريق العمل رقم ${id} `} />
        </div>
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
              type="area"
            />
          </div>
          <div className="col-12">
            <ReusableDataTable
              data={data}
              columns={columns}
              initialPageSize={8}
              title={`حسابات فريق العمل رقم ${id}`}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default WokingGroupDetails;
