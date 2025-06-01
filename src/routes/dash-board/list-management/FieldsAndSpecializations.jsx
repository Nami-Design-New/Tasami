import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import SelectField from "../../../ui/forms/SelectField";
import ConfirmDeleteModal from "../../../ui/modals/ConfirmationDeleteModal";
import ReusableDataTable from "../../../ui/ReusableDataTable";
import FiledsAndSpecialzationsModal from "../../../ui/modals/FiledsAndSpecialzationsModal";

const columnHelper = createColumnHelper();
const FieldsAndSpecializations = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const data = useMemo(
    () => [
      {
        fields: "الانترنت و البرامج",
        specializations: [
          { value: 1, name: "المواقع" },
          { value: 2, name: "تطبيقات الاجهزه الذكيه" },
          { value: 3, name: "برامج الحاسوب" },
        ],
        actions: "",
      },
      {
        fields: "الحاسب الالي",
        specializations: [
          { value: 1, name: " استخدام الحاسب الالي " },
          { value: 2, name: " تجميع الحاسبات " },
          { value: 3, name: " صيانه الحاسبات " },
        ],
        actions: "",
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("fields", {
        header: " المجالات  ",
        cell: (info) => info.getValue(),

        enableSorting: false,
      }),
      columnHelper.accessor("specializations", {
        header: " التخصصات ",
        cell: (info) => (
          <SelectField
            disableFiledValue="اختر التخصص"
            options={info.getValue()}
          />
        ),
      }),

      columnHelper.accessor("actions", {
        header: " الاجراءات",

        cell: () => (
          <div className="table__actions">
            {/* <i
                className="fa-solid fa-eye  table__actions--details"
                onClick={() => alert("data")}
              ></i> */}
            <i
              className="fa-solid fa-edit  table__actions--edit"
              onClick={() => setShowModal(true)}
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
      <ReusableDataTable
        title=" المجالات و التخصصات  "
        data={data}
        columns={columns}
        lang="ar"
        initialPageSize={10}
      />
      <FiledsAndSpecialzationsModal
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <ConfirmDeleteModal
        setShowDeleteModal={setShowDeleteModal}
        showDeleteModal={showDeleteModal}
      />
    </section>
  );
};

export default FieldsAndSpecializations;
