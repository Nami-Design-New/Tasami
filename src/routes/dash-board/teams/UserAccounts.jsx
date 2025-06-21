import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import { Badge } from "react-bootstrap";
import { Link } from "react-router";
import ColumnChart from "../../../ui/dash-board/charts/ColumnChart";
import ReusableDataTable from "../../../ui/ReusableDataTable";

// column Chart

const series = [
  { name: "عدد الحسابات", data: ["5000", "1000", "800", "500"] },
  { name: "الحسابات النشطه", data: ["3000", "800", "700", "400"] },
  { name: " الحسابات الغير نشطه ", data: ["1200", "150", "80", "60"] },
  { name: "الحسابات الموقوفه", data: ["800", "50", "20", "40"] },
];

const usersCategories = [
  "مستفيد",
  "(اساسي) مقدم برامج",
  "(متميز) مقدم برامج",
  "(رواد  ) مقدم برامج",
];

const UseresAccountsOptions = {
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
  colors: ["#8c137e", "#28A745", "#007BFF", "#DC3545"],
  tooltip: {
    y: {
      formatter: (val) => `${val} برامج`,
    },
  },
  legend: {
    position: "top",
    horizontalAlign: "center",
  },
};

const columnHelper = createColumnHelper();

const UserAccounts = () => {
  const data = useMemo(
    () => [
      {
        name: "صالح",
        accountNumber: "U-020522-00215a",
        accountType: "رواد",
        date: "25-Apr-2020",
        gender: "ذكر",
        nationality: "السعودية",
        city: "الرياض-001",
        region: "014-المنطقة الوسطى",
        location: "المملكة العربية السعودية",
        subscriptionEntity: "25-oct-2019",
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
        subscriptionEntity: "25-oct-2019",
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
        subscriptionEntity: "25-oct-2019",
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
        subscriptionEntity: "25-oct-2019",
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
        subscriptionEntity: "25-oct-2019",
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
        subscriptionEntity: "25-oct-2019",
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
        subscriptionEntity: "25-oct-2019",
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
        subscriptionEntity: "25-oct-2019",
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
        subscriptionEntity: "25-oct-2019",
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
        subscriptionEntity: "25-oct-2019",
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
        subscriptionEntity: "25-oct-2019",
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
        subscriptionEntity: "25-oct-2019",
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
        subscriptionEntity: "25-oct-2019",
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
        subscriptionEntity: "25-oct-2019",
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
        subscriptionEntity: "25-oct-2019",
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
          <Link
            to={`/dashboard/user-details/${info.getValue()}`}
            className="link-styles"
            style={{ textDecoration: "underline" }}
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
        header: " بدء الاشتراك",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("subscriptionEnd", {
        header: " انتهاء الاشتراك",
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
    <section className="mt-5">
      <div className="row">
        <div className="col-12 col-lg-4">
          {/* <DounutCharts
            series={SuspendedAccountSeries}
            options={options}
            title={"الحسابات"}
          /> */}
        </div>
        <div className="col-12 ">
          <ColumnChart
            series={series}
            options={UseresAccountsOptions}
            title="تحليلات المستخدمين"
            height={285}
          />
        </div>
        <div className="col-12">
          <ReusableDataTable
            title="الحسابات"
            filter={false}
            data={data}
            columns={columns}
            lang="ar"
            initialPageSize={10}
          />
        </div>
      </div>
    </section>
  );
};

export default UserAccounts;
