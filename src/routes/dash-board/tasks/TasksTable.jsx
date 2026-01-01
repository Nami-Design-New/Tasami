import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Badge } from "react-bootstrap";
import { Link } from "react-router";
import ReusableDataTable from "../../../ui/table/ReusableDataTable";
import ReassignTaskModal from "./ReassignTaskModal";
import { useTranslation } from "react-i18next";

import TablePagination from "../../../ui/table/TablePagentaion";

const columnHelper = createColumnHelper();

const TasksTable = ({
  page,
  setPage,
  pageSize,
  setPageSize,
  tasks,
  currentPage,
  lastPage,
  isLoading,
  onSearch,
  searchQuery,
}) => {
  const { t } = useTranslation();
  const [showReassignModal, setShowReassignModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState();

  const tableData = useMemo(
    () =>
      tasks?.data?.map((task) => ({
        id: task?.id,
        system: t(`${task.system_type.type}`) || "-",
        subject: task.system_type.title || "-",
        model: task.reference_number || "-",
        date: task.date || "-",
        time: task.time || "-",
        userAccount: task.account || "-",
        accountType: task.account_type || "-",
        idNumber: task.id_number || "-",
        group: task.account_group || "-",
        region: task.region.title || "-",
        location: task.country.title || "-",
        city: task.city.title || "-",

        completionDate: task.finish_date || "-",
        status: task.status || "-",
        actionLevel: task.procedure_level || "-",
        rate: task.rate || "-",
        assign: false,
      })),
    [tasks, t]
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("system", {
        header: t("dashboard.tasks.table.system"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("subject", {
        header: t("dashboard.tasks.table.subject"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("model", {
        header: t("dashboard.tasks.table.model"),
        cell: (info) => (
          <Link
            className="link-styles"
            to={`/dashboard/model/${info.row.original.id}`}
          >
            {info.getValue()}
          </Link>
        ),
      }),
      columnHelper.accessor("date", {
        header: t("dashboard.tasks.table.date"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("time", {
        header: t("dashboard.tasks.table.time"),
        cell: (info) => info.getValue(),
      }),

      columnHelper.accessor("userAccount", {
        header: t("dashboard.tasks.table.userAccount"),
        cell: (info) => (
          <Link
            className="link-styles"
            to={`/dashboard/user-details/${info.getValue()}`}
          >
            {info.getValue()}
          </Link>
        ),
      }),
      columnHelper.accessor("accountType", {
        header: t("dashboard.tasks.table.accountType"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("idNumber", {
        header: t("dashboard.tasks.table.idNumber"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("group", {
        header: t("dashboard.tasks.table.group"),
        cell: (info) => (
          <Link
            className="link-styles"
            to={`/dashboard/working-group/${info.row.original.id}`}
          >
            {info.getValue()}
          </Link>
        ),
      }),
      columnHelper.accessor("region", {
        header: t("dashboard.tasks.table.region"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("location", {
        header: t("dashboard.tasks.table.location"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("city", {
        header: t("dashboard.tasks.table.city"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("status", {
        header: t("dashboard.tasks.table.status"),
        cell: (info) => {
          let badgeColor;
          switch (info.getValue()) {
            case "completed":
              badgeColor = "#28a745";
              break;
            case "progress":
              badgeColor = "#ffc107";
              break;
            default:
              badgeColor = "#bababbff";
              break;
          }
          return (
            <Badge
              pill
              className="custom-badge"
              style={{
                "--badge-color": badgeColor,
                "--text-color": "#fff",
                fontWeight: "500",
              }}
            >
              {t(`tasksStatus.${info.getValue()}`)}
            </Badge>
          );
        },
      }),
      columnHelper.accessor("actionLevel", {
        header: t("dashboard.tasks.table.actionLevel"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("completionDate", {
        header: t("dashboard.tasks.table.completionDate"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("rate", {
        header: t("dashboard.tasks.table.rate"),
        cell: (info) =>
          info.getValue() ?? t("dashboard.tasks.statusLabels.noRate"),
      }),
      columnHelper.accessor("assign", {
        header: t("dashboard.tasks.table.assign"),
        cell: (info) =>
          info.getValue() ? null : (
            <button
              onClick={() => {
                setSelectedRow(info.row.original.id);
                setShowReassignModal(true);
              }}
            >
              <i className="fa-solid fa-repeat"></i>
            </button>
          ),
      }),
    ],
    [t]
  );

  return (
    <>
      <ReusableDataTable
        filter={false}
        title={t("dashboard.tasks.table.subject")}
        data={tableData}
        columns={columns}
        currentPage={currentPage}
        lastPage={lastPage}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        lang="ar"
        searchPlaceholder={t("search")}
        isLoading={isLoading}
        searchQuery={searchQuery}
        onSearchChange={onSearch}
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
      <ReassignTaskModal
        showModal={showReassignModal}
        setShowModal={setShowReassignModal}
        selectedRow={selectedRow}
      />
    </>
  );
};

export default TasksTable;
