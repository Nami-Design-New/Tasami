import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import ConfirmDeleteModal from "../../../ui/modals/ConfirmationDeleteModal";
import OperatingSectorsModal from "../../../ui/modals/OperatingSectorsModal";
import ReusableDataTable from "../../../ui/table/ReusableDataTable";
import StatisticsCard from "../../../ui/dash-board/cards/StatisticsCard";
import ChartCard from "../../../ui/dash-board/cards/ChartCard";

const columnHelper = createColumnHelper();
const statsData = [
  {
    label: "الأقاليم",
    value: 7, // Example number of regions
    icon: "fa-map", // Font Awesome icon for regions
    color: "#ffffff",
    bgColor: "#6c757d", // gray
  },
  {
    label: "القطاعات",
    value: 9, // Example number of sectors
    icon: "fa-industry", // Font Awesome icon for sectors
    color: "#ffffff",
    bgColor: "#17a2b8", // cyan
  },
  {
    label: "المدن",
    value: 15, // Example number of cities
    icon: "fa-city", // Font Awesome icon for cities
    color: "#ffffff",
    bgColor: "#007bff", // blue
  },
  {
    label: "المستخدمون",
    value: 120, // Example user count
    icon: "fa-user", // Font Awesome icon for users
    color: "#ffffff",
    bgColor: "#28a745", // green
  },
  {
    label: "الموظفون",
    value: 85, // Example employee count
    icon: "fa-users-cog", // Font Awesome icon for employees
    color: "#ffffff",
    bgColor: "#ffc107", // yellow
  },
];

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
      <ChartCard title="إحصائيات قطاعات التشغيل">
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
      <ReusableDataTable
        title="قطاعات التشغيل"
        data={data}
        columns={columns}
        filter={false}
        lang="ar"
        initialPageSize={10}
        searchPlaceholder=""
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
