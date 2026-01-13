import { Badge } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import ReusableDataTable from "../../table/ReusableDataTable";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { PAGE_SIZE } from "../../../utils/constants";
import useGetDraftedUsers from "../../../hooks/dashboard/employee/useGetDraftedUsers";
import { Link } from "react-router";
import TablePagination from "../../table/TablePagentaion";
import CustomLink from "../../CustomLink";

const columnHelper = createColumnHelper();

export default function DraftedUsers() {
  const { t } = useTranslation();

  // -----------------------------------
  // Pagination
  // -----------------------------------
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);

  // -----------------------------------
  // Fetch data
  // -----------------------------------
  const { currentPage, lastPage, draftedUsers, isLoading } = useGetDraftedUsers(
    "",
    page,
    pageSize
  );

  // -----------------------------------
  // Table Data Mapping
  // -----------------------------------
  const data = useMemo(() => {
    return (draftedUsers?.data ?? []).map((item) => ({
      id: item?.id,
      first_name: item?.first_name || "-",
      last_name: item?.last_name || "-",
      //   employee_code: item?.code || "-",
      job_level: item?.role?.title || "-",
      nationality: item?.nationality?.title || "-",
      city: item?.group.city?.title || "-",
      region: item?.group?.region?.title || "-",
      location: item?.group?.country?.title || "-",
      status: item?.status || "-",
      status_date: item?.status_date || "-",
      status_time: item?.status_time || "-",
      //   completion_percent: item?.status_time || "-",
    }));
  }, [draftedUsers]);

  // -----------------------------------
  // Table Columns (fully localized)
  // -----------------------------------
  const columns = useMemo(
    () => [
      columnHelper.accessor("first_name", {
        header: t("dashboard.team.columns.first_name"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("last_name", {
        header: t("dashboard.team.columns.last_name"),
        cell: (info) => info.getValue(),
      }),

      columnHelper.accessor("job_level", {
        header: t("dashboard.team.columns.job_level"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("nationality", {
        header: t("dashboard.team.columns.nationality"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("region", {
        header: t("dashboard.team.columns.region"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("location", {
        header: t("dashboard.team.columns.location"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("city", {
        header: t("dashboard.team.columns.city"),
        cell: (info) => info.getValue(),
      }),

      columnHelper.accessor("status_date", {
        header: t("dashboard.team.columns.status_date"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("status_time", {
        header: t("dashboard.team.columns.status_time"),
        cell: (info) => info.getValue() || "-",
      }),

      columnHelper.accessor("actions", {
        header: t("dashboard.workGroup.table.actions"),
        cell: (info) => {
          return (
            <div className="table__actions">
              <CustomLink
                to={`/dashboard/complete-employee-data/${info?.row?.original?.id}`}
              >
                {t("complete")}
              </CustomLink>
            </div>
          );
        },
      }),
    ],
    [t]
  );
  return (
    <div>
      <ReusableDataTable
        data={data}
        columns={columns}
        currentPage={currentPage}
        lastPage={lastPage}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        initialPageSize={8}
        isLoading={isLoading}
        search={true}
        filter={false}
        searchPlaceholder={t("dashboard.team.searchPlaceholder")}
        // lang={lang}
        title={t("dashboard.team.title")}
      >
        <TablePagination
          currentPage={page}
          lastPage={lastPage}
          onPageChange={setPage}
          isLoading={isLoading}
        />
      </ReusableDataTable>
    </div>
  );
}
