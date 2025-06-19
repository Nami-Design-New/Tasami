import { useState } from "react";
import StatisticsCard from "../../../ui/dash-board/cards/StatisticsCard";
import PageHeader from "../../../ui/PageHeader";
import SupervisoryTasks from "./SupervisoryTasks";
import AddNewTask from "./AddNewTask";
const statsData = [
  {
    label: "المهام",
    value: 16,
    icon: "fa-tasks",
    color: "#007bff", // blue
    bgColor: "#dceeff",
  },
  {
    label: "المهام المكتملة",
    value: 8,
    icon: "fa-check-circle",
    color: "#28a745", // green
    bgColor: "#d4edda",
  },
  {
    label: "المهام غير المكتملة",
    value: 8,
    icon: "fa-times-circle",
    color: "#dc3545", // red
    bgColor: "#f8d7da",
  },
  {
    label: "نسبة الإنجاز",
    value: "50%",
    icon: "fa-percent",
    color: "#17a2b8", // cyan
    bgColor: "#d1ecf1",
  },
  {
    label: "معدل الإكمال الشهري",
    value: 4,
    icon: "fa-calendar-check",
    color: "#6f42c1", // purple
    bgColor: "#ede6f9",
  },
  {
    label: "متوسط مدة الإنجاز",
    value: "3 أيام",
    icon: "fa-clock",
    color: "#ffc107", // yellow
    bgColor: "#fff3cd",
  },
];

const Tasks = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <section>
        <div className="p-2 d-flex align-items-center justify-content-between">
          <PageHeader />
          <button
            className="button button--add"
            onClick={() => setShowModal(true)}
          >
            <i className="fa-solid fa-plus"></i> <span> نموذج عمل جديد </span>
          </button>
        </div>
        <div className="row">
          <StatisticsCard data={statsData} title={"مؤشرات عامه للمهام "} />
          <div className="col-12 p-2 p-md-0">
            <SupervisoryTasks />
          </div>
        </div>
      </section>
      <AddNewTask showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default Tasks;
