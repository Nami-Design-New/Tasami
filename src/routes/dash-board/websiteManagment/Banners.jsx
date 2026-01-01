import { useMemo, useState } from "react";
import CustomButton from "../../../ui/CustomButton";
import PageHeader from "../../../ui/PageHeader";
import ReusableDataTable from "../../../ui/table/ReusableDataTable";
import { createColumnHelper } from "@tanstack/react-table";
import ConfirmDeleteModal from "../../../ui/modals/ConfirmationDeleteModal";
import AddNewBannerModal from "../../../ui/dash-board/websiteManagment/AddNewBannerModal";
import { useQueryClient } from "@tanstack/react-query";
import { PAGE_SIZE } from "../../../utils/constants";
import useGetImageBanner from "../../../hooks/dashboard/websiteManagment/imageBanners/useGetImageBanner";
import useDeleteImageBanner from "../../../hooks/dashboard/websiteManagment/imageBanners/useDeleteImageBanner";
import TablePagination from "../../../ui/table/TablePagentaion";
import { useTranslation } from "react-i18next";

const columnHelper = createColumnHelper();
export default function Banners() {
  const { t } = useTranslation();
  const [showDeleteModal, setShowDeleteModal] = useState();
  const [showAddBanner, setShowAddBanner] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const queryClient = useQueryClient();

  // fetch data
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const { imageBanner, currentPage, lastPage, isLoading } = useGetImageBanner(
    "",
    page,
    pageSize
  );

  // delete row
  const [deletionTarget, setDeletionTarget] = useState(null);
  const [updateTarget, setUpdateTarget] = useState(null);
  const { deleteImageBanner, isDeletingImageBanner } = useDeleteImageBanner();

  const handleDeleteImageBanner = (id) => {
    deleteImageBanner(id, {
      onSuccess: () => {
        setShowDeleteModal(false);
        setDeletionTarget(null);
        queryClient.invalidateQueries({
          queryKey: ["image-banners"],
        });
      },
    });
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor("image", {
        header: t("dashboard.banner.tableHeader"),
        cell: (info) => <img width={40} height={40} src={info.getValue()} />,
      }),

      columnHelper.display({
        id: "id",
        header: t("dashboard.banner.actions"),

        cell: (info) => (
          <div className="table__actions">
            <i
              className="fa-solid fa-edit  table__actions--edit"
              onClick={() => {
                setIsEdit(true), setShowAddBanner(true);
                setUpdateTarget(info?.row.original.id);
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
      {" "}
      <div className="p-2 d-flex align-items-center justify-content-between">
        <PageHeader />{" "}
        <CustomButton
          icon={<i className="fa-solid fa-plus"></i>}
          color="secondary"
          onClick={() => {
            setShowAddBanner(true);
            setIsEdit(false);
          }}
        >
          {t("dashboard.banner.addBanner")}
        </CustomButton>
      </div>{" "}
      <ReusableDataTable
        title={t("dashboard.banner.tableTitle")}
        data={imageBanner || []}
        columns={columns}
        filter={false}
        searchPlaceholder={t("dashboard.banner.searchPlaceholder")}
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
      <AddNewBannerModal
        setShowModal={setShowAddBanner}
        showModal={showAddBanner}
        isEdit={isEdit}
        updateTarget={updateTarget}
        imageBanner={imageBanner}
      />
      <ConfirmDeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        loading={isDeletingImageBanner}
        onConfirm={() => handleDeleteImageBanner(deletionTarget)}
      />
    </section>
  );
}
