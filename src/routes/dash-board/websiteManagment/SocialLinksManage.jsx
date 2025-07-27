import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import PageHeader from "../../../ui/PageHeader";
import ReusableDataTable from "../../../ui/table/ReusableDataTable";
import ConfirmDeleteModal from "../../../ui/modals/ConfirmationDeleteModal";
import CustomButton from "../../../ui/CustomButton";
import SocialLinksModal from "../../../ui/dash-board/websiteManagment/SocialLinksModal";

const columnHelper = createColumnHelper();

export default function SocialLinksManage() {
  const [showModal, setShowModal] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState();

  const [isEdit, setIsEdit] = useState(false);
  const data = useMemo(
    () => [
      {
        sociallinks: "https://facebook.com/exampleuser",
        logo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Facebook_icon.svg",
        actions: "",
      },
      {
        sociallinks: "https://twitter.com/exampleuser",
        logo: "https://upload.wikimedia.org/wikipedia/en/6/60/Twitter_Logo_as_of_2021.svg",
        actions: "",
      },
      {
        sociallinks: "https://instagram.com/exampleuser",
        logo: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg",
        actions: "",
      },
      {
        sociallinks: "https://linkedin.com/in/exampleuser",
        logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
        actions: "",
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("sociallinks", {
        header: " الرابط ",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("logo", {
        header: " الصوره ",
        cell: (info) => (
          <img
            style={{ width: "2rem", height: "2rem" }}
            src={info.getValue()}
          />
        ),
      }),

      columnHelper.accessor("actions", {
        header: " الاجراءات",

        cell: () => (
          <div className="table__actions">
            <i
              className="fa-solid fa-edit  table__actions--edit"
              onClick={() => {
                setIsEdit(true), setShowModal(true);
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
          اضف رابط
        </CustomButton>
      </div>
      <ReusableDataTable
        title="روابط التواصل الاجتماعي"
        data={data}
        columns={columns}
        filter={false}
        searchPlaceholder="البحث في الروابط  ..."
        initialPageSize={10}
      />
      <SocialLinksModal
        showModal={showModal}
        setShowModal={setShowModal}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
      />
      <ConfirmDeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
      />
    </section>
  );
}
