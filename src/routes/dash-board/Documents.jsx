import { createColumnHelper } from "@tanstack/react-table";
import { Badge } from "react-bootstrap";
import { Link } from "react-router";
import ReusableDataTable from "../../ui/table/ReusableDataTable";
import { useState } from "react";
import { PAGE_SIZE } from "../../utils/constants";
import useGetSubscriptionResumeDocument from "../../hooks/dashboard/subscription/resume/useGetSubscriptionResumeDocument";
import TablePagination from "../../ui/table/TablePagentaion";
import { useTranslation } from "react-i18next";

const columnHelper = createColumnHelper();
const Documents = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };
  const { resumeDocuments, currentPage, lastPage, isLoading } =
    useGetSubscriptionResumeDocument(searchQuery, page, PAGE_SIZE);

  const columns = [
    columnHelper.accessor("user.first_name", {
      header: t("dashboard.documents.firstName"),
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("user.last_name", {
      header: t("dashboard.documents.lastName"),
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("user.gender", {
      header: t("dashboard.documents.gender"),
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("user.account_type", {
      header: t("dashboard.documents.accountType"),
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("user.account_code", {
      header: t("dashboard.documents.accountNumber"),
      cell: (info) => (
        <Link
          to={`/dashboard/user-details/${info?.row.original.user?.id}`}
          className="link-styles"
        >
          {info.getValue() || "-"}
        </Link>
      ),
    }),
    columnHelper.accessor("user.birthdate", {
      header: t("dashboard.documents.date"),
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("user.status", {
      header: t("dashboard.documents.status"),
      cell: (info) => {
        let badgeColor;
        switch (info.getValue()) {
          case t("dashboard.documents.active"):
            badgeColor = "#28a745";
            break;
          case t("dashboard.documents.inactive"):
            badgeColor = "#007bff";
            break;
          case t("dashboard.documents.suspended"):
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
      header: t("dashboard.documents.nationality"),
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("user.region_id.title", {
      header: t("dashboard.documents.region"),
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("user.country_id.title", {
      header: t("dashboard.documents.sector"),
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("user.city_id.title", {
      header: t("dashboard.documents.city"),
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("category_title", {
      header: t("dashboard.documents.field"),
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("sub_category_title", {
      header: t("dashboard.documents.specialization"),
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("document_type", {
      header: t("dashboard.documents.type"),
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("document_auth", {
      header: t("dashboard.documents.issuer"),
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("document_number", {
      header: t("dashboard.documents.number"),
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("end_date", {
      header: t("dashboard.documents.expiry"),
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
        title={t("dashboard.documents.title")}
        initialPageSize={10}
        currentPage={currentPage}
        lastPage={lastPage}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        isLoading={isLoading}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        searchDebounceMs={700}
        search={true}
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
