// export default FieldsAndSpecializations;
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import useGetSubCategories from "../../../hooks/dashboard/FiledsAndSpecialations/useGetSubCategories";
import ChartCard from "../../../ui/dash-board/cards/ChartCard";
import StatisticsCard from "../../../ui/dash-board/cards/StatisticsCard";
import ConfirmDeleteModal from "../../../ui/modals/ConfirmationDeleteModal";
import FiledsAndSpecialzationsModal from "../../../ui/modals/FiledsAndSpecialzationsModal";
import ReusableDataTable from "../../../ui/table/ReusableDataTable";
import { PAGE_SIZE } from "../../../utils/constants";
import TablePagination from "../../../ui/table/TablePagentaion";
import { useTranslation } from "react-i18next";
import useDeleteSpecialization from "../../../hooks/dashboard/FiledsAndSpecialations/useDeleteSpecialization";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import EditFiledAndSpecializationModal from "../../../ui/modals/EditFiledAndSpecializationModal";
import { set } from "lodash";
import StatisticsCardSkeleton from "../../../ui/loading/StatisticsCardSkeleton";

const columnHelper = createColumnHelper();

const FieldsAndSpecializations = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletedTargedId, setDeletedTargedId] = useState(null);
  const [selectedTarget, setSelectedTarget] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  //--------------------- Pagination ---------------------
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);

  // ----------------------  Hooks ------------------------
  const {
    categories_count,
    subcategories_count,
    subCategories,
    currentPage,
    isLoading,
    lastPage,
  } = useGetSubCategories(searchQuery, page, pageSize);
  const { deleteSpecialization, isPending } = useDeleteSpecialization();

  const handleDeleteSpecialization = () => {
    deleteSpecialization(deletedTargedId, {
      onSuccess: (res) => {
        toast.success(res?.message);
        queryClient.invalidateQueries({
          queryKey: ["dashboard-sub-categories"],
        });
        setShowDeleteModal(false);
      },
      onError: (err) => {
        toast.error(err?.message);
      },
    });
  };

  // Statistics data localized
  const statsData = [
    {
      label: t("dashboard.fields.stats.fields"),
      value: categories_count,
      icon: "fa-layer-group",
      color: "#ffffff",
      bgColor: "#20c997",
    },
    {
      label: t("dashboard.fields.stats.specializations"),
      value: subcategories_count,
      icon: "fa-book-open",
      color: "#ffffff",
      bgColor: "#fd7e14",
    },
  ];

  const data = useMemo(() => {
    return subCategories?.map((subCategory) => ({
      id: subCategory?.id,
      categoryId: subCategory?.category?.id,
      fields: subCategory?.category?.title,
      specializations_ar: subCategory?.title_ar,
      specializations_en: subCategory?.title_en,
      specializations: subCategory?.title,
      code: subCategory?.code,
      actions: "",
    }));
  }, [subCategories]);

  // -------------------- TABLE COLUMNS ----------------------
  const columns = useMemo(
    () => [
      columnHelper.accessor("fields", {
        header: t("dashboard.fields.table.fields"),
        cell: (info) => info.getValue(),
        enableSorting: false,
      }),

      columnHelper.accessor("specializations", {
        header: t("dashboard.fields.table.specializations"),
        cell: (info) => info.getValue(),
      }),

      columnHelper.accessor("actions", {
        header: t("dashboard.fields.table.actions"),
        cell: (info) => (
          <div className="table__actions">
            <i
              className="fa-solid fa-edit table__actions--edit"
              onClick={() => {
                setShowEditModal(true);
                setSelectedTarget(info.row.original);
                setIsEditMode(true);
              }}
            ></i>

            <i
              className="fa-solid fa-trash table__actions--delete"
              onClick={() => {
                setShowDeleteModal(true);
                setDeletedTargedId(info.row.original.id);
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
      <div className="row">
        {/* ---------- Statistics Section ---------- */}

        <div className="col-12 p-2">
          <ChartCard title={t("dashboard.fields.mainTitle")}>
            <div className="row">
              {isLoading ? (
                <>
                  {" "}
                  {[1, 2].map((_, index) => (
                    <div
                      className="col-12 col-sm-6 col-md-4 col-lg-3 col-xxl-2 p-2"
                      key={index}
                    >
                      <StatisticsCardSkeleton />
                    </div>
                  ))}{" "}
                </>
              ) : (
                <>
                  {" "}
                  {statsData.map((item, index) => (
                    <div
                      className="col-12 col-sm-6 col-md-4 col-lg-3 col-xxl-2 p-2"
                      key={index}
                    >
                      <StatisticsCard item={item} />
                    </div>
                  ))}
                </>
              )}
            </div>
          </ChartCard>
        </div>

        {/* ---------- Table Section ---------- */}
        <div className="col-12 p-2">
          <ReusableDataTable
            title={t("dashboard.fields.tableTitle")}
            data={data}
            columns={columns}
            lang="ar"
            currentPage={currentPage}
            lastPage={lastPage}
            setPage={setPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            searchPlaceholder={t("dashboard.fields.search")}
            filter={false}
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
      </div>

      <FiledsAndSpecialzationsModal
        showModal={showModal}
        setShowModal={setShowModal}
        selectedTarget={selectedTarget}
        isEditMode={isEditMode}
      />
      <EditFiledAndSpecializationModal
        showModal={showEditModal}
        setShowModal={setShowEditModal}
        selectedTarget={selectedTarget}
      />

      <ConfirmDeleteModal
        setShowDeleteModal={setShowDeleteModal}
        showDeleteModal={showDeleteModal}
        loading={isPending}
        onConfirm={() => handleDeleteSpecialization()}
      />
    </section>
  );
};

export default FieldsAndSpecializations;
