import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import useDeleteTask from "../../../hooks/website/MyWorks/tasks/useDeleteTask";
import useGetTaskDetails from "../../../hooks/website/MyWorks/tasks/useGetTaskDetails";
import useUpdateTaskStatus from "../../../hooks/website/MyWorks/tasks/useUpdateTaskStatus";
import Loading from "../../../ui/loading/Loading";
import RoundedBackButton from "../../../ui/website-auth/shared/RoundedBackButton";
import AddTasksModal from "../../../ui/website/my-works/tasks/AddTasksModal";
import OptionsMenu from "../../../ui/website/OptionsMenu";
import { TASKS_STATUS } from "../../../utils/constants";

import bellIcon from "../../../assets/icons/bell.svg";
import missionClassIcon from "../../../assets/icons/mission-class.svg";
import TaskBreadcrumb from "../../../ui/website/my-works/tasks/TaskBreadcrumb";

export default function TaskDetails({ mode = null }) {
  const navigate = useNavigate();
  const { id: routeWorkId, taskId } = useParams();
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { user } = useSelector((state) => state.authRole);

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const { taskDetails, isLoading, error: taskError } = useGetTaskDetails();
  const { updateTaskStatus } = useUpdateTaskStatus();
  const { deleteTask, isPending: isDeleting } = useDeleteTask();
  const taskErrorStatus = Number(
    taskError?.status ??
      taskError?.response?.status ??
      taskError?.response?.data?.code,
  );
  const isTaskNotFound = taskErrorStatus === 404;

  const currentUserId = user?.id;
  const taskOwnerId =
    taskDetails?.user?.id ??
    taskDetails?.user_id ??
    taskDetails?.work?.user?.id ??
    taskDetails?.work_user_id;
  const taskHelperId =
    taskDetails?.helper?.id ??
    taskDetails?.helper_id ??
    taskDetails?.work?.helper?.id ??
    taskDetails?.work_helper_id;
  const isCurrentUserBeneficiary =
    currentUserId != null &&
    taskOwnerId != null &&
    String(currentUserId) === String(taskOwnerId);
  const isCurrentUserAssistant =
    currentUserId != null &&
    taskHelperId != null &&
    String(currentUserId) === String(taskHelperId);
  const routeMode =
    mode ||
    (pathname.includes("/my-contracts/")
      ? "assistant"
      : pathname.includes("/my-works/")
        ? "beneficiary"
        : null);
  const taskMode =
    routeMode ||
    (isCurrentUserAssistant && !isCurrentUserBeneficiary
      ? "assistant"
      : "beneficiary");
  const isAssistantMode = taskMode === "assistant";
  const taskWorkId = routeWorkId || taskDetails?.work_id;
  const tasksPath = isAssistantMode
    ? `/my-contracts/${taskWorkId}/tasks`
    : `/my-works/${taskWorkId}/tasks`;
  const canVerifyBeneficiary = taskOwnerId != null;
  const canManageTask =
    !!taskDetails &&
    !isAssistantMode &&
    taskDetails?.work_status !== "completed" &&
    (!canVerifyBeneficiary || isCurrentUserBeneficiary);
  const canViewTaskStatus = !!taskDetails && (canManageTask || isAssistantMode);

  const handleChange = (e) => {
    if (!canManageTask) return;

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
      },
    );
  };

  const handleDeleteTask = (id, workid) => {
    if (!canManageTask) return;

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

  useEffect(() => {
    if (isTaskNotFound) {
      navigate("/not-found", { replace: true });
    }
  }, [isTaskNotFound, navigate]);

  useEffect(() => {
    if (isLoading || !taskDetails) return;

    if (
      routeWorkId &&
      taskDetails?.work_id &&
      String(routeWorkId) !== String(taskDetails.work_id)
    ) {
      navigate("/forbidden", { replace: true });
      return;
    }

    if (
      taskMode === "beneficiary" &&
      taskOwnerId != null &&
      !isCurrentUserBeneficiary
    ) {
      navigate("/forbidden", { replace: true });
      return;
    }

    if (
      taskMode === "assistant" &&
      taskHelperId != null &&
      !isCurrentUserAssistant
    ) {
      navigate("/forbidden", { replace: true });
    }
  }, [
    isCurrentUserAssistant,
    isCurrentUserBeneficiary,
    isLoading,
    navigate,
    routeWorkId,
    taskDetails,
    taskHelperId,
    taskMode,
    taskOwnerId,
  ]);

  if (isLoading || isTaskNotFound) return <Loading />;
  const taskDate = new Date(taskDetails?.expected_end_date);
  const isPast = taskDate < new Date();
  const taskNotes = taskDetails?.notes;
  const hasTaskNotes =
    taskNotes != null &&
    String(taskNotes).trim() !== "" &&
    String(taskNotes).toLowerCase() !== "null";

  return (
    <section className="task_details page">
      <div className="container">
        <header className="task-details__header">
          <div className="d-flex align-items-center gap-3">
            <RoundedBackButton
              onClick={() => navigate(tasksPath)}
            />
            <TaskBreadcrumb taskDetails={taskDetails} tasksPath={tasksPath} />
            {/* <h1>{t("works.myTasks.taskDetails")}</h1> */}
          </div>

          {canManageTask && (
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
              <div className="info-box info-box-grow-min-width">
                <h4 className="label">{t("works.myTasks.taskTitle")}</h4>
                <p className="value white-space-wrap">{taskDetails?.title}</p>
              </div>
            </div>
          </div>

          <div className="col-12 p-2">
            <div className="info-grid w-100">
              <div className="info-box info-box-grow-min-width">
                <h4 className="label">{t("works.myTasks.notes")}</h4>
                <p className="value white-space-wrap">
                  {hasTaskNotes ? taskNotes : t("works.myTasks.noNotes")}
                </p>
              </div>
            </div>
          </div>

          <div className="col p-2">
            <div className="info-grid w-100">
              <div className="info-box info-box-grow-min-width">
                <h4 className="label">{t("works.myTasks.category")}</h4>
                <p className="value">
                  {" "}
                  <img src={missionClassIcon} />{" "}
                  {taskDetails?.task_category?.title}
                </p>
              </div>
            </div>
          </div>

          <div className="col p-2">
            <div className="info-grid w-100">
              <div className="info-box info-box-grow-min-width">
                <h4 className="label">{t("works.myTasks.reminder")}</h4>
                <p className="value">
                  <img src={bellIcon} />
                  {t(`${taskDetails?.notification_repeat}`)}
                </p>
              </div>
            </div>
          </div>

          <div className="col p-2">
            <div className="info-grid">
              <div className="info-box info-box-grow-min-width">
                <h4 className="label">{t("works.started_at")}</h4>
                <p className="value">{taskDetails?.started_at || "---"}</p>
              </div>
            </div>
          </div>

          <div className="col p-2">
            <div className="info-grid">
              <div className="info-box info-box-grow-min-width">
                <h4 className="label">{t("works.myTasks.date")}</h4>
                <p
                  className={`value ${
                    isPast && taskDetails?.status !== "completed"
                      ? "text-fire"
                      : ""
                  }`}
                >
                  {taskDetails?.expected_end_date}
                </p>
              </div>
            </div>
          </div>

          {canViewTaskStatus && (
            <div className="col-12 p-2">
              <div className="identity-selector">
                <div className="d-flex align-items-center mb-2">
                  <h6 className="identity-title m-0">
                    {t("works.myTasks.status")}
                  </h6>
                  {canManageTask && taskDetails?.is_paused && (
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
                        onChange={canManageTask ? handleChange : undefined}
                        disabled={
                          !canManageTask ||
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

      {canManageTask && (
        <AddTasksModal
          showModal={showAddModal}
          setShowModal={setShowAddModal}
          taskData={taskDetails}
          taskId={taskId}
        />
      )}
    </section>
  );
}
