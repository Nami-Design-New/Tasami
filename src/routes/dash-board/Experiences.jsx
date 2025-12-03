import ReusableDataTable from "../../ui/table/ReusableDataTable";
import { createColumnHelper } from "@tanstack/react-table";
import { Link } from "react-router";
import useGetSubscriptionResumeExperience from "../../hooks/dashboard/subscription/resume/useGetSubscriptionResumeExperience";
import { PAGE_SIZE } from "../../utils/constants";
import { useState } from "react";
import TablePagination from "../../ui/table/TablePagentaion";
import { useTranslation } from "react-i18next";
const columnHelper = createColumnHelper();
const Experiences = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const { resumeExperiences, currentPage, lastPage, isLoading } =
    useGetSubscriptionResumeExperience("", page, PAGE_SIZE);

  // console.log(resumeExperiences);

  const columns = [
    columnHelper.accessor("user.first_name", {
      header: t("dashboard.resume.firstName"),
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("user.last_name", {
      header: t("dashboard.resume.lastName"),
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("user.gender", {
      header: t("dashboard.resume.gender"),
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("user.account_type", {
      header: t("dashboard.resume.accountType"),
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("user.account_code", {
      header: t("dashboard.resume.accountNumber"),
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
      header: t("dashboard.resume.date"),
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("user.status", {
      header: t("dashboard.resume.status"),
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("user.nationality.title", {
      header: t("dashboard.resume.nationality"),
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("user.region_id.title", {
      header: t("dashboard.resume.region"),
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("user.country_id.title", {
      header: t("dashboard.resume.sector"),
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("user.city_id.title", {
      header: t("dashboard.resume.city"),
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("category_title", {
      header: t("dashboard.resume.experienceField"),
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("sub_category_title", {
      header: t("dashboard.resume.experienceSpecialization"),
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("qualification_text", {
      header: t("dashboard.resume.qualification"),
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("number_of_years", {
      header: t("dashboard.resume.years"),
      cell: (info) => info.getValue() || "-",
    }),
  ];
  return (
    <section className="experiences">
      <ReusableDataTable
        filter={false}
        searchPlaceholder=""
        columns={columns}
        data={resumeExperiences || []}
        title={t("dashboard.resume.experiences")}
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

export default Experiences;
