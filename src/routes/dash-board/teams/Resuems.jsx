import { useMemo } from "react";
import ReusableDataTable from "../../../ui/ReusableDataTable";
import { createColumnHelper } from "@tanstack/react-table";
import { Link } from "react-router";
import ColumnChart from "../../../ui/dash-board/charts/ColumnChart";
import { Badge } from "react-bootstrap";
const columnHelper = createColumnHelper();

const usersSeries = [
  { name: "الحسابات", data: ["450", "211", "108", "120", "30"] },
  { name: " السير الذاتيه", data: ["320", "200", "150", "110", "50"] },
  { name: "الخبرات ", data: ["150", "80", "60", "90", "20"] },
  { name: " دورات تاهيليه", data: ["40", "50", "20", "80", "35"] },
  { name: "شهادات اكاديميه ", data: ["40", "50", "20", "125", "40"] },
  { name: " دراسات عليا ", data: ["40", "50", "20", "125", "40"] },
];

const usersCategories = [
  "(ملهم) مقدم برامج",
  "(خبير) مقدم برامج",
  "(جدير) مقدم برامج",
];

const usersOptions = {
  chart: {
    type: "bar",
    stacked: true,
    height: 350,
    toolbar: { show: true },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "10%",
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
  colors: ["#214b92", "#22C55E", "#F97316", "#EF4444", " #3B82F6", "#5fcafa"],

  legend: {
    position: "top",
    horizontalAlign: "center",
  },
};
const Resuems = () => {
  const data = useMemo(
    () => [
      {
        name: "صالح",
        lastName: "محمد",
        gender: "ذكر",
        accountNumber: "U-020522-00215a",
        accountType: "خبير",
        date: "25-Apr-2020",
        status: "غير نشط",
        nationality: "السعودية",
        region: "014-المنطقة الوسطى",
        location: "المملكة العربية السعودية",
        city: "الرياض-001",
        experiences: "10 ",
        qualification: "شهادة اكاديميه",
        workGroup: "GIN-1211321",
      },
      {
        name: "محمد",
        lastName: "احمد",
        gender: "ذكر",
        accountNumber: "U-020522-00215b",
        accountType: "جدير",
        date: "25-Apr-2020",
        status: "نشط",
        nationality: "السعودية",
        region: "014-المنطقة الوسطى",
        location: "المملكة العربية السعودية",
        city: "الرياض-002",
        experiences: "10 ",
        qualification: "شهادة اكاديميه",
      },
      {
        name: "علي",
        lastName: "كامل",
        gender: "ذكر",
        accountNumber: "U-020522-00215c",
        accountType: "ملهم",
        date: "25-Apr-2020",
        status: "محذوف",
        nationality: "السعودية",
        region: "014-المنطقة الوسطى",
        location: "المملكة العربية السعودية",
        city: "الرياض-003",
        experiences: "10 ",
        qualification: "شهادة اكاديميه",
      },
      {
        name: "علي",
        lastName: "كامل",
        gender: "ذكر",
        accountNumber: "U-020522-00215c",
        accountType: "ملهم",
        date: "25-Apr-2020",
        status: "موقوف",
        nationality: "السعودية",
        region: "014-المنطقة الوسطى",
        location: "المملكة العربية السعودية",
        city: "الرياض-003",
        experiences: "10 ",
        qualification: "شهادة اكاديميه",
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
      columnHelper.accessor("lastName", {
        header: "اسم العائله",
        cell: (info) => info.getValue(),
        enableSorting: false,
      }),
      columnHelper.accessor("gender", {
        header: "الجنس",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("accountNumber", {
        header: "رقم الحساب",
        cell: (info) => (
          <Link
            to={`/model/${info.getValue()}`}
            className="link-styls"
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
      columnHelper.accessor("status", {
        header: " حاله الحساب ",
        cell: (info) => {
          let badgeColor;
          switch (info.getValue()) {
            case "نشط":
              badgeColor = "#28a745";
              break;
            case "موقوف":
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
      columnHelper.accessor("nationality", {
        header: "الجنسيه",
        cell: (info) => info.getValue(),
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
      columnHelper.accessor("experiences", {
        header: " الخبرات ",
        cell: (info) => info.getValue(),
      }),

      columnHelper.accessor("qualification", {
        header: " التأهيل  ",
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
            title={"السير الذاتيه"}
            options={usersOptions}
            series={usersSeries}
          />
        </div>
        <div className="col-12">
          <ReusableDataTable
            data={data}
            columns={columns}
            title={"السير الذاتيه"}
            initialPageSize={10}
          />
        </div>
      </div>
    </section>
  );
};

export default Resuems;
