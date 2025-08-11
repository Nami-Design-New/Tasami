import { useMemo } from "react";
import ReusableDataTable from "../../../ui/table/ReusableDataTable";
import { createColumnHelper } from "@tanstack/react-table";
import { Link } from "react-router";
import { Badge } from "react-bootstrap";
import ColumnChart from "../../../ui/dash-board/charts/ColumnChart";

const userGrowthSeries = [
  {
    name: "المستخدمين",
    data: [4000, 600, 1000, 2000, 400],
  },
];
const userGrowthCategories = [
  " الاهداف الشخصيه",
  "بانتظار التنفيذ",
  "قيد التنفيذ",
  "مكتمله",
  "محذوفه",
];
const userGrowthOptions = {
  chart: {
    type: "bar",
    height: 350,
    toolbar: { show: true },
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      columnWidth: "10%",
      endingShape: "rounded",
      distributed: true,
    },
  },
  dataLabels: { enabled: false },
  xaxis: {
    categories: userGrowthCategories,
  },
  yaxis: {},
  colors: ["#8c137e", "#007BFF", "#FFC107", "#28A745", "#DC3545"],
  tooltip: {
    y: {
      formatter: (val) => `${val} مستخدم`,
    },
  },
};
const columnHelper = createColumnHelper();
const PersonalGoals = () => {
  // const data = useMemo(
  //   () => [
  //     {
  //       serviceNumber: "PRG-001",
  //       date: "25-Apr-2020",
  //       status: "مكتمل",
  //       accountNumber: "U-020522-00215a",
  //       accountType: "مستفيد",
  //       IdNumber: "ID-123456",
  //       region: "014-الشرق الاوسط ",
  //       location: "المملكة العربية السعودية",
  //       city: "الرياض-001",
  //       field: "الهندسة",
  //       Specialization: "مدني",
  //       offers: 4,
  //       numbrOfUseres: 120,
  //       rate: 4.5,
  //     },
  //     {
  //       serviceNumber: "PRG-002",
  //       date: "25-Apr-2020",
  //       status: "محذوف",
  //       accountNumber: "U-020522-00215b",
  //       accountType: "رواد",
  //       IdNumber: "ID-123457",
  //       region: "014-الشرق الاوسط ",
  //       location: "المملكة العربية السعودية",
  //       city: "الرياض-001",
  //       field: "المالية",
  //       Specialization: "محاسبة",
  //       offers: 4,
  //       numbrOfUseres: 45,
  //       rate: 4.2,
  //     },
  //   ],
  //   []
  // );

  const data = useMemo(
    () => [
      {
        serviceNumber: "PO-091025-000001",
        date: "09-10-2025",
        status: "مكتمل",
        accountNumber: "U-020522-000215",
        accountType: "مستفيد",
        IdNumber: "01-014-003",
        region: "الشرق الاوسط ",
        location: "المملكة العربية السعودية",
        city: "الرياض",
        field: "الهندسة",
        Specialization: "مدني",
        offers: 4,
        numbrOfUseres: 120,
        rate: 4.5,
      },
      {
        serviceNumber: "PO-091025-000002",
        date: "09-10-2025",
        status: "محذوف",
        accountNumber: "U-020522-000216",
        accountType: "رواد",
        IdNumber: "01-014-003",
        region: "الشرق الاوسط ",
        location: "المملكة العربية السعودية",
        city: "الرياض",
        field: "المالية",
        Specialization: "محاسبة",
        offers: 4,
        numbrOfUseres: 45,
        rate: "-",
      },
      {
        serviceNumber: "PO-091025-000003",
        date: "09-10-2025",
        status: "بانتظار التنفيذ",
        accountNumber: "U-020522-000217",
        accountType: "رواد",
        IdNumber: "01-014-003",
        region: "الشرق الاوسط ",
        location: "المملكة العربية السعودية",
        city: "الرياض",
        field: "المالية",
        Specialization: "محاسبة",
        offers: 4,
        numbrOfUseres: 45,
        rate: "-",
      },
      {
        serviceNumber: "PO-091025-000004",
        date: "09-10-2025",
        status: "قيد التنفيذ",
        accountNumber: "U-020522-000218",
        accountType: "رواد",
        IdNumber: "01-014-003",
        region: "الشرق الاوسط ",
        location: "المملكة العربية السعودية",
        city: "الرياض",
        field: "المالية",
        Specialization: "محاسبة",
        offers: 4,
        numbrOfUseres: 45,
        rate: "-",
      },
    ],
    []
  );
  const columns = useMemo(
    () => [
      columnHelper.accessor("serviceNumber", {
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
      columnHelper.accessor("offers", {
        header: " العروض المقدمه",
        cell: (info) => info.getValue(),
        enableSorting: false,
      }),
      columnHelper.accessor("status", {
        header: " المرحله ",
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

      columnHelper.accessor("IdNumber", {
        header: "رقم التعريف",
        cell: (info) => info.getValue(),
        // cell: (info) => (
        //   <Link to={`/model/${info.getValue()}`} className="link-styles">
        //     {info.getValue()}
        //   </Link>
        // ),
      }),
      columnHelper.accessor("region", {
        header: "الاقليم",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("location", {
        header: "القطاع",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("city", {
        header: "المدينه",
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

      columnHelper.accessor("numbrOfUseres", {
        header: "القيمه",
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
            series={userGrowthSeries}
            options={userGrowthOptions}
            title={" الاهداف الشخصيه "}
          />
        </div>
        <div className="col-12">
          <ReusableDataTable
            title="الخدمات"
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

export default PersonalGoals;
