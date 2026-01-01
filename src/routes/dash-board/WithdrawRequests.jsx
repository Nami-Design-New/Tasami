import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import useGetWithDrawRequests from "../../hooks/dashboard/withdrawRequests/useGetWithDrawRequests";
import CustomButton from "../../ui/CustomButton";
import PageHeader from "../../ui/PageHeader";
import WithdrawDetailsModal from "../../ui/dash-board/WithdrawDetailsModal";
import ReusableDataTable from "../../ui/table/ReusableDataTable";
import TablePagination from "../../ui/table/TablePagentaion";
import { PAGE_SIZE } from "../../utils/constants";
import WithdrawActionModal from "../../ui/dash-board/WithdrawActionModal";
const columnHelper = createColumnHelper();

export default function WithdrawRequests() {
  const { t } = useTranslation();

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [actionType, setActionType] = useState(null); // accept | reject
  const [showActionModal, setShowActionModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // -----------------------------
  // Pagination state
  // -----------------------------
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  const { withdrawRequests, isLoading, currentPage, lastPage } =
    useGetWithDrawRequests(searchQuery, page, pageSize);

  const tableData = useMemo(
    () =>
      withdrawRequests?.data.map((wr) => ({
        id: wr?.id,
        customerName: wr?.user?.account_code,
        amount: wr?.price,
        status: wr?.status,
        created_at: wr?.created_at,
        details: wr?.city?.title,
        actions: "",
      })),
    [withdrawRequests]
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("customerName", {
        header: t("withdraw.customer"),
      }),
      columnHelper.accessor("amount", {
        header: t("withdraw.amount"),
        cell: (info) => `${info.getValue()} SAR`,
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
      }),
      columnHelper.accessor("created_at", {
        header: t("withdraw.date"),
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
      }),
    ],
    [t]
  );
  return (
    <section>
      <div className="d-flex align-items-center w-100 px-2 justify-content-between">
        <PageHeader />
      </div>
      <div>
        <ReusableDataTable
          title={t("dashboard.withdraw_requests")}
          data={tableData}
          columns={columns}
          currentPage={currentPage}
          lastPage={lastPage}
          setPage={setPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          lang="ar"
          filter={false}
          searchPlaceholder={t("search")}
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
