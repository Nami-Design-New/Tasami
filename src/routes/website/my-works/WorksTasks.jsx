import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Lottie from "react-lottie";
import { useParams } from "react-router";
import { toast } from "sonner";

// UI
import celebrationAnimation from "../../../assets/lotties/celebrate.json";
import CustomButton from "../../../ui/CustomButton";
import NoTasks from "../../../ui/website/my-works/NoTasks";
import AddTasksModal from "../../../ui/website/my-works/tasks/AddTasksModal";
import TaskCard from "../../../ui/website/my-works/tasks/TaskCard";
import AlertModal from "../../../ui/website/platform/my-community/AlertModal";

// Hooks
import useGetTasks from "../../../hooks/website/MyWorks/tasks/useGetTasks";
import useGetToggleGoalExe from "../../../hooks/website/MyWorks/tasks/useGetToggleGoalExe";
import useReorderTasks from "../../../hooks/website/MyWorks/tasks/useReorderTasks";
import useCompleteGoal from "../../../hooks/website/MyWorks/useCompleteGoal";
import useGetWorkDetails from "../../../hooks/website/MyWorks/useGetWorkDetails";

// DnD Kit
import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import useAddTaskWithAi from "../../../hooks/website/MyWorks/tasks/useAddTaskWithAi";
import useDeleteAllTasks from "../../../hooks/website/MyWorks/tasks/useDeleteAllTasks";
import Loading from "../../../ui/loading/Loading";
import GlobalModal from "../../../ui/GlobalModal";
import EarlyExecutionWarningModal from "../../../ui/website/my-works/EarlyExecutionWarningModal";

const DAY_IN_MS = 24 * 60 * 60 * 1000;

const getEarlyExecutionDetails = (scheduledDate) => {
  if (!scheduledDate) return null;

  const normalizedDate = String(scheduledDate).split("T")[0];
  const startDate = new Date(`${normalizedDate}T00:00:00`);
  const millisecondsUntilStart = startDate.getTime() - Date.now();

  if (
    Number.isNaN(startDate.getTime()) ||
    millisecondsUntilStart <= DAY_IN_MS
  ) {
    return null;
  }

  return {
    scheduledDate: normalizedDate,
    daysUntilStart: Math.ceil(millisecondsUntilStart / DAY_IN_MS),
  };
};

// Sortable wrapper for TaskCard
function SortableTask({ task, workId }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: String(task.id) });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginBottom: "10px",
    cursor: isDragging ? "grabbing" : "grab",
    opacity: isDragging ? 0.7 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskCard
        task={task}
        isDragging={isDragging}
        detailsPath={`/my-works/${workId}/tasks/${task.id}`}
      />
    </div>
  );
}

function GoalCompletionCongratsModal({ show, onClose }) {
  const { t } = useTranslation();
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: celebrationAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <GlobalModal
      show={show}
      onHide={onClose}
      centered
      size="md"
      dialogClassName="goal-completion-modal"
    >
      <GlobalModal.Body>
        <div className="goal-completion-modal__content">
          <div className="goal-completion-modal__lottie" aria-hidden="true">
            <Lottie options={lottieOptions} />
          </div>
          <h2>{t("works.myTasks.completionCongrats.title")}</h2>
          <p>{t("works.myTasks.completionCongrats.description")}</p>
          <CustomButton color="success" size="large" onClick={onClose}>
            {t("works.myTasks.completionCongrats.confirm")}
          </CustomButton>
        </div>
      </GlobalModal.Body>
    </GlobalModal>
  );
}

export default function WorksTasks() {
  const { id } = useParams();
  const { t } = useTranslation();
  const [showTaskAlertModal, setShowTaskAlertModal] = useState(false);
  const queryClient = useQueryClient();

  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showDeleteAlertModal, setShowDeleteAlertModal] = useState(false);
  const [showCompletionCongrats, setShowCompletionCongrats] = useState(false);
  const [hasSeenCompletionCongrats, setHasSeenCompletionCongrats] =
    useState(false);
  const [earlyExecutionDetails, setEarlyExecutionDetails] = useState(null);

  // API hooks
  const { goalTasks, isLoading } = useGetTasks(id);
  const { workDetails } = useGetWorkDetails(id);
  const { toggleGoalExe, isPending } = useGetToggleGoalExe();
  const { completeGoal, isPending: isCompleting } = useCompleteGoal();
  const { reorderTasks } = useReorderTasks();
  const { addTaskWithAi, isAdding } = useAddTaskWithAi();
  const { isDeleting, deleteAllTasks } = useDeleteAllTasks();
  const executionPercentage = Number(
    goalTasks?.["additional-data"]?.execution_percentage ?? 0,
  );
  const isCompletionReady =
    executionPercentage >= 100 && workDetails?.status !== "completed";

  const handleAddTaskWithAi = (id) => {
    addTaskWithAi(id, {
      onSuccess: (res) => {
        toast.success(res.message);
        queryClient.refetchQueries({ queryKey: ["work-tasks"] });
        queryClient.refetchQueries({ queryKey: ["work-details"] });
        setShowTaskAlertModal(false);
      },
      onError: (err) => {
        toast.error(err?.message);
      },
    });
  };

  // Load tasks from API
  useEffect(() => {
    if (goalTasks?.data) {
      const formatted = goalTasks.data.map((t) => ({
        ...t,
        id: String(t.id),
      }));
      setTasks(formatted);
    }
  }, [goalTasks]);

  // DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
  );

  // Toggle execution handler
  const handleToggleTaskExe = (goalId) => {
    toggleGoalExe(goalId, {
      onSuccess: (res) => {
        toast.success(res.message);
        queryClient.invalidateQueries({ queryKey: ["work-details"] });
        queryClient.refetchQueries({ queryKey: ["my-works"] });
        queryClient.refetchQueries({ queryKey: ["task-details"] });
        setShowAlertModal(false);
        setEarlyExecutionDetails(null);
      },
      onError: (err) => {
        toast.error(err.message || t("common.error"));
      },
    });
  };

  const handleStartExecution = () => {
    const scheduledDate = workDetails?.goal?.start_date;
    const earlyStartDetails = getEarlyExecutionDetails(scheduledDate);

    if (earlyStartDetails) {
      setEarlyExecutionDetails(earlyStartDetails);
      return;
    }

    handleToggleTaskExe(workDetails?.goal?.id);
  };

  const handleCompleteGoal = () => {
    completeGoal(workDetails?.id, {
      onSuccess: (res) => {
        toast.success(res?.message);
        queryClient.refetchQueries({ queryKey: ["work-details"] });
        queryClient.refetchQueries({ queryKey: ["work-tasks"] });
        queryClient.refetchQueries({ queryKey: ["my-works"] });
      },
      onError: (err) => {
        toast.error(err?.message);
      },
    });
  };

  useEffect(() => {
    if (!isCompletionReady) {
      setHasSeenCompletionCongrats(false);
      setShowCompletionCongrats(false);
      return;
    }

    if (!hasSeenCompletionCongrats) {
      setShowCompletionCongrats(true);
      setHasSeenCompletionCongrats(true);
    }
  }, [hasSeenCompletionCongrats, isCompletionReady]);

  // Handle DnD reorder
  const handleDragEnd = (event) => {
    if (workDetails.status === "completed") return;
    const { active, over } = event;
    if (!active || !over) return;
    if (active.id === over.id) return;

    setTasks((prev) => {
      const oldIndex = prev.findIndex((t) => t.id === String(active.id));
      const newIndex = prev.findIndex((t) => t.id === String(over.id));
      if (oldIndex === -1 || newIndex === -1) return prev;

      const reordered = arrayMove(prev, oldIndex, newIndex);

      reorderTasks(
        reordered.map((t) => t.id),
        {
          onSuccess: () => {
            toast.success(t("works.myTasks.reorderSuccess"));
            queryClient.invalidateQueries({ queryKey: ["tasks", id] });
          },
          onError: () => {
            toast.error(t("works.myTasks.reorderError"));
          },
        },
      );

      return reordered;
    });
  };

  const handleDeleteAllTasks = (workId) => {
    deleteAllTasks(workId, {
      onSuccess: (res) => {
        toast.success(res?.message);
        queryClient.refetchQueries({ queryKey: ["work-tasks"] });
        setShowDeleteAlertModal(false);
      },
      onError: (err) => {
        toast.error(err?.message || t("common.error"));
      },
    });
  };

  if (isLoading) return <Loading />;
  if (goalTasks?.data?.length === 0)
    return <NoTasks workDetails={workDetails} />;

  return (
    <section className="tasks-page">
      {/* Info Section */}
      <div className="info-grid">
        <div className="info-box flex-grow-1">
          <h4 className="label">{t("works.myTasks.startExecution")}</h4>
          <p className="value">
            {goalTasks["additional-data"]?.start_of_execution || "---"}
          </p>
        </div>
        <div className="info-box flex-grow-1">
          <h4 className="label">{t("works.myTasks.endExecution")}</h4>
          <p className="value">
            {goalTasks["additional-data"]?.end_of_execution || "---"}
          </p>
        </div>
        <div className="info-box flex-grow-1">
          <h4 className="label">{t("works.myTasks.executionRate")}</h4>
          <p className="value">
            {goalTasks["additional-data"]?.execution_percentage} %
          </p>
        </div>
      </div>

      {/* Tasks Section */}
      <div className="execution-tasks">
        <div className="tasks-header">
          <div>
            <h1>{t("works.myTasks.title")}</h1>
            <p>{t("works.myTasks.dragInstruction")}</p>
          </div>
          {goalTasks?.data?.length > 0 &&
            workDetails.status !== "completed" && (
              <CustomButton
                size="large"
                color="fire"
                onClick={() => setShowDeleteAlertModal(true)}
              >
                {t("works.myTasks.deleteAll")}
              </CustomButton>
            )}
        </div>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={tasks.map((t) => t.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="tasks-list">
              {tasks.map((task) =>
                workDetails.status === "completed" ? (
                  <TaskCard
                    key={task.id}
                    task={task}
                    isDragable={false}
                    allowNavigation
                    isReadOnly
                    detailsPath={`/my-works/${id}/tasks/${task.id}`}
                  />
                ) : (
                  <SortableTask key={task.id} task={task} workId={id} />
                ),
              )}
            </div>
          </SortableContext>
        </DndContext>
        {/* Buttons */}
        {workDetails.status !== "completed" && (
          <div className="buttons mt-3 flex-wrap justify-content-end">
            {isCompletionReady ? (
              <CustomButton
                style={{ whiteSpace: "nowrap" }}
                color="success"
                size="large"
                loading={isCompleting}
                onClick={handleCompleteGoal}
              >
                {t("works.myTasks.completeGoalBtn")}
              </CustomButton>
            ) : workDetails?.rectangle === "personal_goal" ? (
              <>
                <CustomButton
                  style={{ whiteSpace: "nowrap" }}
                  size="large"
                  variant="outlined"
                  loading={isPending}
                  onClick={() => {
                    if (!workDetails?.goal?.is_paused) setShowAlertModal(true);
                    else handleStartExecution();
                  }}
                >
                  {workDetails?.goal?.is_paused
                    ? t("works.myTasks.startExecutionBtn")
                    : t("works.myTasks.pauseExecutionBtn")}
                </CustomButton>
              </>
            ) : (
              <>
                {workDetails?.goal?.is_paused === true && (
                  <CustomButton
                    style={{ whiteSpace: "nowrap" }}
                    size="large"
                    variant="outlined"
                    loading={isPending}
                    onClick={handleStartExecution}
                  >
                    {t("works.myTasks.startExecutionBtn")}
                  </CustomButton>
                )}
              </>
            )}
            <CustomButton
              style={{ whiteSpace: "nowrap" }}
              size="large"
              icon={<i className="fa-solid fa-plus"></i>}
              onClick={() => setShowModal(true)}
            >
              {t("works.myTasks.addNew")}
            </CustomButton>{" "}
            {!workDetails?.goal?.ai_used_in_tasks && (
              <CustomButton
                type="button"
                size="large"
                onClick={() => setShowTaskAlertModal(true)}
                loading={isAdding}
                icon={<i className="fa-solid fa-sparkles"></i>}
                className="generate-button"
                style={{
                  marginTop: "0",
                }}
              >
                {t("generateTasks")}
              </CustomButton>
            )}
          </div>
        )}
        {/* Modals */}
        {showModal && (
          <AddTasksModal showModal={showModal} setShowModal={setShowModal} />
        )}
        {showAlertModal && (
          <AlertModal
            confirmButtonText={t("confirm")}
            showModal={showAlertModal}
            setShowModal={setShowAlertModal}
            onConfirm={() => handleToggleTaskExe(workDetails?.goal?.id)}
            loading={isPending}
          >
            {t("works.myTasks.pauseExecutionWarning")}
          </AlertModal>
        )}
        {showTaskAlertModal && (
          <AlertModal
            confirmButtonText={t("works.myTasks.generateTasksConfirmBtn")}
            showModal={showTaskAlertModal}
            setShowModal={setShowTaskAlertModal}
            onConfirm={() => handleAddTaskWithAi(workDetails?.id)}
            loading={isAdding}
          >
            {t("works.myTasks.generateTasksWarning")}
          </AlertModal>
        )}
        {showDeleteAlertModal && (
          <AlertModal
            confirmButtonText={t("confirm")}
            showModal={showDeleteAlertModal}
            setShowModal={setShowDeleteAlertModal}
            onConfirm={() => handleDeleteAllTasks(workDetails?.id)}
            loading={isDeleting}
          >
            {t("works.myTasks.deleteAllWarning")}
          </AlertModal>
        )}
        <EarlyExecutionWarningModal
          showModal={!!earlyExecutionDetails}
          scheduledDate={earlyExecutionDetails?.scheduledDate}
          daysUntilStart={earlyExecutionDetails?.daysUntilStart}
          loading={isPending}
          onCancel={() => setEarlyExecutionDetails(null)}
          onContinue={() => handleToggleTaskExe(workDetails?.goal?.id)}
        />
        <GoalCompletionCongratsModal
          show={showCompletionCongrats}
          onClose={() => setShowCompletionCongrats(false)}
        />
      </div>
    </section>
  );
}
