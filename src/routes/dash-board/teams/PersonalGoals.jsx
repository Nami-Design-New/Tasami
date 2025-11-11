import { useMemo } from "react";
import ReusableDataTable from "../../../ui/table/ReusableDataTable";
import { createColumnHelper } from "@tanstack/react-table";
import { Link } from "react-router";
import { Badge } from "react-bootstrap";
import ColumnChart from "../../../ui/dash-board/charts/ColumnChart";
import { useTranslation } from "react-i18next";

const columnHelper = createColumnHelper();
const PersonalGoals = () => {
  const { t } = useTranslation();

  const userGrowthSeries = [
    {
      name: t("dashboard.personalGoals.chart.users"),
      data: [4000, 600, 1000, 2000, 400],
    },
  ];

  const userGrowthCategories = [
    t("dashboard.personalGoals.chart.categories.personalGoals"),
    t("dashboard.personalGoals.chart.categories.pending"),
    t("dashboard.personalGoals.chart.categories.inProgress"),
    t("dashboard.personalGoals.chart.categories.completed"),
    t("dashboard.personalGoals.chart.categories.deleted"),
  ];

  const userGrowthOptions = {
    chart: { type: "bar", height: 350, toolbar: { show: true } },
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: "10%",
        endingShape: "rounded",
        distributed: true,
      },
    },
    dataLabels: { enabled: false },
    xaxis: { categories: userGrowthCategories },
    colors: ["#8c137e", "#007BFF", "#FFC107", "#28A745", "#DC3545"],
    tooltip: {
      y: {
        formatter: (val) =>
          `${val} ${t("dashboard.personalGoals.chart.goalUnit")}`,
      },
    },
  };

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
        header: t("dashboard.personalGoals.table.serviceNumber"),
        cell: (info) => (
          <Link to={`/model/${info.getValue()}`} className="link-styles">
            {info.getValue()}
          </Link>
        ),
      }),
      columnHelper.accessor("date", {
        header: t("dashboard.personalGoals.table.date"),
      }),
      columnHelper.accessor("accountNumber", {
        header: t("dashboard.personalGoals.table.accountNumber"),
        cell: (info) => (
          <Link
            to={`/dashboard/user-details/${info.getValue()}`}
            className="link-styles"
          >
            {info.getValue()}
          </Link>
        ),
      }),
      columnHelper.accessor("accountType", {
        header: t("dashboard.personalGoals.table.accountType"),
      }),
      columnHelper.accessor("offers", {
        header: t("dashboard.personalGoals.table.offers"),
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

      columnHelper.accessor("idNumber", {
        header: t("dashboard.personalGoals.table.idNumber"),
      }),
      columnHelper.accessor("region", {
        header: t("dashboard.personalGoals.table.region"),
      }),
      columnHelper.accessor("location", {
        header: t("dashboard.personalGoals.table.location"),
      }),
      columnHelper.accessor("city", {
        header: t("dashboard.personalGoals.table.city"),
      }),
      columnHelper.accessor("field", {
        header: t("dashboard.personalGoals.table.field"),
      }),
      columnHelper.accessor("specialization", {
        header: t("dashboard.personalGoals.table.specialization"),
      }),
      columnHelper.accessor("numberOfUsers", {
        header: t("dashboard.personalGoals.table.numberOfUsers"),
      }),
      columnHelper.accessor("rate", {
        header: t("dashboard.personalGoals.table.rate"),
      }),
    ],
    []
  );
  return (
    <section className="mt-5">
      <div className="row">
        <div className="col-12 p-2">
          <ColumnChart
            series={userGrowthSeries}
            options={userGrowthOptions}
            title={t("dashboard.personalGoals.title")}
          />
        </div>
        <div className="col-12 p-2">
          <ReusableDataTable
            title={t("dashboard.personalGoals.tableTitle")}
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
