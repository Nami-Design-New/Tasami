import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router";
import ReusableDataTable from "../../ReusableDataTable";

const columnHelper = createColumnHelper();

const ContractRecordModal = ({ showModal, setShowModal, title }) => {
  // const [showDeleteModal, setShowDeleteModal] = useState(false);
  const data = useMemo(
    () => [
      {
        referenceNumber: "REF001",
        creationDate: "2025-06-01",
        actions: "",
      },
      {
        referenceNumber: "REF002",
        creationDate: "2025-06-05",
        actions: "",
      },
      {
        referenceNumber: "REF003",
        creationDate: "2025-06-10",
        actions: "",
      },
      {
        referenceNumber: "REF004",
        creationDate: "2025-06-15",
        actions: "",
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("referenceNumber", {
        header: " الرقم المرجعي  ",
        cell: (info) => <Link className="link-styls">{info.getValue()}</Link>,
        enableSorting: false,
      }),
      columnHelper.accessor("creationDate", {
        header: " تاريخ الانشاء ",
        cell: (info) => info.getValue(),
        enableSorting: false,
      }),

      columnHelper.accessor("actions", {
        header: " الاجراء ",
        cell: () => (
          <div className="table__actions">
            <button className="button button--add"> ايقاف </button>
            <button className=" button "> تنشيط </button>
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
          />
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
