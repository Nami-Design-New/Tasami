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

const columnHelper = createColumnHelper();
export default function Banners() {
  const [showDeleteModal, setShowDeleteModal] = useState();
  const [showAddBanner, setShowAddBanner] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [showModal, setShowModal] = useState();

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

  const data = useMemo(
    () => [
      {
        id: "1",
        image: "/images/dashboard/silver-package.svg",
      },
      {
        id: "2",
        image: "/images/dashboard/platinum-package.svg",
      },
      {
        id: "3",
        image: "/images/dashboard/golden-package.svg",
      },
    ],
    []
  );
  const columns = useMemo(
    () => [
      columnHelper.accessor("image", {
        header: " الافتة ",
        cell: (info) => <img width={40} height={40} src={info.getValue()} />,
      }),

      columnHelper.display({
        id: "id",
        header: " الاجراءات",

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
    []
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
          اضف لافتة
        </CustomButton>
      </div>{" "}
      <ReusableDataTable
        title="الافتات الاعلانية"
        data={imageBanner || []}
        columns={columns}
        filter={false}
        searchPlaceholder="البحث في الافتات  ..."
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
