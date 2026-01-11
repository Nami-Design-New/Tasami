// TaskCard.jsx
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";
import CustomButton from "../../../CustomButton";
import ConfirmPerformanceModal from "./ConfirmPerformanceModal";
import pendingTaskCheck from "../../../../assets/icons/pending-task-check.svg";
import progressTaskCheck from "../../../../assets/icons/progress-task-check.svg";
import taskCheck from "../../../../assets/icons/task-check.svg";
export default function TaskCard({
  task,
  user,
  isDragable = true,
  isDragging = false,
}) {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const { pathname } = useLocation();
  const isContracts = pathname.includes("my-contracts") || !isDragable;

  const { t } = useTranslation();
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
    if (showModal) return;
    if (e.target.closest("button")) return;

    // If user didn't move pointer significantly, treat as click
    if (!moved.current && !isContracts) {
      navigate(`/tasks/${task?.id}`);
    }
  };

  // keyboard support (Enter / Space to activate)
  const handleKeyDown = (e) => {
    if (isDragging) return;
    if ((e.key === "Enter" || e.key === " ") && !isContracts) {
      e.preventDefault();
      navigate(`/tasks/${task?.id}`);
    }
  };

  const taskDate = new Date(task?.expected_end_date);
  const isPast = taskDate < new Date();

  return (
    <div
      className={`task-card ${isDragable ? "draggable" : "not-dragabble"} ${
        isDragging ? "dragging" : ""
      }`}
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
            : task.status === "completed" || task.status === "confirmed"
            ? "completed"
            : ""
        }`}
      >
        {task.status === "pending" && (
          <img src={pendingTaskCheck} alt="pending" />
        )}

        {task.status === "progress" && (
          <img src={progressTaskCheck} alt="progress" />
        )}

        {(task.status === "completed" || task.status === "confirmed") && (
          <img src={taskCheck} alt="completed" />
        )}
      </div>

      <div className="card-body">
        <div className="card__title">{task?.title}</div>
        <div className="meta-info">
          <div className="item">
            <i className="fa-regular fa-calendar" aria-hidden />
            <span
              className={`${
                isPast && task?.status !== "completed" ? "text-fire" : ""
              }`}
            >
              {task?.expected_end_date}
            </span>
          </div>
          <div className="item">
            <i className="fa-light fa-bullseye-arrow" aria-hidden />
            <span>{task?.task_category?.title}</span>
          </div>
          <div className="item">
            <i className="fa-regular fa-bell" aria-hidden />
            <span>{t(`${task?.notification_repeat}`)}</span>
          </div>
        </div>

        {task?.helper === null ? (
          <></>
        ) : (
          (task.status === "completed" || task.status === "confirmed") && (
            <>
              {isContracts ? (
                task?.rate === null ? (
                  <></>
                ) : (
                  <div className="mt-3">
                    <CustomButton
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowModal(true);
                      }}
                      size="large"
                      variant={
                        task?.rate === null ||
                        task.rate.guidance === "" ||
                        task.rate.verification === ""
                          ? "outlined"
                          : "default"
                      }
                      color={
                        task?.rate === null ||
                        task.rate.guidance === "" ||
                        task.rate.verification === ""
                          ? "primary"
                          : "success"
                      }
                      fullWidth
                    >
                      {task?.rate === null ||
                      task.rate.guidance === "" ||
                      task.rate.verification === ""
                        ? t("confirm_performance")
                        : t("performance_confirmed")}
                    </CustomButton>
                  </div>
                )
              ) : (
                <div className="mt-3">
                  <CustomButton
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowModal(true);
                    }}
                    size="large"
                    variant={task?.rate === null ? "outlined" : "default"}
                    color={task?.rate === null ? "primary" : "success"}
                    fullWidth
                  >
                    {task?.rate === null
                      ? t("confirm_performance")
                      : t("performance_confirmed")}{" "}
                  </CustomButton>
                </div>
              )}
            </>
          )
        )}
      </div>
      <ConfirmPerformanceModal
        show={showModal}
        setShowModal={setShowModal}
        task={task}
        workUser={user}
      />
    </div>
  );
}
