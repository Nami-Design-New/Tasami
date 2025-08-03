import React, { useState } from "react";
import TaskTimeline from "./TaskTimeline";
import CancelConfirmationModal from "../../../ui/modals/CancelConfirmationModal";
import PerformanceConfirmationModal from "../../../ui/modals/PerformanceConfirmationModal";
import NewTaskModal from "../../../ui/modals/NewTaskModal";


const initialTasks = [
  {
    id: "1",
    title: "إطلاق منصة إلكترونية...",
    date: "15 إبريل 2025",
    type: "مهمة تنفيذية",
    duration: "يومًا",
    status: "done",
  },
  {
    id: "2",
    title: "إطلاق منصة إلكترونية...",
    date: "15 إبريل 2025",
    type: "مهمة تنفيذية",
    duration: "أسبوعًا",
    status: "waiting",
  },
  {
    id: "3",
    title: "إطلاق منصة إلكترونية...",
    date: "15 إبريل 2025",
    type: "مهمة تنفيذية",
    duration: "شهريًا",
    status: "pending",
  },
  {
    id: "4",
    title: "مهمة أخرى",
    date: "20 إبريل 2025",
    type: "مهمة تنفيذية",
    duration: "أسبوعين",
    status: "done",
  },
];



export default function TasksDetails() {
  const [tasks, setTasks] = useState(initialTasks);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
const [showTaskModal, setShowTaskModal] = useState(false);

  const handleConfirm = (notes) => {
    console.log("تم تأكيد الأداء للمهمة:", selectedTaskId, "بملاحظات:", notes);
    setSelectedTaskId(null);
  };

  return (
    <div className="tasks-page">
      <div className="info-grid">
        <div className="info-box">
          <div className="label"> بداية التنفيذ</div>
          <div className="value">12-2-2025</div>
        </div>
        <div className="info-box">
          <div className="label"> اكتمال التنفيذ</div>
          <div className="value">----</div>
        </div>
        <div className="info-box">
          <div className="label">نسبة الانجاز</div>
          <div className="value">91%</div>
        </div>
      </div>

      <h4 className="section-title">المهام التنفيذية</h4>
      <p className="hint">بإمكانك السحب والإفلات لإعادة ترتيب المهام</p>

      <TaskTimeline
        tasks={tasks}
        setTasks={setTasks}
        onConfirm={(taskId) => {
          setSelectedTaskId(taskId);
          setShowConfirmModal(true);
        }}
      />

      <div className="cancel">
        <button className="cancel-btn" onClick={() => setShowCancelModal(true)}>
          ايقاف التنفيذ
        </button>
        
          <button className="follow-btn" onClick={() => setShowTaskModal(true)}>
              <i className="fa-solid fa-plus me-2"></i> اضافه مهمه جديده
            </button>
      </div>

      <CancelConfirmationModal
        show={showCancelModal}
        onClose={() => setShowCancelModal(false)}
      />

      <PerformanceConfirmationModal
        showModal={showConfirmModal}
        setShowModal={setShowConfirmModal}
        onConfirm={handleConfirm}
      />
      <NewTaskModal
  showModal={showTaskModal}
  setShowModal={setShowTaskModal}
  onSubmit={(data) => console.log("تم حفظ المهمة:", data)}
/>;

    </div>
  );
}
