import React, { useEffect, useState } from "react";
import useGetTaskDetails from "../../../hooks/website/MyWorks/tasks/useGetTaskDetails";
import Loading from "../../../ui/loading/Loading";
import RoundedBackButton from "../../../ui/website-auth/shared/RoundedBackButton";
import { useNavigate, useParams } from "react-router";
import OptionsMenu from "../../../ui/website/OptionsMenu";
import { useTranslation } from "react-i18next";
import { TASKS_STATUS } from "../../../utils/constants";
import useUpdateTaskStatus from "../../../hooks/website/MyWorks/tasks/useUpdateTaskStatus";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import AddTasksModal from "../../../ui/website/my-works/tasks/AddTasksModal";
import AlertModal from "../../../ui/website/platform/my-community/AlertModal";
import useDeleteTask from "../../../hooks/website/MyWorks/tasks/useDeleteTask";

export default function TaskDetails() {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [showAddModal, setShowAddModal] = useState();
  const { taskDetails, isLoading } = useGetTaskDetails();
  const { updateTaskStatus, isPending } = useUpdateTaskStatus();
  const { deleteTask, isPending: isDeleting } = useDeleteTask();

  const [selectedStatus, setSelectedStatus] = useState(taskDetails?.status);

  const handleChange = (e) => {
    setSelectedStatus(e.target.value);
    updateTaskStatus(
      { status: e.target.value, id: taskDetails?.id },
      {
        onSuccess: (res) => {
          toast.success(res?.message);
          queryClient.invalidateQueries({ queryKey: ["task-details"] });
          queryClient.refetchQueries({ queryKey: ["work-tasks"] });
        },
        onError: (err) => {
          toast.error(err?.message);
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
    setSelectedStatus(taskDetails?.status);
  }, [taskDetails?.status]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="task_details page">
      <div className="container">
        <header className="task-details__header">
          <div className="d-flex gap-3">
            <RoundedBackButton onClick={() => navigate(-1)}></RoundedBackButton>
            <h1>تفاصيل المهمة</h1>
          </div>
          <OptionsMenu
            options={[
              {
                label: t("website.offerDetails.edit"),
                onClick: () => setShowAddModal(true),
              },
              {
                label: t("website.offerDetails.delete"),
                onClick: () =>
                  handleDeleteTask(taskDetails?.id, taskDetails?.work_id),
                props: { disabled: isDeleting },
                className: "text-danger",
              },
            ]}
          />
        </header>
        <div className="row mt-4">
          <div className="col-12 p-2">
            <div className="info-grid w-100">
              <div className="info-box flex-grow-1">
                <div className="label">عنوان المهمة</div>
                <div className="value white-space-wrap">
                  {taskDetails.title}
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 p-2">
            <div className="info-grid w-100">
              <div className="info-box flex-grow-1">
                <div className="label">ملاحظات</div>
                <div className="value white-space-wrap">
                  {taskDetails?.notes}
                </div>
              </div>
            </div>
          </div>
          <div className="col-4 p-2">
            <div className="info-grid w-100">
              <div className="info-box flex-grow-1">
                <div className="label">تصنيف المهمة</div>
                <div className="value">
                  {" "}
                  {taskDetails?.task_category?.title}
                </div>
              </div>
            </div>
          </div>
          <div className="col-4 p-2">
            <div className="info-grid w-100">
              <div className="info-box flex-grow-1">
                <div className="label">إشعارات التذكير</div>
                <div className="value">{taskDetails?.notification_repeat}</div>
              </div>
            </div>
          </div>
          <div className="col-4 p-2">
            <div className="info-grid w-100">
              <div className="info-box flex-grow-1">
                <div className="label">تاريخ الانجاز</div>
                <div className="value">{taskDetails?.expected_end_date}</div>
              </div>
            </div>
          </div>
          <div className="col-12  p-2">
            <div className="identity-selector">
              <div className="d-flex  align-items-center mb-2">
                <h6 className="identity-title m-0">حالة المهمة</h6>{" "}
                {taskDetails.is_paused && (
                  <p className="hint">(يجب بدء التنفيذ لتغيير الحاله)</p>
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
                    <span>{status}</span>
                    <input
                      type="radio"
                      name="taskStatus"
                      value={status}
                      checked={selectedStatus === status}
                      onChange={handleChange}
                      disabled={taskDetails.is_paused}
                    />
                  </label>
                ))}
              </div>
            </div>
          </div>
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
