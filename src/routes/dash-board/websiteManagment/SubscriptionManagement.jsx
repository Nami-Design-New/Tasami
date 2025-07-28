import { useMemo, useState } from "react";
import CustomButton from "../../../ui/CustomButton";
import PageHeader from "../../../ui/PageHeader";
import ReusableDataTable from "../../../ui/table/ReusableDataTable";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();

export default function SubscriptionManagement() {
  const [showModal, setShowModal] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState();

  const [isEdit, setIsEdit] = useState(false);
  const data = useMemo(
    () => [
      {
        id: "1",
        classification: "تنمية معرفية",
      },
      {
        id: "2",
        classification: "مهارات التفكير الإبداعي",
      },
      {
        id: "3",
        classification: "التخطيط الشخصي",
      },
      {
        id: "4",
        classification: "الذكاء العاطفي",
      },
      {
        id: "5",
        classification: "إدارة الوقت",
      },
      {
        id: "6",
        classification: "بناء فرق العمل",
      },
      {
        id: "7",
        classification: "حل المشكلات واتخاذ القرار",
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("classification", {
        header: " تصنيف المهمة ",
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
    </section>
  );
}
