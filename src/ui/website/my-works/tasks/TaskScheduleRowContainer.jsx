import useTaskScheduleRow from "../../../../hooks/website/MyWorks/tasks/useTaskScheduleRow";
import TaskScheduleRow from "./TaskScheduleRow";

export default function TaskScheduleRowContainer(props) {
  const row = useTaskScheduleRow(props);

  return <TaskScheduleRow {...row} />;
}
