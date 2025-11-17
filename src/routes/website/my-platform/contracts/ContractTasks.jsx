import { useOutletContext, useParams } from "react-router";
import useGetTasks from "../../../../hooks/website/MyWorks/tasks/useGetTasks";
import TaskCard from "../../../../ui/website/my-works/tasks/TaskCard";
import Loading from "../../../../ui/loading/Loading";
import { useTranslation } from "react-i18next";
import NoTasks from "../../../../ui/website/my-works/NoTasks";

export default function ContractTasks() {
  const { id } = useParams();
  const { t } = useTranslation();
  const { goalTasks, isLoading } = useGetTasks(id);
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
          <div className="label">{t("works.myTasks.startExecution")}</div>{" "}
          <div className="value">
            {goalTasks["additional-data"]?.start_of_execution || "---"}
          </div>
        </div>
        <div className="info-box flex-grow-1">
          <div className="label">{t("works.myTasks.endExecution")}</div>
          <div className="value">
            {goalTasks["additional-data"]?.end_of_execution || "---"}
          </div>
        </div>
        <div className="info-box flex-grow-1">
          <div className="label">{t("works.myTasks.executionRate")}</div>
          <div className="value">
            {goalTasks["additional-data"]?.execution_percentage || "---"}
          </div>
        </div>
      </div>

      {/* Tasks Section */}
      <div className="execution-tasks">
        <div className="tasks-header">
          <h1>{t("works.myTasks.title")}</h1>
        </div>
        <div className="tasks-list">
          {goalTasks.data.map((task) => (
            <TaskCard key={task.id} task={task} user={user} />
          ))}
        </div>
      </div>
    </section>
  );
}
