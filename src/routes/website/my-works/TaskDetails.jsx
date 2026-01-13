import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import useDeleteTask from "../../../hooks/website/MyWorks/tasks/useDeleteTask";
import useGetTaskDetails from "../../../hooks/website/MyWorks/tasks/useGetTaskDetails";
import useUpdateTaskStatus from "../../../hooks/website/MyWorks/tasks/useUpdateTaskStatus";
import Loading from "../../../ui/loading/Loading";
import RoundedBackButton from "../../../ui/website-auth/shared/RoundedBackButton";
import AddTasksModal from "../../../ui/website/my-works/tasks/AddTasksModal";
import OptionsMenu from "../../../ui/website/OptionsMenu";
import { TASKS_STATUS } from "../../../utils/constants";

import missionClassIcon from "../../../assets/icons/mission-class.svg";
import bellIcon from "../../../assets/icons/bell.svg";

export default function TaskDetails() {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const { taskDetails, isLoading } = useGetTaskDetails();
  const { updateTaskStatus, isPending } = useUpdateTaskStatus();
  const { deleteTask, isPending: isDeleting } = useDeleteTask();

  const handleChange = (e) => {
    const newStatus = e.target.value;
    setSelectedStatus(newStatus);

    updateTaskStatus(
      { status: newStatus, id: taskDetails?.id },
      {
        onSuccess: (res) => {
          toast.success(res?.message);
          queryClient.invalidateQueries({ queryKey: ["task-details"] });
          queryClient.refetchQueries({ queryKey: ["work-tasks"] });
        },
        onError: (err) => {
          toast.error(err?.message || t("works.myTasks.error"));
        },
      }
    );
  };

  const handleDeleteTask = (id, workid) => {
    deleteTask(id, {
      onSuccess: (res) => {
        toast.success(res.message);
        navigate(`/my-works/${workid}/tasks`, { replace: true });
        queryClient.refetchQueries({ queryKey: ["work-tasks"] });
      },
    });
  };

  useEffect(() => {
    if (taskDetails?.status) {
      setSelectedStatus(taskDetails.status);
    }
  }, [taskDetails?.status]);

  if (isLoading) return <Loading />;
  const taskDate = new Date(taskDetails?.expected_end_date);
  const isPast = taskDate < new Date();

  return (
    <section className="task_details page">
      <div className="container">
        <header className="task-details__header">
          <div className="d-flex gap-3">
            <RoundedBackButton
              onClick={() => navigate(`/my-works/${taskDetails.work_id}/tasks`)}
            />
            <h1>{t("works.myTasks.taskDetails")}</h1>
          </div>

          {taskDetails?.work_status !== "completed" && (
            <OptionsMenu
              toggleButton={"fas fa-ellipsis-h"}
              options={[
                {
                  label: t("works.myTasks.edit"),
                  onClick: () => setShowAddModal(true),
                },
                {
                  label: t("works.myTasks.delete"),
                  onClick: () =>
                    handleDeleteTask(taskDetails?.id, taskDetails?.work_id),
                  props: { disabled: isDeleting },
                  className: "text-danger",
                },
              ]}
            />
          )}
        </header>

        <div className="row mt-4">
          <div className="col-12 p-2">
            <div className="info-grid w-100">
              <div className="info-box flex-grow-1">
                <div className="label">{t("works.myTasks.taskTitle")}</div>
                <div className="value white-space-wrap">
                  {taskDetails?.title}
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 p-2">
            <div className="info-grid w-100">
              <div className="info-box flex-grow-1">
                <div className="label">{t("works.myTasks.notes")}</div>
                <div className="value white-space-wrap">
                  {taskDetails?.notes}
                </div>
              </div>
            </div>
          </div>

          <div className="col-4 p-2">
            <div className="info-grid w-100">
              <div className="info-box flex-grow-1">
                <div className="label">{t("works.myTasks.category")}</div>
                <div className="value">
                  {" "}
                  <img src={missionClassIcon} />{" "}
                  {taskDetails?.task_category?.title}
                </div>
              </div>
            </div>
          </div>

          <div className="col-4 p-2">
            <div className="info-grid w-100">
              <div className="info-box flex-grow-1">
                <div className="label">{t("works.myTasks.reminder")}</div>
                <div className="value">
                  <img src={bellIcon} />
                  {t(`${taskDetails?.notification_repeat}`)}
                </div>
              </div>
            </div>
          </div>

          <div className="col-4 p-2">
            <div className="info-grid w-100">
              <div className="info-box flex-grow-1">
                <div className="label">{t("works.myTasks.date")}</div>
                <div
                  className={`value ${
                    isPast && taskDetails?.status !== "completed"
                      ? "text-fire"
                      : ""
                  }`}
                >
                  {taskDetails?.expected_end_date}
                </div>
              </div>
            </div>
          </div>

          {taskDetails?.work_status !== "completed" && (
            <div className="col-12 p-2">
              <div className="identity-selector">
                <div className="d-flex align-items-center mb-2">
                  <h6 className="identity-title m-0">
                    {t("works.myTasks.status")}
                  </h6>
                  {taskDetails?.is_paused && (
                    <p className="hint">{t("works.myTasks.pausedHint")}</p>
                  )}
                </div>

                <div className="identity-container gap-2">
                  {TASKS_STATUS.map((status) => (
                    <label
                      key={status}
                      className={`identity-option ${
                        selectedStatus === status ? "active" : ""
                      }`}
                    >
                      <span>{t(`works.myTasks.statuses.${status}`)}</span>
                      <input
                        type="radio"
                        name="taskStatus"
                        value={status}
                        checked={selectedStatus === status}
                        onChange={handleChange}
                        disabled={
                          taskDetails?.is_paused ||
                          taskDetails?.status === "completed" ||
                          taskDetails?.status === "confirmed"
                        }
                      />
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <AddTasksModal
        showModal={showAddModal}
        setShowModal={setShowAddModal}
        taskData={taskDetails}
        taskId={taskId}
      />
    </section>
  );
}
