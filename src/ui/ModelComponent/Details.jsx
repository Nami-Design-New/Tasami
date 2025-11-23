import { useTranslation } from "react-i18next";
import FormWrapper from "../forms/FormWrapper";
import Attachments from "./Attachments";

const Details = ({ taskData }) => {
  const { t } = useTranslation();

  return (
    <FormWrapper title={t("dashboard.tasks.modelTask.taskDetails.requestSubject")}>
      <div className="model__details">
        <div className="model__details--text-container">
          <div className="model__details-description">
            <h3>{t("dashboard.tasks.modelTask.taskDetails.subject")}</h3>
            <p> {taskData?.task?.title} </p>
          </div>
          <div className="model__details-description">
            <h3>{t("dashboard.tasks.modelTask.taskDetails.description")}</h3>
            <p>{taskData?.task?.description}</p>
          </div>
        </div>
        <Attachments taskData={taskData} />
      </div>
    </FormWrapper>
  );
};

export default Details;
