import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import ReusableDataTable from "../../table/ReusableDataTable";
import RateModal from "./RateModal";
const columnHelper = createColumnHelper();

const NotificationTable = () => {
  const lang = useSelector((state) => state.language.lang);
  const isRTL = lang === "ar";
  const [showRateModal, setShowRateModal] = useState(false);
  const data = useMemo(
    () => [
      {
        id: 1,
        operation: "البلاغات",
        subject: "طلب خدمة",
        model: "نموذج A",
        program: "برنامج الدعم",
        account: "123456",
        date: "2025-05-25",
        time: "10:30",
        action: "اضف الي المهام",
        IdNumber: "ID001",
        group: "مجموعة A",
      },
      {
        id: 2,
        operation: "استلام",
        subject: "شكوى",
        model: "نموذج B",
        program: "خدمة العملاء",
        account: "654321",
        date: "2025-05-24",
        time: "09:15",
        action: "اضف الي المهام",
        IdNumber: "ID002",
        group: "مجموعة B",
      },
      {
        id: 3,
        operation: "إرسال",
        subject: "تحديث بيانات",
        model: "نموذج C",
        program: "الخدمات المصرفية",
        account: "112233",
        date: "2025-05-23",
        time: "11:00",
        action: "مضافه",
        IdNumber: "ID003",
        group: "مجموعة A",
      },
      {
        id: 4,
        operation: "استلام",
        subject: "فتح حساب",
        model: "نموذج D",
        program: "التمويل الشخصي",
        account: "998877",
        date: "2025-05-22",
        time: "13:45",
        action: "مضافه",
        IdNumber: "ID004",
        group: "مجموعة B",
      },
      {
        id: 5,
        operation: "إرسال",
        subject: "إغلاق حساب",
        model: "نموذج E",
        program: "الخدمات العامة",
        account: "445566",
        date: "2025-05-21",
        time: "14:30",
        action: "اضف الي المهام",
        IdNumber: "ID005",
        group: "مجموعة A",
      },
      {
        id: 6,
        operation: "استلام",
        subject: "تحديث كلمة مرور",
        model: "نموذج F",
        program: "الخدمة الذاتية",
        account: "223344",
        date: "2025-05-20",
        time: "16:00",
        action: "مضاقه",
        IdNumber: "ID006",
        group: "مجموعة C",
      },
      {
        id: 7,
        operation: "إرسال",
        subject: "طلب بطاقة جديدة",
        model: "نموذج G",
        program: "بطاقات الائتمان",
        account: "556677",
        date: "2025-05-19",
        time: "08:30",
        action: "مضافه",
        IdNumber: "ID007",
        group: "مجموعة C",
      },
      {
        id: 8,
        operation: "استلام",
        subject: "بلاغ عن فقدان",
        model: "نموذج H",
        program: "خدمة الطوارئ",
        account: "778899",
        date: "2025-05-18",
        time: "10:00",
        action: "اضف الي المهام",
        IdNumber: "ID008",
        group: "مجموعة B",
      },
      {
        id: 9,
        operation: "إرسال",
        subject: "استفسار عام",
        model: "نموذج I",
        program: "الدعم الفني",
        account: "334455",
        date: "2025-05-17",
        time: "15:20",
        action: "اضف الي المهام",
        IdNumber: "ID009",
        group: "مجموعة A",
      },
      {
        id: 10,
        operation: "استلام",
        subject: "طلب معلومات",
        model: "نموذج J",
        program: "التواصل المؤسسي",
        account: "667788",
        date: "2025-05-16",
        time: "11:45",
        action: "اضف الي المهام",
        IdNumber: "ID010",
        group: "مجموعة C",
      },
      {
        id: 11,
        operation: "إرسال",
        subject: "اعتراض",
        model: "نموذج K",
        program: "حل النزاعات",
        account: "889900",
        date: "2025-05-15",
        time: "12:10",
        action: "اضف الي المهام",
        IdNumber: "ID011",
        group: "مجموعة C",
      },
      {
        id: 12,
        operation: "استلام",
        subject: "طلب إلغاء",
        model: "نموذج L",
        program: "إدارة العقود",
        account: "111222",
        date: "2025-05-14",
        time: "17:25",
        action: "اضف الي المهام",
        IdNumber: "ID012",
        group: "مجموعة B",
      },
      {
        id: 13,
        operation: "إرسال",
        subject: "طلب تصريح",
        model: "نموذج M",
        program: "خدمة المشاريع",
        account: "333444",
        date: "2025-05-13",
        time: "09:40",
        action: "اضف الي المهام",
        IdNumber: "ID013",
        group: "مجموعة A",
      },
      {
        id: 14,
        operation: "استلام",
        subject: "اقتراح تحسين",
        model: "نموذج N",
        program: "تحسين الجودة",
        account: "555666",
        date: "2025-05-12",
        time: "10:50",
        action: "اضف الي المهام",
        IdNumber: "ID014",
        group: "مجموعة C",
      },
      {
        id: 15,
        operation: "إرسال",
        subject: "طلب قرض",
        model: "نموذج O",
        program: "الخدمات التمويلية",
        account: "777888",
        date: "2025-05-11",
        time: "13:00",
        action: "اضف الي المهام",
        IdNumber: "ID015",
        group: "مجموعة A",
      },
      {
        id: 16,
        operation: "تقييم",
        subject: " تقييم الخدمه ",
        model: "نموذج P",
        program: "إدارة العقود",
        account: "999000",
        date: "2025-05-10",
        time: "14:10",
        action: "معاينة",
        IdNumber: "ID016",
        group: "مجموعة B",
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("operation", {
        header: isRTL ? "العملية" : "Operation",
        cell: (info) => info.getValue(),
        enableSorting: true,
        meta: {
          filterType: "select",
          filterOptions: ["إرسال", "استلام", "البلاغات", "تقييم"],
        },
      }),
      columnHelper.accessor("subject", {
        header: isRTL ? "الموضوع" : "Subject",
        cell: (info) => info.getValue(),
        enableSorting: false,
        meta: {
          filterType: "text",
        },
      }),
      columnHelper.accessor("model", {
        header: isRTL ? "النموذج" : "Model",
        cell: (info) => info.getValue(),
        enableSorting: false,
        meta: {
          filterType: "text",
        },
      }),
      columnHelper.accessor("program", {
        header: isRTL ? "الخدمه" : "Programs",
        cell: (info) => info.getValue(),
        enableSorting: true,
        meta: {
          filterType: "text",
        },
      }),
      columnHelper.accessor("account", {
        header: isRTL ? "الحساب" : "Account",
        cell: (info) => info.getValue(),
        enableSorting: false,
        meta: {
          filterType: "text",
        },
      }),
      columnHelper.accessor("date", {
        header: isRTL ? "التاريخ" : "Date",
        cell: (info) => info.getValue(),
        enableSorting: true,
        meta: {
          filterType: "date",
        },
      }),
      columnHelper.accessor("time", {
        header: isRTL ? "الوقت" : "Time",
        cell: (info) => info.getValue(),
        enableSorting: false,
        meta: {
          filterType: "text", // could also be time-picker later
        },
      }),
      columnHelper.accessor("IdNumber", {
        header: isRTL ? "رمز التعريف" : "ID Number",
        cell: (info) => info.getValue(),
        enableSorting: false,
        meta: {
          filterType: "text",
        },
      }),
      columnHelper.accessor("group", {
        header: isRTL ? "المجموعة" : "Group",
        cell: (info) => info.getValue(),
        enableSorting: false,
        meta: {
          filterType: "text",
        },
      }),
      columnHelper.accessor("action", {
        header: isRTL ? "الإجراء" : "Action",
        cell: (info) => (
          <div>
            {info.getValue() === "معاينة" ? (
              <button
                className="actions__butons--notifications"
                onClick={() => setShowRateModal(true)}
              >
                <i className="fa-solid fa-eye"></i>
              </button>
            ) : info.getValue() === "مضافه" ? (
              <button className="actions__butons--notifications">
                <span className="added-to__tasks"> مضافه </span>
              </button>
            ) : (
              <button className="actions__butons--notifications">
                <i className="fa-solid fa-plus"></i>
              </button>
            )}
          </div>
        ),
        enableSorting: false,
        meta: {
          filterType: "select",
          filterOptions: ["معاينة", "اضف الي المهام", "مضافه", "مضاقه"],
        },
      }),
    ],
    [isRTL]
  );

  return (
    <>
      <ReusableDataTable
        filter={false}
        title="التنبيهات"
        columns={columns}
        data={data}
        searchPlaceholder=" البحث في قائمه التنبيهات"
        initialPageSize={10}
      />
      <RateModal showModal={showRateModal} setShowModal={setShowRateModal} />
    </>
  );
};

export default NotificationTable;
