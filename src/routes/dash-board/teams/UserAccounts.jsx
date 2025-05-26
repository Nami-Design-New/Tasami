import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import LineAnalyticsChart from "../../../ui/dash-board/cards/RevenueAnalyticsCard ";
import DounutCharts from "../../../ui/dash-board/home/EmployersChart";
import ReusableDataTable from "../../../ui/ReusableDataTable";
import { Link } from "react-router";
const series = [
  {
    name: "العدد الكلي",
    type: "area",
    data: [5400, 400, 200, 150],
  },
  {
    name: " نشط ",
    type: "line",
    data: [5000, 300, 150, 120],
  },
  {
    name: " غير نشط",
    type: "line",
    data: [350, 70, 28, 20],
  },
];
const categories = [
  "متسفيد",
  " (ملهم) مقدم برامج",
  "(خبير) مقدم برامج",
  " (جدير)  مقدم برامج",
];

const SuspendedAccountSeries = [50, 30, 22, 10];

const options = {
  labels: categories,
  chart: {
    type: "donut",
  },
  colors: ["#214b92", "#5fcafa", "#5f4aff", "#ff4a5f"],
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

const columnHelper = createColumnHelper();

const UserAccounts = () => {
  const data = useMemo(
    () => [
      {
        id: 1,
        operation: "البلاغات",
        subject: "طلب خدمة",
        model: "EVL-122201",
        program: "برنامج الدعم",
        userAccount: "U-010222-0000",
        date: "2025-05-25",
        time: "10:30",
        group: "GN-000002",
        employerName: "إياد محمد خالد",
        employerAccount: "E-010222-0000",
        completionDate: "2025-05-25",
        status: "قيد التنفيذ",
        actionLevel: "الموظف",
        action: null,
      },
      {
        id: 2,
        operation: "استلام",
        subject: "شكوى",
        model: "EVL-122201",
        program: "خدمة العملاء",
        userAccount: "U-010222-0000",
        date: "2025-05-25",
        time: "10:30",
        group: "GN-000002",
        employerName: "أحمد سعيد محمود",
        employerAccount: "E-010222-0000",
        completionDate: "2025-05-25",
        status: "مكتمل",
        actionLevel: "المشرف",
        action: null,
      },
      {
        id: 3,
        operation: "إرسال",
        subject: "تحديث بيانات",
        model: "PIN-122201",
        program: "الخدمات المصرفية",
        userAccount: "U-010222-0000",
        date: "2025-05-25",
        time: "10:30",
        group: "GN-000002",
        employerName: "سارة أحمد علي",
        employerAccount: "E-010222-0000",
        completionDate: "2025-05-25",
        status: "غير مضاف",
        actionLevel: "المشرف",
        action: null,
      },
      {
        id: 4,
        operation: "استلام",
        subject: "فتح حساب",
        model: "PIN-122201",
        program: "التمويل الشخصي",
        userAccount: "U-010222-0000",
        date: "2025-05-25",
        time: "10:30",
        group: "GN-000002",
        employerName: "محمد خالد عبدالله",
        employerAccount: "E-010222-0000",
        completionDate: "2025-05-25",
        status: "قيد التنفيذ",
        actionLevel: "التنفيذي",
        action: null,
      },
      {
        id: 5,
        operation: "إرسال",
        subject: "إغلاق حساب",
        model: "PIN-122201",
        program: "الخدمات العامة",
        userAccount: "U-010222-0000",
        date: "2025-05-25",
        time: "10:30",
        group: "GN-000002",
        employerName: "فاطمة محمد سعيد",
        employerAccount: "E-010222-0000",
        completionDate: "2025-05-25",
        status: "مكتمل",
        actionLevel: "التنفيذي",
        action: "3.2",
      },
      {
        id: 6,
        operation: "استلام",
        subject: "تحديث كلمة مرور",
        model: "PIN-122201",
        program: "الخدمة الذاتية",
        userAccount: "U-010222-0000",
        date: "2025-05-25",
        time: "10:30",
        group: "GN-000002",
        employerName: "عمر أحمد حسن",
        employerAccount: "E-010222-0000",
        completionDate: "2025-05-25",
        status: "غير مضاف",
        actionLevel: "الموظف",
        action: null,
      },
      {
        id: 7,
        operation: "إرسال",
        subject: "طلب بطاقة جديدة",
        model: "PIN-122201",
        program: "بطاقات الائتمان",
        userAccount: "U-010222-0000",
        date: "2025-05-25",
        time: "10:30",
        group: "GN-000002",
        employerName: "ليلى عبدالرحمن محمد",
        employerAccount: "E-010222-0000",
        completionDate: "2025-05-25",
        status: "مكتمل",
        actionLevel: "الموظف",
        action: "3.2",
      },
      {
        id: 8,
        operation: "استلام",
        subject: "بلاغ عن فقدان",
        model: "PIN-122201",
        program: "خدمة الطوارئ",
        userAccount: "U-010222-0000",
        date: "2025-05-25",
        time: "10:30",
        group: "GN-000002",
        employerName: "يوسف محمد علي",
        employerAccount: "E-010222-0000",
        completionDate: "2025-05-25",
        status: "مكتمل",
        actionLevel: "الموظف",
        action: "3.2",
      },
      {
        id: 9,
        operation: "إرسال",
        subject: "استفسار عام",
        model: "PIN-122201",
        program: "الدعم الفني",
        userAccount: "U-010222-0000",
        date: "2025-05-25",
        time: "10:30",
        group: "GN-000002",
        employerName: "نورة سعد محمد",
        employerAccount: "E-010222-0000",
        completionDate: "2025-05-25",
        status: "غير مضاف",
        actionLevel: "المشرف",
        action: null,
      },
      {
        id: 10,
        operation: "استلام",
        subject: "طلب معلومات",
        model: "PIN-122201",
        program: "التواصل المؤسسي",
        userAccount: "U-010222-0000",
        date: "2025-05-25",
        time: "10:30",
        group: "GN-000002",
        employerName: "خالد عبدالله أحمد",
        employerAccount: "E-010222-0000",
        completionDate: "2025-05-25",
        status: "قيد التنفيذ",
        actionLevel: "التنفيذي",
        action: "اضف الي المهام",
      },
      {
        id: 11,
        operation: "إرسال",
        subject: "اعتراض",
        model: "PIN-122201",
        program: "حل النزاعات",
        userAccount: "U-010222-0000",
        date: "2025-05-25",
        time: "10:30",
        group: "GN-000002",
        employerName: "هند محمد سالم",
        employerAccount: "E-010222-0000",
        completionDate: "2025-05-25",
        status: "مكتمل",
        actionLevel: "التنفيذي",
        action: null,
      },
      {
        id: 12,
        operation: "استلام",
        subject: "طلب إلغاء",
        model: "PIN-122201",
        program: "إدارة العقود",
        userAccount: "U-010222-0000",
        date: "2025-05-25",
        time: "10:30",
        group: "GN-000002",
        employerName: "سلطان فهد عبدالعزيز",
        employerAccount: "E-010222-0000",
        completionDate: "2025-05-25",
        status: "غير مضاف",
        actionLevel: "التنفيذي",
        action: null,
      },
      {
        id: 13,
        operation: "إرسال",
        subject: "طلب تصريح",
        model: "PIN-122201",
        program: "خدمة المشاريع",
        userAccount: "U-010222-0000",
        date: "2025-05-25",
        time: "10:30",
        group: "GN-000002",
        employerName: "منى سعيد أحمد",
        employerAccount: "E-010222-0000",
        completionDate: "2025-05-25",
        status: "مكتمل",
        actionLevel: "المشرف",
        action: "4.3",
      },
      {
        id: 14,
        operation: "استلام",
        subject: "اقتراح تحسين",
        model: "PIN-122201",
        program: "تحسين الجودة",
        userAccount: "U-010222-0000",
        date: "2025-05-25",
        time: "10:30",
        group: "GN-000002",
        employerName: "عبدالرحمن محمد خالد",
        completionDate: "2025-05-25",
        status: "مكتمل",
        actionLevel: "المشرف",
        employerAccount: "E-010222-0000",
        action: null,
      },
      {
        id: 15,
        operation: "إرسال",
        subject: "طلب قرض",
        model: "PIN-122201",
        program: "الخدمات التمويلية",
        userAccount: "U-010222-0000",
        date: "2025-05-25",
        time: "10:30",
        group: "GN-000002",
        employerName: "لمياء عبدالله محمد",
        employerAccount: "E-010222-0000",
        completionDate: "2025-05-25",
        status: "غير مضاف",
        actionLevel: "المشرف",
        action: null,
      },
      {
        id: 16,
        operation: "تقييم",
        subject: " تقييم الخدمه ",
        model: "PIN-122201",
        program: "إدارة العقود",
        userAccount: "U-010222-0000",
        date: "2025-05-25",
        time: "10:30",
        group: "GN-000002",
        employerName: "فيصل سعود عبدالعزيز",
        employerAccount: "E-010222-0000",
        completionDate: "2025-05-25",
        status: "قيد التنفيذ",
        actionLevel: "المشرف",
        action: null,
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("operation", {
        header: "العملية",
        cell: (info) => info.getValue(),
        enableSorting: false,
      }),

      columnHelper.accessor("subject", {
        header: "الموضوع",
        cell: (info) => info.getValue(),
        enableSorting: false,
      }),
      columnHelper.accessor("model", {
        header: "النموذج",
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
      columnHelper.accessor("program", {
        header: " البرامج ",
        cell: (info) => (
          <Link
            to={`/program/${info.getValue()}`}
            className="model-link"
            style={{ textDecoration: "underline" }}
          >
            {info.getValue()}
          </Link>
        ),
      }),
      columnHelper.accessor("userAccount", {
        header: "حساب المستخدم ",
        cell: (info) => (
          <Link
            to={`/userAccount/${info.getValue()}`}
            className="model-link"
            style={{ textDecoration: "underline" }}
          >
            {info.getValue()}
          </Link>
        ),
      }),
      columnHelper.accessor("group", {
        header: "المجموعه",
        cell: (info) => (
          <Link
            to={`/group/${info.getValue()}`}
            className="model-link"
            style={{ textDecoration: "underline" }}
          >
            {info.getValue()}
          </Link>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("date", {
        header: " التاريخ ",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("time", {
        header: " الوقت ",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("employerName", {
        header: " الموظف ",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("employerAccount", {
        header: "حساب الموظف ",
        cell: (info) => (
          <Link
            to={`/employerAccount/${info.getValue()}`}
            className="model-link"
            style={{ textDecoration: "underline" }}
          >
            {info.getValue()}
          </Link>
        ),
      }),
      columnHelper.accessor("status", {
        header: " الحالة ",
        cell: (info) => {
          const statusStyle = {
            padding: "4px 8px",
            borderRadius: "4px",
            display: "inline-block",
            fontWeight: "bold",
            color: "white",
            backgroundColor:
              info.getValue() === "مكتمل"
                ? "#28a745"
                : info.getValue() === "قيد التنفيذ"
                ? "#007bff"
                : info.getValue() === "غير مضاف"
                ? "#ffc107"
                : "#6c757d",
          };
          return <span style={statusStyle}>{info.getValue()}</span>;
        },
      }),
      columnHelper.accessor("completionDate", {
        header: " تاريخ الاكمال ",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("actionLevel", {
        header: " مستوي الاجراء ",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("action", {
        header: " التقييم ",
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
          <DounutCharts
            series={SuspendedAccountSeries}
            options={options}
            title={"  الحسابات الموقوفة  "}
          />
        </div>
        <div className="col-12 col-lg-8">
          <LineAnalyticsChart
            series={series}
            title="تحلايلات المستخدمين"
            categories={categories}
          />
        </div>
        <div className="col-12">
          <ReusableDataTable
            title="  الحسابات  "
            data={data}
            columns={columns}
            lang="ar"
            initialPageSize={10}
          />
          ;
        </div>
      </div>
    </section>
  );
};

export default UserAccounts;
