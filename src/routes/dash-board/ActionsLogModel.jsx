import { useMemo } from "react";
import EmployeeData from "../../ui/ModelComponent/EmployeeData";
import Header from "../../ui/ModelComponent/Header";
import ModelInfo from "../../ui/ModelComponent/ModelInfo";
import ReusableDataTable from "../../ui/table/ReusableDataTable";
import { createColumnHelper } from "@tanstack/react-table";
import { Badge } from "react-bootstrap";
import { Link } from "react-router";

const columnHelper = createColumnHelper();
const ActionsLogModel = () => {
  const data = useMemo(
    () => [
      {
        date: "22 Jan 22",
        time: "10:35",
        accountNumber: "E-150322-000001",
        action: "توجيه",
        info_details: "إبداء الرأي",
      },
      {
        date: "22 Jan 22",
        time: "11:15",
        accountNumber: "S-260122-000001",
        action: "اعاده",
        info_details: "إكمال وثيقة سياسة الاستخدام",
      },
      {
        date: "24 Jan 22",
        time: "08:09",
        accountNumber: "E-150322-000001",
        action: "توجيه",
        info_details:
          "الموافقة على إيداع قيمة الاشتراك وفقاً لسياسة الاستخدام - البند 24-1",
      },
      {
        date: "26 Jan 22",
        time: "13:22",
        accountNumber: "S-260122-000001",
        action: "توجيه",
        info_details: "الموافقة",
      },
      {
        date: "01 Feb 22",
        time: "14:38",
        accountNumber: "D-110222-000001",
        action: "اعاده",
        info_details: "عملية استرداد القيمة تنطبق على المستفيدين من العروض",
      },
      {
        date: "07 Feb 22",
        time: "10:04",
        accountNumber: "S-260122-000001",
        action: "اعاده",
        info_details: "للإكمال",
      },
      {
        date: "28 Feb 22",
        time: "09:10",
        accountNumber: "E-150322-000001",
        action: "اكمال",
        info_details:
          "يوضح إفادتكم أن استرجاع كامل قيمة الاشتراك متاحة فقط للحسابات التي لم تستفد من عروض الموقع",
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("date", {
        header: " التاريخ ",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("time", {
        header: " الوقت ",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("accountNumber", {
        header: " رقم الحساب ",
        cell: (info) => <Link className="link-styles">{info.getValue()}</Link>,
      }),
      columnHelper.accessor("action", {
        header: "الاجراء",
        cell: (info) => {
          let badgeColor;
          switch (info.getValue()) {
            case "توجيه":
              badgeColor = "#6EE7B7";
              break;
            case "اعاده":
              badgeColor = "#FDE68A";
              break;
            case "اكمال":
              badgeColor = "#BFDBFE";
              break;
            default:
              badgeColor = "#E5E7EB";
              break;
          }

          return (
            <Badge
              pill
              className="custom-badge"
              style={{
                "--badge-color": badgeColor,
                "--text-color": "#000",
              }}
            >
              {info.getValue()}
            </Badge>
          );
        },
      }),
      columnHelper.accessor("info_details", {
        header: " تفاصيل الافاده ",
        cell: (info) => info.getValue(),
      }),
    ],
    []
  );
  return (
    <section className="model">
      <Header title={"سجل الافاده"} />
      <EmployeeData />
      <ModelInfo />
      <ReusableDataTable
        title=" سجل الافادات "
        filter={false}
        data={data}
        columns={columns}
        lang="ar"
        initialPageSize={10}
      />
    </section>
  );
};

export default ActionsLogModel;
