import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import ViolationsEditModal from "../../../ui/dash-board/websiteManagment/ViolationsEditModal";
import CustomButton from "../../../ui/CustomButton";
import PageHeader from "../../../ui/PageHeader";
import ReusableDataTable from "../../../ui/table/ReusableDataTable";
import ConfirmDeleteModal from "../../../ui/modals/ConfirmationDeleteModal";
import useGetViolationReason from "../../../hooks/dashboard/websiteManagment/violationsManagment/useGetViolationReason";
import { PAGE_SIZE } from "../../../utils/constants";
import TablePagination from "../../../ui/table/TablePagentaion";
import useDeleteViolationReason from "../../../hooks/dashboard/websiteManagment/violationsManagment/useDeleteViolationReason";
import { useQueryClient } from "@tanstack/react-query";

const columnHelper = createColumnHelper();
export default function ViolationsManagment() {
  const [showModal, setShowModal] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState();
  const queryClient = useQueryClient()

  const lang = localStorage.getItem("i18nextLng")

  // fetch data 
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const { violationReasons, currentPage, lastPage, isLoading } =
    useGetViolationReason("", page, pageSize);

  // delete row 
  const [deletionTarget, setDeletionTarget] = useState(null);
  const [updateTarget, setUpdateTarget] = useState(null);
  const { deleteViolationReason, isDeletingViolationReason } = useDeleteViolationReason();

  const handleDeleteViolationReason = (id) => {
    deleteViolationReason(id, {
      onSuccess: () => {
        setShowDeleteModal(false);
        setDeletionTarget(null);
        queryClient.invalidateQueries({
          queryKey: ["violation-reason-data"],
        });
      },
    });
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor(lang === "ar" ? "title_ar" : "title_en", {
        header: " انواع المخالفات ",
        cell: (info) => info.getValue(),
      }),

      columnHelper.accessor("id", {
        id: "id",
        header: " الاجراءات",

        cell: (info) => (
          <div className="table__actions">
            <i
              className="fa-solid fa-edit  table__actions--edit"
              onClick={() => {
                setIsEdit(true), setShowModal(true), setUpdateTarget(info.row.original.id);
              }}
            ></i>
            <i
              className="fa-solid fa-trash  table__actions--delete"
              onClick={() => {
                setShowDeleteModal(true);
                setDeletionTarget(info.row.original.id);
              }}
            ></i>
          </div>
        ),
        enableSorting: false,
      }),
    ],
    []
  );
  return (
    <section>
      <div className="p-2 d-flex align-items-center justify-content-between">
        <PageHeader />
        <CustomButton
          icon={<i className="fa-solid fa-plus"></i>}
          color="secondary"
          onClick={() => {
            setShowModal(true);
            setIsEdit(false);
          }}
        >
          اضف مخلفة
        </CustomButton>
      </div>
      <div className="row">
        <div className="col-12">
          <ReusableDataTable
            title="انواع المخالفات"
            data={violationReasons || []}
            columns={columns}
            filter={false}
            searchPlaceholder="البحث في المخالفات  ..."
            initialPageSize={10}
            currentPage={currentPage}
            lastPage={lastPage}
            setPage={setPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
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
      <ViolationsEditModal
        showModal={showModal}
        setShowModal={setShowModal}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        updateTarget={updateTarget}
        violationReasons={violationReasons}
      />
      <ConfirmDeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        loading={isDeletingViolationReason}
        onConfirm={() => handleDeleteViolationReason(deletionTarget)}
      />
    </section>
  );
}
