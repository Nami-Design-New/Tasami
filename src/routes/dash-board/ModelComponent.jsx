import { useParams } from "react-router";
import useGetShowTask from "../../hooks/dashboard/tasks/useGetShowTask";
import Details from "../../ui/ModelComponent/Details";
import EmployeeData from "../../ui/ModelComponent/EmployeeData";
import Header from "../../ui/ModelComponent/Header";
import ModelInfo from "../../ui/ModelComponent/ModelInfo";
import Notes from "../../ui/ModelComponent/Notes";
import { PAGE_SIZE } from "../../utils/constants";
import { useState } from "react";
import { useTranslation } from "react-i18next";
const ModelComponent = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  // const [selectedRow, setSelectedRow] = useState();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const { taskData, currentPage, lastPage, isLoading } = useGetShowTask(
    "",
    page,
    PAGE_SIZE,
    id
  );


  return (
    <section className="model">
      <Header
        title={`${t("dashboard.tasks.modelTask.header")} ${
          taskData?.task?.system_type.title
        }`}
      />
      <EmployeeData taskData={taskData} />
      <ModelInfo taskData={taskData} />
      <Details taskData={taskData} />
      <Notes
        taskData={taskData}
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        currentPage={currentPage}
        lastPage={lastPage}
        isLoading={isLoading}
      />

    </section>
  );
};

export default ModelComponent;
