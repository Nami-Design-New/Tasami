import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router";
import ReusableDataTable from "../../table/ReusableDataTable";
import CustomButton from "../../CustomButton";
import useGetUserContract from "../../../hooks/dashboard/subscription/usePostUserContract";
import { PAGE_SIZE } from "../../../utils/constants";
import TablePagination from "../../table/TablePagentaion";

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

  const columns = useMemo(
    () => [
      columnHelper.accessor("code", {
        header: " الرقم المرجعي  ",
        cell: (info) => (
          <Link to={`/dashboard/contracts/${info.getValue()}`} className="link-styles">
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

      columnHelper.accessor("actions", {
        header: " الاجراء ",
        cell: () => (
          <div className="table__actions">
            <CustomButton size="small" color="primary">
              تنشيط
            </CustomButton>
            <CustomButton size="small" color="secondary">
              ايقاف
            </CustomButton>

            {/* <i className="fa-solid fa-trash  table__actions--delete"></i> */}
          </div>
        ),
        enableSorting: false,
      }),
    ],
    []
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
