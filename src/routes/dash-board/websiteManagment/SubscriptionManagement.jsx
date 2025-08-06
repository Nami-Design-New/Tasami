import { useMemo, useState } from "react";
import CustomButton from "../../../ui/CustomButton";
import PageHeader from "../../../ui/PageHeader";
import ReusableDataTable from "../../../ui/table/ReusableDataTable";
import { createColumnHelper } from "@tanstack/react-table";
import AddNewSubscriptoinsModal from "../../../ui/dash-board/websiteManagment/AddNewSubscriptoinsModal";
import DetailsSubscriptionsModal from "../../../ui/dash-board/websiteManagment/DetailsSubscriptionsModal";
import ConfirmDeleteModal from "../../../ui/modals/ConfirmationDeleteModal";

const columnHelper = createColumnHelper();

export default function SubscriptionManagement() {
  const [showDetails, setShowDetails] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState();

  const [showAddSubscriptions, setShowAddSubscriptions] = useState(false);

  const [isEdit, setIsEdit] = useState(false);

  const data = useMemo(
    () => [
      {
        id: "1",
        image: "/images/dashboard/silver-package.svg",
        classification: "اساسي",
      },
      {
        id: "2",
        image: "/images/dashboard/platinum-package.svg",
        classification: "مميز",
      },
      {
        id: "3",
        image: "/images/dashboard/golden-package.svg",
        classification: "الرواد",
      },
    ],
    []
  );
  const columns = useMemo(
    () => [
      columnHelper.accessor("image", {
        header: " الشعار ",
        cell: (info) => <img width={40} height={40} src={info.getValue()} />,
      }),
      columnHelper.accessor("classification", {
        header: " الاشتراك ",
        cell: (info) => info.getValue(),
      }),

      columnHelper.display({
        id: "actions",
        header: " الاجراءات",

        cell: () => (
          <div className="table__actions">
            <i
              className="fa-solid fa-edit  table__actions--edit"
              onClick={() => {
                setIsEdit(true), setShowAddSubscriptions(true);
              }}
            ></i>
            <i
              className="fa-solid fa-trash  table__actions--delete"
              onClick={() => setShowDeleteModal(true)}
            ></i>
            <i
              className="fa-solid fa-eye  table__actions--details"
              onClick={() => setShowDetails(true)}
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
            setShowAddSubscriptions(true);
            setIsEdit(false);
          }}
        >
          اضف اشتراك
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
      <AddNewSubscriptoinsModal
        setShowModal={setShowAddSubscriptions}
        showModal={showAddSubscriptions}
        isEdit={isEdit}
      />
      <ConfirmDeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
      />
      <DetailsSubscriptionsModal
        setShowModal={setShowDetails}
        showModal={showDetails}
      />
    </section>
  );
}
