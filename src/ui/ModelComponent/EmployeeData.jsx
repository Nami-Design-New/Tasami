import { useTranslation } from "react-i18next";
import FormWrapper from "../forms/FormWrapper";
import DataItem from "./common/DataItem";

const EmployeeData = ({ taskData }) => {
  const { t } = useTranslation();
  return (
    <FormWrapper title={t("dashboard.tasks.modelTask.employeeData.title")}>
      <div className="model__employee-data">
        <div className="list">
          <DataItem
            label={t("dashboard.tasks.modelTask.employeeData.accountNumber")}
            value={taskData?.task?.account}
          />
          <DataItem
            label={t("dashboard.tasks.modelTask.employeeData.groupNumber")}
            value={taskData?.task?.id_number}
          />
          <DataItem label={t("dashboard.tasks.modelTask.employeeData.date")} value={taskData?.task?.date} />
          <DataItem label={t("dashboard.tasks.modelTask.employeeData.time")} value={taskData?.task?.time} />
        </div>
      </div>
    </FormWrapper>
  );
};
export default EmployeeData;
