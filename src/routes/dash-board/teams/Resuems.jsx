import { useMemo } from "react";
import ReusableDataTable from "../../../ui/ReusableDataTable";
import { createColumnHelper } from "@tanstack/react-table";
import { Link } from "react-router";
import ColumnChart from "../../../ui/dash-board/charts/ColumnChart";
import { Badge } from "react-bootstrap";
const columnHelper = createColumnHelper();

const usersSeries = [
  { name: "المتابعون", data: ["450", "211", "108"] },
  { name: " الاعضاء", data: ["320", "200", "111"] },
  { name: "الوثائق ", data: ["150", "80", "60"] },
  { name: "الخبرات", data: ["40", "50", "20"] },
  { name: "عدد الحسابات ", data: ["40", "50", "20"] },
];

const usersCategories = [
  "(اساسي) مقدم برامج",
  "(متميز) مقدم برامج",
  "(رواد) مقدم برامج",
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
        accountType: "متميز",
        date: "25-Apr-2020",
        helpPoints: "6",
        status: "غير نشط",
        nationality: "السعودية",
        region: "014-المنطقة الوسطى",
        location: "المملكة العربية السعودية",
        city: "الرياض-001",
        experiences: "10 ",
        followers: "12",
        members: "10",
        docs: "4",
        action: "معاينه",
      },
      {
        name: "محمد",
        lastName: "احمد",
        gender: "ذكر",
        accountNumber: "U-020522-00215b",
        accountType: "رواد",
        date: "25-Apr-2020",
        helpPoints: "6",
        status: "نشط",
        nationality: "السعودية",
        region: "014-المنطقة الوسطى",
        location: "المملكة العربية السعودية",
        city: "الرياض-002",
        experiences: "10 ",
        followers: "12",
        members: "10",
        docs: "4",
        action: "معاينه",
      },
      {
        name: "علي",
        lastName: "كامل",
        gender: "ذكر",
        accountNumber: "U-020522-00215c",
        accountType: "اساسي",
        date: "25-Apr-2020",
        helpPoints: "6",
        status: "محذوف",
        nationality: "السعودية",
        region: "014-المنطقة الوسطى",
        location: "المملكة العربية السعودية",
        city: "الرياض-003",
        experiences: "10 ",
        followers: "12",
        members: "10",
        docs: "4",
        action: "معاينه",
      },
      {
        name: "علي",
        lastName: "كامل",
        gender: "ذكر",
        accountNumber: "U-020522-00215c",
        accountType: "اساسي",
        date: "25-Apr-2020",
        helpPoints: "6",
        status: "موقوف",
        nationality: "السعودية",
        region: "014-المنطقة الوسطى",
        location: "المملكة العربية السعودية",
        city: "الرياض-003",
        experiences: "10 ",
        followers: "12",
        members: "10",
        docs: "4",
        action: "معاينه",
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
      columnHelper.accessor("helpPoints", {
        header: " نقاط المساعده ",
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
      columnHelper.accessor("members", {
        header: " الاعضاء ",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("followers", {
        header: " المتابعون ",
        cell: (info) => info.getValue(),
      }),

      columnHelper.accessor("experiences", {
        header: " الخبرات ",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("docs", {
        header: " الوثائق ",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("action", {
        header: " معاينه ",
        cell: (info) => (
          <Link className="log px-2  py-1">{info.getValue()}</Link>
        ),
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
            filter={false}
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
