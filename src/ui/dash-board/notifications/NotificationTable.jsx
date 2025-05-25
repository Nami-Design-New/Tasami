import { useEffect, useRef } from "react";
import DataTable from "datatables.net-react";
import DT from "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";

import "datatables.net-colreorder-bs5";
import "datatables.net-searchpanes-bs5";

// eslint-disable-next-line react-hooks/rules-of-hooks
DataTable.use(DT);

const data = [
  [
    "عملية 1",
    "Subject A",
    "Form A",
    "Service A",
    "Account A",
    "2025-05-25",
    "10:00 AM",
    "إجراء 1",
  ],
  [
    "عملية 2",
    "Subject B",
    "Form B",
    "Service B",
    "Account B",
    "2025-05-24",
    "11:30 AM",
    "إجراء 2",
  ],
  [
    "عملية 2",
    "Subject B",
    "Form B",
    "Service B",
    "Account B",
    "2025-05-24",
    "11:30 AM",
    "إجراء 2",
  ],
  [
    "عملية 2",
    "Subject B",
    "Form B",
    "Service B",
    "Account B",
    "2025-05-24",
    "11:30 AM",
    "إجراء 2",
  ],
  [
    "عملية 2",
    "Subject B",
    "Form B",
    "Service B",
    "Account B",
    "2025-05-24",
    "11:30 AM",
    "إجراء 2",
  ],
  [
    "عملية 2",
    "Subject B",
    "Form B",
    "Service B",
    "Account B",
    "2025-05-24",
    "11:30 AM",
    "إجراء 2",
  ],
  [
    "عملية 2",
    "Subject B",
    "Form B",
    "Service B",
    "Account B",
    "2025-05-24",
    "11:30 AM",
    "إجراء 2",
  ],
  [
    "عملية 2",
    "Subject B",
    "Form B",
    "Service B",
    "Account B",
    "2025-05-24",
    "11:30 AM",
    "إجراء 2",
  ],
  [
    "عملية 2",
    "Subject B",
    "Form B",
    "Service B",
    "Account B",
    "2025-05-24",
    "11:30 AM",
    "إجراء 2",
  ],
  [
    "عملية 2",
    "Subject B",
    "Form B",
    "Service B",
    "Account B",
    "2025-05-24",
    "11:30 AM",
    "إجراء 2",
  ],
  [
    "عملية 2",
    "Subject B",
    "Form B",
    "Service B",
    "Account B",
    "2025-05-24",
    "11:30 AM",
    "إجراء 2",
  ],
  // Add more rows as needed
];

const columns = [
  "العملية",
  "الموضوع",
  "النموذج",
  "البرامج و الخدمة",
  "الحساب",
  "التاريخ",
  "الوقت",
  "الإجراء",
];

const NotificationTable = () => {
  return (
    <DataTable
      className="table  table-bordered table-striped"
      data={data}
      columns={columns.map((title) => ({ title }))}
      options={{
        colReorder: true,
        responsive: true,
        language: {
          search: "بحث ",
          lengthMenu: "عرض _MENU_ مدخلات ",
          info: "عرض _START_ إلى _END_ من أصل _TOTAL_ مدخل ",
          infoEmpty: "لا توجد بيانات",
          paginate: {
            first: "الأول",
            last: "الأخير",
            next: "التالي",
            previous: "السابق",
          },
          zeroRecords: "لا توجد نتائج",
        },
      }}
    />
  );
};

export default NotificationTable;
