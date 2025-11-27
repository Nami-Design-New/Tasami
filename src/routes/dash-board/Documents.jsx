import { createColumnHelper } from "@tanstack/react-table";
import { Badge } from "react-bootstrap";
import { Link } from "react-router";
import ReusableDataTable from "../../ui/table/ReusableDataTable";
import { useState } from "react";
import { PAGE_SIZE } from "../../utils/constants";
import useGetSubscriptionResumeDocument from "../../hooks/dashboard/subscription/resume/useGetSubscriptionResumeDocument";
import TablePagination from "../../ui/table/TablePagentaion";

const columnHelper = createColumnHelper();
const Documents = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const { resumeDocuments, currentPage, lastPage, isLoading } =
    useGetSubscriptionResumeDocument("", page, PAGE_SIZE);

  const columns = [
    columnHelper.accessor("user.first_name", {
      header: "الاسم الأول",
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("user.last_name", {
      header: "اسم العائلة",
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("user.gender", {
      header: "الجنس",
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("user.account_type", {
      header: "نوع الحساب",
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("user.account_code", {
      header: "رقم الحساب",
      cell: (info) => (
        <Link
          to={`/dashboard/user-details/${info?.row.original.user?.id}`}
          className="link-styles"
        >
          {info.getValue()}
        </Link>
      ),
    }),
    columnHelper.accessor("user.birthdate", {
      header: "التاريخ",
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("user.status", {
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
    columnHelper.accessor("user.nationality.title", {
      header: "الجنسية",
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("user.region_id.title", {
      header: "الإقليم",
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("user.country_id.title", {
      header: "القطاع",
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("user.city_id.title", {
      header: "المدينة",
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("category_title", {
      header: "المجال",
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("sub_category_title", {
      header: "التخصص",
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("document_type_title", {
      header: "النوع",
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("document_auth", {
      header: "جهة الإصدار",
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("document_number", {
      header: "الرقم",
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("end_date", {
      header: "الصلاحية",
      cell: (info) => info.getValue() || "-",
    }),
  ];

  return (
    <section className="documents">
      <ReusableDataTable
        filter={false}
        searchPlaceholder=""
        data={resumeDocuments || []}
        columns={columns}
        title="الوثائق"
        initialPageSize={10}
        currentPage={currentPage}
        lastPage={lastPage}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        isLoading={isLoading}
      >
        <TablePagination
          currentPage={page}
          lastPage={lastPage}
          onPageChange={setPage}
          isLoading={isLoading}
        />
      </ReusableDataTable>
    </section>
  );
};

export default Documents;
