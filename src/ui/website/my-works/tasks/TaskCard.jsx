// TaskCard.jsx
import { useRef } from "react";
import { useNavigate } from "react-router";

export default function TaskCard({ task, isDragging = false }) {
  const navigate = useNavigate();

  // persistent refs across renders
  const pointerStart = useRef({ x: 0, y: 0 });
  const moved = useRef(false);

  // pointer down -> record start pos
  const handlePointerDown = (e) => {
    // use clientX/Y for mouse/touch/pointer
    pointerStart.current = { x: e.clientX ?? 0, y: e.clientY ?? 0 };
    moved.current = false;
  };

  // pointer move -> mark moved if threshold exceeded
  const handlePointerMove = (e) => {
    const dx = Math.abs((e.clientX ?? 0) - pointerStart.current.x);
    const dy = Math.abs((e.clientY ?? 0) - pointerStart.current.y);
    if (dx > 6 || dy > 6) moved.current = true; // 6px threshold
  };

  // pointer up -> if not moved and not dragging, navigate
  const handlePointerUp = (e) => {
    if (isDragging) {
      // DnD is active — do nothing
      return;
    }

    // If user didn't move pointer significantly, treat as click
    if (!moved.current) {
      navigate(`/tasks/${task?.id}`);
    }
  };

  // keyboard support (Enter / Space to activate)
  const handleKeyDown = (e) => {
    if (isDragging) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      navigate(`/tasks/${task?.id}`);
    }
  };

  return (
    <div
      className="task-card"
      role="link"
      tabIndex={0}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onKeyDown={handleKeyDown}
      // prevent native drag interactions inside the card
      draggable={false}
      style={{ userSelect: "none" }}
    >
      <div
        className={`check ${
          task.status === "pending"
            ? "pending"
            : task.status === "progress"
            ? "progress"
            : task.status === "completed"
            ? "completed"
            : ""
        }`}
      >
        {task.status === "pending" && (
          <img src="/icons/pending-task-check.svg" alt="pending" />
        )}
        {task.status === "progress" && (
          <img src="/icons/progress-task-check.svg" alt="progress" />
        )}
        {task.status === "completed" && (
          <img src="/icons/task-check.svg" alt="completed" />
        )}
      </div>

      <div className="card-body">
        <div className="card__title">{task?.title}</div>
        <div className="meta-info">
          <div className="item">
            <i className="fa-regular fa-calendar" aria-hidden />
            <span>{task?.expected_end_date}</span>
          </div>
          <div className="item">
            <i className="fa-light fa-bullseye-arrow" aria-hidden />
            <span>{task?.task_category?.title}</span>
          </div>
          <div className="item">
            <i className="fa-regular fa-bell" aria-hidden />
            <span>{task?.notification_repeat}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
