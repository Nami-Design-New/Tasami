import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import useGetDhNationalities from "../../../hooks/dashboard/website-managment/nationalities/useGetDhNationalities";
import CustomButton from "../../../ui/CustomButton";
import AddNewNationalitiyModal from "../../../ui/dash-board/websiteManagment/AddNewNationalitiyModal";
import ConfirmDeleteModal from "../../../ui/modals/ConfirmationDeleteModal";
import PageHeader from "../../../ui/PageHeader";
import ReusableDataTable from "../../../ui/table/ReusableDataTable";
import TablePagination from "../../../ui/table/TablePagentaion";
import { PAGE_SIZE } from "../../../utils/constants";
import useDeleteNationality from "../../../hooks/dashboard/website-managment/nationalities/useDeleteNationality";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
const columnHelper = createColumnHelper();

export default function Nationalities() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const [showAddNationality, setShowAddNationality] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletionTarget, setDeletionTarget] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  // pagenation states
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [updateTarget, setUpdateTarget] = useState(null);

  const { nationalities, currentPage, lastPage, isLoading } =
    useGetDhNationalities("", page, pageSize);
  const { deleteNationality, isDeletingNationality } = useDeleteNationality();
  const handleDeleteNationality = () => {
    deleteNationality(deletionTarget, {
      onSuccess: (res) => {
        toast.success(res.message);
        queryClient.invalidateQueries({ queryKey: ["dh-nationalites"] });
        setShowDeleteModal(false);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor("title", {
        header: t("dashboard.nationalitiesDh.tableHeader"),
        cell: (info) => {
          return info.row.original.title;
        },
      }),

      columnHelper.display({
        id: "id",
        header: t("dashboard.nationalitiesDh.actions"),
        cell: (info) => (
          <div className="table__actions">
            <i
              className="fa-solid fa-edit  table__actions--edit"
              onClick={() => {
                setIsEdit(true);
                setShowAddNationality(true);
                setUpdateTarget(info?.row.original);
              }}
            ></i>
            <i
              className="fa-solid fa-trash  table__actions--delete"
              onClick={() => {
                setShowDeleteModal(true);
                setDeletionTarget(info?.row.original.id);
              }}
            ></i>
          </div>
        ),
        enableSorting: false,
      }),
    ],
    [t]
  );

  return (
    <section>
      <div className="p-2 d-flex align-items-center justify-content-between">
        <PageHeader />
        <CustomButton
          icon={<i className="fa-solid fa-plus"></i>}
          color="secondary"
          onClick={() => {
            setShowAddNationality(true);
            setIsEdit(false);
          }}
        >
          {t("dashboard.nationalitiesDh.addNationality")}
        </CustomButton>
      </div>
      <ReusableDataTable
        title={t("dashboard.nationalitiesDh.tableTitle")}
        data={nationalities || []}
        columns={columns}
        filter={false}
        searchPlaceholder={t("dashboard.nationalitiesDh.searchPlaceholder")}
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
      {showAddNationality && (
        <AddNewNationalitiyModal
          setShowModal={setShowAddNationality}
          showModal={showAddNationality}
          isEdit={isEdit}
          updateTarget={updateTarget}
        />
      )}{" "}
      {showDeleteModal && (
        <ConfirmDeleteModal
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
          onConfirm={handleDeleteNationality}
          loading={isDeletingNationality}
        />
      )}
    </section>
  );
}
