import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import ReusableDataTable from "../../table/ReusableDataTable";
import useGetAvailableGroups from "../../../hooks/dashboard/workingGroups/SharedGroups/useGetAvailableGroups";
import { Link, useParams } from "react-router";
import TablePagination from "../../table/TablePagentaion";
import { PAGE_SIZE } from "../../../utils/constants";
import { useTranslation } from "react-i18next";
import useAddSharedGroup from "../../../hooks/dashboard/workingGroups/SharedGroups/useAddSharedGroup";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const columnHelper = createColumnHelper();

export default function AvailableForAddGroups() {
  const { t } = useTranslation();
  const { id } = useParams();
  const queryClient = useQueryClient();

  // Pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);

  const {
    availableGroups,
    isLaoding: isFetchingAvailablegroups,
    lastPage,
    currentPage,
  } = useGetAvailableGroups(page, pageSize);

  // Add Shared Group
  const { addSharedGroup, isPending } = useAddSharedGroup();

  const handleAddAddSharedGrooup = (sharedId) => {
    const payload = {
      group_id: id,
      shared_id: sharedId,
    };
    addSharedGroup(payload, {
      onSuccess: (res) => {
        toast.success(res?.message);
        queryClient.invalidateQueries({
          queryKey: ["available-groups"],
        });
        queryClient.invalidateQueries({
          queryKey: ["shared-groups"],
        });
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  };

  //  Data Mapping/
  const data = useMemo(() => {
    if (!availableGroups) return [];

    return availableGroups.data.map((g) => ({
      groupNumber: g.name,
      id: g.id,
      groupClassifications: g.type,
      region: `${g.region.code}-${g.region.title}`,
      location: g.country?.title || "-",
      city: g.city ? `${g.city.title}-${g.city.code}` : "-",
      createDate: g.created_at,
      employeeCount: g.employees_count,
      supervisorsCount: g.supervisor_count,
      excutives: g.executive_count,
      leaders: g.leader_count,
      managers: g.manager_count,
      actions: "",
    }));
  }, [availableGroups]);

  // Columns
  const columns = useMemo(
    () => [
      columnHelper.accessor("groupNumber", {
        header: t("dashboard.availableGroups.columns.groupNumber"),
        cell: (info) => (
          <Link
            to={`/dashboard/working-group/${info.getValue()}`}
            className="link-styles"
            style={{ textDecoration: "underline" }}
          >
            {info.getValue()}
          </Link>
        ),
        enableSorting: false,
      }),

      columnHelper.accessor("groupClassifications", {
        header: t("dashboard.availableGroups.columns.classification"),
      }),

      columnHelper.accessor("region", {
        header: t("dashboard.availableGroups.columns.region"),
      }),

      columnHelper.accessor("location", {
        header: t("dashboard.availableGroups.columns.location"),
      }),

      columnHelper.accessor("city", {
        header: t("dashboard.availableGroups.columns.city"),
      }),

      columnHelper.accessor("createDate", {
        header: t("dashboard.availableGroups.columns.createDate"),
      }),

      columnHelper.accessor("excutives", {
        header: t("dashboard.availableGroups.columns.executives"),
      }),

      columnHelper.accessor("leaders", {
        header: t("dashboard.availableGroups.columns.leaders"),
      }),

      columnHelper.accessor("managers", {
        header: t("dashboard.availableGroups.columns.managers"),
      }),

      columnHelper.accessor("supervisorsCount", {
        header: t("dashboard.availableGroups.columns.supervisors"),
      }),

      columnHelper.accessor("employeeCount", {
        header: t("dashboard.availableGroups.columns.employees"),
      }),

      columnHelper.display({
        id: "actions",
        header: t("dashboard.availableGroups.columns.actions"),
        cell: (info) => (
          <div className="table__actions">
            <button
              disabled={isPending}
              onClick={() => handleAddAddSharedGrooup(info.row.original.id)}
            >
              <i className="fa-solid fa-add table__actions--main"></i>
            </button>
          </div>
        ),
        enableSorting: false,
      }),
    ],
    [t]
  );

  return (
    <ReusableDataTable
      title={t("dashboard.availableGroups.title")}
      data={data}
      columns={columns}
      lang="ar"
      initialPageSize={10}
      currentPage={currentPage}
      lastPage={lastPage}
      setPage={setPage}
      pageSize={pageSize}
      setPageSize={setPageSize}
      filter={false}
      searchPlaceholder={t("dashboard.availableGroups.searchPlaceholder")}
      isLoading={isFetchingAvailablegroups}
    >
      <TablePagination
        currentPage={page}
        lastPage={lastPage}
        onPageChange={setPage}
        isLoading={isFetchingAvailablegroups}
      />
    </ReusableDataTable>
  );
}
