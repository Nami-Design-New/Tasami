import { useMemo, useState } from "react";
import CustomButton from "../../../ui/CustomButton";
import PageHeader from "../../../ui/PageHeader";
import ReusableDataTable from "../../../ui/table/ReusableDataTable";
import { createColumnHelper } from "@tanstack/react-table";
import ConfirmDeleteModal from "../../../ui/modals/ConfirmationDeleteModal";
import AddNewBannerModal from "../../../ui/dash-board/websiteManagment/AddNewBannerModal";

const columnHelper = createColumnHelper();
export default function Banners() {
  const [showDeleteModal, setShowDeleteModal] = useState();

  const [showAddBanner, setShowAddBanner] = useState(false);

  const [isEdit, setIsEdit] = useState(false);
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
        id: "actions",
        header: " الاجراءات",

        cell: () => (
          <div className="table__actions">
            <i
              className="fa-solid fa-edit  table__actions--edit"
              onClick={() => {
                setIsEdit(true), setShowAddBanner(true);
              }}
            ></i>
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
        data={data}
        columns={columns}
        filter={false}
        searchPlaceholder="البحث في الافتات  ..."
        initialPageSize={10}
      />
      <AddNewBannerModal
        setShowModal={setShowAddBanner}
        showModal={showAddBanner}
        isEdit={isEdit}
      />
      <ConfirmDeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
      />
    </section>
  );
}
