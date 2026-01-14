import ReusableDataTable from "../../table/ReusableDataTable";
import { useMemo, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import ConfirmDeleteModal from "../../modals/ConfirmationDeleteModal";
import { Link } from "react-router";
import GlobalModal from "../../GlobalModal";

const columnHelper = createColumnHelper();

const CummunityRecordModal = ({ showModal, setShowModal }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const data = useMemo(
    () => [
      {
        contentTitle: "مقال تعليمي",
        contentType: "مقال",
        referenceNumber: "REF001",
        creationDate: "2025-06-01",
        actions: "",
      },
      {
        contentTitle: "فيديو توضيحي",
        contentType: "فيديو",
        referenceNumber: "REF002",
        creationDate: "2025-06-05",
        actions: "",
      },
      {
        contentTitle: "دليل المستخدم",
        contentType: "PDF",
        referenceNumber: "REF003",
        creationDate: "2025-06-10",
        actions: "",
      },
      {
        contentTitle: "ورشة عمل",
        contentType: "محاضرة",
        referenceNumber: "REF004",
        creationDate: "2025-06-15",
        actions: "",
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("contentTitle", {
        header: " عنون المحتوي  ",
        cell: (info) => info.getValue(),

        enableSorting: false,
      }),
      columnHelper.accessor("contentType", {
        header: " نوع المحتوي  ",
        cell: (info) => info.getValue(),

        enableSorting: false,
      }),
      columnHelper.accessor("referenceNumber", {
        header: " الرقم المرجعي  ",
        cell: (info) => (
          <Link
            to={`/dashboard/community-post-details/${info.getValue()}`}
            className="link-styles"
          >
            {info.getValue()}
          </Link>
        ),

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
            <i
              className="fa-solid fa-trash  table__actions--delete"
              onClick={() => setShowDeleteModal(true)}
            ></i>
          </div>
        ),
        enableSorting: false,
      }),
    ],
    []
  );
  return (
    <>
      <GlobalModal
        show={showModal}
        size="xl"
        onHide={() => setShowModal(false)}
        aria-labelledby="working group add / edit Modal"
        centered
        className="working-group-modal"
      >
        <GlobalModal.Header closeButton>
          <h6> سجل مجتمعات المساعد </h6>
        </GlobalModal.Header>
        <GlobalModal.Body>
          <ReusableDataTable
            data={data}
            columns={columns}
            title={" سجل مجتمعات المساعد "}
            filter={false}
            searchPlaceholder=""
          />
        </GlobalModal.Body>
      </GlobalModal>
      <ConfirmDeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
      />
    </>
  );
};

export default CummunityRecordModal;
