import { useState } from "react";
import { useTranslation } from "react-i18next";
import CustomButton from "../../CustomButton";
import AddTasksModal from "./tasks/AddTasksModal";

export default function NoTasks() {
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <div className="no-tasks">
        <img src="/icons/no-tasks-icon.svg" alt="No tasks" />
        <p>{t("works.myTasks.noTasks")}</p>
      </div>

      <div className="button-wrapper d-flex mt-2 align-items-center gap-2">
        <CustomButton
          style={{ whiteSpace: "nowrap" }}
          size="large"
          icon={<i className="fa-solid fa-plus"></i>}
          onClick={() => setShowModal(true)}
          fullWidth
        >
          {t("works.myTasks.addNew")}
        </CustomButton>
      </div>

      <AddTasksModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
}
