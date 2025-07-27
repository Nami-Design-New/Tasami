import { useMemo, useState } from "react";
import PageHeader from "../../PageHeader";
import ReusableDataTable from "../../table/ReusableDataTable";
import { createColumnHelper } from "@tanstack/react-table";
import { Link } from "react-router";
import ViolationsEditModal from "../../../routes/dash-board/websiteManagment/ViolationsEditModal";
import CustomButton from "../../CustomButton";

export default function ViolationsManagment() {
  const columnHelper = createColumnHelper();
  const [showModal, setShowModal] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState();
  const data = useMemo(
    () => [
      {
        violations:
          " معلومات زائفة، أو موضوعات ووسائط محظورة (دينية أو أمنية أو سياسية أو جنسية)  ",
        actions: "",
      },
      {
        violations: " ترويج لمواد غير مصرحة أو ممارسات مضرة أو لا أخلاقية ",
        actions: "",
      },
      {
        violations: "استخدام عبارات مهينة أو عنصرية أو خادشة",
        actions: "",
      },
      {
        violations:
          " تعدي علي خصوصيات الغير أو تقديم محتوي محمي بحقوق الناشرين وأصحاب العلامات التجارية أو انتحال شخصية ",
        actions: "",
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("violations", {
        header: " انواع المخالفات ",
        cell: (info) => info.getValue(),
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
          اضف مخلفة
        </CustomButton>
      </div>
      <div className="row">
        <div className="col-12">
          <ReusableDataTable
            title="انواع المخالفات"
            data={data}
            columns={columns}
            filter={false}
            searchPlaceholder="البحث في المخالفات  ..."
            initialPageSize={10}
          />
        </div>
      </div>
      <ViolationsEditModal
        showModal={showModal}
        setShowModal={setShowModal}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
      />
    </section>
  );
}
