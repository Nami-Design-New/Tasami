import { useParams } from "react-router";
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

// Sortable item wrapper for each TaskCard
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
      {/* disableLink is assumed prop to prevent navigation while dragging */}
      <TaskCard task={task} isDragging={isDragging} />
    </div>
  );
}

export default function WorksTasks() {
  const { id } = useParams();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);

  // API hooks
  const { goalTasks, isLoading } = useGetTasks(id);
  const { workDetails } = useGetWorkDetails(id);
  const { toggleGoalExe, isPending } = useGetToggleGoalExe();
  const { reorderTasks } = useReorderTasks();

  // Load tasks from API into local state
  useEffect(() => {
    if (goalTasks?.data) {
      const formatted = goalTasks.data.map((t) => ({
        ...t,
        id: String(t.id),
      }));
      setTasks(formatted);
      console.log(
        "[useEffect] tasks synced from API:",
        formatted.map((t) => t.id)
      );
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
        queryClient.invalidateQueries({ queryKey: ["my-works"] });
        // queryClient.invalidateQueries({ queryKey: ["tasks", id] });
      },
      onError: (err) => {
        console.error("[handleToggleTaskExe] Error:", err);
        toast.error(err.message);
      },
    });
  };

  // Handle DnD reorder
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!active || !over) return;
    if (active.id === over.id) return;

    console.log("[handleDragEnd] Active:", active.id, "Over:", over.id);
    console.log(
      "[handleDragEnd] Current task IDs:",
      tasks.map((t) => t.id)
    );

    setTasks((prev) => {
      const oldIndex = prev.findIndex((t) => t.id === String(active.id));
      const newIndex = prev.findIndex((t) => t.id === String(over.id));

      if (oldIndex === -1 || newIndex === -1) {
        console.warn("[handleDragEnd] ❌ One of the items not found");
        return prev;
      }

      const reordered = arrayMove(prev, oldIndex, newIndex);
      console.log(
        "[handleDragEnd] ✅ New local order:",
        reordered.map((t) => t.id)
      );

      // Immediately update local UI
      // Then sync with backend
      reorderTasks(
        reordered.map((t) => t.id),
        {
          onSuccess: () => {
            toast.success("تم حفظ ترتيب المهام بنجاح");
            queryClient.invalidateQueries({ queryKey: ["tasks", id] }); // refetch latest from server
          },
          onError: (err) => {
            console.error("❌ Reorder failed:", err);
            toast.error("حدث خطأ أثناء حفظ الترتيب");
          },
        }
      );

      return reordered;
    });
  };

  if (isLoading) return <p>جار التحميل...</p>;
  if (goalTasks?.data?.length === 0) return <NoTasks />;

  return (
    <section className="tasks-page">
      {/* Info Section */}
      <div className="info-grid">
        <div className="info-box flex-grow-1">
          <div className="label">بداية التنفيذ</div>
          <div className="value">
            {goalTasks["additional-data"]?.start_of_execution || "---"}
          </div>
        </div>
        <div className="info-box flex-grow-1">
          <div className="label">اكتمال التنفيذ</div>
          <div className="value">
            {goalTasks["additional-data"]?.end_of_execution || "---"}
          </div>
        </div>
        <div className="info-box flex-grow-1">
          <div className="label">نسبة الانجاز</div>
          <div className="value">
            {goalTasks["additional-data"]?.execution_percentage}
          </div>
        </div>
      </div>

      {/* Tasks Section */}
      <div className="execution-tasks">
        <div className="tasks-header">
          <h1>المهام التنفيذية</h1>
          <p>يمكنك السحب والإفلات لإعادة ترتيب المهام</p>
        </div>

        {/* Drag-and-Drop Context */}
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
            {workDetails?.goal?.is_paused ? "بدء التنفيذ" : "ايقاف التنفيذ"}
          </CustomButton>

          <CustomButton
            style={{ whiteSpace: "nowrap" }}
            size="large"
            icon={<i className="fa-solid fa-plus"></i>}
            onClick={() => setShowModal(true)}
          >
            إضافة مهمة جديدة
          </CustomButton>
        </div>

        {/* Modals */}
        <AddTasksModal showModal={showModal} setShowModal={setShowModal} />
        <AlertModal
          confirmButtonText={t("confirm")}
          showModal={showAlertModal}
          setShowModal={setShowAlertModal}
          onConfirm={() => handleToggleTaskExe(workDetails?.goal?.id)}
          loading={isPending}
        >
          سيتم إيقاف تنفيذ المهام مؤقتاً وتعطيل جميع التنبيهات المرتبطة بها.
          بإمكانك استئناف التنفيذ لاحقاً عبر وظيفة &quot;بدء التنفيذ&quot; من
          صفحة المهام.
        </AlertModal>
      </div>
    </section>
  );
}
