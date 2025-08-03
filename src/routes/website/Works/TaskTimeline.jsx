import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Link } from "react-router";

export default function TaskTimeline({ tasks, setTasks, onConfirm }) {
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTasks(items);
  };

  return (
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
                        {["pending", "waiting"].includes(task.status) && (
                          <i className="fa-regular fa-hourglass-half"></i>
                        )}
                      </div>

                      <div className="task-card-wrapper">
                        <Link to={`/tasks/${task.id}`} className="task-card-link">
                          <div className="task-card">
                            <p className="task-title">{task.title}</p>
                            <div className="task-info">
                              <span>
                                <img src="/icons/date.svg" alt="date" /> {task.date}
                              </span>
                              <span>
                                <img src="/icons/aim.svg" alt="aim" /> {task.type}
                              </span>
                              <span>
                                <img src="/icons/bell.svg" alt="bell" /> {task.duration}
                              </span>
                            </div>
                          </div>
                        </Link>

                        <button
                          className="confirm-btn"
                          onClick={() => onConfirm(task.id)}
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
    </div>
  );
}
