import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import StatisticsCard from "../../../ui/dash-board/cards/StatisticsCard";
import ConfirmDeleteModal from "../../../ui/modals/ConfirmationDeleteModal";
import FiledsAndSpecialzationsModal from "../../../ui/modals/FiledsAndSpecialzationsModal";
import ReusableDataTable from "../../../ui/table/ReusableDataTable";
import ChartCard from "../../../ui/dash-board/cards/ChartCard";
const statsData = [
  {
    label: "المجالات",
    value: 12,
    icon: "fa-layer-group",
    color: "#ffffff",
    bgColor: "#20c997",
  },
  {
    label: "التخصصات",
    value: 30,
    icon: "fa-book-open",
    color: "#ffffff",
    bgColor: "#fd7e14",
  },
];

const columnHelper = createColumnHelper();
const FieldsAndSpecializations = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const data = useMemo(
    () => [
      {
        fields: "الانترنت و البرامج",
        specializations: "المواقع",

        actions: "",
      },
      {
        fields: "الانترنت و البرامج",
        specializations: "تطبيقات الاجهزه الذكيه",
        actions: "",
      },
      {
        fields: "الحاسب الالي",
        specializations: " استخدام الحاسب الالي ",
        actions: "",
      },
      {
        fields: "الحاسب الالي",
        specializations: " تجميع الحاسبات ",
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
      <div className="row">
        <div className="col-12 p-2">
          <ChartCard title={"احصائيات  المجالات والتخصصات"}>
            <div className="row">
              {statsData.map((item, index) => (
                <div
                  className="col-12 col-sm-6  col-md-4 col-lg-3 col-xxl-2 p-2"
                  key={index}
                >
                  <StatisticsCard item={item} />
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
        <div className="col-12 p-2">
          <ReusableDataTable
            title=" المجالات و التخصصات  "
            data={data}
            columns={columns}
            lang="ar"
            initialPageSize={10}
            searchPlaceholder=""
            filter={false}
          />
        </div>
      </div>
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
