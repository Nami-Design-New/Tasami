import { useMemo } from "react";
import StatisticsCard from "../../../ui/dash-board/cards/StatisticsCard";
import ReusableDataTable from "../../../ui/ReusableDataTable";
import { createColumnHelper } from "@tanstack/react-table";
import { Link } from "react-router";
const statsData = [
  {
    icon: "fa-users",
    value: "5000",
    label: "المستفيدين",
    color: "#06b6d4",
    bgColor: "#ecfeff",
  },
  {
    icon: "fa-chart-pie",
    value: "4400",
    label: "الخدمات المطلوبه",
    color: "#6366f1",
    bgColor: "#eef2ff",
  },
  {
    icon: "fa-shopping-cart",
    value: "1.423k",
    label: "العروض المقدمه",
    color: "#5fcafa;",
    bgColor: "#fff1f2",
  },
  {
    icon: " fa-handshake-angle",
    value: "$9745",
    label: "المنجزة",
    color: "#22c55e",
    bgColor: "#f0fdf4",
  },
  {
    icon: "fa-trash",
    value: "$9745",
    label: "المحزوفة",
    color: "#f43f5e",
    bgColor: "#f0fdf4",
  },
];

const columnHelper = createColumnHelper();
const Services = () => {
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
          <StatisticsCard data={statsData} updated="1 month ago" />
        </div>
        <div className="col-12">
          <ReusableDataTable
            title="الخدمات"
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

export default Services;
