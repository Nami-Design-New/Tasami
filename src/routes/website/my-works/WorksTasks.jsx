import { useOutletContext, useParams } from "react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// UI
import NoTasks from "../../../ui/website/my-works/NoTasks";
import TaskCard from "../../../ui/website/my-works/tasks/TaskCard";
import CustomButton from "../../../ui/CustomButton";
import AddTasksModal from "../../../ui/website/my-works/tasks/AddTasksModal";
import AlertModal from "../../../ui/website/platform/my-community/AlertModal";

// Hooks
import useGetTasks from "../../../hooks/website/MyWorks/tasks/useGetTasks";
import useGetWorkDetails from "../../../hooks/website/MyWorks/useGetWorkDetails";
import useGetToggleGoalExe from "../../../hooks/website/MyWorks/tasks/useGetToggleGoalExe";
import useReorderTasks from "../../../hooks/website/MyWorks/tasks/useReorderTasks";

// DnD Kit
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Loading from "../../../ui/loading/Loading";

// Sortable wrapper for TaskCard
function SortableTask({ task }) {
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
    cursor: "grab",
    opacity: isDragging ? 0.7 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskCard task={task} isDragging={isDragging} />
    </div>
  );
}

export default function WorksTasks() {
  const { id } = useParams();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { setTasksSummary } = useOutletContext();

  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);

  // API hooks
  const { goalTasks, isLoading } = useGetTasks(id);
  const { workDetails } = useGetWorkDetails(id);
  const { toggleGoalExe, isPending } = useGetToggleGoalExe();
  const { reorderTasks } = useReorderTasks();

  useEffect(() => {
    if (goalTasks?.data) {
      setTasksSummary({
        exePercentage: goalTasks["additional-data"]?.execution_percentage,
      });
    }
  }, [goalTasks, setTasksSummary]);

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
    })
  );

  // Toggle execution handler
  const handleToggleTaskExe = (goalId) => {
    toggleGoalExe(goalId, {
      onSuccess: (res) => {
        toast.success(res.message);
        queryClient.invalidateQueries({ queryKey: ["work-details"] });
        queryClient.refetchQueries({ queryKey: ["my-works"] });
        queryClient.refetchQueries({ queryKey: ["task-details"] });
      },
      onError: (err) => {
        toast.error(err.message || t("common.error"));
      },
    });
  };

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
        }
      );

      return reordered;
    });
  };

  if (isLoading) return <Loading />;
  if (goalTasks?.data?.length === 0) return <NoTasks />;

  return (
    <section className="tasks-page">
      {/* Info Section */}
      <div className="info-grid">
        <div className="info-box flex-grow-1">
          <div className="label">{t("works.myTasks.startExecution")}</div>
          <div className="value">
            {goalTasks["additional-data"]?.start_of_execution || "---"}
          </div>
        </div>
        <div className="info-box flex-grow-1">
          <div className="label">{t("works.myTasks.endExecution")}</div>
          <div className="value">
            {goalTasks["additional-data"]?.end_of_execution || "---"}
          </div>
        </div>
        <div className="info-box flex-grow-1">
          <div className="label">{t("works.myTasks.executionRate")}</div>
          <div className="value">
            {goalTasks["additional-data"]?.execution_percentage}
          </div>
        </div>
      </div>

      {/* Tasks Section */}
      <div className="execution-tasks">
        <div className="tasks-header">
          <h1>{t("works.myTasks.title")}</h1>
          <p>{t("works.myTasks.dragInstruction")}</p>
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
              {tasks.map((task) => (
                <SortableTask key={task.id} task={task} />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {/* Buttons */}
        {workDetails.status !== "completed" && (
          <div className="buttons mt-3 justify-content-end">
            <CustomButton
              style={{ whiteSpace: "nowrap" }}
              size="large"
              variant="outlined"
              loading={isPending}
              onClick={() => {
                if (!workDetails?.goal?.is_paused) setShowAlertModal(true);
                else handleToggleTaskExe(workDetails?.goal?.id);
              }}
            >
              {workDetails?.goal?.is_paused
                ? t("works.myTasks.startExecutionBtn")
                : t("works.myTasks.pauseExecutionBtn")}
            </CustomButton>

            <CustomButton
              style={{ whiteSpace: "nowrap" }}
              size="large"
              icon={<i className="fa-solid fa-plus"></i>}
              onClick={() => setShowModal(true)}
            >
              {t("works.myTasks.addNew")}
            </CustomButton>
          </div>
        )}

        {/* Modals */}
        <AddTasksModal showModal={showModal} setShowModal={setShowModal} />
        <AlertModal
          confirmButtonText={t("confirm")}
          showModal={showAlertModal}
          setShowModal={setShowAlertModal}
          onConfirm={() => handleToggleTaskExe(workDetails?.goal?.id)}
          loading={isPending}
        >
          {t("works.myTasks.pauseExecutionWarning")}
        </AlertModal>
      </div>
    </section>
  );
}
