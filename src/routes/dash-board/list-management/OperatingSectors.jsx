import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import ConfirmDeleteModal from "../../../ui/modals/ConfirmationDeleteModal";
import OperatingSectorsModal from "../../../ui/modals/OperatingSectorsModal";
import ReusableDataTable from "../../../ui/ReusableDataTable";

const columnHelper = createColumnHelper();

const OperatingSectors = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const data = useMemo(
    () => [
      {
        region: "بدون",
        regionNumber: "99",
        location: "",
        locationNumber: "",
        city: "",
        cityNumber: "",
        actions: "",
      },
      {
        region: "غير محدد",
        regionNumber: "00",
        location: "غير محدد",
        locationNumber: "00",
        city: "غير محدد",
        cityNumber: "00",
        actions: "",
      },
      {
        region: "الشرق الاوسط",
        regionNumber: "01",
        location: "المملكه العربيه السعوديه",
        locationNumber: "014",
        city: "الرياض",
        cityNumber: "01",
        actions: "",
      },
      {
        region: "الشرق الاوسط",
        regionNumber: "01",
        location: "المملكه العربيه السعوديه",
        locationNumber: "014",
        city: "جده",
        cityNumber: "02",
        actions: "",
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("region", {
        header: " الاقليم ",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("regionNumber", {
        header: "رقم الاقليم ",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("location", {
        header: " القطاع ",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("locationNumber", {
        header: "رقم القطاع ",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("city", {
        header: " المدينه ",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("cityNumber", {
        header: "رقم المدينه ",
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
        title="قطاعات التشغيل"
        data={data}
        columns={columns}
        filter={false}
        lang="ar"
        initialPageSize={10}
      />
      <OperatingSectorsModal
        setShowModal={setShowModal}
        showModal={showModal}
      />
      <ConfirmDeleteModal
        setShowDeleteModal={setShowDeleteModal}
        showDeleteModal={showDeleteModal}
      />
    </section>
  );
};

export default OperatingSectors;
