import { ProgressBar } from "react-bootstrap";
import ChartCard from "./ChartCard";

const TaskStatus = () => {
  const data = {
    successful: 987,
    pending: 1073,
    rejected: 1674,
  };

  const total = Object.values(data).reduce((acc, val) => acc + val, 0);

  const percentage = (value) => (value / total) * 100;
  return (
    <ChartCard title="حاله المهام">
      <div className="task-card">
        <div className="total">
          <h4 className="number">4,289</h4>
          <span className="change positive">1.02 ▲</span>
          <span className="note"> مقارنة بالاسبوع الماضي </span>
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
              <span>المهام المكتمله</span>
              <span className="count">987 مهمة</span>
            </div>
          </li>
          <li>
            <div className="legend--content">
              <span>المهام قيد التنفيذ</span>
              <span className="count">1,073 مهمة</span>
            </div>{" "}
          </li>
          <li>
            <div className="legend--content">
              <span>المهام الغير معينه</span>
              <span className="count">1,674 مهمة</span>
            </div>{" "}
          </li>
        </ul>
      </div>
    </ChartCard>
  );
};

export default TaskStatus;
