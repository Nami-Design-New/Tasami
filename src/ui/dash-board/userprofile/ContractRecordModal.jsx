import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router";
import ReusableDataTable from "../../table/ReusableDataTable";
import CustomButton from "../../CustomButton";
import TablePagination from "../../table/TablePagentaion";
import { toast } from "sonner";
import useUpdateUserContract from "../../../hooks/dashboard/subscription/useUpdateUserContract";
import { useQueryClient } from "@tanstack/react-query";

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
}) => {
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
        header: " الرقم المرجعي  ",
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
        header: " تاريخ الانشاء ",
        cell: (info) => info.getValue(),
        enableSorting: false,
      }),

      columnHelper.accessor("is_active", {
        header: " الاجراء ",
        cell: (info) => {
          const contractId = info?.row?.original?.id;
          const isUpdating = loadingContractId === contractId;

          return (
            <div className="table__actions">
              {info.getValue() ? (
                <CustomButton
                  onClick={() => handelUpdateUserContract(contractId, false)}
                  size="small"
                  color="secondary"
                  disabled={isUpdating}
                >
                  {isUpdating ? "جاري الإيقاف..." : " ايقاف"}
                </CustomButton>
              ) : (
                <CustomButton
                  onClick={() => handelUpdateUserContract(contractId, true)}
                  size="small"
                  color="primary"
                  disabled={isUpdating}
                >
                  {isUpdating ? "جاري التنشيط..." : " تنشيط"}
                </CustomButton>
              )}
            </div>
          );
        },
        enableSorting: false,
      }),
    ],
    [isPending]
  );
  return (
    <>
      <Modal
        show={showModal}
        size="xl"
        onHide={() => setShowModal(false)}
        aria-labelledby="working group add / edit Modal"
        centered
        className="working-group-modal"
      >
        <Modal.Header closeButton>
          <h6>{title}</h6>
        </Modal.Header>
        <Modal.Body>
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
          >
            <TablePagination
              currentPage={page}
              lastPage={lastPage}
              onPageChange={setPage}
              isLoading={isLoading}
            />
          </ReusableDataTable>
        </Modal.Body>
      </Modal>
      {/* <ConfirmDeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
      /> */}
    </>
  );
};

export default ContractRecordModal;
