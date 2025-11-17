import { useState } from "react";
import { useTranslation } from "react-i18next";
import CustomButton from "../../CustomButton";
import AddTasksModal from "./tasks/AddTasksModal";
import useAddTaskWithAi from "../../../hooks/website/MyWorks/tasks/useAddTaskWithAi";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function NoTasks({ workDetails, noActions = false }) {
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { addTaskWithAi, isAdding } = useAddTaskWithAi();

  const handleAddTaskWithAi = (id) => {
    addTaskWithAi(id, {
      onSuccess: (res) => {
        toast.success(res.message);
        queryClient.refetchQueries({ queryKey: ["work-tasks"] });
        queryClient.refetchQueries({ queryKey: ["work-details"] });
      },
      onError: (err) => {
        toast.error(err?.message);
      },
    });
  };
  return (
    <>
      <div className="no-tasks">
        <img src="/icons/no-tasks-icon.svg" alt="No tasks" />
        <p>{t("works.myTasks.noTasks")}</p>
      </div>

      {!noActions && (
        <div className="button-wrapper d-flex mt-2 align-items-center gap-2">
          <CustomButton
            style={{ whiteSpace: "nowrap" }}
            size="large"
            icon={<i className="fa-solid fa-plus"></i>}
            onClick={() => setShowModal(true)}
            fullWidth
          >
            {t("works.myTasks.addNew")}
          </CustomButton>{" "}
          {!workDetails?.goal?.ai_used_in_tasks && (
            <CustomButton
              type="button"
              size="large"
              onClick={() => handleAddTaskWithAi(workDetails?.id)}
              loading={isAdding}
              icon={<i className="fa-solid fa-sparkles"></i>}
              style={{
                backgroundColor: "#FDCB2F",
                // marginTop: "12px",
              }}
            >
              {t("generate")}
            </CustomButton>
          )}
        </div>
      )}

      <AddTasksModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
}
