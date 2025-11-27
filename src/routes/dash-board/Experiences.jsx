import ReusableDataTable from "../../ui/table/ReusableDataTable";
import { createColumnHelper } from "@tanstack/react-table";
import { Link } from "react-router";
import useGetSubscriptionResumeExperience from "../../hooks/dashboard/subscription/resume/useGetSubscriptionResumeExperience";
import { PAGE_SIZE } from "../../utils/constants";
import { useState } from "react";
import TablePagination from "../../ui/table/TablePagentaion";
const columnHelper = createColumnHelper();
const Experiences = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const { resumeExperiences, currentPage, lastPage, isLoading } =
    useGetSubscriptionResumeExperience("", page, PAGE_SIZE);

  // console.log(resumeExperiences);
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
      header: "حالة الحساب",
      cell: (info) => info.getValue() || "-",
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
      header: "مجال الخبرة",
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("sub_category_title", {
      header: "تخصص الخبرة",
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("qualification_text", {
      header: "المؤهل",
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("number_of_years", {
      header: "السنوات",
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("qualifications", {
      header: "المؤهل",
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
        title="الخبرات"
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
