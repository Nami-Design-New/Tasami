import { useState } from "react";
import StatisticsCard from "../../../ui/dash-board/cards/StatisticsCard";
import PageHeader from "../../../ui/PageHeader";
import TasksTable from "./TasksTable";
import AddNewTask from "./AddNewTask";
import CustomButton from "../../../ui/CustomButton";
import ChartCard from "../../../ui/dash-board/cards/ChartCard";
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
    color: "#ffc107",
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
          <CustomButton
            size="large"
            color="secondary"
            icon={<i className="fa-solid fa-plus"></i>}
            onClick={() => setShowModal(true)}
          >
            نموذج عمل جديد
          </CustomButton>
        </div>
        <div className="row">
          <ChartCard title={"مؤشرات عامه للمهام "}>
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
          <div className="col-12 p-2 p-md-0">
            <TasksTable />
          </div>
        </div>
      </section>
      <AddNewTask
        showModal={showModal}
        setShowModal={setShowModal}
        title="مهمة تنفيذية "
      />
    </>
  );
};

export default Tasks;
