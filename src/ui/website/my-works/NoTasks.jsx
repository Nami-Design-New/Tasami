import { useState } from "react";
import CustomButton from "../../CustomButton";
import AddTasksModal from "./tasks/AddTasksModal";

export default function NoTasks() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className="no-tasks">
        <img src="/icons/no-tasks-icon.svg" />
        <p>لا توجد مهام مضافة</p>
      </div>
      <div className="button-wrapper d-flex mt-2 align-items-center gap-2">
        <CustomButton
          style={{ whiteSpace: "nowrap" }}
          size="large"
          icon={<i className="fa-solid fa-plus"></i>}
          onClick={() => setShowModal(true)}
          fullWidth
        >
          إضافة مهمة جديدة
        </CustomButton>
      </div>
      <AddTasksModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
}
