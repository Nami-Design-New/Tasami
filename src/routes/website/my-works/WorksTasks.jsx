import { useParams } from "react-router";
import useGetTasks from "../../../hooks/website/MyWorks/tasks/useGetTasks";
import NoTasks from "../../../ui/website/my-works/NoTasks";
import { useTranslation } from "react-i18next";
import TaskCard from "../../../ui/website/my-works/tasks/TaskCard";
import CustomButton from "../../../ui/CustomButton";
import { useState } from "react";
import AddTasksModal from "../../../ui/website/my-works/tasks/AddTasksModal";
import useGetToggleGoalExe from "../../../hooks/website/MyWorks/tasks/useGetToggleGoalExe";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import useGetWorkDetails from "../../../hooks/website/MyWorks/useGetWorkDetails";
import AlertModal from "../../../ui/website/platform/my-community/AlertModal";

export default function WorksTasks() {
  const { id } = useParams();
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);

  const { goalTasks, isLoading } = useGetTasks(id);
  const { workDetails } = useGetWorkDetails(id);
  const queryClient = useQueryClient();
  const { toggleGoalExe, isPending } = useGetToggleGoalExe();

  const handleToggleTaskExe = (id) => {
    toggleGoalExe(id, {
      onSuccess: (res) => {
        toast.success(res.message);
        queryClient.invalidateQueries({ queryKey: ["work-details"] });
        queryClient.refetchQueries({ queryKey: ["my-works"] });
        queryClient.refetchQueries({ queryKey: ["task-details"] });
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  };

  console.log(goalTasks?.data);
  if (goalTasks?.data?.length === 0) {
    return <NoTasks />;
  }
  if (isLoading) {
    return <p>loading</p>;
  }
  return (
    <section className="tasks-page">
      <div className="info-grid">
        <div className="info-box flex-grow-1">
          <div className="label">بداية التنفيذ</div>
          <div className="value">
            {goalTasks["additional-data"]?.start_of_execution
              ? goalTasks["additional-data"]?.start_of_execution
              : "---"}
          </div>
        </div>
        <div className="info-box flex-grow-1">
          <div className="label">اكتمال التنفيذ</div>{" "}
          <div className="value">
            {goalTasks["additional-data"].end_of_execution
              ? goalTasks["additional-data"].end_of_execution
              : "---"}
          </div>
        </div>
        <div className="info-box flex-grow-1">
          <div className="label">نسبة الانجاز</div>
          <div className="value">
            {goalTasks["additional-data"].execution_percentage}
          </div>
        </div>
      </div>
      <div className="execution-tasks">
        <div className="tasks-header">
          <h1>المهام التنفيذية</h1>
          <p>يمكنك السحب والإفلات لإعادة ترتيب المهام</p>
        </div>
        <div className="tasks-list">
          {goalTasks?.data.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
        <div className="buttons mt-3 justify-content-end">
          <CustomButton
            style={{ whiteSpace: "nowrap" }}
            size="large"
            variant="outlined"
            loading={isPending}
            onClick={() => {
              if (!workDetails?.goal?.is_paused) {
                setShowAlertModal(true);
              } else {
                handleToggleTaskExe(workDetails?.goal?.id);
              }
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
        <AddTasksModal showModal={showModal} setShowModal={setShowModal} />
        <AlertModal
          confirmButtonText={t("confirm")}
          showModal={showAlertModal}
          setShowModal={setShowAlertModal}
          onConfirm={() => handleToggleTaskExe(workDetails?.goal?.id)}
          loading={isPending}
        >
          سيتم إيقاف تنفيذ المهام مؤقتاً وتعطيل جميع التنبيهات المرتبطة بها.
          بإمكانك استئناف التنفيذ لاحقاً عبر وظيفة &quot; بدء التنفيذ &quot; من
          صفحة المهام
        </AlertModal>
      </div>
    </section>
  );
}
