import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import ReusableDataTable from "../../table/ReusableDataTable";

const columnHelper = createColumnHelper();

const PremiumClientsTable = () => {
  const lang = useSelector((state) => state.language.lang);
  const isRTL = lang === "ar";

  const data = useMemo(
    () => [
      {
        id: 1,
        name: "أحمد الجهني",
        avatar: "https://i.pravatar.cc/100?img=3",
        accountType: "اساسي",
        status: "نشط",
        expiredContracts: 3,
      },
      {
        id: 2,
        name: "Sarah Johnson",
        avatar: "https://i.pravatar.cc/100?img=4",
        accountType: "اساسي",
        status: "موقوف",
        expiredContracts: 1,
      },
      {
        id: 3,
        name: "خالد السبيعي",
        avatar: "https://i.pravatar.cc/100?img=5",
        accountType: "رواد",
        status: "نشط",
        expiredContracts: 0,
      },
      {
        id: 4,
        name: "فاطمة العتيبي",
        avatar: "https://i.pravatar.cc/100?img=6",
        accountType: "اساسي",
        status: "نشط",
        expiredContracts: 5,
      },
      {
        id: 5,
        name: "John Smith",
        avatar: "https://i.pravatar.cc/100?img=7",
        accountType: "رواد",
        status: "موقوف",
        expiredContracts: 2,
      },
      {
        id: 6,
        name: "نورة الشمري",
        avatar: "https://i.pravatar.cc/100?img=8",
        accountType: "اساسي",
        status: "نشط",
        expiredContracts: 4,
      },
      {
        id: 7,
        name: "محمد القحطاني",
        avatar: "https://i.pravatar.cc/100?img=9",
        accountType: "اساسي",
        status: "نشط",
        expiredContracts: 6,
      },
      {
        id: 8,
        name: "Emily Davis",
        avatar: "https://i.pravatar.cc/100?img=10",
        accountType: "رواد",
        status: "موقوف",
        expiredContracts: 1,
      },
      {
        id: 9,
        name: "سلطان العنزي",
        avatar: "https://i.pravatar.cc/100?img=11",
        accountType: "اساسي",
        status: "نشط",
        expiredContracts: 3,
      },
      {
        id: 10,
        name: "عبدالله المالكي",
        avatar: "https://i.pravatar.cc/100?img=12",
        accountType: "اساسي",
        status: "نشط",
        expiredContracts: 2,
      },
      {
        id: 11,
        name: "Lisa Wilson",
        avatar: "https://i.pravatar.cc/100?img=13",
        accountType: "رواد",
        status: "موقوف",
        expiredContracts: 0,
      },
      {
        id: 12,
        name: "هند الدوسري",
        avatar: "https://i.pravatar.cc/100?img=14",
        accountType: "اساسي",
        status: "نشط",
        expiredContracts: 4,
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: isRTL ? "المستخدم" : "User",
        cell: (info) => {
          return (
            <div className="d-flex align-items-center gap-2">
              <img
                src={info.row.original.avatar}
                alt={info.getValue()}
                className="rounded-circle"
                width="32"
                height="32"
              />
              <span>{info.getValue()}</span>
            </div>
          );
        },
        enableSorting: false,
      }),
      columnHelper.accessor("accountType", {
        header: isRTL ? "نوع الحساب" : "Account Type",
        cell: (info) => info.getValue(),
        enableSorting: false,
      }),
      columnHelper.accessor("status", {
        header: isRTL ? "حالة الحساب" : "Status",
        cell: (info) => (
          <span
            className={
              info.getValue() === "نشط"
                ? "text-success fw-bold"
                : "text-danger fw-bold"
            }
          >
            {info.getValue()}
          </span>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("expiredContracts", {
        header: isRTL ? "العقود المكتملة" : "Expired Contracts",
        cell: (info) => info.getValue(),
      }),
    ],
    [isRTL]
  );

  return (
    <ReusableDataTable
      title="عدد المستخدمين المميزين"
      data={data}
      columns={columns}
      filter={false}
      searchPlaceholder="بحث في المستخدمين"
    />
  );
};

export default PremiumClientsTable;
