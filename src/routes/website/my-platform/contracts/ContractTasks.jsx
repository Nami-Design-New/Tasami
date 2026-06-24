import { useOutletContext, useParams } from "react-router";
import useGetTasks from "../../../../hooks/website/MyWorks/tasks/useGetTasks";
import useGetCurrentTaskDistribution from "../../../../hooks/website/MyWorks/tasks/useGetCurrentTaskDistribution";
import useGetTaskDistribution from "../../../../hooks/website/MyWorks/tasks/useGetTaskDistribution";
import TaskCard from "../../../../ui/website/my-works/tasks/TaskCard";
import Loading from "../../../../ui/loading/Loading";
import { useTranslation } from "react-i18next";
import NoTasks from "../../../../ui/website/my-works/NoTasks";
import TaskDistributionCharts from "../../../../ui/website/my-works/tasks/TaskDistributionCharts";

export default function ContractTasks() {
  const { id } = useParams();
  const { t } = useTranslation();
  const { goalTasks, isLoading } = useGetTasks(id);
  const {
    taskDistribution,
    isLoading: isDistributionLoading,
    isError: isDistributionError,
  } = useGetTaskDistribution(id);
  const {
    currentTaskDistribution,
    isLoading: isCurrentDistributionLoading,
    isFetching: isCurrentDistributionFetching,
    isError: isCurrentDistributionError,
    refetch: refreshCurrentDistribution,
  } = useGetCurrentTaskDistribution(id);
  const { user } = useOutletContext();

  // Handle loading state
  if (isLoading || !goalTasks) {
    return <Loading />;
  }

  // Handle empty state safely
  if (!goalTasks?.data || goalTasks.data.length === 0) {
    return <NoTasks noActions={true} />;
  }

  return (
    <section className="tasks-page">
      {/* Info Section */}
      <div className="info-grid">
        <div className="info-box flex-grow-1">
          <h4 className="label">{t("works.myTasks.startExecution")}</h4>{" "}
          <p className="value">
            {goalTasks["additional-data"]?.start_of_execution || "---"}
          </p>
        </div>
        <div className="info-box flex-grow-1">
          <h4 className="label">{t("works.myTasks.endExecution")}</h4>
          <p className="value">
            {goalTasks["additional-data"]?.end_of_execution || "---"}
          </p>
        </div>
        <div className="info-box flex-grow-1">
          <h4 className="label">{t("works.myTasks.executionRate")}</h4>
          <p className="value">
            {/* {`${goalTasks["additional-data"]?.execution_percentage || "---"}%`} */}
            {goalTasks["additional-data"]?.execution_percentage} %
          </p>
        </div>
      </div>

      {/* Tasks Section */}
      <div className="execution-tasks">
        <div className="tasks-header">
          <h1>{t("works.myTasks.title")}</h1>
        </div>
        <div className="tasks-list">
          {goalTasks.data.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              user={user}
              isDragable={false}
              // isReadOnly
              detailsPath={`/my-contracts/${id}/tasks/${task.id}`}
            />
          ))}
        </div>
      </div>

      <TaskDistributionCharts
        currentDistribution={currentTaskDistribution}
        optimalDistribution={taskDistribution}
        isCurrentLoading={isCurrentDistributionLoading}
        isCurrentRefreshing={isCurrentDistributionFetching}
        isCurrentError={isCurrentDistributionError}
        onRefreshCurrent={refreshCurrentDistribution}
        isOptimalLoading={isDistributionLoading}
        isOptimalError={isDistributionError}
      />
    </section>
  );
}
