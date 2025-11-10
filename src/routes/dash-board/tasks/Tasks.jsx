import { useState } from "react";
import { useTranslation } from "react-i18next";
import StatisticsCard from "../../../ui/dash-board/cards/StatisticsCard";
import PageHeader from "../../../ui/PageHeader";
import TasksTable from "./TasksTable";
import AddNewTask from "./AddNewTask";
import CustomButton from "../../../ui/CustomButton";
import ChartCard from "../../../ui/dash-board/cards/ChartCard";

const Tasks = () => {
  const { t } = useTranslation();

  const statsData = [
    {
      label: t("dashboard.tasks.totalTasks"),
      value: 16,
      icon: "fa-tasks",
      color: "#007bff",
      bgColor: "#dceeff",
    },
    {
      label: t("dashboard.tasks.completedTasks"),
      value: 8,
      icon: "fa-check-circle",
      color: "#28a745",
      bgColor: "#d4edda",
    },
    {
      label: t("dashboard.tasks.pendingTasks"),
      value: 8,
      icon: "fa-times-circle",
      color: "#dc3545",
      bgColor: "#f8d7da",
    },
    {
      label: t("dashboard.tasks.completionRate"),
      value: "50%",
      icon: "fa-percent",
      color: "#17a2b8",
      bgColor: "#d1ecf1",
    },
    {
      label: t("dashboard.tasks.monthlyCompletion"),
      value: 4,
      icon: "fa-calendar-check",
      color: "#6f42c1",
      bgColor: "#ede6f9",
    },
    {
      label: t("dashboard.tasks.avgCompletionTime"),
      value: "3 " + t("dashboard.tasks.days"),
      icon: "fa-clock",
      color: "#ffc107",
      bgColor: "#fff3cd",
    },
  ];

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
            {t("dashboard.tasks.newTaskForm")}
          </CustomButton>
        </div>
        <div className="row">
          <ChartCard title={t("dashboard.tasks.generalTaskStats")}>
            <div className="row">
              {statsData.map((item, index) => (
                <div
                  className="col-12 col-sm-6 col-md-4 col-lg-3 col-xxl-2 p-2"
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
        title={t("dashboard.tasks.executiveTask")}
      />
    </>
  );
};

export default Tasks;
