import { useParams } from "react-router";
import useGetTasks from "../../../hooks/website/MyWorks/tasks/useGetTasks";
import NoTasks from "../../../ui/website/my-works/NoTasks";
import { useTranslation } from "react-i18next";
import TaskCard from "../../../ui/website/my-works/tasks/TaskCard";

export default function WorksTasks() {
  const { id } = useParams();
  const { t } = useTranslation();
  const { goalTasks, isLoading } = useGetTasks(id);

  console.log(goalTasks);

  console.log(goalTasks);
  if (goalTasks?.data === 0) {
    return <NoTasks />;
  }
  if (isLoading) {
    return <p>loading</p>;
  }
  return (
    <section className="tasks-page">
      {" "}
      <div className="info-grid">
        <div className="info-box flex-grow-1">
          <div className="label">بداية التنفيذ</div>
          <div className="value">
            {goalTasks["additional-data"]?.start_of_execution
              ? goalTasks["additional-data"]?.start_of_execution
              : "---"}
          </div>
        </div>{" "}
        <div className="info-box flex-grow-1">
          <div className="label">اكتمال التنفيذ</div>{" "}
          <div className="value">
            {goalTasks["additional-data"].end_of_execution
              ? goalTasks["additional-data"].end_of_execution
              : "---"}
          </div>
        </div>{" "}
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
          <div className="row">
            {goalTasks?.data.map((task) => (
              <div className="col-12 p-2" key={task?.id}>
                <TaskCard task={task} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
