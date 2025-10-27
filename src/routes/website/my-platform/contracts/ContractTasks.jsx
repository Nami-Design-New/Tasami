import { useParams } from "react-router";
import useGetTasks from "../../../../hooks/website/MyWorks/tasks/useGetTasks";
import TaskCard from "../../../../ui/website/my-works/tasks/TaskCard";

export default function ContractTasks() {
  const { id } = useParams();
  const { goalTasks, isLoading } = useGetTasks(id);
  if (isLoading) return <p>lodddddings</p>;
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
        </div>
        <div className="tasks-list">
          {goalTasks.data.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    </section>
  );
}
