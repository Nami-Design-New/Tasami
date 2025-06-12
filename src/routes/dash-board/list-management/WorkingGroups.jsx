import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import ReusableDataTable from "../../../ui/ReusableDataTable";
import { Link } from "react-router";
import EditWorkGroupModal from "../../../ui/modals/EditWorkGroupModal";
import ConfirmDeleteModal from "../../../ui/modals/ConfirmationDeleteModal";

const columnHelper = createColumnHelper();

const WorkingGroups = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const data = useMemo(
    () => [
      {
        groupNumber: "GN-000001",
        region: "014-المنطقة الوسطى",
        location: "المملكة العربية السعودية",
        city: "الرياض-001",
        createDate: "25-Apr-2020",
        employeeCount: "50",
        supervisorsCount: "7",
        completedTasks: "70",
        completedTasksPercentage: "80%",
        uncompletedTasks: "20",
        uncompletedTasksPercentage: "22%",
        actions: "",
      },
      {
        groupNumber: "GN-000001",
        region: "014-المنطقة الوسطى",
        location: "المملكة العربية السعودية",
        city: "الرياض-001",
        createDate: "25-Apr-2020",
        employeeCount: "50",
        supervisorsCount: "7",
        completedTasks: "70",
        completedTasksPercentage: "80%",
        uncompletedTasks: "20",
        uncompletedTasksPercentage: "22%",
        actions: "",
      },
      {
        groupNumber: "GN-000001",
        region: "014-المنطقة الوسطى",
        location: "المملكة العربية السعودية",
        city: "الرياض-001",
        createDate: "25-Apr-2020",
        employeeCount: "50",
        supervisorsCount: "7",
        completedTasks: "70",
        completedTasksPercentage: "80%",
        uncompletedTasks: "20",
        uncompletedTasksPercentage: "22%",
        actions: "",
      },
      {
        groupNumber: "GN-000001",
        region: "014-المنطقة الوسطى",
        location: "المملكة العربية السعودية",
        city: "الرياض-001",
        createDate: "25-Apr-2020",
        employeeCount: "50",
        supervisorsCount: "7",
        completedTasks: "70",
        completedTasksPercentage: "80%",
        uncompletedTasks: "20",
        uncompletedTasksPercentage: "22%",
        actions: "",
      },
      {
        groupNumber: "GN-000001",
        region: "014-المنطقة الوسطى",
        location: "المملكة العربية السعودية",
        city: "الرياض-001",
        createDate: "25-Apr-2020",
        employeeCount: "50",
        supervisorsCount: "7",
        completedTasks: "70",
        completedTasksPercentage: "80%",
        uncompletedTasks: "20",
        uncompletedTasksPercentage: "22%",
        actions: "",
      },
      {
        groupNumber: "GN-000001",
        region: "014-المنطقة الوسطى",
        location: "المملكة العربية السعودية",
        city: "الرياض-001",
        createDate: "25-Apr-2020",
        employeeCount: "50",
        supervisorsCount: "7",
        completedTasks: "70",
        completedTasksPercentage: "80%",
        uncompletedTasks: "20",
        uncompletedTasksPercentage: "22%",
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
            to={`/dashboard/woking-group/${info.getValue()}`}
            className="link-styls"
            style={{ textDecoration: "underline" }}
          >
            {info.getValue()}
          </Link>
        ),
        enableSorting: false,
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
      columnHelper.accessor("employeeCount", {
        header: "عدد الموظفين",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("supervisorsCount", {
        header: "عدد المشرفين",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("completedTasks", {
        header: " المهام المنجزة ",
        cell: (info) => info.getValue(),
      }),

      columnHelper.accessor("completedTasksPercentage", {
        header: " نسبه المهام المنجزة ",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("uncompletedTasks", {
        header: "المهام غير المنجزة ",
        cell: (info) => info.getValue(),
      }),

      columnHelper.accessor("uncompletedTasksPercentage", {
        header: " نسبه المهام غير المنجزة ",
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
        title="مجموعات العمل"
        data={data}
        columns={columns}
        lang="ar"
        initialPageSize={10}
        filter={false}
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
