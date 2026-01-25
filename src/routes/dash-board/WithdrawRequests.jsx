import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import useGetWithDrawRequests from "../../hooks/dashboard/withdrawRequests/useGetWithDrawRequests";
import CustomButton from "../../ui/CustomButton";
import PageHeader from "../../ui/PageHeader";
import WithdrawActionModal from "../../ui/dash-board/WithdrawActionModal";
import WithdrawDetailsModal from "../../ui/dash-board/WithdrawDetailsModal";
import { usePersistedTableState } from "../../ui/datatable/hooks/usePersistedTableState";
import DataTable from "../../ui/datatable/ui/DataTable";
import { PAGE_SIZE } from "../../utils/constants";
import { columnHelper } from "../../ui/datatable/adapters/tanstackAdapter";

const getReqStatus = (t) => [
  { id: 1, value: "pending", label: t("withdraw.statuses.pending") },
  { id: 2, value: "accepted", label: t("withdraw.statuses.accepted") },
  { id: 3, value: "refused", label: t("withdraw.statuses.refused") },
];
export default function WithdrawRequests() {
  const { t } = useTranslation();

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [actionType, setActionType] = useState(null);
  const [showActionModal, setShowActionModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // -----------------------------
  // Pagination state
  // -----------------------------
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState(null);
  const [filters, setFilters] = useState({});

  usePersistedTableState({
    key: "withdrawReq-table",
    state: {
      search,
      page,
      sortConfig,
      filters,
    },
    setState: (saved) => {
      setSearch(saved.search ?? "");
      setPage(saved.page ?? 1);
      setSortConfig(saved.sortConfig ?? null);
      setFilters(saved.filters ?? {});
    },
  });

  const {
    withdrawRequests = [],
    isLoading,
    currentPage,
    lastPage,
  } = useGetWithDrawRequests(search, page, pageSize, sortConfig, filters);
  console.log(withdrawRequests);

  // ----------------------------------
  // HANDLERS
  // ----------------------------------
  const handleSortChange = (sortBy, sortOrder) => {
    setSortConfig(sortBy && sortOrder ? { sortBy, sortOrder } : null);
  };

  const tableData = useMemo(
    () =>
      withdrawRequests?.data?.map((wr) => ({
        id: wr?.id,
        customerName: wr?.user?.account_code,
        amount: wr?.price,
        status: wr?.status,
        created_at: wr?.created_at,
        details: wr?.city?.title,
        actions: "",
      })),
    [withdrawRequests],
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("customerName", {
        header: t("withdraw.customer"),
        enableSorting: true,
      }),
      columnHelper.accessor("amount", {
        header: t("withdraw.amount"),
        cell: (info) => `${info.getValue()} SAR`,
        enableSorting: true,
      }),
      columnHelper.accessor("status", {
        header: t("withdraw.status"),
        cell: (info) => {
          const status = info.getValue();
          return (
            <span
              className={`badge ${
                status === "pending"
                  ? "bg-warning"
                  : status === "accepted"
                    ? "bg-success"
                    : "bg-danger"
              }`}
            >
              {t(`withdraw.statuses.${status}`)}
            </span>
          );
        },
        enableSorting: true,
        enableFiltering: true,
      }),
      columnHelper.accessor("created_at", {
        header: t("withdraw.date"),
        enableSorting: true,
        enableFiltering: true,
      }),
      columnHelper.accessor("details", {
        header: t("withdraw.details"),
        cell: (info) => (
          <i
            className="fa-solid fa-eye table__actions--details"
            onClick={() => {
              setSelectedRequest(info.row.original.id);
              setShowDetailsModal(true);
            }}
          ></i>
        ),
        enableSorting: true,
      }),
      columnHelper.accessor("actions", {
        header: t("withdraw.actions"),
        cell: (info) => {
          const status = info.row.original.status;

          if (status !== "pending") return <p>--</p>;

          return (
            <div className="table__actions">
              <CustomButton
                onClick={() => {
                  setSelectedRequest(info.row.original.id);
                  setActionType("accepted");
                  setShowActionModal(true);
                }}
              >
                {t("withdraw.accept")}
              </CustomButton>

              <CustomButton
                color="danger"
                onClick={() => {
                  setSelectedRequest(info.row.original.id);
                  setActionType("refused");
                  setShowActionModal(true);
                }}
              >
                {t("withdraw.reject")}
              </CustomButton>
            </div>
          );
        },
        enableSorting: true,
      }),
    ],
    [t],
  );

  const withdrawFilterConfig = {
    status: {
      id: "status",
      type: "select",
      label: { en: "status" },
      options: getReqStatus(t),
    },

    created_at: {
      type: "date",
      mode: "range",
    },
  };

  return (
    <section>
      <div className="d-flex align-items-center w-100 px-2 justify-content-between">
        <PageHeader />
      </div>
      <div>
        <DataTable
          title={t("dashboard.notifications.title")}
          data={tableData || []}
          columns={columns}
          loading={isLoading}
          filterConfig={withdrawFilterConfig}
          pagination={{
            currentPage,
            lastPage,
            pageSize,
            onPageSizeChange: setPageSize,
            page,
            onPageChange: setPage,
          }}
          sorting={{
            enabled: true,
            server: true,
            sortBy: sortConfig?.sortBy,
            sortOrder: sortConfig?.sortOrder,
            onChange: handleSortChange,
          }}
          filtering={{
            enabled: false,
            server: true,
            onChange: setFilters,
          }}
          search={{
            enabled: true,
            value: search,
            onChange: setSearch,
            searchPlaceholder: t("search"),
            debounceMs: 500,
          }}
        />
      </div>
      {showActionModal && (
        <WithdrawActionModal
          show={showActionModal}
          setShow={setShowActionModal}
          actionType={actionType}
          request={selectedRequest}
        />
      )}
      {showDetailsModal && (
        <WithdrawDetailsModal
          show={showDetailsModal}
          setShow={setShowDetailsModal}
          request={selectedRequest}
        />
      )}
    </section>
  );
}
