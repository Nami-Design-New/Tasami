import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import ConfirmDeleteModal from "../../../ui/modals/ConfirmationDeleteModal";
import SubjectModal from "../../../ui/modals/SubjectModal";
import ReusableDataTable from "../../../ui/ReusableDataTable";

const columnHelper = createColumnHelper();
const AdministrativeSystems = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const data = useMemo(
    () => [
      {
        administrativeSystem: "داخلي",
        subjects: "انشاء حساب",
        actions: "",
      },
      {
        administrativeSystem: "خارجي",
        subjects: "استفسار",
        actions: "",
      },
      {
        administrativeSystem: "خارجي",
        subjects: "   ابلاغ عن مخالفة ",
        actions: "",
      },
      {
        administrativeSystem: "داخلي",
        subjects: "استفسار",
        actions: "",
      },
      {
        administrativeSystem: "داخلي",
        subjects: "   ابلاغ عن مخالفة ",
        actions: "",
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("administrativeSystem", {
        header: " النظام الاداري  ",
        cell: (info) => info.getValue(),

        enableSorting: false,
      }),
      columnHelper.accessor("subjects", {
        header: " المواضيع ",
        cell: (info) => info.getValue(),
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
        title="  الانظمه الادارية  "
        data={data}
        columns={columns}
        lang="ar"
        initialPageSize={10}
        searchPlaceholder=""
        filter={false}
      />
      <SubjectModal
        showModal={showModal}
        setShowModal={setShowModal}
        isEdit={true}
      />
      <ConfirmDeleteModal
        setShowDeleteModal={setShowDeleteModal}
        showDeleteModal={showDeleteModal}
      />
    </section>
  );
};

export default AdministrativeSystems;
