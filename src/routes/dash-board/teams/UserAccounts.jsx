import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import { Badge } from "react-bootstrap";
import { Link } from "react-router";
import ColumnChart from "../../../ui/dash-board/charts/ColumnChart";
import ReusableDataTable from "../../../ui/table/ReusableDataTable";
import { useTranslation } from "react-i18next";

const columnHelper = createColumnHelper();

const UserAccounts = () => {
  const { t } = useTranslation();

  // localized chart data
  const series = [
    {
      name: t("dashboard.userAccounts.totalAccounts"),
      data: ["5000", "1000", "800", "500"],
    },
    {
      name: t("dashboard.userAccounts.activeAccounts"),
      data: ["3000", "800", "700", "400"],
    },
    {
      name: t("dashboard.userAccounts.inactiveAccounts"),
      data: ["1200", "150", "80", "60"],
    },
    {
      name: t("dashboard.userAccounts.suspendedAccounts"),
      data: ["800", "50", "20", "40"],
    },
  ];

  const usersCategories = [
    t("dashboard.userAccounts.category.beneficiary"),
    t("dashboard.userAccounts.category.basic"),
    t("dashboard.userAccounts.category.premium"),
    t("dashboard.userAccounts.category.royal"),
  ];

  const UseresAccountsOptions = {
    chart: { type: "bar", height: 350, toolbar: { show: true } },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "12%",
        endingShape: "rounded",
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: usersCategories,
      labels: { style: { fontSize: "14px" } },
    },
    yaxis: { labels: { style: { fontSize: "12px" } } },
    colors: ["#8c137e", "#28A745", "#007BFF", "#DC3545"],
    tooltip: {
      y: {
        formatter: (val) => `${val} ${t("dashboard.userAccounts.programs")}`,
      },
    },
    legend: { position: "top", horizontalAlign: "center" },
  };
  const data = useMemo(
    () => [
      {
        name: "صالح",
        accountNumber: "U-020522-000001",
        accountType: "رواد",
        date: "25-Apr-2020",
        gender: "ذكر",
        beneficiaryPoints: "13",
        assistanceProviderPoints: "12",
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
        accountNumber: "U-020522-000002",
        accountType: "رواد",
        date: "25-Apr-2020",
        gender: "ذكر",
        beneficiaryPoints: "13",
        assistanceProviderPoints: "12",
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
        accountNumber: "U-020522-000003",
        accountType: "اساسي",
        date: "25-Apr-2020",
        gender: "ذكر",
        beneficiaryPoints: "13",
        assistanceProviderPoints: "12",
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
        accountNumber: "U-020522-000004",
        accountType: "مستفيد",
        date: "25-Apr-2020",
        gender: "ذكر",
        beneficiaryPoints: "13",
        assistanceProviderPoints: "12",
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
        accountNumber: "U-020522-000005",
        accountType: "اساسي",
        date: "25-Apr-2020",
        gender: "ذكر",
        beneficiaryPoints: "13",
        assistanceProviderPoints: "12",
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
        accountNumber: "U-020522-000006",
        accountType: "متميز",
        date: "25-Apr-2020",
        gender: "ذكر",
        beneficiaryPoints: "13",
        assistanceProviderPoints: "12",
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
        accountNumber: "U-020522-000007",
        accountType: "مستفيد",
        date: "25-Apr-2020",
        gender: "ذكر",
        beneficiaryPoints: "13",
        assistanceProviderPoints: "12",
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
        accountNumber: "U-020522-000008",
        accountType: "رواد",
        date: "25-Apr-2020",
        gender: "ذكر",
        beneficiaryPoints: "13",
        assistanceProviderPoints: "12",
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
        accountNumber: "U-020522-000009",
        accountType: "اساسي",
        date: "25-Apr-2020",
        gender: "ذكر",
        beneficiaryPoints: "13",
        assistanceProviderPoints: "12",
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
        accountNumber: "U-020522-000010",
        accountType: "متميز",
        date: "25-Apr-2020",
        gender: "ذكر",
        beneficiaryPoints: "13",
        assistanceProviderPoints: "12",
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
        accountNumber: "U-020522-000011",
        accountType: "مستفيد",
        date: "25-Apr-2020",
        gender: "ذكر",
        beneficiaryPoints: "13",
        assistanceProviderPoints: "12",
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
        accountNumber: "U-020522-000012",
        accountType: "رواد",
        date: "25-Apr-2020",
        gender: "ذكر",
        beneficiaryPoints: "13",
        assistanceProviderPoints: "12",
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
        accountNumber: "U-020522-000013",
        accountType: "متميز",
        date: "25-Apr-2020",
        gender: "ذكر",
        beneficiaryPoints: "13",
        assistanceProviderPoints: "12",
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
        accountNumber: "U-020522-000014",
        accountType: "اساسي",
        date: "25-Apr-2020",
        gender: "ذكر",
        beneficiaryPoints: "13",
        assistanceProviderPoints: "12",
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
        accountNumber: "U-020522-000015",
        accountType: "مستفيد",
        date: "25-Apr-2020",
        gender: "ذكر",
        beneficiaryPoints: "13",
        assistanceProviderPoints: "12",
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
        header: t("dashboard.userAccounts.name"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("accountNumber", {
        header: t("dashboard.userAccounts.accountNumber"),
        cell: (info) => (
          <Link
            to={`/dashboard/user-details/${info.getValue()}`}
            className="link-styles"
            style={{ textDecoration: "underline" }}
          >
            {info.getValue()}
          </Link>
        ),
      }),
      columnHelper.accessor("accountType", {
        header: t("dashboard.userAccounts.accountType"),
      }),
      columnHelper.accessor("date", {
        header: t("dashboard.userAccounts.date"),
      }),
      columnHelper.accessor("gender", {
        header: t("dashboard.userAccounts.gender"),
      }),
      columnHelper.accessor("beneficiaryPoints", {
        header: t("dashboard.userAccounts.beneficiaryPoints"),
      }),
      columnHelper.accessor("assistanceProviderPoints", {
        header: t("dashboard.userAccounts.assistanceProviderPoints"),
      }),
      columnHelper.accessor("nationality", {
        header: t("dashboard.userAccounts.nationality"),
      }),
      columnHelper.accessor("region", {
        header: t("dashboard.userAccounts.region"),
      }),
      columnHelper.accessor("location", {
        header: t("dashboard.userAccounts.sector"),
      }),
      columnHelper.accessor("city", {
        header: t("dashboard.userAccounts.city"),
      }),
      columnHelper.accessor("subscriptionEntity", {
        header: t("dashboard.userAccounts.subscriptionStart"),
      }),
      columnHelper.accessor("subscriptionEnd", {
        header: t("dashboard.userAccounts.subscriptionEnd"),
      }),
      columnHelper.accessor("status", {
        header: t("dashboard.userAccounts.status"),
        cell: (info) => {
          let badgeColor;
          const value = info.getValue();

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
              {value}
            </Badge>
          );
        },
      }),
      columnHelper.accessor("accountStatusDate", {
        header: t("dashboard.userAccounts.statusDate"),
      }),
      columnHelper.accessor("time", {
        header: t("dashboard.userAccounts.statusTime"),
        cell: (info) => (
          <div>
            {info.getValue() === null
              ? t("dashboard.userAccounts.noEvaluation")
              : info.getValue()}
          </div>
        ),
      }),
    ],
    [t]
  );

  return (
    <section className="mt-5">
      <div className="row">
        <div className="col-12 p-2">
          <ColumnChart
            series={series}
            options={UseresAccountsOptions}
            title={t("dashboard.userAccounts.usersAnalytics")}
            height={285}
          />
        </div>

        <div className="col-12 p-2">
          <ReusableDataTable
            title={t("dashboard.userAccounts.accounts")}
            filter={false}
            data={data}
            columns={columns}
            lang="ar"
            initialPageSize={10}
            searchPlaceholder={t("dashboard.userAccounts.searchPlaceholder")}
          />
        </div>
      </div>
    </section>
  );
};

export default UserAccounts;
