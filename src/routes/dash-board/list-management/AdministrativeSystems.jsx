/*  
--------------- Please Do not remove comments here --------------
*/

// import { useQueryClient } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
// import useDeleteSubject from "../../../hooks/dashboard/administrativeSystems/useDeleteSubject";
import useGetSubjects from "../../../hooks/dashboard/administrativeSystems/useGetSubjects";
// import ConfirmDeleteModal from "../../../ui/modals/ConfirmationDeleteModal";
import SubjectModal from "../../../ui/modals/SubjectModal";
import ReusableDataTable from "../../../ui/table/ReusableDataTable";
import TablePagination from "../../../ui/table/TablePagentaion";
import { PAGE_SIZE } from "../../../utils/constants";

const columnHelper = createColumnHelper();

const AdministrativeSystems = () => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  // const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  // const [deletionTarget, setDeletionTarget] = useState(null);
  // const queryClient = useQueryClient();
  // const { deleteSubject, isDeletingSubject } = useDeleteSubject();
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  // const handleDeleteSubject = (id) => {
  //   deleteSubject(id, {
  //     onSuccess: () => {
  //       setShowDeleteModal(false);
  //       setDeletionTarget(null);
  //       queryClient.invalidateQueries({
  //         queryKey: ["subjects"],
  //       });
  //     },
  //   });
  // };

  // -----------------------------
  // Pagination state
  // -----------------------------
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);

  const { subjects, isLoading, currentPage, lastPage } = useGetSubjects(
    searchQuery,
    page,
    pageSize
  );
  const tableData = useMemo(
    () =>
      subjects.map((subject) => ({
        id: subject?.id,
        administrativeSystem: subject?.type,
        subjects: subject?.title,
        subjects_ar: subject?.title_ar,
        subjects_en: subject?.title_en,
        code: subject?.code,
        actions: "",
      })),
    [subjects]
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("administrativeSystem", {
        header: t("dashboard.administrativeSystems.tableHeaders.system"),
        cell: (info) => {
          return t(`${info.getValue()}`);
        },
        enableSorting: false,
      }),
      columnHelper.accessor("subjects", {
        header: t("dashboard.administrativeSystems.tableHeaders.subject"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("actions", {
        header: t("dashboard.administrativeSystems.tableHeaders.actions"),
        cell: (info) => (
          <div className="table__actions">
            <i
              className="fa-solid fa-edit table__actions--edit"
              onClick={() => {
                setShowModal(true);
                setSelectedSubject(info.row.original);
              }}
            ></i>
            {/* <i
              className="fa-solid fa-trash table__actions--delete"
              onClick={() => {
                setShowDeleteModal(true);
                setDeletionTarget(info.row.original.id);
              }}
            ></i> */}
          </div>
        ),
        enableSorting: false,
      }),
    ],
    [t]
  );

  return (
    <section>
      <ReusableDataTable
        title={t("dashboard.administrativeSystems.title")}
        data={tableData}
        columns={columns}
        currentPage={currentPage}
        lastPage={lastPage}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        lang="ar"
        filter={false}
        searchPlaceholder={t("dashboard.administrativeSystems.search")}
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

      <SubjectModal
        showModal={showModal}
        setShowModal={setShowModal}
        selectedSubject={selectedSubject}
        isEdit={true}
      />

      {/* <ConfirmDeleteModal
        setShowDeleteModal={setShowDeleteModal}
        showDeleteModal={showDeleteModal}
        loading={isDeletingSubject}
        onConfirm={() => handleDeleteSubject(deletionTarget)}
      /> */}
    </section>
  );
};

export default AdministrativeSystems;
