import { useMemo } from "react";
import StatisticsCard from "../../../ui/dash-board/cards/StatisticsCard";
import ReusableDataTable from "../../../ui/ReusableDataTable";
import { createColumnHelper } from "@tanstack/react-table";
import { Link } from "react-router";
import { Badge } from "react-bootstrap";
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
        serviceNumber: "PRG-001",
        date: "25-Apr-2020",
        status: "منجزه",
        accountNumber: "U-020522-00215a",
        accountType: "مستفيد",
        IdNumber: "ID-123456",
        field: "الهندسة",
        Specialization: "مدني",
        offers: 4,
        numbrOfUseres: 120,
        rate: 4.5,
      },
      {
        serviceNumber: "PRG-002",
        date: "25-Apr-2020",
        status: "محذوف",
        accountNumber: "U-020522-00215b",
        accountType: "جدير",
        IdNumber: "ID-123457",
        field: "المالية",
        Specialization: "محاسبة",
        offers: 4,
        numbrOfUseres: 45,
        rate: 4.2,
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("serviceNumber", {
        header: "رقم الخدمه",
        cell: (info) => (
          <Link to={`/model/${info.getValue()}`} className="link-styls">
            {info.getValue()}
          </Link>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("date", {
        header: " التاريخ ",
        cell: (info) => info.getValue(),
      }),

      columnHelper.accessor("accountNumber", {
        header: "رقم الحساب",
        cell: (info) => (
          <Link
            to={`/dashboard/user-details/${info.getValue()}`}
            className="link-styls"
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
      columnHelper.accessor("offers", {
        header: " العروض المقدمه",
        cell: (info) => info.getValue(),
        enableSorting: false,
      }),
      columnHelper.accessor("status", {
        header: " المرحله ",
        cell: (info) => {
          let badgeColor;
          switch (info.getValue()) {
            case "منجزه":
              badgeColor = "#28a745";
              break;
            case "بانتظار التنفيذ":
              badgeColor = "#ffc107  ";
              break;
            case "قيد التنفيذ":
              badgeColor = "#007bff";
              break;
            case "محذوف":
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

      columnHelper.accessor("IdNumber", {
        header: "الرقم التعريفي",
        cell: (info) => (
          <Link to={`/model/${info.getValue()}`} className="link-styls">
            {info.getValue()}
          </Link>
        ),
      }),
      columnHelper.accessor("field", {
        header: "المجال",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("Specialization", {
        header: " التخصص ",
        cell: (info) => info.getValue(),
      }),

      columnHelper.accessor("numbrOfUseres", {
        header: "عدد المستفيدين",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("rate", {
        header: "التقييم",
        cell: (info) => info.getValue(),
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
