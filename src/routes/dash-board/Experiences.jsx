import React from "react";
import ReusableDataTable from "../../ui/table/ReusableDataTable";
import { createColumnHelper } from "@tanstack/react-table";
import { Link } from "react-router";
const columnHelper = createColumnHelper();
const data = [
  {
    firstName: "صالح أ.",
    familyName: "العمر",
    gender: "ذكر",
    accountType: "أساسي",
    accountNumber: "U-123",
    date: "25-Apr-2020",
    accountStatus: "نشط",
    nationality: "السعودية",
    region: "01-الشرق الأوسط",
    sector: "014-المملكة العربية السعودية",
    city: "001-الرياض",
    field: "التدريب والتعليم",
    specialization: "التدريب",
    expertiseField: "دورات تدريبية معتمدة",
    years: 12,
    qualification: "دورات تدريبية معتمدة",
  },
  {
    firstName: "صالح أ.",
    familyName: "العمر",
    gender: "ذكر",
    accountType: "أساسي",
    accountNumber: "U-123",
    date: "25-Apr-2020",
    accountStatus: "نشط",
    nationality: "السعودية",
    region: "01-الشرق الأوسط",
    sector: "014-المملكة العربية السعودية",
    city: "002-الدمام",
    field: "التدريب والتعليم",
    specialization: "الاستشارات",
    expertiseField: "دورات تدريبية معتمدة",
    years: 3,
    qualification: "دورات تدريبية معتمدة",
  },
  {
    firstName: "محمد ن.",
    familyName: "عبداللطيف",
    gender: "ذكر",
    accountType: "متميز",
    accountNumber: "U-123",
    date: "25-Apr-2020",
    accountStatus: "غير نشط",
    nationality: "السعودية",
    region: "01-الشرق الأوسط",
    sector: "014-المملكة العربية السعودية",
    city: "002-الدمام",
    field: "العلوم والمعارف",
    specialization: "العلوم الطبيعية",
    expertiseField: "شهادة جامعية (بكالوريوس)",
    years: 10,
    qualification: "شهادة جامعية (بكالوريوس)",
  },
  {
    firstName: "محمد ن.",
    familyName: "عبداللطيف",
    gender: "ذكر",
    accountType: "متميز",
    accountNumber: "U-123",
    date: "25-Apr-2020",
    accountStatus: "غير نشط",
    nationality: "السعودية",
    region: "01-الشرق الأوسط",
    sector: "014-المملكة العربية السعودية",
    city: "002-الدمام",
    field: "العلوم والمعارف",
    specialization: "العلوم الرياضية",
    expertiseField: "دراسات عليا (ماجستير)",
    years: 5,
    qualification: "دراسات عليا (ماجستير)",
  },
  {
    firstName: "محمد ن.",
    familyName: "عبداللطيف",
    gender: "ذكر",
    accountType: "متميز",
    accountNumber: "U-123",
    date: "25-Apr-2020",
    accountStatus: "غير نشط",
    nationality: "السعودية",
    region: "01-الشرق الأوسط",
    sector: "014-المملكة العربية السعودية",
    city: "002-الدمام",
    field: "العلوم والمعارف",
    specialization: "البحث والتأليف",
    expertiseField: "تعلم وممارسة ذاتية",
    years: 6,
    qualification: "تعلم وممارسة ذاتية",
  },
  {
    firstName: "علي ب.",
    familyName: "السالم",
    gender: "ذكر",
    accountType: "رواد",
    accountNumber: "U-123",
    date: "25-Apr-2020",
    accountStatus: "نشط",
    nationality: "السعودية",
    region: "01-الشرق الأوسط",
    sector: "005-المملكة العربية السعودية",
    city: "005-جدة",
    field: "البرمجية التقنية",
    specialization: "البرمجية الشعبية",
    expertiseField: "دورات تدريبية معتمدة",
    years: 5,
    qualification: "دبلوم قبل جامعي",
  },
  {
    firstName: "علي ب.",
    familyName: "السالم",
    gender: "ذكر",
    accountType: "رواد",
    accountNumber: "U-123",
    date: "25-Apr-2020",
    accountStatus: "نشط",
    nationality: "السعودية",
    region: "01-الشرق الأوسط",
    sector: "005-المملكة العربية السعودية",
    city: "005-جدة",
    field: "التجارة والمال والأعمال",
    specialization: "المزادات",
    expertiseField: "تعلم وممارسة ذاتية",
    years: 7,
    qualification: "تعلم وممارسة ذاتية",
  },
];
const columns = [
  columnHelper.accessor("firstName", {
    header: "الاسم الأول",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("familyName", {
    header: "اسم العائلة",
  }),
  columnHelper.accessor("gender", {
    header: "الجنس",
  }),
  columnHelper.accessor("accountType", {
    header: "نوع الحساب",
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
  }),
  columnHelper.accessor("date", {
    header: "التاريخ",
  }),
  columnHelper.accessor("accountStatus", {
    header: "حالة الحساب",
  }),
  columnHelper.accessor("nationality", {
    header: "الجنسية",
  }),
  columnHelper.accessor("region", {
    header: "الإقليم",
  }),
  columnHelper.accessor("sector", {
    header: "القطاع",
  }),
  columnHelper.accessor("city", {
    header: "المدينة",
  }),
  columnHelper.accessor("field", {
    header: "مجال الخبرة",
  }),
  columnHelper.accessor("specialization", {
    header: "تخصص الخبرة",
  }),
  columnHelper.accessor("expertiseField", {
    header: "المؤهل",
  }),
  columnHelper.accessor("years", {
    header: "السنوات",
  }),
  columnHelper.accessor("qualification", {
    header: "المؤهل",
  }),
];
const Experiences = () => {
  return (
    <section className="experiences">
      <ReusableDataTable
        filter={false}
        searchPlaceholder=""
        columns={columns}
        data={data}
        title="الخبرات"
      />
    </section>
  );
};

export default Experiences;
