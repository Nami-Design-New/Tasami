import { ProgressBar } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import ChartCard from "../cards/ChartCard";

const TaskStatus = () => {
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
          <h4 className="number">4,289</h4>
          <span className="change positive">1.02 ▲</span>
          <span className="note">{t("dashboard.compared_last_week")}</span>
        </div>

        <ProgressBar className="rounded-bar mb-3">
          <ProgressBar
            className="complete"
            now={percentage(data.successful)}
            key={1}
          />
          <ProgressBar
            className="pending"
            now={percentage(data.pending)}
            key={2}
          />
          <ProgressBar
            className="unassigned"
            now={percentage(data.rejected)}
            key={3}
          />
        </ProgressBar>

        <ul className="legend">
          <li>
            <div className="legend--content">
              <span>{t("dashboard.completed_tasks")}</span>
              <span className="count">
                {data.successful.toLocaleString()} {t("dashboard.task_label")}
              </span>
            </div>
          </li>
          <li>
            <div className="legend--content">
              <span>{t("dashboard.in_progress_tasks")}</span>
              <span className="count">
                {data.pending.toLocaleString()} {t("dashboard.task_label")}
              </span>
            </div>
          </li>
          <li>
            <div className="legend--content">
              <span>{t("dashboard.unassigned_tasks")}</span>
              <span className="count">
                {data.rejected.toLocaleString()} {t("dashboard.task_label")}
              </span>
            </div>
          </li>
        </ul>
      </div>
    </ChartCard>
  );
};

export default TaskStatus;
