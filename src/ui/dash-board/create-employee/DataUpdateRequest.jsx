import { createColumnHelper } from "@tanstack/react-table";
import ReusableDataTable from "../../ReusableDataTable";
import { useMemo } from "react";
import { Link } from "react-router";
import { Badge } from "react-bootstrap";

const columnHelper = createColumnHelper();

const DataUpdateRequest = () => {
  const data = useMemo(
    () => [
      {
        id: "REQ-001",
        requestDate: "10-Jun-2025",
        status: "قيد المراجعة",
        reason: "خطأ في البريد الإلكتروني",
      },
      {
        id: "REQ-002",
        requestDate: "01-Jun-2025",
        status: "مرفوضة",
        reason: "خطأ في البريد الإلكتروني",
      },
      {
        id: "REQ-003",
        requestDate: "28-May-2025",
        status: "مقبولة",
        reason: "خطأ في البريد الإلكتروني",
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: "رقم الطلب",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("reason", {
        header: " سبب الطلب",
        cell: (info) => info.getValue(),
      }),

      columnHelper.accessor("requestDate", {
        header: "تاريخ الطلب",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("status", {
        header: "الحالة",
        cell: (info) => {
          let badgeColor;

          switch (info.getValue()) {
            case "مقبولة":
              badgeColor = "#28a745";
              break;
            case "مرفوضة":
              badgeColor = "#dc3545";
              break;
            case "قيد المراجعة":
              badgeColor = "#ffc107";
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
      columnHelper.display({
        id: "details",
        header: "التفاصيل",
        cell: (info) => (
          <Link
            to={`/dashboard/requests/${info.row.original.id}`}
            className="link-styles"
          >
            عرض التفاصيل
          </Link>
        ),
      }),
    ],
    []
  );

  return (
    <section>
      <ReusableDataTable
        data={data}
        columns={columns}
        initialPageSize={8}
        title="طلباتي لتحديث البيانات"
      />
    </section>
  );
};

export default DataUpdateRequest;
