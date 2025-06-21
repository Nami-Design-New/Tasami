import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import ReusableDataTable from "../../../ui/table/ReusableDataTable";
import { Link } from "react-router";
import EditWorkGroupModal from "../../../ui/modals/EditWorkGroupModal";
import ConfirmDeleteModal from "../../../ui/modals/ConfirmationDeleteModal";
import StatisticsCard from "../../../ui/dash-board/cards/StatisticsCard";
import ChartCard from "../../../ui/dash-board/cards/ChartCard";

const columnHelper = createColumnHelper();

const statsData = [
  {
    label: "المجموعات",
    value: 25,
    icon: "fa-users", // Font Awesome icon
    color: "#ffffff", // Icon color
    bgColor: "#007bff", // Background color
  },
  {
    label: "التنفيذيون",
    value: 10,
    icon: "fa-user-tie",
    color: "#ffffff",
    bgColor: "#28a745",
  },
  {
    label: "القاده",
    value: 15,
    icon: "fa-chess-king",
    color: "#ffffff",
    bgColor: "#ffc107",
  },
  {
    label: "المدراء",
    value: 20,
    icon: "fa-briefcase",
    color: "#ffffff",
    bgColor: "#17a2b8",
  },
  {
    label: "المشرفين",
    value: 18,
    icon: "fa-user-check",
    color: "#ffffff",
    bgColor: "#6f42c1",
  },
  {
    label: "الموظفين",
    value: 50,
    icon: "fa-id-badge",
    color: "#ffffff",
    bgColor: "#dc3545",
  },
];

const WorkingGroups = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const data = useMemo(
    () => [
      {
        groupNumber: "GN-000001",
        groupClassifications: "تشغيليه",
        region: "014-المنطقة الوسطى",
        location: "المملكة العربية السعودية",
        city: "الرياض-001",
        createDate: "25-Apr-2020",
        employeeCount: "50",
        supervisorsCount: "7",
        excutives: "3",
        leaders: "4",
        managers: "20",
        actions: "",
      },
      {
        groupNumber: "GN-000001",
        groupClassifications: "تشغيليه",
        region: "014-المنطقة الوسطى",
        location: "المملكة العربية السعودية",
        city: "الرياض-001",
        createDate: "25-Apr-2020",
        excutives: "3",
        leaders: "4",
        managers: "20",
        supervisorsCount: "7",
        employeeCount: "50",
        actions: "",
      },
      {
        groupNumber: "GN-000001",
        groupClassifications: "إدارية",
        region: "014-المنطقة الوسطى",
        location: "المملكة العربية السعودية",
        city: "الرياض-001",
        createDate: "25-Apr-2020",
        employeeCount: "50",
        supervisorsCount: "7",
        excutives: "3",
        leaders: "4",
        managers: "20",
        actions: "",
      },
      {
        groupNumber: "GN-000001",
        groupClassifications: "تشغيليه",
        region: "014-المنطقة الوسطى",
        location: "المملكة العربية السعودية",
        city: "الرياض-001",
        createDate: "25-Apr-2020",
        employeeCount: "50",
        supervisorsCount: "7",
        excutives: "3",
        leaders: "4",
        managers: "20",
        actions: "",
      },
      {
        groupNumber: "GN-000001",
        groupClassifications: "إدارية",

        region: "014-المنطقة الوسطى",
        location: "المملكة العربية السعودية",
        city: "الرياض-001",
        createDate: "25-Apr-2020",
        employeeCount: "50",
        supervisorsCount: "7",
        excutives: "3",
        leaders: "4",
        managers: "20",

        actions: "",
      },
      {
        groupNumber: "GN-000001",
        groupClassifications: "إدارية",

        region: "014-المنطقة الوسطى",
        location: "المملكة العربية السعودية",
        city: "الرياض-001",
        createDate: "25-Apr-2020",
        employeeCount: "50",
        supervisorsCount: "7",
        excutives: "3",
        leaders: "4",
        managers: "20",

        actions: "",
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("groupNumber", {
        header: "رقم المجموعه",
        cell: (info) => (
          <Link
            to={`/dashboard/working-group/${info.getValue()}`}
            className="link-styles"
            style={{ textDecoration: "underline" }}
          >
            {info.getValue()}
          </Link>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("groupClassifications", {
        header: " تصنيف المجموعه ",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("region", {
        header: " الاقليم ",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("location", {
        header: " القطاع ",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("city", {
        header: " المدينه ",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("createDate", {
        header: "تاريخ الانشاء",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("excutives", {
        header: "عدد التنفيذين",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("leaders", {
        header: "عدد القادة",
        cell: (info) => info.getValue(),
      }),

      columnHelper.accessor("managers", {
        header: "عدد المدراء",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("supervisorsCount", {
        header: "عدد المشرفين",
        cell: (info) => info.getValue(),
      }),

      columnHelper.accessor("employeeCount", {
        header: "عدد الموظفين",
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
      {" "}
      <ChartCard title={"احصائيات مجموعات العمل"}>
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
        title="مجموعات العمل"
        data={data}
        columns={columns}
        lang="ar"
        initialPageSize={10}
        filter={false}
        searchPlaceholder="البحث في مجموعات العمل ..."
      />
      <EditWorkGroupModal setShowModal={setShowModal} showModal={showModal} />
      <ConfirmDeleteModal
        setShowDeleteModal={setShowDeleteModal}
        showDeleteModal={showDeleteModal}
      />
    </section>
  );
};

export default WorkingGroups;
