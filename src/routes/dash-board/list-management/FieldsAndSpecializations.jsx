/*  
--------------- Please Do not remove comments here --------------
*/

// export default FieldsAndSpecializations;
import { useQueryClient } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import useDeleteCategory from "../../../hooks/dashboard/FiledsAndSpecialations/useDeleteCategory";
import useDeleteSpecialization from "../../../hooks/dashboard/FiledsAndSpecialations/useDeleteSpecialization";
import useGetMainCategories from "../../../hooks/dashboard/FiledsAndSpecialations/useGetMainCategories";
import useGetSubCategories from "../../../hooks/dashboard/FiledsAndSpecialations/useGetSubCategories";
import ChartCard from "../../../ui/dash-board/cards/ChartCard";
import StatisticsCard from "../../../ui/dash-board/cards/StatisticsCard";
import StatisticsCardSkeleton from "../../../ui/loading/StatisticsCardSkeleton";
import CategoryModal from "../../../ui/modals/CategoryModal";
import ConfirmDeleteModal from "../../../ui/modals/ConfirmationDeleteModal";
import EditFiledAndSpecializationModal from "../../../ui/modals/EditFiledAndSpecializationModal";
import FiledsAndSpecialzationsModal from "../../../ui/modals/FiledsAndSpecialzationsModal";
import CustomButton from "../../../ui/CustomButton";
import ReusableDataTable from "../../../ui/table/ReusableDataTable";
import TablePagination from "../../../ui/table/TablePagentaion";
import { PAGE_SIZE } from "../../../utils/constants";

const columnHelper = createColumnHelper();

const FieldsAndSpecializations = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showSpecializationModal, setShowSpecializationModal] = useState(false);
  const [showEditSpecializationModal, setShowEditSpecializationModal] =
    useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSpecialization, setSelectedSpecialization] = useState(null);

  const [categorySearchQuery, setCategorySearchQuery] = useState("");
  const [specializationSearchQuery, setSpecializationSearchQuery] =
    useState("");
  const [categoryPage, setCategoryPage] = useState(1);
  const [specializationPage, setSpecializationPage] = useState(1);
  const [specializationPageSize, setSpecializationPageSize] =
    useState(PAGE_SIZE);

  // ----------------------  Hooks ------------------------
  const {
    categories,
    currentPage: categoryCurrentPage,
    isLoading: isCategoriesLoading,
    lastPage: categoryLastPage,
  } = useGetMainCategories(
    categorySearchQuery,
    categoryPage,
    PAGE_SIZE,
  );

  const {
    categories_count,
    subcategories_count,
    subCategories,
    currentPage: specializationCurrentPage,
    isLoading: isSpecializationsLoading,
    lastPage: specializationLastPage,
  } = useGetSubCategories(
    specializationSearchQuery,
    specializationPage,
    specializationPageSize,
  );

  const { deleteCategory, isPending: isDeletingCategory } =
    useDeleteCategory();
  const { deleteSpecialization, isPending: isDeletingSpecialization } =
    useDeleteSpecialization();

  const handleOpenCategoryModal = useCallback((category = null) => {
    setSelectedCategory(category);
    setShowCategoryModal(true);
  }, []);

  const handleDelete = () => {
    if (!deleteTarget) return;

    const mutation =
      deleteTarget.type === "category" ? deleteCategory : deleteSpecialization;

    mutation(deleteTarget.id, {
      onSuccess: (res) => {
        toast.success(res?.message);
        queryClient.invalidateQueries({
          queryKey: ["dashboard-main-categories"],
        });
        queryClient.invalidateQueries({
          queryKey: ["dashboard-sub-categories"],
        });
        setShowDeleteModal(false);
        setDeleteTarget(null);
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

  const categoryData = useMemo(() => {
    return categories?.map((category) => ({
      id: category?.id,
      title: category?.title,
      title_ar: category?.title_ar,
      title_en: category?.title_en,
      code: category?.code,
      actions: "",
    }));
  }, [categories]);

  const specializationData = useMemo(() => {
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
  const categoryColumns = useMemo(
    () => [
      columnHelper.accessor("title", {
        header: t("dashboard.fields.table.fields"),
        cell: (info) => info.getValue(),
        enableSorting: false,
      }),
      columnHelper.accessor("actions", {
        header: t("dashboard.fields.table.actions"),
        cell: (info) => (
          <div className="table__actions">
            <i
              className="fa-solid fa-edit table__actions--edit"
              onClick={() => handleOpenCategoryModal(info.row.original)}
            ></i>

            <i
              className="fa-solid fa-trash table__actions--delete"
              onClick={() => {
                setShowDeleteModal(true);
                setDeleteTarget({
                  id: info.row.original.id,
                  type: "category",
                });
              }}
            ></i>
          </div>
        ),
        enableSorting: false,
      }),
    ],
    [handleOpenCategoryModal, t],
  );

  const specializationColumns = useMemo(
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
                setShowEditSpecializationModal(true);
                setSelectedSpecialization(info.row.original);
              }}
            ></i>

            <i
              className="fa-solid fa-trash table__actions--delete"
              onClick={() => {
                setShowDeleteModal(true);
                setDeleteTarget({
                  id: info.row.original.id,
                  type: "specialization",
                });
              }}
            ></i>
          </div>
        ),
        enableSorting: false,
      }),
    ],
    [t],
  );

  return (
    <section>
      <div className="row">
        {/* ---------- Statistics Section ---------- */}
        <div className="col-12 p-2">
          <ChartCard title={t("dashboard.fields.mainTitle")}>
            <div className="row">
              {isSpecializationsLoading ? (
                <>
                  {[1, 2].map((_, index) => (
                    <div
                      className="col-12 col-sm-6 col-md-4 col-lg-3 col-xxl-2 p-2"
                      key={index}
                    >
                      <StatisticsCardSkeleton />
                    </div>
                  ))}
                </>
              ) : (
                <>
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

        {/* ---------- Fields Table Section ---------- */}
        <div className="col-12 p-2 mb-4">
          <div className="d-flex justify-content-end mb-2 position-relative z-1">
            <CustomButton
              icon={<i className="fa-solid fa-plus"></i>}
              color="secondary"
              onClick={() => handleOpenCategoryModal()}
            >
              {t("dashboard.fieldsAndSpecialization.addFieldButton")}
            </CustomButton>
          </div>
          <ReusableDataTable
            title={t("dashboard.fields.fieldsTableTitle")}
            data={categoryData}
            columns={categoryColumns}
            lang="ar"
            currentPage={categoryCurrentPage}
            lastPage={categoryLastPage}
            setPage={setCategoryPage}
            pageSize={PAGE_SIZE}
            setPageSize={() => {}}
            searchPlaceholder={t("dashboard.fields.search")}
            filter={false}
            isLoading={isCategoriesLoading}
            searchQuery={categorySearchQuery}
            onSearchChange={setCategorySearchQuery}
            searchDebounceMs={700}
            search={true}
          >
            <TablePagination
              currentPage={categoryPage}
              lastPage={categoryLastPage}
              onPageChange={setCategoryPage}
              isLoading={isCategoriesLoading}
            />
          </ReusableDataTable>
        </div>

        {/* ---------- Specializations Table Section ---------- */}
        <div className="col-12 p-2 mt-3 position-relative z-1">
          <div className="d-flex justify-content-end mb-2 position-relative z-1">
            <CustomButton
              icon={<i className="fa-solid fa-plus"></i>}
              color="secondary"
              onClick={() => setShowSpecializationModal(true)}
            >
              {t("dashboard.fieldsAndSpecialization.addSpecializationButton")}
            </CustomButton>
          </div>
          <ReusableDataTable
            title={t("dashboard.fields.specializationsTableTitle")}
            data={specializationData}
            columns={specializationColumns}
            lang="ar"
            currentPage={specializationCurrentPage}
            lastPage={specializationLastPage}
            setPage={setSpecializationPage}
            pageSize={specializationPageSize}
            setPageSize={setSpecializationPageSize}
            searchPlaceholder={t("dashboard.fields.search")}
            filter={false}
            isLoading={isSpecializationsLoading}
            searchQuery={specializationSearchQuery}
            onSearchChange={setSpecializationSearchQuery}
            searchDebounceMs={700}
            search={true}
          >
            <TablePagination
              currentPage={specializationPage}
              lastPage={specializationLastPage}
              onPageChange={setSpecializationPage}
              isLoading={isSpecializationsLoading}
            />
          </ReusableDataTable>
        </div>
      </div>

      <CategoryModal
        showModal={showCategoryModal}
        setShowModal={setShowCategoryModal}
        selectedCategory={selectedCategory}
      />

      <FiledsAndSpecialzationsModal
        showModal={showSpecializationModal}
        setShowModal={setShowSpecializationModal}
      />
      <EditFiledAndSpecializationModal
        showModal={showEditSpecializationModal}
        setShowModal={setShowEditSpecializationModal}
        selectedTarget={selectedSpecialization}
      />

      <ConfirmDeleteModal
        setShowDeleteModal={setShowDeleteModal}
        showDeleteModal={showDeleteModal}
        loading={isDeletingCategory || isDeletingSpecialization}
        onConfirm={handleDelete}
      />
    </section>
  );
};

export default FieldsAndSpecializations;
