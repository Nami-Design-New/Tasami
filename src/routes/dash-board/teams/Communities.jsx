import { useMemo } from "react";
import ColumnChart from "../../../ui/dash-board/charts/ColumnChart";
import ReusableDataTable from "../../../ui/ReusableDataTable";
import { createColumnHelper } from "@tanstack/react-table";
import { Link } from "react-router";
import { Badge } from "react-bootstrap";

const usersSeries = [
  { name: "عدد الحسابات", data: [4800, 3000, 5200] },
  { name: "عدد المجتمعات", data: [4200, 2800, 4800] },
  { name: "الاعضاء", data: [3600, 2200, 4150] },
  { name: "المشاهدات", data: [20000, 16000, 36000] },
  { name: "المحاورات", data: [8200, 9400, 10000] },
  { name: "المنشورات", data: [520, 380, 250] },
  { name: "الاستشارات", data: [1800, 1500, 800] },
  { name: "الاجتماعات", data: [2500, 1500, 2400] },
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
  colors: [
    "#0070C0", // عدد الحسابات - dark blue
    "#00B0F0", // عدد المجتمعات - light blue
    "#92D050", // الإنشاء - green
    "#ED7D31", // المشاهدات - orange
    "#FFC000", // المحاورات - yellow
    "#D9D9D9", // المنشورات - light gray
    "#1F4E78", // الاستشارات - navy blue
    "#A05A2C", // الاجتماعات - brown
  ],
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

const Communities = () => {
  const data = useMemo(
    () => [
      {
        firstName: "صالح أ.",
        lastName: "العمر",
        gender: "ذكر",
        accountNumber: "U-123",
        accountType: "أساسي",
        createDate: "25-Apr-2020",
        accountStatus: "نشط",
        nationality: "السعودية",
        region: "01-الشرق الأوسط",
        sector: "014-المملكة العربية السعودية",
        city: "001-الرياض",
        communityTitle: "محترف التقنية",
        memberCount: 120,
        views: 12,
        discussions: 3,
        posts: 15,
        consultations: 9,
        meetings: 3,
        date: "25-Apr-2020",
      },
      {
        firstName: "محمد ن.",
        lastName: "عبداللطيف",
        gender: "ذكر",
        accountNumber: "U-123",
        accountType: "متميز",
        createDate: "25-Apr-2020",
        accountStatus: "غير نشط",
        nationality: "السعودية",
        region: "01-الشرق الأوسط",
        sector: "014-المملكة العربية السعودية",
        city: "002-جدة",
        communityTitle: "مواعيد",
        memberCount: 80,
        views: 10,
        discussions: 8,
        posts: 24,
        consultations: 14,
        meetings: 4,
        date: "25-Apr-2020",
      },
      {
        firstName: "علي ب.",
        lastName: "السالم",
        gender: "ذكر",
        accountNumber: "U-123",
        accountType: "رواد",
        createDate: "25-Apr-2020",
        accountStatus: "نشط",
        nationality: "السعودية",
        region: "01-الشرق الأوسط",
        sector: "014-المملكة العربية السعودية",
        city: "005-المدينة",
        communityTitle: "القراءة للجميع",
        memberCount: 250,
        views: 3,
        discussions: 4,
        posts: 31,
        consultations: 16,
        meetings: 4,
        date: "25-Apr-2020",
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("firstName", {
        header: "الاسم الأول",
        cell: (info) => info.getValue(),
        enableSorting: false,
      }),
      columnHelper.accessor("lastName", {
        header: "اسم العائلة",
        cell: (info) => info.getValue(),
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
      columnHelper.accessor("createDate", {
        header: "التاريخ",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("accountType", {
        header: "نوع الحساب",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("accountStatus", {
        header: "حالة الحساب",
        cell: (info) => {
          let badgeColor;
          switch (info.getValue()) {
            case "نشط":
              badgeColor = "#28a745";
              break;
            case "غير نشط":
              badgeColor = "#007BFF";
              break;
            case "محذوف":
              badgeColor = "#dc3545"; // red
              break;
            default:
              badgeColor = "#6c757d"; // gray
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
        header: "الجنسية",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("region", {
        header: "الإقليم",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("sector", {
        header: "القطاع",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("city", {
        header: "المدينة",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("communityTitle", {
        header: "عنوان المجتمع",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("memberCount", {
        header: "عدد الأعضاء",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("views", {
        header: "المشاهدات",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("discussions", {
        header: "المحاورات",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("posts", {
        header: "المنشورات",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("consultations", {
        header: "الاستشارات",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("meetings", {
        header: "الاجتماعات",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("date", {
        header: "التاريخ",
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
            title={"المجتمعات"}
          />
        </div>
        <div className="col-12">
          <ReusableDataTable
            title=" المجتمعات "
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

export default Communities;
