import { ProgressBar } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import ChartCard from "../cards/ChartCard";

const TaskStatus = ({ tasksData }) => {
  const { t } = useTranslation();

  const data = {
    successful: 987,
    pending: 1073,
    rejected: 1674,
  };

  const total = Object.values(data).reduce((acc, val) => acc + val, 0);
  const percentage = (value) => (value / total) * 100;

  return (
    <ChartCard title={t("dashboard.task_status")}>
      <div className="task-card d-block">
        <div className="total">
          <h4 className="number">{tasksData?.total_tasks}</h4>
          <span className="change positive">
            {tasksData?.growth_percentage} ▲
          </span>
          <span className="note">{t("dashboard.compared_last_week")}</span>
        </div>

        <ProgressBar className="rounded-bar mb-3">
          <ProgressBar
            className="complete"
            now={percentage(tasksData?.completed_tasks)}
            key={1}
          />
          <ProgressBar
            className="pending"
            now={percentage(tasksData?.progress_tasks)}
            key={2}
          />
          <ProgressBar
            className="unassigned"
            now={percentage(tasksData?.not_assigned_tasks)}
            key={3}
          />
        </ProgressBar>

        <ul className="legend">
          <li>
            <div className="legend--content">
              <span>{t("dashboard.completed_tasks")}</span>
              <span className="count">
                {tasksData?.completed_tasks.toLocaleString()}{" "}
                {t("dashboard.task_label")}
              </span>
            </div>
          </li>
          <li>
            <div className="legend--content">
              <span>{t("dashboard.in_progress_tasks")}</span>
              <span className="count">
                {tasksData?.progress_tasks.toLocaleString()}{" "}
                {t("dashboard.task_label")}
              </span>
            </div>
          </li>
          <li>
            <div className="legend--content">
              <span>{t("dashboard.unassigned_tasks")}</span>
              <span className="count">
                {tasksData?.not_assigned_tasks.toLocaleString()}{" "}
                {t("dashboard.task_label")}
              </span>
            </div>
          </li>
        </ul>
      </div>
    </ChartCard>
  );
};

export default TaskStatus;
