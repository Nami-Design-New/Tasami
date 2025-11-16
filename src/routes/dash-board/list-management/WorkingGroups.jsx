import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import useGetWorkingGroups from "../../../hooks/dashboard/workingGroups/useGetWorkingGroups";
import ChartCard from "../../../ui/dash-board/cards/ChartCard";
import StatisticsCard from "../../../ui/dash-board/cards/StatisticsCard";
import ConfirmDeleteModal from "../../../ui/modals/ConfirmationDeleteModal";
import EditWorkGroupModal from "../../../ui/modals/EditWorkGroupModal";
import ReusableDataTable from "../../../ui/table/ReusableDataTable";
import TablePagination from "../../../ui/table/TablePagentaion";
import useDeleteGroup from "../../../hooks/dashboard/workingGroups/useDeleteGroup";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { PAGE_SIZE } from "../../../utils/constants";

const columnHelper = createColumnHelper();

const WorkingGroups = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [workingGroupId, setWorkingGroupId] = useState();
  const [workingGroupName, setWorkingGroupName] = useState();

  // -----------------------------
  // Pagination state
  // -----------------------------
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);

  // -----------------------------
  // Modal state
  // -----------------------------
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // -----------------------------
  // Fetch working groups via hook
  // -----------------------------
  const { workingGroups, stats, currentPage, lastPage, isLoading } =
    useGetWorkingGroups("", page, pageSize);

  // -----------------------------
  // delete working group
  // -----------------------------
  const { deleteWorkingGroup, isDeleting } = useDeleteGroup();

  const statsData = [
    {
      label: t("dashboard.workGroup.stats.groups"),
      value: stats?.group_count,
      icon: "fa-users",
      color: "#fff",
      bgColor: "#007bff",
    },
    {
      label: t("dashboard.workGroup.stats.executives"),
      value: stats?.executive_count,
      icon: "fa-user-tie",
      color: "#fff",
      bgColor: "#28a745",
    },
    {
      label: t("dashboard.workGroup.stats.leaders"),
      value: stats?.leader_count,
      icon: "fa-chess-king",
      color: "#fff",
      bgColor: "#ffc107",
    },
    {
      label: t("dashboard.workGroup.stats.managers"),
      value: stats?.manager_count,
      icon: "fa-briefcase",
      color: "#fff",
      bgColor: "#17a2b8",
    },
    {
      label: t("dashboard.workGroup.stats.supervisors"),
      value: stats?.group_count,
      icon: "fa-user-check",
      color: "#fff",
      bgColor: "#6f42c1",
    },
    {
      label: t("dashboard.workGroup.stats.employees"),
      value: stats?.group_count,
      icon: "fa-id-badge",
      color: "#fff",
      bgColor: "#dc3545",
    },
  ];

  const tableData = useMemo(
    () =>
      workingGroups.map((wg) => ({
        id: wg?.id,
        groupNumber: wg?.name,
        groupClassifications: wg?.type,
        region: wg?.region?.title,
        location: wg?.country?.title,
        city: wg?.city?.title,
        createDate: wg?.created_at,
        excutives: wg?.executive_count,
        leaders: wg?.leader_count,
        managers: wg?.manager_count,
        supervisorsCount: wg?.supervisor_count,
        employeeCount: wg?.customer_service_count,
      })),
    [workingGroups, t]
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("groupNumber", {
        header: t("dashboard.workGroup.table.groupNumber"),
        cell: (info) => (
          <Link
            to={`/dashboard/working-group/${info?.row?.original?.id}`}
            className="link-styles"
          >
            {info.getValue()}
          </Link>
        ),
      }),
      columnHelper.accessor("groupClassifications", {
        header: t("dashboard.workGroup.table.classification"),
      }),
      columnHelper.accessor("region", {
        header: t("dashboard.workGroup.table.region"),
      }),
      columnHelper.accessor("location", {
        header: t("dashboard.workGroup.table.location"),
      }),
      columnHelper.accessor("city", {
        header: t("dashboard.workGroup.table.city"),
      }),
      columnHelper.accessor("createDate", {
        header: t("dashboard.workGroup.table.createDate"),
      }),
      columnHelper.accessor("excutives", {
        header: t("dashboard.workGroup.table.executives"),
      }),
      columnHelper.accessor("leaders", {
        header: t("dashboard.workGroup.table.leaders"),
      }),
      columnHelper.accessor("managers", {
        header: t("dashboard.workGroup.table.managers"),
      }),
      columnHelper.accessor("supervisorsCount", {
        header: t("dashboard.workGroup.table.supervisors"),
      }),
      columnHelper.accessor("employeeCount", {
        header: t("dashboard.workGroup.table.employees"),
      }),
      columnHelper.accessor("actions", {
        header: t("dashboard.workGroup.table.actions"),
        cell: (info) => {
          console.log(info);

          return (
            <div className="table__actions">
              <Link to={`/dashboard/shared-groups/${info?.row?.original?.id}`}>
                <i className="fa-solid fa-user-friends table__actions--details"></i>
              </Link>
              <i
                className="fa-solid fa-edit table__actions--edit"
                onClick={() => {
                  setShowModal(true);
                  setWorkingGroupId(info?.row?.original?.id);
                  setWorkingGroupName(info?.row?.original?.groupNumber);
                }}
              ></i>
              {
                <i
                  className="fa-solid fa-trash table__actions--delete"
                  onClick={() => {
                    setShowDeleteModal(true);
                    setWorkingGroupId(info?.row?.original?.id);
                  }}
                ></i>
              }
            </div>
          );
        },
      }),
    ],
    [t]
  );

  return (
    <section>
      <div className="row">
        <div className="col-12 p-2">
          <ChartCard title={t("dashboard.workGroup.stats.title")}>
            <div className="row">
              {statsData.map((item, index) => (
                <div
                  className="col-12 col-sm-6 col-md-4 col-lg-3 col-xxl-2 p-2"
                  key={index}
                >
                  <StatisticsCard item={item} />
                </div>
              ))}
            </div>
          </ChartCard>
        </div>

        <div className="col-12 p-2">
          <ReusableDataTable
            title={t("dashboard.workGroup.table.title")}
            data={tableData}
            columns={columns}
            currentPage={currentPage}
            lastPage={lastPage}
            setPage={setPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            lang="ar"
            filter={false}
            searchPlaceholder={t("dashboard.workGroup.table.searchPlaceholder")}
            isLoading={isLoading}
          >
            <TablePagination
              currentPage={page}
              lastPage={lastPage}
              onPageChange={setPage}
              isLoading={isLoading}
            />
          </ReusableDataTable>
        </div>
      </div>

      <EditWorkGroupModal
        setShowModal={setShowModal}
        showModal={showModal}
        workingGroupId={workingGroupId}
        workingGroupName={workingGroupName}
      />
      <ConfirmDeleteModal
        setShowDeleteModal={setShowDeleteModal}
        showDeleteModal={showDeleteModal}
        onConfirm={() =>
          deleteWorkingGroup(workingGroupId, {
            onSuccess: (res) => {
              toast.success(res?.message);
              queryClient.invalidateQueries({
                queryKey: ["dashboard-working-group"],
              });
              setShowDeleteModal(false);
            },
            onError: (err) => {
              toast.error(err?.message);
            },
          })
        }
        loading={isDeleting}
      />
    </section>
  );
};

export default WorkingGroups;
