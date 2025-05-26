import React, { useMemo } from "react";
import ColumnChart from "../../../ui/dash-board/home/ColumnChart";
import ReusableDataTable from "../../../ui/ReusableDataTable";
import { createColumnHelper } from "@tanstack/react-table";
import { Link } from "react-router";

const usersSeries = [
  { name: "عدد الحسابات", data: ["450", "211", "108"] },
  { name: "البرامج النشطة", data: ["320", "200", "150"] },
  { name: "البرامج المؤرشفة", data: ["150", "80", "60"] },
  { name: "البرامج المحذوفة", data: ["40", "50", "20"] },
];

const usersCategories = [
  "(ملهم) مقدم برامج",
  "(خبير) مقدم برامج",
  "(جدير) مقدم برامج",
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
      columnWidth: "18%", // More space between bars
      barHeight: "100%",
      endingShape: "rounded",
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
  colors: ["#3B82F6", "#22C55E", "#F97316", "#EF4444"],
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

const Programs = () => {
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
        accountType: "ملهم",
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
        accountType: "خبير",
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
        accountType: "جدير",
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
        accountType: "ملهم",
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
        accountType: "خبير",
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
        accountType: "جدير",
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
        accountType: "خبير",
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
        accountType: "ملهم",
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
          <Link
            to={`/model/${info.getValue()}`}
            className="model-link"
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
          const statusStyle = {
            backgroundColor:
              info.getValue() === "نشط"
                ? "#28a745"
                : info.getValue() === "غير نشطة"
                ? "#007bff"
                : info.getValue() === "موقوفه"
                ? "##dc3545"
                : "#6c757d",
          };
          return (
            <span className="badge" style={statusStyle}>
              {info.getValue()}
            </span>
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
        <div className="col-12">
          <ColumnChart series={usersSeries} options={usersOptions} />
        </div>
        <div className="col-12">
          <ReusableDataTable
            title="البرامج"
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

export default Programs;
