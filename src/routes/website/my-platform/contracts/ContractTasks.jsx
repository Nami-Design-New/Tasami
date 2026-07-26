import { useOutletContext, useParams } from "react-router";
import useGetTasks from "../../../../hooks/website/MyWorks/tasks/useGetTasks";
import useGetCurrentTaskDistribution from "../../../../hooks/website/MyWorks/tasks/useGetCurrentTaskDistribution";
import useGetTaskDistribution from "../../../../hooks/website/MyWorks/tasks/useGetTaskDistribution";
import useGetTaskImprovement from "../../../../hooks/website/MyWorks/tasks/useGetTaskImprovement";
import useGetTaskDistributionStatus from "../../../../hooks/website/MyWorks/tasks/useGetTaskDistributionStatus";
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
    isFetching: isDistributionFetching,
    isError: isDistributionError,
    refetch: generateTaskDistribution,
  } = useGetTaskDistribution(id);
  const {
    currentTaskDistribution,
    isFetching: isCurrentDistributionFetching,
    isError: isCurrentDistributionError,
    refetch: refreshCurrentDistribution,
  } = useGetCurrentTaskDistribution(id);
  const {
    taskImprovement,
    isFetching: isImprovementFetching,
    isError: isImprovementError,
    refetch: generateTaskImprovement,
  } = useGetTaskImprovement(id);
  const {
    taskDistributionStatus,
    isLoading: isDistributionStatusLoading,
    refetch: refreshTaskDistributionStatus,
  } = useGetTaskDistributionStatus(id);
  const { user } = useOutletContext();

  const currentDistribution =
    currentTaskDistribution.length > 0
      ? currentTaskDistribution
      : taskDistributionStatus.current_distribution;
  const optimalDistribution =
    taskDistribution.length > 0
      ? taskDistribution
      : taskDistributionStatus.optimal_distribution;
  const improvement =
    (Array.isArray(taskImprovement?.comparison) &&
      taskImprovement.comparison.length > 0) ||
    Boolean(taskImprovement?.overall_assessment)
      ? taskImprovement
      : taskDistributionStatus.improvement;
  const analysis =
    (Array.isArray(taskImprovement?.analysis?.strengths) &&
      taskImprovement.analysis.strengths.length > 0) ||
    Boolean(taskImprovement?.analysis?.conclusion) ||
    (Array.isArray(taskImprovement?.analysis?.improvement_points) &&
      taskImprovement.analysis.improvement_points.length > 0)
      ? taskImprovement.analysis
      : taskDistributionStatus.analysis;

  const handleGenerateOptimal = async () => {
    const result = await generateTaskDistribution();

    if (!result.error) {
      await refreshTaskDistributionStatus();
    }
  };

  const handleRefreshCurrent = async () => {
    const result = await refreshCurrentDistribution();

    if (!result.error) {
      await refreshTaskDistributionStatus();
    }
  };

  const handleGenerateImprovement = async () => {
    const result = await generateTaskImprovement();

    if (!result.error) {
      await refreshTaskDistributionStatus();
    }
  };

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
        currentDistribution={currentDistribution}
        optimalDistribution={optimalDistribution}
        isCurrentLoading={isDistributionStatusLoading}
        isCurrentRefreshing={isCurrentDistributionFetching}
        isCurrentError={isCurrentDistributionError}
        onRefreshCurrent={handleRefreshCurrent}
        isOptimalLoading={isDistributionLoading}
        isOptimalGenerating={isDistributionFetching}
        isOptimalError={isDistributionError}
        onGenerateOptimal={handleGenerateOptimal}
        isGenerationStatusLoading={isDistributionStatusLoading}
        isOptimalGenerated={
          taskDistributionStatus.optimal_distribution_generated ||
          taskDistribution.length > 0
        }
        improvement={improvement}
        analysis={analysis}
        isImprovementLoading={isImprovementFetching}
        isImprovementError={isImprovementError}
        onGenerateImprovement={handleGenerateImprovement}
        isImprovementGenerated={
          taskDistributionStatus.improvement_generated ||
          (Array.isArray(taskImprovement?.comparison) &&
            taskImprovement.comparison.length > 0) ||
          Boolean(taskImprovement?.overall_assessment)
        }
      />
    </section>
  );
}
