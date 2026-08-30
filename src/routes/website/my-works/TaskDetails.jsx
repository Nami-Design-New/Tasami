import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import useDeleteTaskSchedule from "../../../hooks/website/MyWorks/tasks/useDeleteTaskSchedule";
import useDeleteTask from "../../../hooks/website/MyWorks/tasks/useDeleteTask";
import useGetTaskDetails from "../../../hooks/website/MyWorks/tasks/useGetTaskDetails";
import useUpdateTaskSchedule from "../../../hooks/website/MyWorks/tasks/useUpdateTaskSchedule";
import useUpdateTaskStatus from "../../../hooks/website/MyWorks/tasks/useUpdateTaskStatus";
import Loading from "../../../ui/loading/Loading";
import ConfirmDeleteModal from "../../../ui/modals/ConfirmationDeleteModal";
import RoundedBackButton from "../../../ui/website-auth/shared/RoundedBackButton";
import AddTasksModal from "../../../ui/website/my-works/tasks/AddTasksModal";
import OptionsMenu from "../../../ui/website/OptionsMenu";
import { TASKS_STATUS } from "../../../utils/constants";

import bellIcon from "../../../assets/icons/bell.svg";
import missionClassIcon from "../../../assets/icons/mission-class.svg";
import TaskBreadcrumb from "../../../ui/website/my-works/tasks/TaskBreadcrumb";
import TaskScheduleRowContainer from "../../../ui/website/my-works/tasks/TaskScheduleRowContainer";

const getTaskRepetitions = (task) =>
  Array.isArray(task?.schedules) ? task.schedules : [];

const getTaskNotes = (task) => {
  const source = task?.task_notes ?? task?.notes;
  const notes = Array.isArray(source?.data) ? source.data : source;

  if (!Array.isArray(notes)) {
    if (notes == null || String(notes).trim() === "") return [];
    return String(notes)
      .split(/\r?\n/)
      .filter(Boolean)
      .map((note, index) => ({
        id: `legacy-${index}`,
        text: note,
        created_at: null,
      }));
  }

  return notes
    .map((note, index) => ({
      id: note?.id ?? `note-${index}`,
      text: String(
        note?.text ?? note?.note ?? note?.content ?? note ?? "",
      ).trim(),
      created_at: note?.created_at ?? note?.date ?? null,
    }))
    .filter((note) => note.text);
};

const formatTaskNoteDate = (value) => {
  if (!value) return null;

  const [date = "", time = ""] = String(value).trim().split(/[ T]/);
  return time ? `${date} | ${time.slice(0, 5)}` : date;
};

export default function TaskDetails({ mode = null }) {
  const navigate = useNavigate();
  const { id: routeWorkId, taskId } = useParams();
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { user } = useSelector((state) => state.authRole);

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [activeScheduleId, setActiveScheduleId] = useState(null);
  const [scheduleToDelete, setScheduleToDelete] = useState(null);
  const [scheduleDateConflicts, setScheduleDateConflicts] = useState({});

  const { taskDetails, isLoading, error: taskError } = useGetTaskDetails();
  const { updateTaskStatus } = useUpdateTaskStatus();
  const { deleteTask, isPending: isDeleting } = useDeleteTask();
  const { updateTaskSchedule, isPending: isUpdatingSchedule } =
    useUpdateTaskSchedule();
  const { deleteTaskSchedule, isPending: isDeletingSchedule } =
    useDeleteTaskSchedule();
  const taskErrorStatus = Number(
    taskError?.status ??
      taskError?.response?.status ??
      taskError?.response?.data?.code,
  );
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
  const repetitions = getTaskRepetitions(taskDetails);
  const taskNotes = getTaskNotes(taskDetails);
  const hasIncompleteRepetitions =
    repetitions.length > 0 &&
    repetitions.some(
      (repetition) =>
        repetition?.status !== "completed" &&
        repetition?.status !== "confirmed",
    );

  const handleScheduleDateValidity = useCallback((scheduleId, isValid) => {
    setScheduleDateConflicts((current) => {
      if (Boolean(current[scheduleId]) === !isValid) return current;
      return { ...current, [scheduleId]: !isValid };
    });
  }, []);

  // Only conflicts on repetitions the task still has should block the owner.
  const hasScheduleDateConflict = repetitions.some(
    (repetition) => scheduleDateConflicts[repetition?.id],
  );

  const handleChange = (e) => {
    if (!canManageTask) return;

    if (hasScheduleDateConflict) {
      toast.error(t("works.schedule_errors.resolve_date_conflicts"));
      return;
    }

    const newStatus = e.target.value;
    if (newStatus === "completed" && hasIncompleteRepetitions) {
      toast.error(t("works.myTasks.completeRepetitionsHint"));
      return;
    }

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

  const refreshTaskQueries = () =>
    Promise.all([
      queryClient.invalidateQueries({ queryKey: ["task-details"] }),
      queryClient.invalidateQueries({ queryKey: ["work-tasks"] }),
    ]);

  const handleUpdateSchedule = async (scheduleId, payload) => {
    if (!canManageTask) return null;

    setActiveScheduleId(scheduleId);
    try {
      const response = await updateTaskSchedule({
        taskId: taskDetails?.id,
        scheduleId,
        ...payload,
      });
      toast.success(response?.message || t("works.schedule_update_success"));
      await refreshTaskQueries();
      return response;
    } finally {
      setActiveScheduleId(null);
    }
  };

  const handleDeleteSchedule = async () => {
    if (!canManageTask || !scheduleToDelete?.id) return;

    setActiveScheduleId(scheduleToDelete.id);
    try {
      const response = await deleteTaskSchedule({
        taskId: taskDetails?.id,
        scheduleId: scheduleToDelete.id,
      });
      toast.success(response?.message || t("works.repetition_delete_success"));
      setScheduleToDelete(null);
      await refreshTaskQueries();
    } catch (error) {
      toast.error(error?.message || t("works.repetition_delete_error"));
    } finally {
      setActiveScheduleId(null);
    }
  };

  useEffect(() => {
    if (taskDetails?.status) {
      setSelectedStatus(taskDetails.status);
    }
  }, [taskDetails?.status]);

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

  if (isLoading) return <Loading />;
  if (taskError) {
    return (
      <section className="task_details page">
        <div className="container">
          <div className="alert alert-danger" role="alert">
            <strong>
              {taskErrorStatus ? `${taskErrorStatus}: ` : ""}
            </strong>
            {taskError.message || t("messages_error")}
          </div>
        </div>
      </section>
    );
  }
  const taskDate = new Date(taskDetails?.expected_end_date);
  const isPast = taskDate < new Date();
  const hasTaskNotes = taskNotes.length > 0;

  return (
    <section className="task_details page">
      <div className="container">
        <header className="task-details__header">
          <div className="d-flex align-items-center gap-3">
            <RoundedBackButton onClick={() => navigate(tasksPath)} />
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
            <div className="info-box info-box-grow-min-width w-100">
              <h4 className="label">{t("works.myTasks.notes")}</h4>
              {hasTaskNotes ? (
                <div className="task-notes-editor__list">
                  {taskNotes.map((note) => (
                    <article className="task-note-item" key={note.id}>
                      {note.created_at ? (
                        <div className="task-note-item__meta">
                          <time dateTime={note.created_at}>
                            {formatTaskNoteDate(note.created_at)}
                          </time>
                        </div>
                      ) : null}
                      <p>{note.text}</p>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="value">{t("works.myTasks.noNotes")}</p>
              )}
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
                    <div className="task-status-option" key={status}>
                      <label
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
                            taskDetails?.status === "confirmed" ||
                            (status === "completed" &&
                              hasIncompleteRepetitions)
                          }
                        />
                      </label>

                      {status === "completed" &&
                      hasIncompleteRepetitions ? (
                        <p className="task-status-repetitions-hint">
                          <i
                            className="fa-solid fa-circle-minus"
                            aria-hidden="true"
                          />
                          <span>
                            {t("works.myTasks.completeRepetitionsHint")}
                          </span>
                        </p>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {repetitions.length > 0 ? (
          <section
            className="task-repetitions form_ui"
            aria-labelledby="repetitions-title"
          >
            <h2 id="repetitions-title">
              {t("works.repetition")} ({repetitions.length})
            </h2>
            <div className="task-repetitions__list">
              {repetitions.map((repetition, index) => {
                return (
                  <TaskScheduleRowContainer
                    key={repetition?.id ?? index}
                    schedule={repetition}
                    index={index}
                    task={taskDetails}
                    schedules={repetitions}
                    canManage={canManageTask}
                    busy={
                      activeScheduleId === repetition?.id &&
                      (isUpdatingSchedule || isDeletingSchedule)
                    }
                    onUpdate={handleUpdateSchedule}
                    onRequestDelete={setScheduleToDelete}
                    onDateValidityChange={handleScheduleDateValidity}
                  />
                );
              })}
            </div>
          </section>
        ) : null}
      </div>

      {canManageTask && (
        <AddTasksModal
          showModal={showAddModal}
          setShowModal={setShowAddModal}
          taskData={taskDetails}
          taskId={taskId}
        />
      )}

      <ConfirmDeleteModal
        showDeleteModal={Boolean(scheduleToDelete)}
        setShowDeleteModal={(show) => {
          if (!show) setScheduleToDelete(null);
        }}
        message={t("works.schedule_delete_confirmation")}
        loading={isDeletingSchedule}
        onConfirm={handleDeleteSchedule}
      />
    </section>
  );
}
