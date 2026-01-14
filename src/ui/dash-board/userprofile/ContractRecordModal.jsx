import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Link } from "react-router";
import ReusableDataTable from "../../table/ReusableDataTable";
import CustomButton from "../../CustomButton";
import TablePagination from "../../table/TablePagentaion";
import { toast } from "sonner";
import useUpdateUserContract from "../../../hooks/dashboard/subscription/useUpdateUserContract";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import GlobalModal from "../../GlobalModal";

const columnHelper = createColumnHelper();

const ContractRecordModal = ({
  showModal,
  setShowModal,
  title,
  currentPage,
  lastPage,
  page,
  setPage,
  pageSize,
  setPageSize,
  isLoading,
  data,
  searchQuery,
  setSearchQuery,
  onSearchChange,
  searchDebounceMs,
  search,
}) => {
  const { t } = useTranslation();
  // const [showDeleteModal, setShowDeleteModal] = useState(false);
  const queryClient = useQueryClient();
  //-----------------------
  // delete shared Group hook
  //-----------------------
  const { updateUserContract, isPending } = useUpdateUserContract();
  const [loadingContractId, setLoadingContractId] = useState(null);

  const handelUpdateUserContract = (id, is_active) => {
    setLoadingContractId(id);

    const payload = {
      id,
      is_active,
    };
    updateUserContract(payload, {
      onSuccess: (res) => {
        toast.success(res?.message);
        queryClient.invalidateQueries({
          queryKey: ["dh-user-contract"],
        });
        queryClient.invalidateQueries({
          queryKey: ["dh-helper-contracts"],
        });
        setShowModal(false);
        setLoadingContractId(null);
      },
      onError: (err) => {
        toast.error(err?.message);
        setLoadingContractId(null);
      },
    });
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor("code", {
        header: t("dashboard.contractModal.refNumber"),
        cell: (info) => (
          <Link
            to={`/dashboard/contracts/${info.getValue()}`}
            className="link-styles"
          >
            {info.getValue()}
          </Link>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("created_at", {
        header: t("dashboard.contractModal.createDate"),
        cell: (info) => info.getValue(),
        enableSorting: false,
      }),

      columnHelper.accessor("is_active", {
        header: t("dashboard.contractModal.action"),
        cell: (info) => {
          const contractId = info?.row?.original?.id;
          const status = info?.row?.original?.status;

          const isUpdating = loadingContractId === contractId;

          return (
            <div className="table__actions fs-6">
              {status !== "working" ? (
                t("completed")
              ) : info.getValue() ? (
                <CustomButton
                  onClick={() => handelUpdateUserContract(contractId, false)}
                  size="small"
                  color="secondary"
                  disabled={isUpdating}
                  loading={isUpdating}
                >
                  {t("deactivate")}
                </CustomButton>
              ) : (
                <CustomButton
                  onClick={() => handelUpdateUserContract(contractId, true)}
                  size="small"
                  color="primary"
                  disabled={isUpdating}
                  loading={isUpdating}
                >
                  {t("activate")}
                </CustomButton>
              )}
            </div>
          );
        },
        enableSorting: false,
      }),
    ],
    [isPending, t]
  );
  return (
    <>
      <GlobalModal
        show={showModal}
        size="xl"
        onHide={() => {
          setShowModal(false);
          setSearchQuery("");
        }}
        aria-labelledby="working group add / edit Modal"
        centered
        className="working-group-modal"
      >
        <GlobalModal.Header closeButton>
          <h6>{title}</h6>
        </GlobalModal.Header>
        <GlobalModal.Body>
          <ReusableDataTable
            data={data}
            columns={columns}
            title={title}
            filter={false}
            searchPlaceholder=""
            currentPage={currentPage}
            lastPage={lastPage}
            setPage={setPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            lang="ar"
            isLoading={isLoading}
            searchQuery={searchQuery}
            onSearchChange={onSearchChange}
            searchDebounceMs={searchDebounceMs}
            search={search}
          >
            <TablePagination
              currentPage={page}
              lastPage={lastPage}
              onPageChange={setPage}
              isLoading={isLoading}
            />
          </ReusableDataTable>
        </GlobalModal.Body>
      </GlobalModal>
      {/* <ConfirmDeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
      /> */}
    </>
  );
};

export default ContractRecordModal;
