import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import CancelConfirmationModal from "../../../ui/modals/CancelConfirmationModal";
import PerformanceConfirmationModal from "../../../ui/modals/PerformanceConfirmationModal";
import { Link } from "react-router";
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

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTasks(items);
  };

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

      <div className="tasks-timeline">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="timeline">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {tasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div
                        className="task-item"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className="timeline-line" />
                        <div className={`timeline-icon ${task.status}`}>
                          {task.status === "done" && (
                            <i className="fa-solid fa-check"></i>
                          )}
                          {task.status === "pending" && (
                            <i className="fa-regular fa-hourglass-half"></i>
                          )}
                          {task.status === "waiting" && (
                            <i className="fa-regular fa-hourglass-half"></i>
                          )}
                        </div>

                        <div className="task-card-wrapper">
                          <Link
                            to={`/tasks/${task.id}`}
                            className="task-card-link"
                          >
                            <div className="task-card">
                              <p className="task-title">{task.title}</p>
                              <div className="task-info">
                                <span>
                                  <img src="/icons/date.svg" alt="date" />{" "}
                                  {task.date}
                                </span>
                                <span>
                                  <img src="/icons/aim.svg" alt="aim" />{" "}
                                  {task.type}
                                </span>
                                <span>
                                  <img src="/icons/bell.svg" alt="bell" />{" "}
                                  {task.duration}
                                </span>
                              </div>
                            </div>
                          </Link>

                          <button
                            className="confirm-btn"
                            onClick={() => {
                              setSelectedTaskId(task.id);
                              setShowConfirmModal(true);
                            }}
                          >
                            تأكيد الأداء
                          </button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <div className="cancel">
          <button
            className="cancel-btn"
            onClick={() => setShowCancelModal(true)}
          >
            ايقاف التنفيذ
          </button>
        </div>
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
    </div>
  );
}
