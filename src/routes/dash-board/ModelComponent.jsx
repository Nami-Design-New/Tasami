import { useParams } from "react-router";
import useGetShowTask from "../../hooks/dashboard/tasks/useGetShowTask";
import Details from "../../ui/ModelComponent/Details";
import EmployeeData from "../../ui/ModelComponent/EmployeeData";
import Header from "../../ui/ModelComponent/Header";
import ModelInfo from "../../ui/ModelComponent/ModelInfo";
import Notes from "../../ui/ModelComponent/Notes";
import { PAGE_SIZE } from "../../utils/constants";
import { useState } from "react";
const ModelComponent = () => {
  const { id } = useParams();

  // const [selectedRow, setSelectedRow] = useState();
  const [page, setPage] = useState(1);
  // const [pageSize, setPageSize] = useState(PAGE_SIZE);

  const { taskData } = useGetShowTask("", page, PAGE_SIZE, id);

  return (
    <section className="model">
      <Header title="نموذج خدمه العملاء" />
      <EmployeeData taskData={taskData} />
      <ModelInfo taskData={taskData} />
      <Details taskData={taskData} />
      <Notes taskData={taskData} />
    </section>
  );
};

export default ModelComponent;
