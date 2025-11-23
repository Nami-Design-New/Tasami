import { useState } from "react";
import { useTranslation } from "react-i18next";
import StatisticsCard from "../../../ui/dash-board/cards/StatisticsCard";
import PageHeader from "../../../ui/PageHeader";
import TasksTable from "./TasksTable";
import CustomButton from "../../../ui/CustomButton";
import ChartCard from "../../../ui/dash-board/cards/ChartCard";
import AddNewTask from "./AddNewTaskModal";
import { PAGE_SIZE } from "../../../utils/constants";
import useGetTasksDashboard from "../../../hooks/dashboard/tasks/useGetTasksDashboard";

const Tasks = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const { tasks, currentPage, lastPage, isLoading } = useGetTasksDashboard(
    "",
    page,
    PAGE_SIZE
  );
  const statsData = [
    {
      label: t("dashboard.tasks.totalTasks"),
      value: `${tasks?.total_count || ''}`,
      icon: "fa-tasks",
      color: "#007bff",
      bgColor: "#dceeff",
    },
    {
      label: t("dashboard.tasks.completedTasks"),
      value: `${tasks?.completed_count || ''}`,
      icon: "fa-check-circle",
      color: "#28a745",
      bgColor: "#d4edda",
    },
    {
      label: t("dashboard.tasks.pendingTasks"),
      value: `${tasks?.not_completed_count || ''}`,
      icon: "fa-times-circle",
      color: "#dc3545",
      bgColor: "#f8d7da",
    },
    {
      label: t("dashboard.tasks.completionRate"),
      value: `${tasks?.completion_rate || ''}%`,
      icon: "fa-percent",
      color: "#17a2b8",
      bgColor: "#d1ecf1",
    },
    {
      label: t("dashboard.tasks.monthlyCompletion"),
      value: `${tasks?.monthly_completion_rate || ''}`,
      icon: "fa-calendar-check",
      color: "#6f42c1",
      bgColor: "#ede6f9",
    },
    {
      label: t("dashboard.tasks.avgCompletionTime"),
      value: `${tasks?.average_completion_time || ''}` + t("dashboard.tasks.days"),
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
            <TasksTable
              page={page}
              setPage={setPage}
              pageSize={pageSize}
              setPageSize={setPageSize}
              tasks={tasks}
              currentPage={currentPage}
              lastPage={lastPage}
              isLoading={isLoading}
            />
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
