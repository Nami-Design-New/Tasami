import { createColumnHelper } from "@tanstack/react-table";
import { Badge } from "react-bootstrap";
import { Link } from "react-router";
import ReusableDataTable from "../../ui/table/ReusableDataTable";

const columnHelper = createColumnHelper();
const data = [
  {
    firstName: "صالح أ.",
    familyName: "العمر",
    gender: "ذكر",
    accountNumber: "U-123",
    accountType: "أساسي",
    accountDate: "25-Apr-2020",
    accountStatus: "نشط",
    nationality: "السعودية",
    region: "01-الشرق الأوسط",
    sector: "014-المملكة العربية السعودية",
    city: "001-الرياض",
    field: "التدريب والتعليم",
    specialization: "التدريب والتعليم",
    documentType: "شهادة تدريب أو دورة مهنية",
    issuingAuthority: "وزارة الموارد البشرية",
    documentNumber: "518470",
    expirationDate: "25-Apr-2020",
  },
  {
    firstName: "صالح أ.",
    familyName: "العمر",
    gender: "ذكر",
    accountNumber: "U-123",
    accountType: "أساسي",
    accountDate: "25-Apr-2020",
    accountStatus: "نشط",
    nationality: "السعودية",
    region: "01-الشرق الأوسط",
    sector: "014-المملكة العربية السعودية",
    city: "001-الرياض",
    field: "التدريب والتعليم",
    specialization: "الاستشارات",
    documentType: "رخصة أو تصريح حكومي",
    issuingAuthority: "المؤسسة العامة للتدريب",
    documentNumber: "518470",
    expirationDate: "25-Apr-2020",
  },
  {
    firstName: "محمد ن.",
    familyName: "عبداللطيف",
    gender: "ذكر",
    accountNumber: "U-123",
    accountType: "متميز",
    accountDate: "25-Apr-2020",
    accountStatus: "غير نشط",
    nationality: "السعودية",
    region: "01-الشرق الأوسط",
    sector: "014-المملكة العربية السعودية",
    city: "002-جدة",
    field: "العلوم والمعارف",
    specialization: "العلوم الطبيعية",
    documentType: "شهادة اعتماد دولي",
    issuingAuthority: "أكاديمية القادة",
    documentNumber: "518470",
    expirationDate: "25-Apr-2020",
  },
  {
    firstName: "محمد ن.",
    familyName: "عبداللطيف",
    gender: "ذكر",
    accountNumber: "U-123",
    accountType: "متميز",
    accountDate: "25-Apr-2020",
    accountStatus: "غير نشط",
    nationality: "السعودية",
    region: "01-الشرق الأوسط",
    sector: "014-المملكة العربية السعودية",
    city: "002-جدة",
    field: "العلوم والمعارف",
    specialization: "البحث والتأليف",
    documentType: "مشاركة في برامج تدريبية",
    issuingAuthority: "هيئة التخصصات المهنية",
    documentNumber: "518470",
    expirationDate: "25-Apr-2020",
  },
  {
    firstName: "محمد ن.",
    familyName: "عبداللطيف",
    gender: "ذكر",
    accountNumber: "U-123",
    accountType: "متميز",
    accountDate: "25-Apr-2020",
    accountStatus: "غير نشط",
    nationality: "السعودية",
    region: "01-الشرق الأوسط",
    sector: "014-المملكة العربية السعودية",
    city: "002-جدة",
    field: "العلوم والمعارف",
    specialization: "البحث والتأليف",
    documentType: "خبرة موثقة",
    issuingAuthority: "مركز “متطوعون”",
    documentNumber: "518470",
    expirationDate: "25-Apr-2020",
  },
  {
    firstName: "علي ب.",
    familyName: "السالم",
    gender: "ذكر",
    accountNumber: "U-123",
    accountType: "رواد",
    accountDate: "25-Apr-2020",
    accountStatus: "نشط",
    nationality: "السعودية",
    region: "01-الشرق الأوسط",
    sector: "014-المملكة العربية السعودية",
    city: "005-الدمام",
    field: "اللغة الأجنبية",
    specialization: "اللغة الأجنبية",
    documentType: "شهادة الهيئة المهنية",
    issuingAuthority: "مركز “خطوات النجاح”",
    documentNumber: "518470",
    expirationDate: "25-Apr-2020",
  },
  {
    firstName: "علي ب.",
    familyName: "السالم",
    gender: "ذكر",
    accountNumber: "U-123",
    accountType: "رواد",
    accountDate: "25-Apr-2020",
    accountStatus: "نشط",
    nationality: "السعودية",
    region: "01-الشرق الأوسط",
    sector: "014-المملكة العربية السعودية",
    city: "005-الدمام",
    field: "الإعلام والإعلان",
    specialization: "أخرى",
    documentType: "شهادة مزاولة مهنة معتمدة",
    issuingAuthority: "جامعة طيبة",
    documentNumber: "518470",
    expirationDate: "25-Apr-2020",
  },
  {
    firstName: "علي ب.",
    familyName: "السالم",
    gender: "ذكر",
    accountNumber: "U-123",
    accountType: "رواد",
    accountDate: "25-Apr-2020",
    accountStatus: "نشط",
    nationality: "السعودية",
    region: "01-الشرق الأوسط",
    sector: "014-المملكة العربية السعودية",
    city: "005-الدمام",
    field: "التجارة والتسويق",
    specialization: "التجارة والتسويق",
    documentType: "شهادة مزاولة مهنة معتمدة",
    issuingAuthority: "مؤسسة “خبراء”",
    documentNumber: "518470",
    expirationDate: "25-Apr-2020",
  },
];

const columns = [
  columnHelper.accessor("firstName", { header: "الاسم الأول" }),
  columnHelper.accessor("familyName", { header: "اسم العائلة" }),
  columnHelper.accessor("gender", { header: "الجنس" }),
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
  columnHelper.accessor("accountType", { header: "نوع الحساب" }),
  columnHelper.accessor("accountDate", { header: "التاريخ" }),
  // columnHelper.accessor("accountStatus", { header: "حالة الحساب" }),
  columnHelper.accessor("accountStatus", {
    header: " حالة الحساب",
    cell: (info) => {
      let badgeColor;

      switch (info.getValue()) {
        case "نشط":
          badgeColor = "#28a745";
          break;
        case "غير نشط":
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
          {info.getValue()}
        </Badge>
      );
    },
  }),
  columnHelper.accessor("nationality", { header: "الجنسية" }),
  columnHelper.accessor("region", { header: "الإقليم" }),
  columnHelper.accessor("sector", { header: "القطاع" }),
  columnHelper.accessor("city", { header: "المدينة" }),
  columnHelper.accessor("field", { header: "المجال" }),
  columnHelper.accessor("specialization", { header: "التخصص" }),
  columnHelper.accessor("documentType", { header: "النوع" }),
  columnHelper.accessor("issuingAuthority", { header: "جهة الإصدار" }),
  columnHelper.accessor("documentNumber", { header: "الرقم" }),
  columnHelper.accessor("expirationDate", { header: "الصلاحية" }),
];

const Documents = () => {
  return (
    <section className="documents">
      <ReusableDataTable
        filter={false}
        searchPlaceholder=""
        data={data}
        columns={columns}
        title="الوثائق"
      />
    </section>
  );
};

export default Documents;
