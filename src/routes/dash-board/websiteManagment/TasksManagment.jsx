import { useMemo, useState } from "react";
import CustomButton from "../../../ui/CustomButton";
import PageHeader from "../../../ui/PageHeader";
import ReusableDataTable from "../../../ui/table/ReusableDataTable";
import { createColumnHelper } from "@tanstack/react-table";
import ConfirmDeleteModal from "../../../ui/modals/ConfirmationDeleteModal";
import TasksClassificationModal from "../../../ui/dash-board/websiteManagment/TasksClassificationModal";
import { useQueryClient } from "@tanstack/react-query";
import { PAGE_SIZE } from "../../../utils/constants";
import useGetTaskCategory from "../../../hooks/dashboard/websiteManagment/tasksManagment/useGetTaskCategory";
import useDeleteTaskCategory from "../../../hooks/dashboard/websiteManagment/tasksManagment/useDeleteTaskCategory";
import TablePagination from "../../../ui/table/TablePagentaion";
import { useTranslation } from "react-i18next";

const columnHelper = createColumnHelper();

export default function TasksManagment() {
  const [showModal, setShowModal] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const lang = localStorage.getItem("i18nextLng");
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  // fetch data
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const { taskCategories, currentPage, lastPage, isLoading } =
    useGetTaskCategory(searchQuery, page, pageSize);

  // delete row
  const [deletionTarget, setDeletionTarget] = useState(null);
  const [updateTarget, setUpdateTarget] = useState(null);
  const { deleteTaskCategory, isDeletingTaskCategory } =
    useDeleteTaskCategory();

  const handleDeleteTaskCategory = (id) => {
    deleteTaskCategory(id, {
      onSuccess: () => {
        setShowDeleteModal(false);
        setDeletionTarget(null);
        queryClient.invalidateQueries({
          queryKey: ["task-category-data"],
        });
      },
    });
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor(lang === "ar" ? "title_ar" : "title_en", {
        header: t("dashboard.taskCategories.taskCategory"),
        cell: (info) => info.getValue(),
      }),

      columnHelper.display({
        id: "actions",
        header: t("dashboard.taskCategories.actions"),

        cell: (info) => (
          <div className="table__actions">
            <i
              className="fa-solid fa-edit  table__actions--edit"
              onClick={() => {
                setIsEdit(true),
                  setShowModal(true),
                  setUpdateTarget(info.row.original.id);
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
          {t("dashboard.taskCategories.addCategory")}
        </CustomButton>
      </div>
      <ReusableDataTable
        title={t("dashboard.taskCategories.categoriesTitle")}
        data={taskCategories || []}
        columns={columns}
        filter={false}
        searchPlaceholder={t("dashboard.taskCategories.searchPlaceholder")}
        initialPageSize={10}
        currentPage={currentPage}
        lastPage={lastPage}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
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
      <TasksClassificationModal
        showModal={showModal}
        setShowModal={setShowModal}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        updateTarget={updateTarget}
        taskCategories={taskCategories}
      />
      <ConfirmDeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        loading={isDeletingTaskCategory}
        onConfirm={() => handleDeleteTaskCategory(deletionTarget)}
      />
    </section>
  );
}
