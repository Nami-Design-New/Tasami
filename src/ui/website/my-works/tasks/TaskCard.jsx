import React from "react";

export default function TaskCard({ task }) {
  return (
    <div className="task-card">
      <div className="check">
        {task.status === "pending" ? (
          <img src="/icons/pending-task-check.svg" />
        ) : (
          <img src="/icons/task-check.svg" />
        )}
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
    </div>
  );
}
