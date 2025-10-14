import { Link } from "react-router";

export default function TaskCard({ task }) {
  return (
    <Link to={`/tasks/${task?.id}`} className="task-card">
      <div
        className={`check ${
          task.status === "pending"
            ? "pending"
            : task.status === "progress"
            ? "progress"
            : task.status === "completed"
            ? "completed"
            : ""
        } `}
      >
        {task.status === "pending" && (
          <img src="/icons/pending-task-check.svg" />
        )}
        {task.status === "progress" && (
          <img src="/icons/progress-task-check.svg" />
        )}
        {task.status === "completed" && <img src="/icons/task-check.svg" />}
      </div>
      <div className="card-body">
        <div className="card__title">{task?.title}</div>
        <div className="meta-info">
          <div className="item">
            <i className="fa-regular fa-calendar"></i>
            <span>{task?.expected_end_date}</span>
          </div>
          <div className="item">
            <i className="fa-light fa-bullseye-arrow"></i>
            <span>{task?.task_category?.title}</span>
          </div>
          <div className="item">
            <i className="fa-regular fa-bell"></i>
            <span>{task?.notification_repeat}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
